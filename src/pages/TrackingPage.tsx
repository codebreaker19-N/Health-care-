import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingTimeline from "@/components/TrackingTimeline";

type ApplicantData = {
  name: string;
  scheme: string;
  applicationId: string;
  hospital: string;
  submittedOn: string;
  status: string;
};

const TrackingPage = () => {
  const [applicantData, setApplicantData] = useState<ApplicantData>({
    name: "",
    scheme: "Ayushman Bharat PM-JAY",
    applicationId: "AB-2026-01458",
    hospital: "AIIMS Delhi",
    submittedOn: "10 April 2026",
    status: "Documents Verified",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    let name = "User";

    // 🔥 Email ke hisaab se naam set karo
    if (email === "priya@gmail.com") {
      name = "Priya";
    } else if (email === "rahul@gmail.com") {
      name = "Rahul Kumar";
    } else if (email) {
      // fallback: email se naam nikaal lo
      name = email.split("@")[0];
    }

    setApplicantData((prev) => ({
      ...prev,
      name: name,
    }));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">

          <h1 className="text-4xl font-bold text-center mb-10">
            Track Your Application
          </h1>

          <div className="bg-card p-6 rounded-xl shadow">
            <p><b>Name:</b> {applicantData.name}</p>
            <p><b>Scheme:</b> {applicantData.scheme}</p>
            <p><b>ID:</b> {applicantData.applicationId}</p>
            <p><b>Hospital:</b> {applicantData.hospital}</p>
            <p><b>Status:</b> {applicantData.status}</p>
          </div>

          <TrackingTimeline />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackingPage;