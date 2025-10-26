import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TranscriptionDisplayProps {
  transcription: string;
}

export default function TranscriptionDisplay({
  transcription,
}: TranscriptionDisplayProps) {
  const wordCount = transcription.trim() ? transcription.trim().split(/\s+/).length : 0;

  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <Card className="p-4 bg-card" data-testid="card-transcription">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold">Your Response</h3>
          {wordCount > 0 && (
            <Badge variant="outline" className="text-base px-3 py-1" data-testid="badge-transcription-word-count">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </Badge>
          )}
        </div>
        {transcription ? (
          <p className="text-sm leading-relaxed">{transcription}</p>
        ) : (
          <p className="text-muted-foreground italic text-sm">
            Transcription will appear here...
          </p>
        )}
      </Card>
    </div>
  );
}
