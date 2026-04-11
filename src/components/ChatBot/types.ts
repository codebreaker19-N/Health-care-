export type ChatStep =
  | "greeting"
  | "condition"
  | "age"
  | "gender"
  | "income"
  | "state"
  | "processing"
  | "results"
  | "contact";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: ChatOption[];
  chips?: string[];
  inputType?: "number";
  inputPlaceholder?: string;
  schemes?: SchemeResult[];
}

export interface ChatOption {
  label: string;
  value: string;
}

export interface SchemeResult{
  name: string;
  coverage: string;
  matchType: "emergency" | "strong" | "additional";
  reason: string;
  benefits: string[];
  documents: string[];
  applySteps: string[];
  applyUrl: string;
}

export interface UserProfile {
  condition: string;
  age: number;
  gender: string;
  income: string;
  state: string;
}
