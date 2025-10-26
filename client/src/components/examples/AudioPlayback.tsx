import AudioPlayback from "../AudioPlayback";

export default function AudioPlaybackExample() {
  const dummyAudioUrl = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
  
  return (
    <div className="p-8 bg-background max-w-3xl">
      <AudioPlayback audioUrl={dummyAudioUrl} />
    </div>
  );
}
