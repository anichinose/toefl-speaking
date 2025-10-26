import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SampleResponseProps {
  response: string;
}

export default function SampleResponse({ response }: SampleResponseProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wordCount = response.split(/\s+/).length;

  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <Card className="p-4 bg-card" data-testid="card-sample-response">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold">Sample Response</h3>
          <Badge variant="outline" data-testid="badge-word-count">
            ~{wordCount} words
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between mb-2 hover-elevate"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="button-toggle-sample"
        >
          <span>{isExpanded ? "Hide" : "Show"} sample answer</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {isExpanded && (
          <div className="pt-2 border-t">
            <p className="font-serif text-sm leading-relaxed">{response}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
