import { PiFlowerBold } from 'react-icons/pi';
export function WhimsicalCorner() {
    return (
        <div className="bg-[#FDF5FB] p-16 rounded-[2.5rem] flex flex-col justify-between h-[500px] 
shadow-[0_12px_40px_rgba(0,0,0,0.06)] 
border border-[hsl(var(--pum-taupe)/8)]">

            {/* The Brand Intro */}
            <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--pum-taupe)/50)]">  <PiFlowerBold Size={16} className="inline-block align-text-bottom mr-2" /> Inquiry</p>
                <p className="font-serif text-lg italic text-[hsl(var(--pum-taupe)/80)] leading-relaxed max-w-sm">
                    Whether it's a celebration, a thank you, or simply a moment worth remembering, we'd love to help you choose the right arrangement.
                </p>
            </div>

            {/* The Details */}
            <div className="space-y-8">
                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--pum-taupe)/50)]">Opening Hours</p>
                    <div className="grid grid-cols-2 gap-4 text-xs tracking-wider text-[hsl(var(--pum-taupe))]">
                        <div>
                            <p className="font-bold">Mon — Fri</p>
                            <p>10:00 — 20:00</p>
                        </div>
                        <div>
                            <p className="font-bold">Sat — Sun</p>
                            <p>11:00 — 21:00</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-[hsl(var(--pum-taupe)/10)]">
                    <p className="text-xs font-bold tracking-widest text-[hsl(var(--pum-taupe))] flex items-center gap-2">
                        <span className="text-lg">📍</span> SEOUL
                    </p>
                </div>
            </div>

        </div>
    );
}