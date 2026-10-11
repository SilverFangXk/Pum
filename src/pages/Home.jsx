import { Navbar } from "../components/NavbarSection";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import { Footer } from "../components/FooterSection";
import { SlideBarSection } from "../components/slideBarSection";
import { ContactSection } from "../components/ContactSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <SlideBarSection />
      <ContactSection />
      <Footer />
    </div>
  );
}