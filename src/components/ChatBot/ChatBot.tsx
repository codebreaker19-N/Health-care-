import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import ChatBubble from "./ChatBubble";
import { ChatMessage, ChatStep, UserProfile } from "./types";
import { matchSchemes } from "./schemeEngine";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

let msgId = 0;
const newId = () => `msg-${++msgId}`;

const TypingIndicator = () => (
  <div className="flex justify-start animate-fade-up">
    <div className="bg-accent rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
    </div>
  </div>
);

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<ChatStep>("greeting");
  const [typing, setTyping] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 100);
  };

  const addBotMessage = useCallback((msg: Omit<ChatMessage, "id" | "sender">, delay = 800) => {
    setTyping(true);
    scrollToBottom();
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { ...msg, id: newId(), sender: "bot" }]);
      scrollToBottom();
    }, delay);
  }, []);

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: newId(), sender: "user", text }]);
    scrollToBottom();
  };

  // Initialize greeting
  useEffect(() => {
    if (open && !initialized.current) {
      initialized.current = true;
      addBotMessage({ text: "Namaste! 🙏 I'm Arogyabandhu, your healthcare scheme assistant.\n\nI'll help you find the best government healthcare support." }, 500);
      setTimeout(() => {
        addBotMessage({
          text: "What medical condition are you seeking help for?",
          options: [
            { label: "Heart ❤️", value: "Heart ❤️" },
            { label: "Cancer 🧬", value: "Cancer 🧬" },
            { label: "Surgery 🏥", value: "Surgery 🏥" },
            { label: "Other", value: "Other" },
          ],
        }, 600);
        setStep("condition");
      }, 1600);
    }
  }, [open, addBotMessage]);

  const handleOption = (value: string) => {
    if (step === "condition") {
      addUserMessage(value);
      setProfile((p) => ({ ...p, condition: value }));
      addBotMessage({
        text: "Got it. What is the patient's age?",
        inputType: "number",
        inputPlaceholder: "Enter age (e.g. 45)",
      });
      setStep("age");
    } else if (step === "gender") {
      addUserMessage(value);
      setProfile((p) => ({ ...p, gender: value }));
      addBotMessage({
        text: "What is your annual household income?",
        options: [
          { label: "Below ₹1 Lakh", value: "Below ₹1 Lakh" },
          { label: "₹1–3 Lakh", value: "₹1–3 Lakh" },
          { label: "₹3–5 Lakh", value: "₹3–5 Lakh" },
          { label: "₹5–10 Lakh", value: "₹5–10 Lakh" },
          { label: "Above ₹10 Lakh", value: "Above ₹10 Lakh" },
        ],
      });
      setStep("income");
    } else if (step === "income") {
      addUserMessage(value);
      setProfile((p) => ({ ...p, income: value }));
      addBotMessage({
        text: "Which state do you reside in?",
        chips: INDIAN_STATES,
      });
      setStep("state");
    }
  };

  const handleChip = (value: string) => {
    if (step === "state") {
      addUserMessage(value);
      setProfile((p) => ({ ...p, state: value }));
      processResults({ ...profile, state: value } as UserProfile);
    }
  };

  const handleInput = (value: string) => {
    if (step === "age") {
      const age = parseInt(value);
      if (isNaN(age) || age < 0 || age > 120) {
        addBotMessage({ text: "Please enter a valid age (0–120).", inputType: "number", inputPlaceholder: "Enter age" });
        return;
      }
      addUserMessage(`${age} years`);
      setProfile((p) => ({ ...p, age }));
      addBotMessage({
        text: "What is the patient's gender?",
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ],
      });
      setStep("gender");
    }
  };

  const processResults = (fullProfile: UserProfile) => {
    setStep("processing");
    addBotMessage({ text: "⏳ Analyzing your profile and matching schemes..." }, 500);

    setTimeout(() => {
      const schemes = matchSchemes(fullProfile);
      addBotMessage({
        text: "✅ Your Scheme Matches",
        schemes,
      }, 800);

      setTimeout(() => {
        addBotMessage({
          text: "Clicking 'Apply Now' will redirect you to the official government website.\n\nStill need help?",
          options: [
            { label: "📞 Contact Support", value: "contact" },
            { label: "🔄 Start Over", value: "restart" },
          ],
        }, 600);
        setStep("results");
      }, 1600);
    }, 2000);
  };

  const handleResultOption = (value: string) => {
    if (value === "contact") {
      addUserMessage("Contact Support");
      addBotMessage({
        text: "📧 Email: support@arogyabandhu.org\n📞 Helpline: +91 1800-XXX-XXXX (Toll Free)\n\nOur team is available Mon–Sat, 9 AM – 6 PM IST.\n\nWe're here to help! 💙",
      });
      setStep("contact");
    } else if (value === "restart") {
      addUserMessage("Start Over");
      setProfile({});
      initialized.current = false;
      setMessages([]);
      setStep("greeting");
      setTimeout(() => {
        initialized.current = true;
        addBotMessage({ text: "Namaste! 🙏 Let's find the right healthcare support for you." }, 300);
        setTimeout(() => {
          addBotMessage({
            text: "What medical condition are you seeking help for?",
            options: [
              { label: "Heart ❤️", value: "Heart ❤️" },
              { label: "Cancer 🧬", value: "Cancer 🧬" },
              { label: "Surgery 🏥", value: "Surgery 🏥" },
              { label: "Other", value: "Other" },
            ],
          }, 400);
          setStep("condition");
        }, 800);
      }, 200);
    }
  };

  // Route option handler based on step
  const routeOption = (value: string) => {
    if (step === "results" || step === "contact") {
      handleResultOption(value);
    } else {
      handleOption(value);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          open ? "bg-destructive text-destructive-foreground rotate-90" : "bg-primary text-primary-foreground hover:scale-110"
        }`}
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl border border-border bg-background flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg">🏥</div>
            <div>
              <h3 className="font-bold text-sm">Arogyabandhu Assistant</h3>
              <p className="text-[10px] opacity-80">Healthcare Scheme Finder</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                onOption={routeOption}
                onChip={handleChip}
                onInput={handleInput}
              />
            ))}
            {typing && <TypingIndicator />}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-border bg-muted/30 shrink-0">
            <p className="text-[10px] text-muted-foreground text-center">
              Powered by Arogyabandhu • Select an option above to continue
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
