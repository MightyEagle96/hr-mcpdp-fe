import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Play,
  ShieldCheck,
} from "lucide-react";

import { httpService } from "../../httpService";
import { toastError } from "../../components/CustomToast";

interface Question {
  question: string;
  answer: string;
  options: string[];
  explanation: string;
}

interface PreTest {
  _id: string;
  module: {
    _id: string;
    title: string;
    code: string;
    description: string;
    imageUrl?: string;
  };
  duration: number;
  questions: Question[];
}

function ModulePretest() {
  const { id } = useParams();

  const [pretest, setPretest] = useState<PreTest | null>(null);

  const [showIntro, setShowIntro] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const [hasStarted, setHasStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const fetchPretest = async () => {
      try {
        setIsLoading(true);

        const response = await httpService.get(
          `/moduleprogress/get_module_pretest/${id}`,
        );

        if (response.data.success) {
          const data = response.data.data;

          setPretest(data);
          setTimeRemaining(data.duration);
        }
      } catch (error) {
        toastError(error);
        console.error("Failed to load pretest:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPretest();
    }
  }, [id]);

  /*
   * Convert milliseconds into a readable format.
   */
  const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${minutes} min${seconds > 0 ? ` ${seconds} sec` : ""}`;
  };

  /*
   * Start the pretest.
   */
  const handleBeginTest = () => {
    setShowIntro(false);
    setHasStarted(true);
  };

  /*
   * Countdown timer.
   */
  useEffect(() => {
    if (!hasStarted || !pretest) {
      return;
    }

    if (timeRemaining <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((current) => {
        if (current <= 1000) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1000;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [hasStarted, pretest]);

  const formatTimer = (milliseconds: number) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C63C38]" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading pretest...
          </p>
        </div>
      </div>
    );
  }

  if (!pretest) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C63C38]">
            <AlertCircle size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Pretest unavailable
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn't load the pretest for this module. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      {/* Intro Modal */}
      {showIntro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Banner */}
            <div className="relative h-44 overflow-hidden bg-[#242625]">
              {pretest.module.imageUrl && (
                <img
                  src={pretest.module.imageUrl}
                  alt={pretest.module.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-30"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-[#242625] via-[#242625]/90 to-[#C63C38]/70" />

              <div className="relative flex h-full flex-col justify-end p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md">
                  <FileQuestion size={24} />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  MCPDP Pretest
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  {pretest.module.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FileQuestion size={16} />

                    <span className="text-xs font-semibold">Questions</span>
                  </div>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {pretest.questions.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock3 size={16} />

                    <span className="text-xs font-semibold">Duration</span>
                  </div>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {formatDuration(pretest.duration)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/60 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-[#C63C38]"
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Before you begin
                    </p>

                    <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-600">
                      <li>• The timer starts immediately when you begin.</li>

                      <li>• Answer all questions before submitting.</li>

                      <li>
                        • Make sure you have a stable internet connection.
                      </li>

                      <li>
                        • Do not leave the assessment page while taking the
                        test.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBeginTest}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#C63C38] px-5 py-4 text-sm font-bold text-white transition-all hover:bg-[#B63431] active:scale-[0.99]"
              >
                <Play size={18} fill="currentColor" />
                Begin Pretest
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                You can begin when you're ready.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Test Workspace */}
      {hasStarted && (
        <div className="mx-auto max-w-5xl px-4 py-28 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#C63C38]">
                MCPDP Pretest
              </p>

              <h1 className="mt-1 text-lg font-bold text-slate-900">
                {pretest.module.title}
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white">
              <Clock3 size={17} />

              {formatTimer(timeRemaining)}
            </div>
          </div>

          {/* Question */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Question {currentQuestion + 1} of {pretest.questions.length}
              </span>

              <span className="text-xs font-semibold text-slate-400">
                {Math.round(
                  ((currentQuestion + 1) / pretest.questions.length) * 100,
                )}
                %
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold leading-8 text-slate-900 sm:text-xl">
                {pretest.questions[currentQuestion].question}
              </h2>

              <div className="mt-6 space-y-3">
                {pretest.questions[currentQuestion].options.map(
                  (option, index) => {
                    const selected = answers[currentQuestion] === option;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [currentQuestion]: option,
                          }))
                        }
                        className={`
                          flex w-full items-center gap-4 rounded-2xl
                          border p-4 text-left transition-all
                          ${
                            selected
                              ? "border-[#C63C38] bg-red-50"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }
                        `}
                      >
                        <span
                          className={`
                            flex h-9 w-9 shrink-0 items-center
                            justify-center rounded-xl text-sm font-bold
                            ${
                              selected
                                ? "bg-[#C63C38] text-white"
                                : "bg-slate-100 text-slate-600"
                            }
                          `}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span className="text-sm font-medium text-slate-700">
                          {option}
                        </span>

                        {selected && (
                          <CheckCircle2
                            size={18}
                            className="ml-auto text-[#C63C38]"
                          />
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((current) => current - 1)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={currentQuestion === pretest.questions.length - 1}
              onClick={() => setCurrentQuestion((current) => current + 1)}
              className="rounded-xl bg-[#242625] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5D605F] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModulePretest;
