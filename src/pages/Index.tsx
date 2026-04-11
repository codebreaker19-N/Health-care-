import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SchemesSection from "@/components/SchemesSection";
import FeaturedCasesSection from "@/components/FeaturedCasesSection";
import PartnersSection from "@/components/PartnersSection";
import ImpactSection from "@/components/ImpactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <SchemesSection />
        <FeaturedCasesSection />
        <ImpactSection />
        <PartnersSection />
        <CTASection/>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
