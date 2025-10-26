import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionDisplay from "@/components/QuestionDisplay";
import CircularTimer from "@/components/CircularTimer";
import RecordingIndicator from "@/components/RecordingIndicator";
import AudioLevelIndicator from "@/components/AudioLevelIndicator";
import TranscriptionDisplay from "@/components/TranscriptionDisplay";
import AudioPlayback from "@/components/AudioPlayback";
import SampleResponse from "@/components/SampleResponse";
import { getRandomQuestion } from "@/lib/questions";
import { type Question } from "@shared/schema";

type AppState =
  | "welcome"
  | "ready"
  | "preparing"
  | "recording"
  | "review";

export default function Home() {
  const [state, setState] = useState<AppState>("ready");
  const [hasPermission, setHasPermission] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [prepTime, setPrepTime] = useState(15);
  const [recordTime, setRecordTime] = useState(45);
  const [transcription, setTranscription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);


  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);


  const startPreparation = () => {
    setState("preparing");
    setPrepTime(15);

    const intervalId = setInterval(() => {
      setPrepTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          startRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = intervalId;
  };

  const skipPreparation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startRecording();
  };

  const startRecording = async () => {
    setState("recording");
    setRecordTime(45);
    setTranscription("");
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);

      // Use audio/mp4 for iOS Safari compatibility
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      // Set up audio level monitoring
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 256;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        
        // Clean up audio monitoring
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        setAudioLevel(0);
      };

      // Start recording with timeslice to ensure all audio is captured
      mediaRecorder.start(1000); // Capture data every 1 second

      // Start speech recognition if available
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognitionRef.current = recognition;
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript + " ";
              }
            }
            if (finalTranscript) {
              setTranscription((prev) => prev + finalTranscript);
            }
          };

          recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
              try {
                recognition.stop();
                setTimeout(() => {
                  if (mediaRecorderRef.current?.state === "recording") {
                    recognition.start();
                  }
                }, 100);
              } catch (e) {
                console.error("Error restarting recognition:", e);
              }
            }
          };

          recognition.onend = () => {
            console.log("Recognition ended, will restart if still recording");
            setTimeout(() => {
              if (mediaRecorderRef.current?.state === "recording") {
                try {
                  recognition.start();
                } catch (e) {
                  console.error("Error restarting recognition on end:", e);
                }
              }
            }, 100);
          };

          recognition.onstart = () => {
            console.log("Speech recognition started");
          };

          recognition.start();
        } catch (e) {
          console.error("Failed to start speech recognition:", e);
        }
      } else {
        console.log("Speech recognition not supported in this browser");
      }

      const intervalId = setInterval(() => {
        setRecordTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      timerRef.current = intervalId;
    } catch (error) {
      console.error("Failed to start recording:", error);
      if (timerRef.current) clearInterval(timerRef.current);
      setState("ready");
      alert("⚠️ Microphone Access Required\n\nThis app needs microphone access to work. If you're seeing this in the Replit preview, please:\n\n1. Click the 'Open in new tab' button (top-right of preview)\n2. Grant microphone permission when your browser asks\n3. Try again\n\nBrowsers block microphone access in embedded previews for security.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setState("review");
  };

  const generateNewQuestion = () => {
    const newQuestion = getRandomQuestion();
    setCurrentQuestion(newQuestion);
    setTranscription("");
    setAudioUrl("");
    setPrepTime(15);
    setRecordTime(45);
    setState("ready");
  };

  const practiceAgain = () => {
    setTranscription("");
    setAudioUrl("");
    setPrepTime(15);
    setRecordTime(45);
    startPreparation();
  };


  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
            TOEFL Speaking Practice
          </h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-2 space-y-3">
        {state === "ready" && !currentQuestion && (
          <div className="flex flex-col items-center gap-8 py-24 px-4">
            <Button
              size="default"
              className="px-6 py-5 shadow-lg hover:shadow-xl transition-shadow"
              onClick={generateNewQuestion}
              data-testid="button-generate-question"
            >
              Generate Random Question
            </Button>
          </div>
        )}

        {state === "ready" && currentQuestion && (
          <>
            <QuestionDisplay
              question={currentQuestion.text}
              category={currentQuestion.category}
            />

            <div className="flex flex-col items-center gap-6 py-12">
              <Button
                size="lg"
                onClick={startPreparation}
                data-testid="button-start-practice"
              >
                Start Practice
              </Button>
            </div>
          </>
        )}

        {state === "preparing" && currentQuestion && (
          <div className="space-y-4">
            <QuestionDisplay
              question={currentQuestion.text}
              category={currentQuestion.category}
            />

            <div className="flex flex-col items-center py-2 space-y-2">
              <CircularTimer
                seconds={prepTime}
                totalSeconds={15}
                color="warning"
                label="Preparation Time"
              />

              <Button
                variant="outline"
                onClick={skipPreparation}
                data-testid="button-skip-prep"
              >
                Skip Preparation
              </Button>
            </div>
          </div>
        )}

        {state === "recording" && currentQuestion && (
          <div className="space-y-3">
            <QuestionDisplay
              question={currentQuestion.text}
              category={currentQuestion.category}
            />

            <div className="flex flex-col items-center py-2 space-y-2">
              <RecordingIndicator isRecording={true} />
              
              <CircularTimer
                seconds={recordTime}
                totalSeconds={45}
                color="destructive"
                label="Recording Time"
              />

              <AudioLevelIndicator level={audioLevel} />

              <Button
                variant="outline"
                size="sm"
                onClick={stopRecording}
                data-testid="button-stop-early"
              >
                Stop Recording Early
              </Button>
            </div>
          </div>
        )}

        {state === "review" && currentQuestion && (
          <>
            <QuestionDisplay
              question={currentQuestion.text}
              category={currentQuestion.category}
            />

            <div className="space-y-4">
              <TranscriptionDisplay transcription={transcription} />

              {audioUrl && <AudioPlayback audioUrl={audioUrl} />}

              <SampleResponse response={currentQuestion.sampleResponse} />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="flex-1"
                  onClick={practiceAgain}
                  data-testid="button-practice-again"
                >
                  Practice Again
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
                  onClick={generateNewQuestion}
                  data-testid="button-next-question"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  New Question
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
      
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground">© An Ichinose 2025</p>
      </footer>
    </div>
  );
}
