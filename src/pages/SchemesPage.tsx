import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchemesSection from "@/components/SchemesSection";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { runEligibility, EligibilityResult } from "@/lib/eligibility-engine";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
];

const SchemesPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [form, setForm] = useState({
    income: "", age: "", state: "", condition: "", urgency: "medium",
    areaType: "urban", bpl: false,
  });

  const handleChange = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!form.income || !form.age || !form.state || !form.condition) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1500));

    const res = runEligibility({
      income: Number(form.income),
      age: Number(form.age),
      disease: form.condition,
      areaType: form.areaType as any,
      urgency: form.urgency as any,
      state: form.state,
      bpl: form.bpl,
      estimatedCost: 300000,
    });

    setResult(res);
    setLoading(false);
    toast.success("Eligibility check complete!");
  };

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
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Annual Income (₹) *</Label>
                    <Input type="number" placeholder="e.g. 200000" value={form.income} onChange={(e) => handleChange("income", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Age *</Label>
                    <Input type="number" placeholder="e.g. 45" value={form.age} onChange={(e) => handleChange("age", e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Select value={form.state} onValueChange={(v) => handleChange("state", v)}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Medical Condition *</Label>
                    <Select value={form.condition} onValueChange={(v) => handleChange("condition", v)}>
                      <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiac">Cardiac / Heart</SelectItem>
                        <SelectItem value="cancer">Cancer</SelectItem>
                        <SelectItem value="kidney">Kidney</SelectItem>
                        <SelectItem value="neuro">Neurological</SelectItem>
                        <SelectItem value="ortho">Orthopedic</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Area Type</Label>
                    <Select value={form.areaType} onValueChange={(v) => handleChange("areaType", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rural">Rural</SelectItem>
                        <SelectItem value="semi-urban">Semi-Urban</SelectItem>
                        <SelectItem value="urban">Urban</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <Select value={form.urgency} onValueChange={(v) => handleChange("urgency", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">🚨 Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-accent/30 rounded-xl p-4 border border-border">
                  <Checkbox id="bpl" checked={form.bpl} onCheckedChange={(c) => handleChange("bpl", !!c)} />
                  <Label htmlFor="bpl" className="text-sm cursor-pointer">
                    I hold a <span className="font-semibold text-foreground">BPL (Below Poverty Line)</span> card
                  </Label>
                </div>
                <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Checking eligibility...</> : <><Search className="w-5 h-5" /> Check Eligibility</>}
                </Button>
              </form>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 space-y-4 animate-fade-up">
                <h3 className="text-2xl font-bold text-foreground text-center">🎯 Eligibility Results</h3>

                {result.schemes.length === 0 ? (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-center">
                    <XCircle className="w-10 h-10 text-destructive mx-auto mb-2" />
                    <p className="font-semibold text-foreground">No matching schemes found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your inputs or visit the Get Help page for full support.</p>
                  </div>
                ) : (
                  result.schemes.map((s, i) => {
                    const level = s.matchPercent >= 63 ? "high" : s.matchPercent >= 42 ? "mid" : "low";
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl p-6 border shadow-soft ${
                          level === "high"
                            ? "bg-green-500/10 border-green-500/30"
                            : level === "mid"
                            ? "bg-yellow-500/10 border-yellow-500/30"
                            : "bg-destructive/10 border-destructive/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {level === "high" ? <CheckCircle className="w-5 h-5 text-green-500" /> : level === "mid" ? <AlertTriangle className="w-5 h-5 text-yellow-500" /> : <XCircle className="w-5 h-5 text-destructive" />}
                            <h4 className="font-bold text-foreground text-lg">{s.name}</h4>
                          </div>
                          <Badge variant="secondary">{s.matchPercent}% Match</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{s.coverage}</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {level === "high" ? "✅ Highly Eligible" : level === "mid" ? "⚠️ Moderately Eligible" : "❌ Low Eligibility"}
                          {" — Score: "}{s.score}/{s.maxScore}
                        </p>
                        <p className="text-sm text-foreground font-medium mb-2">Why you matched:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.scoreBreakdown.map((b, j) => (
                            <Badge key={j} variant="outline" className="text-xs font-normal">{b}</Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}

                {result.rejectedSchemes.length > 0 && (
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
                    <p className="font-semibold text-foreground mb-2">❌ Excluded Schemes ({result.rejectedSchemes.length})</p>
                    <div className="space-y-2">
                      {result.rejectedSchemes.map((r, i) => (
                        <div key={i} className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{r.name}</span> — {r.reason}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <SchemesSection />
      </main>
      <Footer />
    </div>
  );
};

export default SchemesPage;
