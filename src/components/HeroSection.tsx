import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-healthcare.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              Trusted by 50,000+ families across India
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
              Bringing Healthcare{" "}
              <span className="text-gradient-primary">Closer to Every Heart</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Connecting patients with funding, care, and hope. We bridge the gap between government schemes, NGOs, hospitals, and those who need it most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/get-help">
                  Get Help <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hope" size="lg" asChild>
                <Link to="/donate">
                  <Heart className="w-5 h-5" /> Donate Now
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border">
              {[
                { value: "50K+", label: "Patients Helped" },
                { value: "₹12Cr+", label: "Funds Raised" },
                { value: "200+", label: "Partner Hospitals" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Doctor caring for a child patient in India"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-xl shadow-elevated p-4 animate-fade-up border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-secondary" fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Emergency Help</p>
                  <p className="text-xs text-muted-foreground">24/7 support available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
