interface CircularTimerProps {
  seconds: number;
  totalSeconds: number;
  color: "warning" | "destructive";
  label: string;
}

export default function CircularTimer({
  seconds,
  totalSeconds,
  color,
  label,
}: CircularTimerProps) {
  const percentage = (seconds / totalSeconds) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    warning: "text-blue-400 stroke-blue-400",
    destructive: "text-purple-500 stroke-purple-500",
  };

  return (
    <div className="flex flex-col items-center gap-2" data-testid="container-timer">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-muted fill-none"
            strokeWidth="6"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            className={`fill-none transition-all duration-1000 ease-linear ${colorClasses[color]}`}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-4xl font-bold tabular-nums ${colorClasses[color]}`} data-testid="text-seconds">
            {seconds}
          </span>
        </div>
      </div>
    </div>
  );
}
