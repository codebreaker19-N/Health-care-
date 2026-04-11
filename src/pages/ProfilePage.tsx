import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProfilePage = () => {
  const [uid, setUid] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [disease, setDisease] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      setUid(user.uid);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setFullName(data.fullName || "");
          setAge(data.age || "");
          setGender(data.gender || "");
          setCity(data.city || "");
          setDisease(data.disease || "");
          setIncomeRange(data.incomeRange || "");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uid) {
      toast.error("User not found");
      return;
    }

    try {
      await updateDoc(doc(db, "users", uid), {
        fullName,
        age,
        gender,
        city,
        disease,
        incomeRange,
      });

      toast.success("Profile saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save profile");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6">Complete Your Profile</h1>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Enter gender"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disease">Disease / Problem</Label>
                <Input
                  id="disease"
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                  placeholder="Enter disease or health problem"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incomeRange">Income Range</Label>
                <Input
                  id="incomeRange"
                  value={incomeRange}
                  onChange={(e) => setIncomeRange(e.target.value)}
                  placeholder="Example: Below 2 lakh"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Save Profile
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;