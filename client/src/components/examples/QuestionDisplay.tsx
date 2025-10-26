import QuestionDisplay from "../QuestionDisplay";

export default function QuestionDisplayExample() {
  return (
    <div className="p-8 bg-background">
      <QuestionDisplay
        question="Some people prefer to study alone, while others prefer to study in groups. Which do you prefer and why?"
        category="Education"
        prominent={true}
      />
    </div>
  );
}
