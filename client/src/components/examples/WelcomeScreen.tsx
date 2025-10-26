import WelcomeScreen from "../WelcomeScreen";

export default function WelcomeScreenExample() {
  return (
    <WelcomeScreen
      onRequestPermission={() => console.log("Microphone permission requested")}
      hasPermission={false}
      permissionDenied={false}
    />
  );
}
