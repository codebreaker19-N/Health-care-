export interface EligibilityInput {
  income: number;
  age: number;
  disease: string;
  areaType: "rural" | "urban" | "semi-urban";
  urgency: "low" | "medium" | "high" | "critical";
  state: string;
  bpl: boolean;
  estimatedCost: number;
}

export interface SchemeMatch {
  name: string;
  matchPercent: number;
  score: number;
  maxScore: number;
  reason: string;
  coverage: string;
  scoreBreakdown: string[];
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
  rejectedSchemes: { name: string; reason: string }[];
}

// --- SCHEME DATABASE ---

interface SchemeEntry {
  name: string;
  diseases: string[]; // exact matches; "all" = any disease
  incomeLimit: number; // max income allowed, 0 = no limit
  requiresBPL: boolean;
  ageMin: number;
  ageMax: number;
  area: "rural" | "urban" | "both";
  states: string[]; // empty = all india
  urgencySupport: boolean; // prioritises urgent cases
  coverage: string;
}

const SCHEMES: SchemeEntry[] = [
  {
    name: "Ayushman Bharat (PMJAY)",
    diseases: ["all"],
    incomeLimit: 500000,
    requiresBPL: false,
    ageMin: 0, ageMax: 100,
    area: "both",
    states: [],
    urgencySupport: true,
    coverage: "Up to ₹5,00,000 per family per year",
  },
  {
    name: "CGHS",
    diseases: ["all"],
    incomeLimit: 800000,
    requiresBPL: false,
    ageMin: 0, ageMax: 100,
    area: "urban",
    states: [],
    urgencySupport: false,
    coverage: "Full treatment coverage for govt employees",
  },
  {
    name: "Hriday Scheme",
    diseases: ["cardiac"],
    incomeLimit: 300000,
    requiresBPL: true,
    ageMin: 0, ageMax: 70,
    area: "both",
    states: [],
    urgencySupport: true,
    coverage: "Free heart surgeries for BPL patients",
  },
  {
    name: "Rashtriya Arogya Nidhi",
    diseases: ["cancer"],
    incomeLimit: 200000,
    requiresBPL: true,
    ageMin: 0, ageMax: 100,
    area: "both",
    states: [],
    urgencySupport: true,
    coverage: "Up to ₹15,00,000 for cancer treatment",
  },
  {
    name: "PM National Relief Fund",
    diseases: ["cancer", "cardiac", "kidney"],
    incomeLimit: 400000,
    requiresBPL: false,
    ageMin: 0, ageMax: 100,
    area: "both",
    states: [],
    urgencySupport: true,
    coverage: "Financial aid for critical illness patients",
  },
  {
    name: "PM Dialysis Programme",
    diseases: ["kidney"],
    incomeLimit: 400000,
    requiresBPL: false,
    ageMin: 18, ageMax: 75,
    area: "both",
    states: [],
    urgencySupport: false,
    coverage: "Free dialysis at district hospitals",
  },
  {
    name: "National Mental Health Programme",
    diseases: ["neuro"],
    incomeLimit: 500000,
    requiresBPL: false,
    ageMin: 5, ageMax: 80,
    area: "both",
    states: [],
    urgencySupport: false,
    coverage: "Treatment coverage for neurological conditions",
  },
  {
    name: "Mukhyamantri Amrutam (MA)",
    diseases: ["all"],
    incomeLimit: 400000,
    requiresBPL: true,
    ageMin: 0, ageMax: 100,
    area: "both",
    states: ["Gujarat"],
    urgencySupport: false,
    coverage: "Up to ₹5,00,000 for BPL families in Gujarat",
  },
  {
    name: "Aarogyasri (Telangana)",
    diseases: ["cardiac", "cancer", "kidney", "neuro", "ortho"],
    incomeLimit: 250000,
    requiresBPL: true,
    ageMin: 0, ageMax: 100,
    area: "both",
    states: ["Telangana"],
    urgencySupport: true,
    coverage: "Up to ₹2,00,000 for listed diseases",
  },
  {
    name: "MJPJAY (Maharashtra)",
    diseases: ["all"],
    incomeLimit: 100000,
    requiresBPL: true,
    ageMin: 0, ageMax: 100,
    area: "both",
    states: ["Maharashtra"],
    urgencySupport: false,
    coverage: "Up to ₹1,50,000 for BPL families in Maharashtra",
  },
  {
    name: "Chief Minister's Relief Fund",
    diseases: ["all"],
    incomeLimit: 600000,
    requiresBPL: false,
    ageMin: 0, ageMax: 100,
    area: "both",
    states: [],
    urgencySupport: true,
    coverage: "Emergency medical financial assistance",
  },
  {
    name: "RBSK (Rashtriya Bal Swasthya Karyakram)",
    diseases: ["all"],
    incomeLimit: 0,
    requiresBPL: false,
    ageMin: 0, ageMax: 18,
    area: "rural",
    states: [],
    urgencySupport: false,
    coverage: "Free healthcare screening & treatment for children 0-18",
  },
];

