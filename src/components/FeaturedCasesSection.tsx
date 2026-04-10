import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const cases = [
  {
    name: "Priya Sharma",
    age: 8,
    location: "Jaipur, Rajasthan",
    condition: "Heart Surgery",
    raised: 320000,
    goal: 500000,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    urgent: true,
  },
  {
    name: "Ravi Kumar",
    age: 45,
    location: "Patna, Bihar",
    condition: "Kidney Transplant",
    raised: 180000,
    goal: 800000,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop",
    urgent: false,
  },
  {
    name: "Meena Devi",
    age: 32,
    location: "Lucknow, UP",
    condition: "Cancer Treatment",
    raised: 450000,
    goal: 600000,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
    urgent: true,
  },
];

const FeaturedCasesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Featured Cases</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lives Waiting for <span className="text-gradient-primary">Your Support</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every donation makes a difference. These verified cases need your help today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((c) => {
            const percent = Math.round((c.raised / c.goal) * 100);
            return (
              <div
                key={c.name}
                className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {c.urgent && (
                    <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{c.name}, {c.age}</h3>
                      <p className="text-sm text-muted-foreground">{c.location}</p>
                    </div>
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium">
                      {c.condition}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Raised: <strong className="text-foreground">₹{(c.raised / 100000).toFixed(1)}L</strong></span>
                      <span className="text-muted-foreground">Goal: <strong className="text-foreground">₹{(c.goal / 100000).toFixed(1)}L</strong></span>
                    </div>
                    <Progress value={percent} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{percent}% funded</p>
                  </div>
                  <Button variant="hope" className="w-full mt-4" asChild>
                    <Link to="/donate">
                      <Heart className="w-4 h-4" /> Support {c.name.split(" ")[0]}
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/donate">View All Cases</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCasesSection;
