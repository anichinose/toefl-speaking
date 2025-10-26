import { useState, useEffect } from "react";

interface RecordingIndicatorProps {
  isRecording: boolean;
  audioLevel?: number;
}

export default function RecordingIndicator({
  isRecording,
  audioLevel = 0.5,
}: RecordingIndicatorProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setPulse((p) => !p);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  if (!isRecording) return null;

  const bars = 20;
  const barHeights = Array.from({ length: bars }, (_, i) => {
    const position = i / bars;
    const wave = Math.sin(position * Math.PI * 2 + Date.now() / 200);
    return 20 + wave * audioLevel * 30;
  });

  return (
    <div className="flex items-center gap-2" data-testid="container-recording">
      <div
        className={`w-3 h-3 rounded-full bg-purple-500 transition-opacity duration-500 ${
          pulse ? "opacity-100" : "opacity-50"
        }`}
      />
      <span className="text-sm font-semibold text-purple-500 uppercase tracking-wider">
        Recording
      </span>
    </div>
  );
}
