import { CheckCircle, Clock, FileCheck, Building2, Banknote, CircleDot } from "lucide-react";

export type TrackingStep = {
  label: string;
  status: "completed" | "current" | "pending";
  icon: React.ReactNode;
};

const defaultSteps: TrackingStep[] = [
  { label: "Application Submitted", status: "completed", icon: <CheckCircle className="w-6 h-6" /> },
  { label: "Documents Verified", status: "current", icon: <FileCheck className="w-6 h-6" /> },
  { label: "Hospital Review", status: "pending", icon: <Building2 className="w-6 h-6" /> },
  { label: "Funding Approval", status: "pending", icon: <Banknote className="w-6 h-6" /> },
  { label: "Funds Released", status: "pending", icon: <CircleDot className="w-6 h-6" /> },
];

interface TrackingTimelineProps {
  steps?: TrackingStep[];
}

const statusColors = {
  completed: "text-secondary bg-secondary/15 border-secondary",
  current: "text-hope bg-hope/15 border-hope animate-pulse",
  pending: "text-muted-foreground bg-muted border-border",
};

const lineColors = {
  completed: "bg-secondary",
  current: "bg-hope",
  pending: "bg-border",
};

const TrackingTimeline = ({ steps = defaultSteps }: TrackingTimelineProps) => {
  const currentIdx = steps.findIndex(s => s.status === "current");
  const progressPercent = currentIdx >= 0 ? ((currentIdx) / (steps.length - 1)) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-cta transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-primary">{Math.round(progressPercent)}%</span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4 relative">
            {/* Vertical line */}
            {i < steps.length - 1 && (
              <div className={`absolute left-[19px] top-[40px] w-0.5 h-[calc(100%-8px)] ${lineColors[step.status]}`} />
            )}
            {/* Icon */}
            <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${statusColors[step.status]}`}>
              {step.icon}
            </div>
            {/* Label */}
            <div className="pb-8">
              <p className={`font-medium ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {step.status === "completed" && "✅ Completed"}
                {step.status === "current" && "⏳ In Progress"}
                {step.status === "pending" && "⬜ Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingTimeline;
