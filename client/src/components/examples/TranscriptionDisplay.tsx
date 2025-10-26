import TranscriptionDisplay from "../TranscriptionDisplay";

export default function TranscriptionDisplayExample() {
  return (
    <div className="p-8 bg-background max-w-3xl">
      <TranscriptionDisplay transcription="I prefer studying in groups because it helps me understand concepts better when my classmates explain things in different ways. Also, group study keeps me more accountable and motivated to actually prepare for our sessions." />
    </div>
  );
}
