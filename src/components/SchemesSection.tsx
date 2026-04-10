import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const SchemesSection = () => {
  const schemes = [
    {
      title: "Ayushman Bharat (PM-JAY)",
      coverage: "Up to ₹5 Lakh/year",
      description: "Free health insurance for economically weaker sections covering 1,500+ procedures.",
      benefits: ["Cashless treatment", "No age limit", "Pre & post hospitalization"],
    },
    {
      title: "Rashtriya Swasthya Bima Yojana",
      coverage: "Up to ₹30,000/year",
      description: "Health insurance for BPL families covering hospitalization expenses.",
      benefits: ["Smart card based", "Cashless facility", "Transport allowance"],
    },
    {
      title: "State Health Schemes",
      coverage: "Varies by state",
      description: "Additional state-level schemes like Aarogyasri, Mahatma Jyotiba Phule, etc.",
      benefits: ["State-specific coverage", "Specialized treatments", "Local hospital network"],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Government Schemes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Access Free <span className="text-gradient-primary">Healthcare Schemes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Millions of Indians are eligible for free treatment. Check if you qualify.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {schemes.map((scheme) => (
            <div
              key={scheme.title}
              className="bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-elevated transition-all duration-300"
            >
              <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
                {scheme.coverage}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{scheme.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{scheme.description}</p>
              <ul className="space-y-2 mb-6">
                {scheme.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button variant="hero-outline" className="w-full" asChild>
                <Link to="/schemes">Check Eligibility <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchemesSection;
