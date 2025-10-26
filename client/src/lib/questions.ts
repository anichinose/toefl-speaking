import { type Question } from "@shared/schema";

export const toeflQuestions: Question[] = [
  {
    id: "1",
    category: "Education",
    text: "Some people prefer to study alone, while others prefer to study in groups. Which do you prefer and why?",
    sampleResponse: "I strongly prefer studying in groups for two main reasons. First, group study sessions expose me to different perspectives and approaches to problem-solving. When my classmates explain concepts in their own words, I often understand the material better than when reading it alone. For instance, during my chemistry course, a study partner's explanation of molecular bonds finally made the concept click for me. Second, studying with others keeps me accountable and motivated. It's easy to procrastinate when studying alone, but when I've committed to meeting my study group, I'm much more likely to actually prepare and stay focused. The social aspect also makes studying more enjoyable and less isolating, which helps me maintain consistent study habits throughout the semester.",
  },
  {
    id: "2",
    category: "Technology",
    text: "Do you agree or disagree with the following statement: Technology has made our lives more complicated rather than simpler.",
    sampleResponse: "I disagree that technology has made our lives more complicated. In fact, I believe it has simplified many aspects of daily life for two key reasons. First, technology has streamlined communication and information access tremendously. Instead of writing letters or making phone calls during specific hours, I can now instantly message anyone worldwide and access any information within seconds. This efficiency saves countless hours that previous generations spent on basic tasks. Second, technology automates repetitive and time-consuming activities, freeing us for more meaningful pursuits. For example, online banking eliminates trips to physical banks, and navigation apps prevent getting lost in unfamiliar areas. While there's a learning curve with new technologies, the long-term benefits of automation and instant connectivity far outweigh any temporary complexity.",
  },
  {
    id: "3",
    category: "Career",
    text: "Is it better to have a job that pays well or a job that you enjoy? Explain your position.",
    sampleResponse: "I believe having a job you enjoy is more important than high pay for two compelling reasons. First, we spend the majority of our waking hours at work, so job satisfaction directly impacts our overall quality of life and mental health. When I genuinely enjoy my work, I feel energized and fulfilled rather than counting down the hours until I can leave. This positive mindset extends to my personal life, making me happier overall. Second, passion for your work often leads to better performance and eventual career advancement anyway. When you love what you do, you're naturally more motivated to improve your skills and go the extra mile. This dedication typically results in promotions and recognition over time. While financial stability is important, earning slightly less while doing something you're passionate about creates a more sustainable and rewarding career path in the long run.",
  },
  {
    id: "4",
    category: "Lifestyle",
    text: "Some people prefer to live in a big city, while others prefer to live in a small town. Which do you prefer and why?",
    sampleResponse: "I prefer living in a big city for two important reasons. First, cities offer unparalleled access to diverse opportunities and experiences. Whether it's career options, cultural events, restaurants, or entertainment, cities provide variety that simply isn't available in small towns. For example, I can attend concerts, visit museums, or try cuisines from around the world all within my neighborhood. This exposure to different cultures and ideas has broadened my perspective significantly. Second, cities have better public infrastructure and services. Public transportation means I don't need a car, and world-class hospitals, universities, and specialized services are readily available. While small towns offer peace and close-knit communities, the convenience, diversity, and opportunities that cities provide align better with my lifestyle and personal growth goals.",
  },
  {
    id: "5",
    category: "Education",
    text: "Do you think students should be required to take classes outside their major field of study? Why or why not?",
    sampleResponse: "Yes, I strongly believe students should take classes outside their major for two significant reasons. First, interdisciplinary knowledge fosters creativity and innovation by connecting ideas from different fields. Some of the greatest breakthroughs occur when people apply concepts from one discipline to another. For instance, Steve Jobs credited his calligraphy class with influencing Apple's focus on beautiful typography and design. Exposure to diverse subjects helps students think more creatively and approach problems from multiple angles. Second, broad education develops well-rounded individuals who can communicate and collaborate across disciplines. In today's interconnected workplace, engineers need to understand business, artists benefit from technology knowledge, and everyone gains from studying humanities. These diverse perspectives make graduates more adaptable and valuable in an increasingly complex world where problems rarely fit neatly into a single academic department.",
  },
  {
    id: "6",
    category: "Social",
    text: "Is it better to have a few close friends or many casual acquaintances? Explain your preference.",
    sampleResponse: "I believe having a few close friends is far more valuable than many casual acquaintances for two key reasons. First, deep friendships provide genuine emotional support and trust that casual relationships simply cannot offer. When facing personal challenges or celebrating achievements, close friends understand your history and can provide meaningful advice and empathy. During a difficult period last year, my two best friends were invaluable sources of support in ways that dozens of acquaintances could never match. Second, maintaining quality friendships requires time and energy, and spreading yourself too thin across many casual connections prevents forming truly meaningful bonds. Close friendships develop through shared experiences, vulnerability, and consistent effort over time. While having a large social network might seem appealing, the depth of connection, loyalty, and understanding that comes from a few close friendships creates more fulfilling and lasting relationships.",
  },
  {
    id: "7",
    category: "Learning",
    text: "Some people think it's better to learn from mistakes, while others think it's better to learn from success. Which approach do you prefer?",
    sampleResponse: "I believe learning from mistakes is more valuable than learning from success for two important reasons. First, mistakes create stronger, more memorable learning experiences because they involve emotional engagement and problem-solving. When something goes wrong, I'm forced to analyze what happened and actively work to improve, which creates deeper understanding than simply repeating what worked. For example, after failing my first programming assignment, I learned debugging skills that became fundamental to my success. Second, mistakes reveal our weaknesses and blind spots that success often masks. Success can make us overconfident and prevent us from seeing areas that need improvement. Failures, however uncomfortable, highlight exactly where we need to focus our development efforts. While success is certainly enjoyable and provides positive reinforcement, the growth and resilience that come from analyzing and overcoming mistakes ultimately lead to greater long-term achievement and personal development.",
  },
  {
    id: "8",
    category: "Time Management",
    text: "Is it better to plan your free time carefully or to be spontaneous? Explain your position.",
    sampleResponse: "I prefer being spontaneous with my free time for two compelling reasons. First, spontaneity allows me to respond to opportunities and my actual mood in the moment, leading to more authentic enjoyment. When I rigidly plan my leisure time, I often find myself forcing activities when I'm not in the right mindset, which defeats the purpose of relaxation. For instance, if I planned to go hiking but wake up feeling social instead, being spontaneous lets me call friends and enjoy their company, which is more fulfilling than forcing myself to hike alone. Second, unplanned experiences often lead to the most memorable and enriching moments. Some of my best memories came from randomly exploring a new neighborhood or accepting an unexpected invitation. While planning has its place for important commitments, keeping free time flexible preserves the sense of freedom and adventure that makes leisure truly refreshing and prevents it from feeling like just another obligation.",
  },
];

export function getRandomQuestion(): Question {
  const randomIndex = Math.floor(Math.random() * toeflQuestions.length);
  return toeflQuestions[randomIndex];
}