// --- SCORING ---

const MAX_SCORE = 19; // 4+3+3+2+2+3+2

interface ScoreResult {
  score: number;
  breakdown: string[];
  rejected: boolean;
  rejectReason: string;
}

function scoreScheme(scheme: SchemeEntry, input: EligibilityInput): ScoreResult {
  let score = 0;
  const breakdown: string[] = [];

  // --- Rejection checks first ---

  // Income rejection
  if (scheme.incomeLimit > 0 && input.income > scheme.incomeLimit) {
    return { score: 0, breakdown: [], rejected: true, rejectReason: `Income ₹${input.income.toLocaleString()} exceeds limit of ₹${scheme.incomeLimit.toLocaleString()}` };
  }

  // BPL rejection
  if (scheme.requiresBPL && !input.bpl) {
    return { score: 0, breakdown: [], rejected: true, rejectReason: "Scheme requires BPL status but applicant is not BPL" };
  }

  // Age rejection
  if (input.age < scheme.ageMin || input.age > scheme.ageMax) {
    return { score: 0, breakdown: [], rejected: true, rejectReason: `Age ${input.age} is outside allowed range (${scheme.ageMin}-${scheme.ageMax})` };
  }

  // State rejection
  if (scheme.states.length > 0 && !scheme.states.some(s => s.toLowerCase() === input.state.toLowerCase())) {
    return { score: 0, breakdown: [], rejected: true, rejectReason: `Scheme only available in ${scheme.states.join(", ")}; your state: ${input.state}` };
  }

  // --- Scoring ---

  // Disease match (+4 exact, +2 general)
  if (scheme.diseases.includes(input.disease)) {
    score += 4;
    breakdown.push(`Disease match (exact): +4`);
  } else if (scheme.diseases.includes("all")) {
    score += 2;
    breakdown.push(`Disease match (general support): +2`);
  }

  // Income match (+3)
  if (scheme.incomeLimit === 0 || input.income <= scheme.incomeLimit) {
    score += 3;
    breakdown.push(`Income within range: +3`);
  }

  // BPL match (+3)
  if (scheme.requiresBPL && input.bpl) {
    score += 3;
    breakdown.push(`BPL status matched: +3`);
  }

  // Area match (+2 exact, +1 both)
  const areaInput = input.areaType === "semi-urban" ? "urban" : input.areaType;
  if (scheme.area === areaInput) {
    score += 2;
    breakdown.push(`Area type match (exact): +2`);
  } else if (scheme.area === "both") {
    score += 1;
    breakdown.push(`Area type supported (both): +1`);
  }

  // Age match (+2)
  if (input.age >= scheme.ageMin && input.age <= scheme.ageMax) {
    score += 2;
    breakdown.push(`Age within range (${scheme.ageMin}-${scheme.ageMax}): +2`);
  }

  // State match (+3 exact, +1 all india)
  if (scheme.states.length > 0 && scheme.states.some(s => s.toLowerCase() === input.state.toLowerCase())) {
    score += 3;
    breakdown.push(`State match (exact): +3`);
  } else if (scheme.states.length === 0) {
    score += 1;
    breakdown.push(`All India scheme: +1`);
  }

  // Urgency match (+2)
  if (scheme.urgencySupport && (input.urgency === "high" || input.urgency === "critical")) {
    score += 2;
    breakdown.push(`Urgency support available: +2`);
  }

  return { score, breakdown, rejected: false, rejectReason: "" };
}

