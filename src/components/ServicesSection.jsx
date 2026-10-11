import { useState } from "react";
import { Leaf } from "lucide-react";
import { ServiceModal } from "./ServiceModal";

export function ServicesSection() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      type: "delivery",
      title: "Global Delivery",
      desc: "We send our signature bouquets to any destination you choose, ensuring they arrive fresh and beautiful.",
      action: "Send Now"
    },
    {
      type: "wedding",
      title: "Wedding Arrangements",
      desc: "Bespoke floral design for your most special day, from bridal bouquets to grand venue installations.",
      action: "Book Consultation"
    },
    {
      type: "event",
      title: "Event Decoration",
      desc: "Transform your events—corporate or private—with our unique, immersive floral decorations.",
      action: "Inquire Now"
    },
    {
      type: "workshop",
      title: "Floral Workshops",
      desc: "Join our hands-on workshops to learn the art of floral design, color theory, and bouquet crafting.",
      action: "Join a Class"
    }
  ];

  const backgroundTints = [
    "bg-[#FDF5FB]", // pum-pink
    "bg-[#FDF0FC]", // pum-lavender
    "bg-[#FFF5FD]", // pum-mist
    "bg-[#E8F3EC]"  // pum-green-light
  ];

  return (
    <section id="services" className="py-24 px-16 bg-[hsl(var(--pum-pearl))] mb-32">
      <div className="mx-auto max-w-7xl space-y-4 px-12 mb-16">
        <h2 className="font-serif text-6xl italic text-[hsl(var(--pum-taupe))]">Our Services.</h2>
        <div className="flex items-center gap-2 text-[hsl(var(--pum-green))] mb-4">
          <Leaf size={14} />
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">What We Provide</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={service.type}
            className={`flex flex-col p-8 rounded-[2rem] transition-all duration-700 
              ${backgroundTints[index]} 
              hover:shadow-[0_20px_40px_-10px_rgba(180,160,150,0.3)] 
              hover:-translate-y-3
              border border-white/50`}
          >
            <h3 className="text-xl font-serif text-[hsl(var(--pum-taupe))] mb-4">{service.title}</h3>
            <p className="text-[hsl(var(--pum-taupe)/70)] text-[13px] leading-relaxed mb-8 flex-grow">
              {service.desc}
            </p>
            <button
              onClick={() => setActiveService(service.type)}
              className="w-full py-2.5 border border-[hsl(var(--pum-green))] text-[hsl(var(--pum-green))] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[hsl(var(--pum-green))] hover:text-white transition-all"
            >
              {service.action}
            </button>
          </div>
        ))}
      </div>

      <ServiceModal type={activeService} onClose={() => setActiveService(null)} />
    </section>
  );
}