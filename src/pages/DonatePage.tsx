import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const PATIENTS = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 8,
    location: "Jaipur, Rajasthan",
    condition: "Heart Surgery",
    details:
      "Priya needs an urgent open-heart surgery to correct a congenital defect. Her family cannot afford the treatment.",
    raised: 320000,
    goal: 500000,
    image:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    urgent: true,
  },
  {
    id: 2,
    name: "Ravi Kumar",
    age: 45,
    location: "Patna, Bihar",
    condition: "Kidney Transplant",
    details:
      "Ravi is a daily wage worker diagnosed with end-stage renal disease. He requires a kidney transplant to survive.",
    raised: 180000,
    goal: 800000,
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop",
    urgent: false,
  },
  {
    id: 3,
    name: "Meena Devi",
    age: 32,
    location: "Lucknow, UP",
    condition: "Cancer Treatment",
    details:
      "Meena has been diagnosed with stage-2 breast cancer. Early treatment can save her life but finances are a barrier.",
    raised: 450000,
    goal: 600000,
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
    urgent: true,
  },
  {
    id: 4,
    name: "Amit Verma",
    age: 12,
    location: "Bhopal, MP",
    condition: "Bone Marrow Transplant",
    details:
      "Amit suffers from thalassemia and needs a bone marrow transplant. His single mother works as a domestic helper.",
    raised: 120000,
    goal: 700000,
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    urgent: true,
  },
];

const DonatePage = () => {
  const isAuthenticated = true;
  const navigate = useNavigate();

  const [selectedPatient, setSelectedPatient] = useState<(typeof PATIENTS)[0] | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [donations, setDonations] = useState<Record<number, number>>({});

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleDonateClick = (patient: (typeof PATIENTS)[0]) => {
    if (!isAuthenticated) {
      toast.error("Please log in to donate", {
        description: "You need an account to make donations.",
      });
      navigate("/login");
      return;
    }

    setSelectedPatient(patient);
    setDonationAmount("");
    setSuccess(false);
  };

  const handleDonate = async () => {
    const amount = Number(donationAmount);

    if (!amount || amount < 100) {
      toast.error("Minimum donation amount is ₹100");
      return;
    }

    if (!selectedPatient) return;

    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    setSuccess(true);

    setDonations((prev) => ({
      ...prev,
      [selectedPatient.id]: (prev[selectedPatient.id] || 0) + amount,
    }));

    toast.success("Thank you for your contribution ❤️", {
      description: `₹${amount.toLocaleString()} donated to ${selectedPatient.name}`,
    });
  };

  const getPatientRaised = (patient: (typeof PATIENTS)[0]) =>
    patient.raised + (donations[patient.id] || 0);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Make a <span className="text-gradient-primary">Difference</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse verified cases and donate securely. Track the impact of every rupee you
              contribute.
            </p>
          </div>
        </section>

        {selectedPatient && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated border border-border animate-fade-up">
                <button
                  onClick={() => {
                    setSelectedPatient(null);
                    setSuccess(false);
                  }}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all cases
                </button>

                {success ? (
                  <div className="text-center py-8 space-y-4 animate-fade-up">
                    <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-secondary" />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground">
                      Thank you for your contribution ❤️
                    </h3>

                    <p className="text-muted-foreground">
                      Your donation of{" "}
                      <strong className="text-foreground">
                        ₹{Number(donationAmount).toLocaleString()}
                      </strong>{" "}
                      to <strong className="text-foreground">{selectedPatient.name}</strong> has
                      been recorded.
                    </p>

                    <p className="text-sm text-muted-foreground">
                      A confirmation receipt will be sent to your registered email.
                    </p>

                    <Button
                      variant="hero"
                      onClick={() => {
                        setSelectedPatient(null);
                        setSuccess(false);
                      }}
                    >
                      Browse More Cases
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-4 mb-6">
                      <img
                        src={selectedPatient.image}
                        alt={selectedPatient.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {selectedPatient.name}, {selectedPatient.age}
                        </h3>
                        <p className="text-sm text-muted-foreground">{selectedPatient.location}</p>
                        <Badge variant="secondary" className="mt-1">
                          {selectedPatient.condition}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedPatient.details}
                    </p>

                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Raised:{" "}
                          <strong className="text-foreground">
                            ₹{(getPatientRaised(selectedPatient) / 100000).toFixed(1)}L
                          </strong>
                        </span>
                        <span className="text-muted-foreground">
                          Goal:{" "}
                          <strong className="text-foreground">
                            ₹{(selectedPatient.goal / 100000).toFixed(1)}L
                          </strong>
                        </span>
                      </div>

                      <Progress
                        value={Math.min(
                          (getPatientRaised(selectedPatient) / selectedPatient.goal) * 100,
                          100
                        )}
                        className="h-3 transition-all duration-1000"
                      />
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-medium text-foreground">
                        Select or enter donation amount:
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {presetAmounts.map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setDonationAmount(String(amt))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 active:scale-95 ${
                              donationAmount === String(amt)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-foreground border-border hover:border-primary/50"
                            }`}
                          >
                            ₹{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>

                      <Input
                        type="number"
                        placeholder="Enter custom amount (₹)"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="text-lg"
                      />

                      <Button
                        variant="hope"
                        size="lg"
                        className="w-full"
                        onClick={handleDonate}
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Heart className="w-5 h-5" />
                            Donate
                            {donationAmount
                              ? ` ₹${Number(donationAmount).toLocaleString()}`
                              : " Now"}
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        🔒 This is a simulated payment for demonstration purposes. No real charges
                        will apply.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {!selectedPatient && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {PATIENTS.map((patient) => {
                  const raised = getPatientRaised(patient);
                  const percent = Math.min(Math.round((raised / patient.goal) * 100), 100);

                  return (
                    <div
                      key={patient.id}
                      className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={patient.image}
                          alt={patient.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {patient.urgent && (
                          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                            Urgent
                          </span>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {patient.name}, {patient.age}
                            </h3>
                            <p className="text-sm text-muted-foreground">{patient.location}</p>
                          </div>

                          <Badge variant="secondary">{patient.condition}</Badge>
                        </div>

                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {patient.details}
                        </p>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              Raised:{" "}
                              <strong className="text-foreground">
                                ₹{(raised / 100000).toFixed(1)}L
                              </strong>
                            </span>
                            <span className="text-muted-foreground">
                              Goal:{" "}
                              <strong className="text-foreground">
                                ₹{(patient.goal / 100000).toFixed(1)}L
                              </strong>
                            </span>
                          </div>

                          <Progress value={percent} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{percent}% funded</p>
                        </div>

                        <Button
                          variant="hope"
                          className="w-full mt-4"
                          onClick={() => handleDonateClick(patient)}
                        >
                          <Heart className="w-4 h-4" />
                          Donate to {patient.name.split(" ")[0]}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DonatePage;