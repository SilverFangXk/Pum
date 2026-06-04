import { MessageCircle, Mail } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { GiClover } from "react-icons/gi";
import { Leaf } from 'lucide-react';
import { WhimsicalCorner } from './WhimsicalCorner';
export function ContactSection() {
    return (
        <section id="contact" className="py-32 px-16 bg-white border-t border-[hsl(var(--pum-taupe)/10)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">

                {/* Left Side: Modern Icons */}
                <div className="flex flex-col justify-between">
                    <div className=" mx-auto max-w-7xl space-y-4 px-12 mb-16">
                        <h2 className="font-serif text-6xl italic text-[hsl(var(--pum-taupe))]">Let's Chat.</h2>
                        <div className="flex items-center gap-2 text-[hsl(var(--pum-green))] mb-4">
                            <GiClover Size={14} />
                            <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Tell us what you neede</span>
                        </div>
                    </div>

                    <div className="p-16 space-y-8 h-[500px]">
                        <a href="#" className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-[hsl(var(--pum-taupe)/10)] flex items-center justify-center group-hover:bg-[#E8F3EC] group-hover:border-[#E8F3EC] transition-all">
                                <MessageCircle Size={18} className="text-[hsl(var(--pum-taupe))]" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Chat on KakaoTalk</span>
                        </a>

                        <a href="#" className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-[hsl(var(--pum-taupe)/10)] flex items-center justify-center group-hover:bg-[#FDF0FC] group-hover:border-[#FDF0FC] transition-all">
                                <FaInstagram Size={18} className="text-[hsl(var(--pum-taupe))]" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Follow on Instagram</span>
                        </a>

                        <a href="mailto:hello@pum.com" className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-[hsl(var(--pum-taupe)/10)] flex items-center justify-center group-hover:bg-[#FDF5FB] group-hover:border-[#FDF5FB] transition-all">
                                <Mail Size={18} className="text-[hsl(var(--pum-taupe))]" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Send us an Email</span>
                        </a>
                    </div>
                </div>

                {/* Right Side: Form stays the same */}
                <div className="bg-[#FDF5FB] p-16 rounded-[2.5rem] mt-32"
                        >
                    <WhimsicalCorner />
                </div>
            </div>
        </section>
    );
}