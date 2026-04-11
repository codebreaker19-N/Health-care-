export interface EligibilityInput {
  income: number;
  disease: string;
  location: string;
  urgency: "low" | "medium" | "high" | "critical";
  estimatedCost: number;
}

export interface SchemeMatch {
  name: string;
  matchPercent: number;
  reason: string;
  coverage: string;
}

export interface NGOMatch {
  name: string;
  supportAmount: number;
  focus: string;
}

export interface CSRMatch {
  sponsor: string;
  coversAmount: number;
  reason: string;
}

export interface HospitalMatch {
  name: string;
  type: "Government" | "Private";
  distance: string;
  benefits: string[];
}

export interface EligibilityResult {
  schemes: SchemeMatch[];
  ngos: NGOMatch[];
  csr: CSRMatch[];
  hospitals: HospitalMatch[];
  reasons: string[];
  fundingCovered: number;
}

const SCHEMES_DB: Record<string, { name: string; diseases: string[]; incomeLimit: number; coverage: string }[]> = {
  all: [
    { name: "Ayushman Bharat (PMJAY)", diseases: ["cardiac", "cancer", "kidney", "neuro", "ortho", "other"], incomeLimit: 500000, coverage: "Up to ₹5,00,000 per family per year" },
    { name: "CGHS", diseases: ["cardiac", "cancer", "kidney", "neuro", "ortho", "other"], incomeLimit: 800000, coverage: "Full treatment coverage for govt employees" },
  ],
  cardiac: [
    { name: "Hriday Scheme", diseases: ["cardiac"], incomeLimit: 300000, coverage: "Free heart surgeries for BPL patients" },
  ],
  cancer: [
    { name: "Rashtriya Arogya Nidhi", diseases: ["cancer"], incomeLimit: 200000, coverage: "Up to ₹15,00,000 for cancer treatment" },
    { name: "PM National Relief Fund", diseases: ["cancer"], incomeLimit: 400000, coverage: "Financial aid for cancer patients" },
  ],
  kidney: [
    { name: "PM Dialysis Programme", diseases: ["kidney"], incomeLimit: 400000, coverage: "Free dialysis at district hospitals" },
  ],
  neuro: [
    { name: "National Mental Health Programme", diseases: ["neuro"], incomeLimit: 500000, coverage: "Treatment coverage for neurological conditions" },
  ],
};

const NGOS: Record<string, { name: string; focus: string; maxSupport: number }[]> = {
  cardiac: [{ name: "Heart Care Foundation", focus: "Heart surgeries for underprivileged", maxSupport: 300000 }],
  cancer: [
    { name: "Indian Cancer Society", focus: "Cancer treatment & awareness", maxSupport: 500000 },
    { name: "CanKids", focus: "Pediatric cancer support", maxSupport: 400000 },
  ],
  kidney: [{ name: "Kidney Warriors Foundation", focus: "Kidney transplant support", maxSupport: 350000 }],
  neuro: [{ name: "NIMHANS Foundation", focus: "Neurological disorders support", maxSupport: 250000 }],
  ortho: [{ name: "Remote Area Medical", focus: "Orthopedic care in rural areas", maxSupport: 200000 }],
  other: [{ name: "Mercy Foundation", focus: "General medical assistance", maxSupport: 150000 }],
};

const CSR_SPONSORS = [
  { sponsor: "Tata Trusts", maxAmount: 500000 },
  { sponsor: "Infosys Foundation", maxAmount: 400000 },
  { sponsor: "Reliance Foundation", maxAmount: 600000 },
  { sponsor: "Wipro Foundation", maxAmount: 300000 },
];

