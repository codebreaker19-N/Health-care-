import { Users, Heart, Building2, IndianRupee } from "lucide-react";

const stats = [
  { icon: Users, value: "50,000+", label: "Patients Helped", color: "text-primary" },
  { icon: IndianRupee, value: "₹12 Cr+", label: "Funds Raised", color: "text-secondary" },
  { icon: Building2, value: "200+", label: "Partner Hospitals", color: "text-trust" },
  { icon: Heart, value: "95%", label: "Success Rate", color: "text-hope" },
];

const testimonials = [
  {
    quote: "Arogyabandhu helped my daughter get heart surgery through Ayushman Bharat. We had lost all hope, but they guided us every step of the way.",
    name: "Sunita Devi",
    location: "Varanasi, UP",
  },
  {
    quote: "As a donor, I can see exactly where my money goes. The transparency and impact tracking gives me confidence to keep contributing.",
    name: "Arun Mehta",
    location: "Mumbai, Maharashtra",
  },
  {
    quote: "Our hospital has partnered with Arogyabandhu for 2 years. They bring genuine cases and ensure smooth coordination for treatments.",
    name: "Dr. Priya Singh",
    location: "AIIMS Delhi",
  },
];

const ImpactSection = () => {
  return (
    <section className="py-20">
      {/* Stats*/}
      <div className="bg-gradient-cta py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-primary-foreground/80 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories of <span className="text-gradient-primary">Hope & Healing</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-2xl p-8 shadow-soft border border-border"
            >
              <div className="text-4xl text-primary/20 font-serif mb-4">"</div>
              <p className="text-foreground leading-relaxed mb-6 text-sm">{t.quote}</p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
