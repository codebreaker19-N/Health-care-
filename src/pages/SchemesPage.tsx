import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchemesSection from "@/components/SchemesSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const SchemesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Government <span className="text-gradient-primary">Healthcare Schemes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check your eligibility for free or subsidized healthcare under various government programs.
            </p>
          </div>
        </section>

        {/* Eligibility Checker */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Eligibility Checker</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Annual Income</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below1">Below ₹1 Lakh</SelectItem>
                        <SelectItem value="1to3">₹1-3 Lakh</SelectItem>
                        <SelectItem value="3to5">₹3-5 Lakh</SelectItem>
                        <SelectItem value="above5">Above ₹5 Lakh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="up">Uttar Pradesh</SelectItem>
                        <SelectItem value="mh">Maharashtra</SelectItem>
                        <SelectItem value="br">Bihar</SelectItem>
                        <SelectItem value="rj">Rajasthan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ration Card Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bpl">BPL (Below Poverty Line)</SelectItem>
                      <SelectItem value="apl">APL (Above Poverty Line)</SelectItem>
                      <SelectItem value="aay">AAY (Antyodaya)</SelectItem>
                      <SelectItem value="none">No Ration Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="hero" size="lg" className="w-full">
                  <Search className="w-5 h-5" /> Check Eligibility
                </Button>
              </form>
            </div>
          </div>
        </section>

        <SchemesSection />
      </main>
      <Footer />
    </div>
  );
};

export default SchemesPage;