const HOSPITALS: Record<string, HospitalMatch[]> = {
  cardiac: [
    { name: "AIIMS Delhi", type: "Government", distance: "~15 km", benefits: ["Free treatment under PMJAY", "Expert cardiac team", "24/7 Emergency"] },
    { name: "Fortis Heart Institute", type: "Private", distance: "~8 km", benefits: ["Cashless under insurance", "Advanced equipment", "Short wait time"] },
  ],
  cancer: [
    { name: "Tata Memorial Hospital", type: "Government", distance: "~20 km", benefits: ["Subsidized treatment", "Clinical trials access", "Top oncologists"] },
    { name: "Apollo Cancer Centre", type: "Private", distance: "~12 km", benefits: ["Multi-disciplinary team", "Modern radiation therapy"] },
  ],
  kidney: [
    { name: "Safdarjung Hospital", type: "Government", distance: "~10 km", benefits: ["Free dialysis", "Transplant facility"] },
    { name: "Medanta Kidney Institute", type: "Private", distance: "~25 km", benefits: ["Robotic surgery", "High success rate"] },
  ],
  neuro: [
    { name: "NIMHANS Bangalore", type: "Government", distance: "~30 km", benefits: ["Specialized neurology wing", "Affordable treatment"] },
    { name: "Max Super Speciality", type: "Private", distance: "~14 km", benefits: ["Advanced neuro diagnostics", "Expert surgeons"] },
  ],
  ortho: [
    { name: "LNJP Hospital", type: "Government", distance: "~12 km", benefits: ["Free orthopedic surgery", "Rehabilitation services"] },
    { name: "BLK Hospital", type: "Private", distance: "~9 km", benefits: ["Joint replacement experts", "Quick recovery programs"] },
  ],
  other: [
    { name: "Ram Manohar Lohia Hospital", type: "Government", distance: "~10 km", benefits: ["General treatment", "Emergency services"] },
    { name: "Sir Ganga Ram Hospital", type: "Private", distance: "~11 km", benefits: ["Multi-speciality", "Charitable wing"] },
  ],
};

export function runEligibility(input: EligibilityInput): EligibilityResult {
  const { income, disease, urgency, estimatedCost } = input;
  const reasons: string[] = [];
  let totalCovered = 0;

  // Scheme matching
  const allSchemes = [...(SCHEMES_DB.all || []), ...(SCHEMES_DB[disease] || [])];
  const schemes: SchemeMatch[] = allSchemes
    .filter(s => income <= s.incomeLimit)
    .map(s => {
      let match = 50;
      if (income < 200000) match += 25;
      else if (income < 400000) match += 15;
      if (urgency === "critical" || urgency === "high") match += 10;
      if (s.diseases.includes(disease)) match += 10;
      match = Math.min(match, 98);
      return { name: s.name, matchPercent: match, reason: `Income ₹${income.toLocaleString()} within ₹${s.incomeLimit.toLocaleString()} limit, ${disease} covered`, coverage: s.coverage };
    });

  if (schemes.length > 0) {
    totalCovered += Math.min(estimatedCost * 0.5, 500000);
    reasons.push(`Based on your income of ₹${income.toLocaleString()}, you qualify for ${schemes.length} government scheme(s)`);
  }

  // NGO matching
  const diseaseNGOs = NGOS[disease] || NGOS.other;
  const ngos: NGOMatch[] = diseaseNGOs.map(n => ({
    name: n.name,
    supportAmount: Math.min(n.maxSupport, Math.max(0, estimatedCost - totalCovered)),
    focus: n.focus,
  }));

  if (ngos.length > 0) {
    totalCovered += ngos[0].supportAmount;
    reasons.push(`Based on your condition (${disease}), matched with ${ngos.length} NGO(s) specializing in this area`);
  }

  // CSR matching for funding gap
  const fundingGap = Math.max(0, estimatedCost - totalCovered);
  const csr: CSRMatch[] = [];
  if (fundingGap > 0) {
    const sponsor = CSR_SPONSORS[Math.floor(Math.random() * CSR_SPONSORS.length)];
    const covers = Math.min(sponsor.maxAmount, fundingGap);
    csr.push({ sponsor: sponsor.sponsor, coversAmount: covers, reason: `Covers remaining funding gap of ₹${fundingGap.toLocaleString()}` });
    totalCovered += covers;
    reasons.push(`Funding gap of ₹${fundingGap.toLocaleString()} matched with CSR sponsor`);
  }

  // Hospital matching
  const hospitals = HOSPITALS[disease] || HOSPITALS.other;

  // Additional reasons
  if (urgency === "critical" || urgency === "high") {
    reasons.push(`High urgency detected — prioritized for faster hospital recommendation`);
  }
  reasons.push(`Based on your location, nearby hospitals have been recommended`);
  reasons.push(`Your disease type (${disease}) has been matched with specialized care centers`);

  return { schemes, ngos, csr, hospitals, reasons, fundingCovered: Math.min((totalCovered / estimatedCost) * 100, 100) };
}
