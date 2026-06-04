import { Navbar } from '../components/NavbarSection';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { Footer } from '../components/FooterSection';
import { SlideBarSection } from '../components/slideBarSection';
import { ContactSection } from '../components/ContactSection';
import { SideCart } from '../components/SideCart';
import { SideWishlist } from '../components/SideWishlist';
import { useState } from 'react';
export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  return (
    
    <div>

      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenWishlist={() => setIsWishlistOpen(true)} />
      <SideCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <SideWishlist 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />
      <HeroSection />
      <ServicesSection />
      <SlideBarSection />
      <ContactSection />
      
      <Footer />
    </div>

  );
}