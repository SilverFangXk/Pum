import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useShopStatus } from "./useShopStatus";

export function Footer() {
  const { status, color } = useShopStatus();
  const isOpen = status === "Open";

  return (
    <footer className="bg-[hsl(145,25%,15%)] pt-32 pb-20 px-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_hsl(var(--pum-green)/0.15),_transparent_50%)]" />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10"
      >
        {/* Brand Block */}
        <div className="md:col-span-4 space-y-8">
          <div className="flex items-center gap-4">
            <img src="Hero/logoPeony.png" alt="Pum Logo" className="w-12 h-12 object-contain" />
            <h2 className="font-serif text-5xl italic text-white tracking-tight">Pum.</h2>
          </div>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/90">
              Currently {status}
            </span>
          </div>
        </div>

        {/* Links Block */}
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.35em] font-black text-[hsl(var(--pum-green-light))] border-b border-white/10 pb-4">Services</h3>
            <ul className="text-[13px] font-medium text-white/80 space-y-4 uppercase tracking-wider">
              {["Bespoke Bouquets", "Event Design", "Gift Curation"].map(item => (
                <li key={item} className="cursor-pointer hover:text-white transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          {/* Species */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.35em] font-black text-[hsl(var(--pum-green-light))] border-b border-white/10 pb-4">Species</h3>
            <ul className="text-[13px] font-medium text-white/80 space-y-4 uppercase tracking-wider">
              {["Lilies", "Peonies", "Roses", "Wild Flowers"].map(item => (
                <li key={item} className="cursor-pointer hover:text-white transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact (Icons Kept) */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.35em] font-black text-[hsl(var(--pum-green-light))] border-b border-white/10 pb-4">Contact</h3>
            <ul className="text-[13px] font-medium text-white/80 space-y-4">
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Phone Size={14} /> +82 00 000 000</li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Mail Size={14} /> hello@pum.com</li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><MapPin Size={14} /> Gangnam-gu</li>
            </ul>
          </div>

          {/* Connect (Icons Kept) */}
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.35em] font-black text-[hsl(var(--pum-green-light))] border-b border-white/10 pb-4">Connect</h3>
            <div className="flex gap-5">
              <FaInstagram Size={24} className="hover:text-[hsl(var(--pum-green-light))] transition-colors cursor-pointer"  />
              <FaFacebook Size={20} className="hover:text-[hsl(var(--pum-green-light))] transition-colors cursor-pointer" />
              <FaTwitter Size={20} className="hover:text-[hsl(var(--pum-green-light))] transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-24 text-left  pt-8">
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">© 2026 Pum Seoul — All Rights Reserved</p>
      </div>
    </footer>
  );
}