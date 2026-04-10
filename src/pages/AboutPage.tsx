import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Target, Eye, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient-primary">Arogyabandhu</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Arogyabandhu — meaning "Health Companion" — was born from a simple belief: no one should die because they can't afford treatment. We connect patients with government schemes, NGOs, hospitals, and donors to make healthcare accessible for every Indian.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Our Mission", text: "To eliminate financial barriers in healthcare by connecting patients with every possible source of support — from government schemes to community donations." },
                { icon: Eye, title: "Our Vision", text: "A future where every Indian has access to quality healthcare regardless of their economic background." },
                { icon: Users, title: "Our Values", text: "Transparency, compassion, and accountability guide everything we do. Every rupee is tracked, every case is verified." },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-2xl p-8 shadow-soft border border-border text-center">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground space-y-4">
              <p>India has some of the best doctors and hospitals in the world, yet millions of people go without basic healthcare due to financial constraints. Government schemes like Ayushman Bharat cover over 50 crore Indians, but awareness and access remain major challenges.</p>
              <p>Arogyabandhu was founded to bridge this gap — creating a single platform where patients can find all available support, get verified quickly, and receive treatment without the burden of navigating complex bureaucratic processes alone.</p>
              <p>Through partnerships with 200+ hospitals and dozens of NGOs, we've helped over 50,000 patients access life-saving treatments. But our journey has just begun.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
