import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WelcomeScreenProps {
  onRequestPermission: () => void;
  hasPermission: boolean;
  permissionDenied: boolean;
}

export default function WelcomeScreen({
  onRequestPermission,
  hasPermission,
  permissionDenied,
}: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-2xl w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Mic className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
          TOEFL Speaking Practice
        </h1>

        <Badge className="mb-6" data-testid="badge-free">
          100% Free Practice
        </Badge>

        <p className="text-lg text-muted-foreground mb-2 leading-relaxed">
          Practice TOEFL Speaking Question 1 with realistic timers and instant feedback
        </p>

        {!hasPermission && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Requesting microphone access...</span>
          </div>
        )}
      </Card>
    </div>
  );
}
