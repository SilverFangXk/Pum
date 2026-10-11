import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiXBold } from "react-icons/pi";
const FORMSPREE_URL = "";

const WORKSHOPS = [
  { id: "bouquet", name: "Hand-tied bouquet", when: "Sat 24 Oct · 14:00", price: "₩85,000", seatsLeft: 6 },
  { id: "color", name: "Color theory basics", when: "Sun 1 Nov · 11:00", price: "₩70,000", seatsLeft: 3 },
  { id: "wreath", name: "Wreath making", when: "Sat 7 Nov · 14:00", price: "₩95,000", seatsLeft: 0 },
];

const SERVICES = {
  delivery: {
    eyebrow: "Who is it for?",
    title: "Send a bouquet",
    submit: "Choose a bouquet",
    fields: [
      { name: "recipient", label: "Recipient name", type: "text", required: true, half: true },
      { name: "phone", label: "Phone", type: "tel", required: true, half: true },
      { name: "address", label: "Delivery address or city", type: "text", required: true },
      { name: "date", label: "Delivery date", type: "date", required: true, half: true },
      { name: "slot", label: "Time slot", type: "select", half: true,
        options: ["Morning (10–13)", "Afternoon (13–17)", "Evening (17–20)"] },
      { name: "message", label: "Card message (optional)", type: "textarea" },
    ],
  },
  wedding: {
    eyebrow: "Tell us about your day",
    title: "Book a consultation",
    submit: "Request consultation",
    success: "We'll contact you within 24 hours to confirm a visit.",
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true, half: true },
      { name: "weddingDate", label: "Wedding date", type: "date", required: true, half: true },
      { name: "guests", label: "Guests", type: "number", half: true },
      { name: "needs", label: "What do you need?", type: "chips",
        options: ["Bridal bouquet", "Venue", "Ceremony arch", "Tables"] },
      { name: "visitDay", label: "Preferred visit day", type: "date" },
    ],
  },
  event: {
    eyebrow: "Get a quote",
    title: "Event inquiry",
    submit: "Get a quote",
    success: "Thanks! You'll get a quote within 2 working days.",
    fields: [
      { name: "eventType", label: "Event type", type: "chip", required: true,
        options: ["Corporate", "Birthday", "Opening", "Private"] },
      { name: "date", label: "Event date", type: "date", required: true, half: true },
      { name: "venue", label: "Venue", type: "text", half: true },
      { name: "budget", label: "Budget range", type: "select", half: true,
        options: ["Under ₩500,000", "₩500,000 – ₩1,000,000", "₩1,000,000 – ₩3,000,000", "Over ₩3,000,000"] },
      { name: "contact", label: "Email or Kakao ID", type: "text", required: true, half: true },
      { name: "idea", label: "Describe your idea", type: "textarea" },
    ],
  },
  workshop: {
    eyebrow: "Pick a session",
    title: "Upcoming classes",
    submit: "Reserve",
    success: "Your spot is held. We'll text you to confirm.",
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, half: true },
      { name: "phone", label: "Phone", type: "tel", required: true, half: true },
    ],
  },
};

const today = () => new Date().toISOString().slice(0, 10);

