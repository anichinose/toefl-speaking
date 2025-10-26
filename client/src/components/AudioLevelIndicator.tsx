interface AudioLevelIndicatorProps {
  level: number;
}

export default function AudioLevelIndicator({ level }: AudioLevelIndicatorProps) {
  const percentage = Math.min(100, (level / 120) * 100);
  const barCount = 10;
  const activeBars = Math.ceil((percentage / 100) * barCount);
  
  const getBarColor = (index: number) => {
    if (!activeBars || index >= activeBars) return 'bg-muted';
    
    if (index >= 7) return 'bg-red-500';
    if (index >= 4) return 'bg-pink-500';
    return 'bg-blue-400';
  };

  const getBarHeight = (index: number) => {
    const minHeight = 8;
    const maxHeight = 48;
    const heightIncrement = (maxHeight - minHeight) / (barCount - 1);
    return minHeight + (heightIncrement * index);
  };

  return (
    <div className="flex items-center justify-center gap-4" data-testid="audio-level-indicator">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Audio Level</span>
      <div className="flex items-end gap-1">
        {Array.from({ length: barCount }).map((_, index) => (
          <div
            key={index}
            className={`w-2 rounded-sm transition-all duration-100 ${getBarColor(index)}`}
            style={{ height: `${getBarHeight(index)}px` }}
          />
        ))}
      </div>
    </div>
  );
}
