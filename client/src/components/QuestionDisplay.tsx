import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface QuestionDisplayProps {
  question: string;
  category: string;
  prominent?: boolean;
}

export default function QuestionDisplay({
  question,
  category,
  prominent = true,
}: QuestionDisplayProps) {
  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <Card className="p-4 bg-card" data-testid="card-question">
        <p className="leading-relaxed text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
          {question}
        </p>
      </Card>
    </div>
  );
}
