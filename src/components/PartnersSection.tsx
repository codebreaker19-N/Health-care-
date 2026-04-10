import { Building2, ShieldCheck } from "lucide-react";

const partners = [
  "AIIMS Delhi", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare",
  "Medanta", "Narayana Health", "KIMS", "Manipal Hospitals",
];

const ngos = [
  "Indian Cancer Society", "Give India", "Smile Foundation", "CRY India",
  "HelpAge India", "Save the Children", "Milaap",
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Partners</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Leading <span className="text-gradient-primary">Institutions</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Hospital Partners</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {partners.map((p) => (
                <div
                  key={p}
                  className="bg-card rounded-xl px-4 py-3 border border-border flex items-center gap-2 text-sm text-foreground shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-hope" />
              <h3 className="text-lg font-semibold text-foreground">NGO Partners</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ngos.map((n) => (
                <div
                  key={n}
                  className="bg-card rounded-xl px-4 py-3 border border-border flex items-center gap-2 text-sm text-foreground shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-hope flex-shrink-0" />
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