async function sendRequest(type, data) {
  if (!FORMSPREE_URL) {
    await new Promise((r) => setTimeout(r, 600));
    return true;
  }
  try {
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ type, ...data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const inputCls =
  "w-full bg-white border border-[hsl(var(--pum-taupe)/15)] rounded-xl px-4 py-3 text-sm text-[hsl(var(--pum-taupe))] placeholder:text-[hsl(var(--pum-taupe)/45)] focus:outline-none focus:border-[hsl(var(--pum-green))]";

function Field({ f, value, onChange, error }) {
  const label = (
    <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[hsl(var(--pum-taupe)/60)] mb-2">
      {f.label}{f.required && " *"}
    </span>
  );

  let control;
  if (f.type === "textarea") {
    control = <textarea rows={3} className={inputCls} value={value || ""} onChange={(e) => onChange(e.target.value)} />;
  } else if (f.type === "select") {
    control = (
      <select className={inputCls} value={value || ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select…</option>
        {f.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    );
  } else if (f.type === "chips" || f.type === "chip") {
    const multi = f.type === "chips";
    const selected = multi ? value || [] : [value];
    control = (
      <div className="flex flex-wrap gap-2">
        {f.options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              type="button"
              key={o}
              onClick={() =>
                onChange(multi ? (on ? selected.filter((x) => x !== o) : [...selected, o]) : o)
              }
              className={`px-4 py-2 rounded-full text-xs border transition-all ${
                on
                  ? "bg-[hsl(var(--pum-green)/0.1)] border-[hsl(var(--pum-green))] text-[hsl(var(--pum-green))]"
                  : "bg-white border-[hsl(var(--pum-taupe)/15)] text-[hsl(var(--pum-taupe))]"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    );
  } else {
    control = (
      <input
        type={f.type}
        min={f.type === "date" ? today() : f.type === "number" ? 1 : undefined}
        className={inputCls}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <label className={`block ${f.half ? "col-span-1" : "col-span-2"}`}>
      {label}
      {control}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  );
}

export function ServiceModal({ type, onClose }) {
  const navigate = useNavigate();
  const config = type ? SERVICES[type] : null;

  const [values, setValues] = useState({});
  const [session, setSession] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | failed

  // reset whenever a different service opens
  useEffect(() => {
    setValues({});
    setSession(null);
    setErrors({});
    setStatus("idle");
  }, [type]);

  // close on Escape
  useEffect(() => {
    if (!type) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [type, onClose]);

  const set = (name, v) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    config.fields.forEach((f) => {
      if (f.required && !values[f.name]) next[f.name] = "This field is required.";
    });
    if (type === "workshop" && !session) next.session = "Pick a class first.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // Delivery: keep details for the cart, then go shopping
    if (type === "delivery") {
      localStorage.setItem("pum-delivery", JSON.stringify(values));
      onClose();
      navigate("/shop");
      return;
    }

    setStatus("sending");
    const payload = type === "workshop"
      ? { ...values, class: WORKSHOPS.find((w) => w.id === session)?.name }
      : values;
    const ok = await sendRequest(type, payload);
    setStatus(ok ? "done" : "failed");
  };

  return (
    <>
      {type && (
        <div
          className="fixed inset-0 bg-[hsl(var(--pum-taupe)/20)] backdrop-blur-sm z-[60]"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-opacity duration-300 ${
          type ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        {config && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FDF5FB] rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-6 right-6 text-[hsl(var(--pum-taupe))] hover:rotate-90 transition-transform duration-500"
            >
              <PiXBold size={20} />
            </button>

            {status === "done" ? (
              <div className="py-12 text-center space-y-4">
                <h2 className="font-serif italic text-3xl text-[hsl(var(--pum-taupe))]">Thank you.</h2>
                <p className="text-sm text-[hsl(var(--pum-taupe)/70)] max-w-xs mx-auto">{config.success}</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs uppercase tracking-[0.2em] border-b border-[hsl(var(--pum-taupe)/40)] hover:border-[hsl(var(--pum-taupe))] transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[hsl(var(--pum-green))] mb-2">
                  {config.eyebrow}
                </p>
                <h2 className="font-serif italic text-3xl text-[hsl(var(--pum-taupe))] mb-8">{config.title}</h2>

                {/* Workshop session list */}
                {type === "workshop" && (
                  <div className="space-y-3 mb-8">
                    {WORKSHOPS.map((w) => {
                      const full = w.seatsLeft === 0;
                      const picked = session === w.id;
                      return (
                        <button
                          type="button"
                          key={w.id}
                          onClick={() => !full && (setSession(w.id), setErrors((p) => ({ ...p, session: undefined })))}
                          className={`w-full flex items-center justify-between text-left bg-white rounded-2xl px-5 py-4 border transition-all ${
                            picked
                              ? "border-[hsl(var(--pum-green))] bg-[#E8F3EC]"
                              : "border-[hsl(var(--pum-taupe)/10)] hover:border-[hsl(var(--pum-taupe)/30)]"
                          } ${full ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <div>
                            <p className="font-serif text-[hsl(var(--pum-taupe))]">{w.name}</p>
                            <p className="text-xs text-[hsl(var(--pum-taupe)/60)] mt-1">{w.when} · {w.price}</p>
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[hsl(var(--pum-green))]">
                            {full ? "Full" : w.seatsLeft <= 3 ? `${w.seatsLeft} left` : picked ? "Selected" : "Select"}
                          </span>
                        </button>
                      );
                    })}
                    {errors.session && <p className="text-xs text-red-600">{errors.session}</p>}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  {config.fields.map((f) => (
                    <Field key={f.name} f={f} value={values[f.name]} onChange={(v) => set(f.name, v)} error={errors[f.name]} />
                  ))}
                </div>

                {status === "failed" && (
                  <p className="text-xs text-red-600 mt-4">Couldn't send your request. Try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full mt-8 py-3.5 bg-[hsl(var(--pum-green))] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                >
                  {status === "sending" ? "Sending…" : config.submit}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
}