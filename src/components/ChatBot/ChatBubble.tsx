import { ChatMessage } from "./types";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Props {
  message: ChatMessage;
  onOption?: (value: string) => void;
  onChip?: (value: string) => void;
  onInput?: (value: string) => void;
}

const MATCH_STYLES = {
  emergency: "border-destructive/40 bg-destructive/5",
  strong: "border-secondary/40 bg-secondary/5",
  additional: "border-primary/40 bg-primary/5",
};

const MATCH_LABELS = {
  emergency: "🚨 Emergency",
  strong: "⭐ Strong Match",
  additional: "📋 Additional Support",
};

const ChatBubble = ({ message, onOption, onChip, onInput }: Props) => {
  const isBot = message.sender === "bot";
  const [inputVal, setInputVal] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  const handleRedirect = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} animate-fade-up`}>
      <div className={`max-w-[85%] space-y-3`}>
        {/* Text bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isBot
              ? "bg-accent text-accent-foreground rounded-tl-sm"
              : "bg-primary text-primary-foreground rounded-tr-sm"
          }`}
        >
          {message.text}
        </div>

        {/* Option buttons */}
        {message.options && onOption && (
          <div className="flex flex-wrap gap-2">
            {message.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onOption(opt.value)}
                className="px-4 py-2 text-sm font-medium rounded-full border border-primary/30 bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* State chips */}
        {message.chips && onChip && (
          <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
            {message.chips.map((chip) => (
              <button
                key={chip}
                onClick={() => onChip(chip)}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Number input */}
        {message.inputType === "number" && onInput && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputVal.trim()) {
                onInput(inputVal.trim());
                setInputVal("");
              }
            }}
            className="flex gap-2"
          >
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={message.inputPlaceholder || "Enter your value"}
              className="flex-1 rounded-full border border-border bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </form>
        )}

        {/* Scheme results */}
        {message.schemes && message.schemes.length > 0 && (
          <div className="space-y-3">
            {message.schemes.map((scheme, i) => (
              <div
                key={i}
                className={`rounded-xl border-2 p-4 space-y-3 ${MATCH_STYLES[scheme.matchType]}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {MATCH_LABELS[scheme.matchType]}
                    </span>
                    <h4 className="font-bold text-foreground text-sm mt-0.5">{scheme.name}</h4>
                  </div>
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full whitespace-nowrap">
                    {scheme.coverage}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">{scheme.reason}</p>

                {/* Benefits */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-foreground">Benefits:</p>
                  <ul className="space-y-0.5">
                    {scheme.benefits.map((b, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-secondary mt-0.5">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable docs & steps */}
                <button
                  onClick={() => toggleExpand(i)}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  {expanded[i] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  Documents & How to Apply
                </button>

                {expanded[i] && (
                  <div className="space-y-3 animate-fade-up">
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">📄 Documents Needed:</p>
                      <ul className="space-y-0.5">
                        {scheme.documents.map((d, j) => (
                          <li key={j} className="text-xs text-muted-foreground">• {d}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">📝 How to Apply:</p>
                      <ol className="space-y-0.5">
                        {scheme.applySteps.map((s, j) => (
                          <li key={j} className="text-xs text-muted-foreground">
                            {j + 1}. {s}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}

                {/* Apply Now CTA */}
                <button
                  onClick={() => handleRedirect(scheme.applyUrl)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Apply Now <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
