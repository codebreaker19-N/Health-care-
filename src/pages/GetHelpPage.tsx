import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowRight } from "lucide-react";

const GetHelpPage = () => {
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
              Submit your medical request and we'll connect you with the right support — schemes, NGOs, or donors.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-soft border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Patient Request Form</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Age" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Medical Condition</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition type" />
                    </SelectTrigger>
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
                <div className="space-y-2">
                  <Label htmlFor="details">Treatment Details</Label>
                  <Textarea id="details" placeholder="Describe the medical condition and required treatment..." rows={4} />
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
                  <Label htmlFor="amount">Estimated Treatment Cost (₹)</Label>
                  <Input id="amount" type="number" placeholder="Enter amount in rupees" />
                </div>
                <Button variant="hero" size="lg" className="w-full">
                  Submit Request <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetHelpPage;
