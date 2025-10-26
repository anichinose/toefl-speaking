import CircularTimer from "../CircularTimer";

export default function CircularTimerExample() {
  return (
    <div className="p-8 bg-background flex justify-center">
      <CircularTimer
        seconds={12}
        totalSeconds={15}
        color="warning"
        label="Preparation Time"
      />
    </div>
  );
}
