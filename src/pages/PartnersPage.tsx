import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/PartnersSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PartnersPage =() => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-gradient-primary">Partners</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We work with leading hospitals, NGOs, and government bodies to bring healthcare to those who need it most.
            </p>
            <Button variant="hero" asChild>
              <Link to="/contact">Become a Partner <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </div>
        </section>
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