// --- NGO / CSR / HOSPITAL DATA ---

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

// --- MAIN ENGINE ---

export function runEligibility(input: EligibilityInput): EligibilityResult {
  const { disease, estimatedCost } = input;
  const reasons: string[] = [];
  let totalCovered = 0;

  // Score all schemes
  const scoredSchemes: SchemeMatch[] = [];
  const rejectedSchemes: { name: string; reason: string }[] = [];

  for (const scheme of SCHEMES) {
    const result = scoreScheme(scheme, input);
    if (result.rejected) {
      rejectedSchemes.push({ name: scheme.name, reason: result.rejectReason });
    } else if (result.score > 0) {
      const matchPercent = Math.round((result.score / MAX_SCORE) * 100);
      scoredSchemes.push({
        name: scheme.name,
        matchPercent,
        score: result.score,
        maxScore: MAX_SCORE,
        reason: result.breakdown.join(" | "),
        coverage: scheme.coverage,
        scoreBreakdown: result.breakdown,
      });
    }
  }

  // Sort by score descending
  scoredSchemes.sort((a, b) => b.score - a.score);

  if (scoredSchemes.length > 0) {
    totalCovered += Math.min(estimatedCost * 0.5, 500000);
    reasons.push(`Based on your income of ₹${input.income.toLocaleString()}, age ${input.age}, and ${input.bpl ? "BPL" : "non-BPL"} status, you qualify for ${scoredSchemes.length} government scheme(s)`);
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

  // CSR matching
  const fundingGap = Math.max(0, estimatedCost - totalCovered);
  const csr: CSRMatch[] = [];
  if (fundingGap > 0) {
    const sponsor = CSR_SPONSORS[Math.floor(Math.random() * CSR_SPONSORS.length)];
    const covers = Math.min(sponsor.maxAmount, fundingGap);
    csr.push({ sponsor: sponsor.sponsor, coversAmount: covers, reason: `Covers remaining funding gap of ₹${fundingGap.toLocaleString()}` });
    totalCovered += covers;
    reasons.push(`Funding gap of ₹${fundingGap.toLocaleString()} matched with CSR sponsor`);
  }

  // Hospitals
  const hospitals = HOSPITALS[disease] || HOSPITALS.other;

  // Additional reasons
  if (input.urgency === "critical"|| input.urgency === "high") {
    reasons.push(`High urgency detected — prioritized for faster hospital recommendation`);
  }
  if (input.bpl) {
    reasons.push(`BPL status verified — eligible for additional subsidized schemes`);
  }
  reasons.push(`Area type (${input.areaType}) and state (${input.state}) factored into matching`);
  reasons.push(`Your disease type (${disease}) has been matched with specialized care centers`);

  if (rejectedSchemes.length > 0) {
    reasons.push(`${rejectedSchemes.length} scheme(s) were excluded due to eligibility criteria mismatch`);
  }

  return {
    schemes: scoredSchemes,
    ngos,
    csr,
    hospitals,
    reasons,
    fundingCovered: estimatedCost > 0 ? Math.min((totalCovered / estimatedCost) * 100, 100) : 0,
    rejectedSchemes,
  };
}
