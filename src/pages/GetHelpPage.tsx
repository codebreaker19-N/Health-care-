import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { runEligibility, EligibilityResult } from "@/lib/eligibility-engine";
import EligibilityResults from "@/components/EligibilityResults";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
];

const GetHelpPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", age: "", location: "", condition: "", details: "",
    amount: "", income: "", urgency: "" as any, areaType: "" as any,
    state: "", bpl: false,
  });

  const handleChange = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.condition || !form.amount || !form.income || !form.urgency || !form.age || !form.areaType || !form.state) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setResult(null);

    await new Promise(r => setTimeout(r, 2000));

    const eligResult = runEligibility({
      income: Number(form.income),
      age: Number(form.age),
      disease: form.condition,
      areaType: form.areaType,
      urgency: form.urgency,
      state: form.state,
      bpl: form.bpl,
      estimatedCost: Number(form.amount),
    });

    setResult(eligResult);
    setLoading(false);
    toast.success("Eligibility analysis complete! 🎉");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get <span className="text-gradient-primary">Help</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Submit your medical request and we'll instantly match you with schemes, NGOs, and donors.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-soft border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Patient Request Form</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Enter patient name" value={form.name} onChange={e => handleChange("name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input id="age" type="number" placeholder="Age" value={form.age} onChange={e => handleChange("age", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Select value={form.state} onValueChange={v => handleChange("state", v)}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Annual Income (₹) *</Label>
                    <Input type="number" placeholder="e.g. 200000" value={form.income} onChange={e => handleChange("income", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Area Type *</Label>
                    <Select value={form.areaType} onValueChange={v => handleChange("areaType", v)}>
                      <SelectTrigger><SelectValue placeholder="Select area type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rural">Rural</SelectItem>
                        <SelectItem value="semi-urban">Semi-Urban</SelectItem>
                        <SelectItem value="urban">Urban</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Urgency Level *</Label>
                    <Select value={form.urgency} onValueChange={v => handleChange("urgency", v)}>
                      <SelectTrigger><SelectValue placeholder="Select urgency" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">🚨 Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Medical Condition *</Label>
                    <Select value={form.condition} onValueChange={v => handleChange("condition", v)}>
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

                {/* BPL Checkbox */}
                <div className="flex items-center space-x-3 bg-accent/30 rounded-xl p-4 border border-border">
                  <Checkbox
                    id="bpl"
                    checked={form.bpl}
                    onCheckedChange={(checked) => handleChange("bpl", !!checked)}
                  />
                  <Label htmlFor="bpl" className="text-sm cursor-pointer">
                    I hold a <span className="font-semibold text-foreground">BPL (Below Poverty Line)</span> card / certificate
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Treatment Details</Label>
                  <Textarea id="details" placeholder="Describe the medical condition and required treatment..." rows={4} value={form.details} onChange={e => handleChange("details", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Upload Documents</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Upload medical reports, income proof, etc.</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Estimated Treatment Cost (₹) *</Label>
                  <Input id="amount" type="number" placeholder="Enter amount in rupees" value={form.amount} onChange={e => handleChange("amount", e.target.value)} />
                </div>
                <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Eligibility...</> : <>Submit & Check Eligibility <ArrowRight className="w-5 h-5" /></>}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {result && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Your <span className="text-gradient-primary">Results</span>
              </h2>
              <EligibilityResults result={result} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GetHelpPage;
