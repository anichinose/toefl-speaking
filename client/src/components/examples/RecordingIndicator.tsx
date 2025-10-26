import RecordingIndicator from "../RecordingIndicator";

export default function RecordingIndicatorExample() {
  return (
    <div className="p-8 bg-background flex justify-center">
      <RecordingIndicator isRecording={true} audioLevel={0.7} />
    </div>
  );
}
