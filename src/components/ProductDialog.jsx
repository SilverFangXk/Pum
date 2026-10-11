import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Clock, Code2, MapPin, X } from "lucide-react";

import { listProjects } from "../lib/projectsDb";
import { colorStyles, getLength, getRange, getStatus, statusLabel } from "../lib/experienceUtils";
import { optimized } from "./PhotoGallery";

// One-column modal for an experience (about 60% of the screen wide on desktop):
//   top    = photo mosaic (big photo on the left, up to 3 stacked on the right)
//   below  = role, status, facts, your written sections, linked projects, stack
// The whole modal scrolls. Click a photo to open it full size.
// Usage: <ExperienceDialog exp={selectedOrNull} onClose={() => setSelected(null)} />
//
// Written content comes from:
//   exp.description      : string (blank line = new paragraph) OR the old array of lines
//   exp.descriptionTitle : optional heading above the description (default "What I did")
//   exp.sections         : [{ title, text }] -> any extra sections you want to write

// Accepts the new format (one string) and the old one (array of lines).
export const toParagraphs = (d) =>
    Array.isArray(d)
        ? d.map((s) => String(s ?? "").trim()).filter(Boolean)
        : String(d ?? "")
              .split(/\n\s*\n/)
              .map((s) => s.trim())
              .filter(Boolean);

const DRAWER_CSS = `
@keyframes exp-modal-in { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
dialog.exp-drawer[open] { animation: exp-modal-in 220ms cubic-bezier(.22,1,.36,1); }
@media (prefers-reduced-motion: reduce) { dialog.exp-drawer[open] { animation: none; } }
.exp-scroll { scrollbar-width: none; -ms-overflow-style: none; }
.exp-scroll::-webkit-scrollbar { display: none; }
`;

const Fact = ({ icon: Icon, label, children, className = "" }) => (
    <div className={`flex items-start gap-2.5 ${className}`}>
        <Icon size={15} className="mt-0.5 shrink-0 text-foreground/40" />
        <div className="min-w-0">
            <p className="text-[11px] text-foreground/50">{label}</p>
            <p className="text-sm font-medium text-foreground">{children}</p>
        </div>
    </div>
);

const Section = ({ title, children }) => (
    <section>
        <h4 className="mb-2 text-sm font-bold text-foreground">{title}</h4>
        {children}
    </section>
);

