import { EligibilityResult } from "@/lib/eligibility-engine";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2, Heart, Briefcase, Lightbulb, MapPin, Star, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import TrackingTimeline from "./TrackingTimeline";
import { useState } from "react";

interface Props {
  result: EligibilityResult;
}

const EligibilityResults = ({ result }: Props) => {
  const [showRejected, setShowRejected] = useState(false);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Funding Coverage */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-hope" /> Overall Funding Coverage
        </h3>
        <Progress value={result.fundingCovered} className="h-3 mb-2" />
        <p className="text-sm text-muted-foreground">{Math.round(result.fundingCovered)}% of estimated cost covered</p>
      </div>

      {/* Schemes */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" /> 🏥 Government Schemes
        </h3>
        {result.schemes.length === 0 ? (
          <p className="text-muted-foreground text-sm">No matching schemes found based on your profile.</p>
        ) : (
          <div className="space-y-4">
            {result.schemes.map((s, i) => (
              <div key={i} className="bg-accent/30 rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{s.name}</h4>
                  <Badge variant="secondary" className="text-xs">{s.matchPercent}% Match ({s.score}/{s.maxScore})</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{s.coverage}</p>
                {/* Score breakdown */}
                <div className="bg-background/50 rounded-lg p-3 border border-border">
                  <p className="text-xs font-medium text-foreground mb-1">Score Breakdown:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.scoreBreakdown.map((b, j) => (
                      <Badge key={j} variant="outline" className="text-xs font-normal">{b}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rejected Schemes */}
      {result.rejectedSchemes.length > 0 && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
          <button
            className="w-full flex items-center justify-between text-left"
            onClick={() => setShowRejected(!showRejected)}
          >
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" /> ❌ Excluded Schemes ({result.rejectedSchemes.length})
            </h3>
            {showRejected ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
          {showRejected && (
            <div className="space-y-2 mt-4">
              {result.rejectedSchemes.map((r, i) => (
                <div key={i} className="bg-destructive/5 rounded-lg p-3 border border-destructive/20">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NGOs */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-hope" /> 🤝 NGO Support
        </h3>
        <div className="space-y-3">
          {result.ngos.map((n, i) => (
            <div key={i} className="bg-accent/30 rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-foreground">{n.name}</h4>
              <p className="text-sm text-muted-foreground">{n.focus}</p>
              <p className="text-sm font-medium text-secondary mt-1">Support: ₹{n.supportAmount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSR */}
      {result.csr.length > 0 && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-trust" /> 🏢 CSR Sponsors
          </h3>
          {result.csr.map((c, i) => (
            <div key={i} className="bg-accent/30 rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-foreground">{c.sponsor}</h4>
              <p className="text-sm text-muted-foreground">{c.reason}</p>
              <p className="text-sm font-medium text-primary mt-1">Covers: ₹{c.coversAmount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hospitals */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-destructive" /> 🏥 Recommended Hospitals
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.hospitals.map((h, i) => (
            <div key={i} className="bg-accent/30 rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{h.name}</h4>
                <Badge variant={h.type === "Government" ? "default" : "outline"} className="text-xs">{h.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">📍 {h.distance}</p>
              <ul className="space-y-1">
                {h.benefits.map((b, j) => (
                  <li key={j} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-secondary shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-hope" /> 🧠 Why This Match
        </h3>
        <ul className="space-y-2">
          {result.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold mt-0.5">•</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Tracking */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h3 className="text-lg font-bold text-foreground mb-4">📍 Application Tracking</h3>
        <TrackingTimeline />
      </div>
    </div>
  );
};

export default EligibilityResults;
