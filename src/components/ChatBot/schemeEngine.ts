import { SchemeResult, UserProfile } from "./types";

const STATE_PORTALS: Record<string, { name: string; url: string; coverage: string }> = {
  "Gujarat": { name: "Mukhyamantri Amrutam (MA)", url: "https://ma.gujarat.gov.in", coverage: "Up to ₹5,00,000/year" },
  "Maharashtra": { name: "Mahatma Jyotiba Phule Jan Arogya Yojana", url: "https://www.jeevandayee.gov.in", coverage: "Up to ₹2,50,000" },
  "Tamil Nadu": { name: "Chief Minister's Comprehensive Health Insurance", url: "https://www.cmchistn.com", coverage: "Up to ₹5,00,000" },
  "Kerala": { name: "Karunya Health Scheme", url: "https://dhs.kerala.gov.in", coverage: "Up to ₹2,00,000" },
  "Rajasthan": { name: "Chiranjeevi Swasthya Bima Yojana", url: "https://chiranjeevi.rajasthan.gov.in", coverage: "Up to ₹25,00,000" },
  "Karnataka": { name: "Yeshasvini Co-operative Farmers Health Scheme", url: "https://yeshasvini.karnataka.gov.in", coverage: "Up to ₹5,00,000" },
  "West Bengal": { name: "Swasthya Sathi", url: "https://swasthyasathi.gov.in", coverage: "Up to ₹5,00,000/year" },
  "Andhra Pradesh": { name: "Dr. YSR Aarogyasri", url: "https://www.aarogyasri.telangana.gov.in", coverage: "Up to ₹5,00,000" },
  "Telangana": { name: "Aarogyasri Health Care Trust", url: "https://www.aarogyasri.telangana.gov.in", coverage: "Up to ₹5,00,000" },
  "Uttar Pradesh": { name: "Mukhyamantri Jan Arogya Yojana", url: "https://ayushmanup.upcms.nic.in", coverage: "Up to ₹5,00,000" },
  "Delhi": { name: "Delhi Arogya Kosh", url: "https://health.delhi.gov.in", coverage: "Up to ₹5,00,000" },
};

const PMJAY_DOCS = ["Aadhaar Card", "Ration Card (BPL/SECC)", "Income Certificate", "Hospital referral letter"];
const PMJAY_STEPS = [
  "Visit your nearest Ayushman Bharat Kendra or CSC center",
  "Carry your Aadhaar and Ration Card",
  "Get your eligibility verified",
  "Receive your Ayushman Bharat e-card",
  "Visit any empanelled hospital for cashless treatment",
];

export function matchSchemes(profile: UserProfile): SchemeResult[] {
  const results: SchemeResult[] = [];
  const incomeValue = parseIncomeValue(profile.income);

  // Emergency option for heart/cancer conditions
  if (profile.condition === "Heart ❤️" || profile.condition === "Cancer 🧬") {
    results.push({
      name: "🚨 Emergency Medical Support",
      coverage: "Immediate referral",
      matchType: "emergency",
      reason: `Your condition (${profile.condition.replace(/[❤️🧬🏥]/g, "").trim()}) may require urgent care. Emergency support is available.`,
      benefits: ["Priority processing", "Emergency ward access", "Immediate cashless treatment at government hospitals"],
      documents: ["Aadhaar Card", "Medical emergency report"],
      applySteps: ["Call 108 for ambulance", "Visit nearest government hospital emergency", "Show Aadhaar for registration"],
      applyUrl: "https://www.nhp.gov.in/helpline",
    });
  }

  // PM-JAY
  if (incomeValue <= 500000) {
    results.push({
      name: "Ayushman Bharat (PM-JAY)",
      coverage: "₹5,00,000/year per family",
      matchType: "strong",
      reason: `Your annual income (${profile.income}) qualifies you for India's largest health assurance scheme covering 1,950+ procedures.`,
      benefits: [
        "Cashless & paperless treatment",
        "Covers 1,950+ procedures",
        "No cap on family size",
        "Pre & post hospitalization covered",
        "24,000+ empanelled hospitals",
      ],
      documents: PMJAY_DOCS,
      applySteps: PMJAY_STEPS,
      applyUrl: "https://pmjay.gov.in",
    });
  }

  // RSBY for very low income
  if (incomeValue <= 100000) {
    results.push({
      name: "Rashtriya Swasthya Bima Yojana (RSBY)",
      coverage: "₹30,000/year per family",
      matchType: "additional",
      reason: "As a below poverty line family, you qualify for additional coverage under RSBY for hospitalization.",
      benefits: ["Cashless hospitalization", "Coverage for family of 5", "Smart card based", "Transport allowance ₹100/visit"],
      documents: ["BPL Card", "Aadhaar Card", "Family photo"],
      applySteps: ["Visit nearest enrollment station", "Carry BPL card and Aadhaar", "Get biometric registration", "Receive RSBY smart card"],
      applyUrl: "https://labour.gov.in/insurance-and-social-security",
    });
  }

  // State scheme
  const stateScheme = STATE_PORTALS[profile.state];
  if (stateScheme) {
    results.push({
      name: stateScheme.name,
      coverage: stateScheme.coverage,
      matchType: "additional",
      reason: `As a resident of ${profile.state}, you can access this state-specific health scheme for additional coverage.`,
      benefits: ["State government backed", "Cashless treatment at empanelled hospitals", "Covers major surgeries & treatments"],
      documents: ["Aadhaar Card", "State domicile certificate", "Income certificate", "Hospital referral"],
      applySteps: [`Visit ${profile.state} health department office`, "Submit application with documents", "Verification by state authority", "Receive health card"],
      applyUrl: stateScheme.url,
    });
  }

  // If no results, add general guidance
  if (results.length === 0) {
    results.push({
      name: "General Healthcare Assistance",
      coverage: "Varies",
      matchType: "additional",
      reason: "Based on your profile, we recommend contacting your district hospital for available support programs.",
      benefits: ["Government hospital subsidies", "District health officer guidance", "NGO referral support"],
      documents: ["Aadhaar Card", "Any income proof"],
      applySteps: ["Visit your district hospital", "Meet the medical social worker", "They will guide you to available schemes"],
      applyUrl: "https://www.nhp.gov.in",
    });
  }

  return results;
}

function parseIncomeValue(income: string): number {
  switch (income) {
    case "Below ₹1 Lakh": return 80000;
    case "₹1–3 Lakh": return 200000;
    case "₹3–5 Lakh": return 400000;
    case "₹5–10 Lakh": return 750000;
    case "Above ₹10 Lakh": return 1200000;
    default: return 500000;
  }
}