// Photo mosaic:
//   4+ photos: [ 1 ][ 2 ]      3 photos: [ 1 ][ 2 ]     2 photos: [ 1 ][ 2 ]     1 photo: [   1   ]
//              [   ][ 3 ]                 [   ][ 3 ]
//              [   ][ 4 ]
// With more than 4 photos the last tile shows "+N"; click opens the viewer.
const Mosaic = ({ photos, onOpen }) => {
    const n = photos.length;
    const shown = photos.slice(0, 4);
    const extra = n - 4;

    const grid =
        n === 1
            ? "grid-cols-1"
            : n === 2
              ? "grid-cols-2"
              : "grid-cols-[1.4fr_1fr]";
    const rows = n >= 4 ? "grid-rows-3" : n === 3 ? "grid-rows-2" : "grid-rows-1";
    const bigSpan = n >= 4 ? "row-span-3" : n === 3 ? "row-span-2" : "";

    return (
        <div className={`grid h-64 gap-1.5 bg-muted/40 p-1.5 sm:h-80 md:h-[26rem] ${grid} ${rows}`}>
            {shown.map((p, i) => (
                <button
                    key={`${p.url}-${i}`}
                    type="button"
                    onClick={() => onOpen(i)}
                    aria-label={p.caption ? `Open photo: ${p.caption}` : `Open photo ${i + 1}`}
                    className={`group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-lg bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        i === 0 ? bigSpan : ""
                    }`}
                >
                    <img
                        src={optimized(p.url, i === 0 ? 1000 : 600)}
                        alt={p.caption ?? ""}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {i === 3 && extra > 0 && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-2xl font-black text-white">
                            +{extra}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export const ExperienceDialog = ({ exp, onClose }) => {
    const ref = useRef(null);
    const [allProjects, setAllProjects] = useState(null);
    const [viewer, setViewer] = useState(null); // index of the photo open full size, or null

    // Native <dialog>: Escape to close, focus trapping and the backdrop come for free.
    useEffect(() => {
        const d = ref.current;
        if (!d) return;
        if (exp && !d.open) d.showModal();
        if (!exp && d.open) d.close();
    }, [exp]);

    useEffect(() => {
        setViewer(null);
    }, [exp]);

    // Stop the page behind from scrolling while the modal is open.
    useEffect(() => {
        if (!exp) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [exp]);

    // Load projects only when a modal that links some is first opened.
    useEffect(() => {
        if (!exp?.projectSlugs?.length || allProjects !== null) return;
        let alive = true;
        listProjects()
            .then((l) => alive && setAllProjects(l))
            .catch(() => alive && setAllProjects([]));
        return () => {
            alive = false;
        };
    }, [exp, allProjects]);

    const c = exp ? colorStyles[exp.color] ?? colorStyles.primary : colorStyles.primary;
    const status = exp ? getStatus(exp) : "past";
    const length = exp ? getLength(exp) : "";
    const lines = toParagraphs(exp?.description);
    const descTitle = (exp?.descriptionTitle ?? "").trim() || "What I did";
    const extra = (exp?.sections ?? []).filter((s) => s?.title && s?.text);
    const tags = (exp?.tags ?? []).filter(Boolean);
    const photos = (exp?.photos ?? []).filter((p) => p?.url);
    const hasPhotos = photos.length > 0;
    const linked = (exp?.projectSlugs ?? [])
        .map((slug) => (allProjects ?? []).find((p) => p.slug === slug))
        .filter(Boolean);

    const step = (d) => setViewer((i) => (i === null ? i : (i + d + photos.length) % photos.length));

    return (
        <>
            <style>{DRAWER_CSS}</style>
            <dialog
                ref={ref}
                onClose={onClose}
                // Escape closes the photo viewer first, then the modal
                onCancel={(e) => {
                    if (viewer !== null) {
                        e.preventDefault();
                        setViewer(null);
                    }
                }}
                onClick={(e) => e.target === ref.current && onClose()} // click on the dim backdrop
                aria-labelledby="exp-drawer-title"
                className="exp-drawer m-auto max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-[calc(100%-1.5rem)] overflow-hidden rounded-2xl border border-border bg-card p-0 text-left text-foreground shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm md:w-[60vw] md:min-w-[40rem]"
            >
                {exp && (
                    <>
                        {/* Close button stays put while the content scrolls */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-3 top-3 z-20 cursor-pointer rounded-full bg-background/85 p-2 text-foreground/70 shadow-sm backdrop-blur transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                            <X size={18} />
                        </button>

                        {/* The whole modal scrolls here */}
                        <div className="exp-scroll max-h-[90dvh] overflow-y-auto overscroll-contain">
                            {/* ---------- top: photo mosaic ---------- */}
                            {hasPhotos ? <Mosaic photos={photos} onOpen={setViewer} /> : <div className={`h-1.5 ${c.dot}`} />}

                            {hasPhotos && <div className={`h-1 ${c.dot}`} />}

                            {/* ---------- header ---------- */}
                            <div className="px-6 pb-3 pt-5 sm:px-8">
                                <h3 id="exp-drawer-title" className="text-xl font-black leading-snug sm:text-2xl">
                                    {exp.role}
                                </h3>
                                <p className={`mt-0.5 text-sm font-medium sm:text-base ${c.text}`}>{exp.company}</p>
                                <span
                                    className={`mt-2.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                                        status === "past" ? "bg-muted text-foreground/60" : c.badge
                                    }`}
                                >
                                    {statusLabel[status]}
                                </span>
                            </div>

                            {/* ---------- body ---------- */}
                            <div className="space-y-6 px-6 pb-8 pt-2 sm:px-8">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                                    <Fact icon={CalendarDays} label="Period" className="col-span-2 sm:col-span-1">
                                        {getRange(exp, status)}
                                    </Fact>
                                    {length && (
                                        <Fact icon={Clock} label="Duration">
                                            {length}
                                        </Fact>
                                    )}
                                    {exp.location && (
                                        <Fact icon={MapPin} label="Location" className={length ? "" : "col-span-2 sm:col-span-1"}>
                                            {exp.location}
                                        </Fact>
                                    )}
                                </div>

                                {lines.length > 0 && (
                                    <Section title={descTitle}>
                                        <div className="space-y-3 text-[15px] leading-relaxed text-foreground/80">
                                            {lines.map((line, i) => (
                                                <p key={i} className="whitespace-pre-line">
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </Section>
                                )}
                                {extra.map((s, i) => (
                                    <Section key={i} title={s.title}>
                                        <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/80">
                                            {s.text}
                                        </p>
                                    </Section>
                                ))}

                                {linked.length > 0 && (
                                    <Section title={`Projects (${linked.length})`}>
                                        <ul className="space-y-3">
                                            {linked.map((pr) => (
                                                <li
                                                    key={pr.slug}
                                                    className="flex gap-3 rounded-xl border border-border/60 bg-background/40 p-3"
                                                >
                                                    {pr.cover && (
                                                        <img
                                                            src={optimized(pr.cover, 240)}
                                                            alt=""
                                                            className="h-16 w-20 shrink-0 rounded-md border border-border/50 object-cover"
                                                        />
                                                    )}
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-bold text-foreground">{pr.title}</p>
                                                        {pr.summary && (
                                                            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-foreground/70">
                                                                {pr.summary}
                                                            </p>
                                                        )}
                                                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                                                            <Link
                                                                to={`/projects/${pr.slug}`}
                                                                className={`inline-flex items-center gap-1 text-xs font-semibold hover:underline ${c.text}`}
                                                            >
                                                                View work
                                                                <ArrowUpRight size={12} />
                                                            </Link>
                                                            {pr.githubUrl && (
                                                                <a
                                                                    href={pr.githubUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1 text-xs font-medium text-foreground/60 hover:text-primary"
                                                                >
                                                                    <Code2 size={12} />
                                                                    Code
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </Section>
                                )}

                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground/70"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ---------- full-size photo viewer ---------- */}
                        {viewer !== null && photos[viewer] && (
                            <div
                                className="absolute inset-0 z-30 flex items-center justify-center bg-black/90 p-4"
                                onClick={() => setViewer(null)}
                            >
                                <img
                                    src={optimized(photos[viewer].url, 1600)}
                                    alt={photos[viewer].caption ?? ""}
                                    onClick={(e) => e.stopPropagation()}
                                    className="max-h-full max-w-full rounded-lg object-contain"
                                />
                                {photos[viewer].caption && (
                                    <p className="absolute bottom-4 left-1/2 max-w-[80%] -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-center text-xs text-white">
                                        {photos[viewer].caption}
                                    </p>
                                )}
                                <button
                                    type="button"
                                    aria-label="Close photo"
                                    onClick={() => setViewer(null)}
                                    className="absolute right-3 top-3 cursor-pointer rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                                >
                                    <X size={18} />
                                </button>
                                {photos.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Previous photo"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                step(-1);
                                            }}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Next photo"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                step(1);
                                            }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </dialog>
        </>
    );
};