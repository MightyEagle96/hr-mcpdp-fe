import { httpService } from "../../httpService";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Loader2,
  X,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

//import { httpService } from "../../services/http.service";
import { toastError, toastSuccess } from "../../components/CustomToast";

interface AssessmentQuestion {
  question: string;
  options: string[];
}

interface UnitAssessment {
  _id: string;
  module: {
    _id: string;
    title: string;
    description: string;
    code: string;
    imageUrl?: string;
  };
  unit: {
    _id: string;
    title: string;
    description: string;
  };
  duration: number;
  questions: AssessmentQuestion[];
}

function CandidateUnitAssessment() {
  const navigate = useNavigate();

  const { moduleId } = useParams();
  const [params] = useSearchParams();

  const unitId = params.get("unit");

  const [assessment, setAssessment] = useState<UnitAssessment | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [timeLeft, setTimeLeft] = useState(0);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  /*
   * ============================================================
   * GET ASSESSMENT
   * ============================================================
   */

  const getData = async () => {
    if (!moduleId || !unitId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await httpService.get(
        `/moduleprogress/get_unit_assessment/`,
        {
          params: {
            moduleId,
            unit: unitId,
          },
        },
      );

      const result = data;

      setAssessment(result);

      /*
       * Duration is stored in milliseconds.
       */
      setTimeLeft(result.duration);
    } catch (error) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [moduleId, unitId]);

  /*
   * ============================================================
   * TIMER
   * ============================================================
   */

  useEffect(() => {
    if (!hasStarted || hasSubmitted) {
      return;
    }

    if (timeLeft <= 0) {
      handleSubmitAssessment(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLeft, hasSubmitted]);

  /*
   * ============================================================
   * FORMAT TIMER
   * ============================================================
   */

  const formattedTime = useMemo(() => {
    const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }, [timeLeft]);

  /*
   * ============================================================
   * BEGIN ASSESSMENT
   * ============================================================
   */

  const handleBeginAssessment = () => {
    setHasStarted(true);
  };

  /*
   * ============================================================
   * SELECT ANSWER
   * ============================================================
   */

  const handleSelectAnswer = (answer: string) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  /*
   * ============================================================
   * NEXT QUESTION
   * ============================================================
   */

  const handleNext = () => {
    if (!assessment) return;

    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  /*
   * ============================================================
   * PREVIOUS QUESTION
   * ============================================================
   */

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  /*
   * ============================================================
   * SUBMIT ASSESSMENT
   * ============================================================
   */

  const handleSubmitAssessment = async (automatic = false) => {
    if (!assessment || isSubmitting) return;

    /*
     * Normal submission requires confirmation.
     */
    if (!automatic) {
      setShowSubmitModal(true);
      return;
    }

    try {
      setIsSubmitting(true);

      const formattedAnswers = Object.entries(answers).map(
        ([questionIndex, answer]) => ({
          questionIndex: Number(questionIndex),
          answer,
        }),
      );

      const { data } = await httpService.post(
        "/moduleprogress/submit_unit_assessment",
        {
          moduleId,
          unit: unitId,
          assessmentId: assessment._id,
          answers: formattedAnswers,
        },
      );

      setHasSubmitted(true);

      toastSuccess(data.message || "Assessment submitted successfully.");

      /*
       * Backend determines where the candidate goes next.
       */
      const nextRoute = data.data?.nextRoute;

      if (nextRoute) {
        navigate(nextRoute);
      }
    } catch (error) {
      toastError(error);
    } finally {
      setIsSubmitting(false);
      setShowSubmitModal(false);
    }
  };

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (isLoading) {
    return <AssessmentLoading />;
  }

  /*
   * ============================================================
   * INVALID / NO ASSESSMENT
   * ============================================================
   */

  if (!assessment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
            <FileQuestion size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Assessment unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No assessment is currently available for this unit.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              mt-6 inline-flex h-11 items-center
              gap-2 rounded-xl bg-slate-900
              px-5 text-sm font-semibold text-white
              hover:bg-slate-800
            "
          >
            <ArrowLeft size={17} />
            Back to Learning
          </button>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * INTRODUCTION
   * ============================================================
   */

  if (!hasStarted) {
    return (
      <AssessmentIntroduction
        assessment={assessment}
        onBegin={handleBeginAssessment}
        onBack={() => navigate(-1)}
      />
    );
  }

  /*
   * ============================================================
   * CURRENT QUESTION
   * ============================================================
   */

  const question = assessment.questions[currentQuestion];

  const isLastQuestion = currentQuestion === assessment.questions.length - 1;

  const answeredCount = Object.keys(answers).length;

  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C63C38]">
              Unit Assessment
            </p>

            <h1 className="truncate text-sm font-bold text-slate-900 sm:text-base">
              {assessment.unit.title}
            </h1>
          </div>

          <div
            className={`
              flex items-center gap-2 rounded-xl px-3 py-2
              ${timeLeft <= 60000 ? "bg-red-50" : "bg-slate-100"}
            `}
          >
            <Clock3
              size={17}
              className={timeLeft <= 60000 ? "text-red-500" : "text-slate-500"}
            />

            <span
              className={`
                font-mono text-sm font-bold
                ${timeLeft <= 60000 ? "text-red-600" : "text-slate-700"}
              `}
            >
              {formattedTime}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-[#C63C38] transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Question information */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Question {currentQuestion + 1} of {assessment.questions.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {answeredCount} of {assessment.questions.length} answered
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#C63C38]/10 px-3 py-1.5 text-xs font-bold text-[#C63C38]">
            {assessment.unit.title}
          </span>
        </div>

        {/* Question card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold leading-8 text-slate-900 sm:text-2xl">
            {question.question}
          </h2>

          <div className="mt-8 space-y-3">
            {question.options.map((option, index) => {
              const selected = answers[currentQuestion] === option;

              const letter = String.fromCharCode(65 + index);

              return (
                <button
                  key={`${index}-${option}`}
                  type="button"
                  onClick={() => handleSelectAnswer(option)}
                  className={`
                      flex w-full items-start gap-4
                      rounded-2xl border p-4
                      text-left transition-all

                      ${
                        selected
                          ? "border-[#C63C38] bg-[#C63C38]/5 ring-4 ring-red-50"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }
                    `}
                >
                  <span
                    className={`
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl text-sm font-bold

                        ${
                          selected
                            ? "bg-[#C63C38] text-white"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                  >
                    {letter}
                  </span>

                  <span
                    className={`
                        pt-1 text-sm font-medium
                        leading-6
                        ${selected ? "text-slate-900" : "text-slate-700"}
                      `}
                  >
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="
              inline-flex h-11 items-center gap-2
              rounded-xl border border-slate-200
              bg-white px-4 text-sm font-semibold
              text-slate-700 transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ArrowLeft size={17} />

            <span className="hidden sm:inline">Previous</span>
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={() => handleSubmitAssessment()}
              disabled={isSubmitting}
              className="
                inline-flex h-11 items-center gap-2
                rounded-xl bg-[#C63C38]
                px-5 text-sm font-bold text-white
                shadow-sm transition
                hover:bg-[#B63431]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Assessment
                  <CheckCircle2 size={17} />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="
                inline-flex h-11 items-center gap-2
                rounded-xl bg-slate-900
                px-5 text-sm font-bold text-white
                transition hover:bg-slate-800
              "
            >
              Next
              <ArrowRight size={17} />
            </button>
          )}
        </div>
      </main>

      {/* Confirmation */}
      {showSubmitModal && (
        <SubmitConfirmationModal
          answeredCount={answeredCount}
          totalQuestions={assessment.questions.length}
          isSubmitting={isSubmitting}
          onCancel={() => setShowSubmitModal(false)}
          onConfirm={() => handleSubmitAssessment(true)}
        />
      )}
    </div>
  );
}

export default CandidateUnitAssessment;

interface AssessmentIntroductionProps {
  assessment: UnitAssessment;
  onBegin: () => void;
  onBack: () => void;
}

function AssessmentIntroduction({
  assessment,
  onBegin,
  onBack,
}: AssessmentIntroductionProps) {
  const durationMinutes = Math.ceil(assessment.duration / 60000);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-xl sm:p-10">
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#C63C38]/30 blur-3xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C63C38]">
              <FileQuestion size={27} />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-red-300">
              Unit Assessment
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {assessment.unit.title}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {assessment.unit.description}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Before you begin</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This assessment evaluates your understanding of the topics covered
            in this unit.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <AssessmentInfo
              icon={<FileQuestion size={18} />}
              label="Questions"
              value={`${assessment.questions.length}`}
            />

            <AssessmentInfo
              icon={<Clock3 size={18} />}
              label="Duration"
              value={`${durationMinutes} minutes`}
            />

            <AssessmentInfo
              icon={<BookOpen size={18} />}
              label="Unit"
              value={assessment.unit.title}
            />
          </div>

          <div className="mt-6 rounded-2xl bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertTriangle
                size={19}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <p className="text-sm font-bold text-amber-900">Important</p>

                <p className="mt-1 text-xs leading-5 text-amber-800">
                  The timer begins when you start the assessment. Make sure you
                  are ready before proceeding.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onBegin}
            className="
              mt-7 flex h-13 w-full items-center
              justify-center gap-2 rounded-2xl
              bg-[#C63C38] px-6
              text-sm font-bold text-white
              shadow-sm transition
              hover:bg-[#B63431]
              focus:outline-none
              focus:ring-4 focus:ring-red-100
            "
          >
            Begin Assessment
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={onBack}
            className="
              mt-3 flex h-11 w-full items-center
              justify-center gap-2 rounded-xl
              text-sm font-semibold text-slate-500
              transition hover:bg-slate-50
            "
          >
            <ArrowLeft size={17} />
            Back to Learning
          </button>
        </div>
      </div>
    </div>
  );
}

function AssessmentInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-[#C63C38]">
        {icon}

        <span className="text-xs font-semibold text-slate-400">{label}</span>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function AssessmentLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-6">
      <div className="w-full max-w-2xl">
        <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />

        <div className="mt-5 rounded-3xl bg-white p-8">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-5 h-8 w-3/4 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 space-y-3">
            <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SubmitConfirmationModalProps {
  answeredCount: number;
  totalQuestions: number;
  isSubmitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function SubmitConfirmationModal({
  answeredCount,
  totalQuestions,
  isSubmitting,
  onCancel,
  onConfirm,
}: SubmitConfirmationModalProps) {
  const unanswered = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <AlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Submit assessment?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Once submitted, you will not be able to change your answers.
        </p>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Answered</span>

            <span className="font-bold text-slate-900">
              {answeredCount} / {totalQuestions}
            </span>
          </div>

          {unanswered > 0 && (
            <p className="mt-2 text-xs font-medium text-amber-600">
              You have {unanswered} unanswered question
              {unanswered === 1 ? "" : "s"}.
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="
              h-11 flex-1 rounded-xl
              border border-slate-200 bg-white
              text-sm font-semibold text-slate-700
              transition hover:bg-slate-50
            "
          >
            Continue
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="
              h-11 flex-1 rounded-xl
              bg-[#C63C38]
              text-sm font-bold text-white
              transition hover:bg-[#B63431]
              disabled:opacity-60
            "
          >
            {isSubmitting ? "Submitting..." : "Submit Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
}
