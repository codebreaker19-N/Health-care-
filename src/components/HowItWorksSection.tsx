import { FileText, Shield, Handshake, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Request",
    description: "Patient submits medical request with documents and treatment details.",
    step: "01",
  },
  {
    icon: Shield,
    title: "Verification",
    description: "Our team verifies the case with hospitals and medical records.",
    step: "02",
  },
  {
    icon: Handshake,
    title: "Connect & Match",
    description: "We match patients with government schemes, NGOs, and donors.",
    step: "03",
  },
  {
    icon: HeartPulse,
    title: "Treatment Support",
    description: "Funding is disbursed and treatment begins with continuous tracking.",
    step: "04",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Four Simple Steps to <span className="text-gradient-primary">Get Help</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process ensures that every patient receives timely support and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px border-t-2 border-dashed border-border z-0" />
              )}
              <div className="relative bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl font-bold text-muted/80 font-serif absolute top-4 right-4">{step.step}</div>
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
