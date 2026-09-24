// import { useParams } from "react-router-dom";
// import { httpService } from "../../httpService";
// import { toastError } from "../../components/CustomToast";
// import { useEffect } from "react";

// function UnitAssessmentResult() {
//   const { moduleId, unitId } = useParams();

//   const getData = async () => {
//     try {
//       const { data } = await httpService.get(
//         "moduleprogress/get_unit_assessment_score",
//         {
//           params: {
//             moduleId,
//             unitId,
//           },
//         },
//       );

//       console.log(data);
//     } catch (error) {
//       toastError(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   return <div>hello oooo</div>;
// }

// export default UnitAssessmentResult;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";
import { httpService } from "../../httpService";
import { toastError } from "../../components/CustomToast";

interface UnitAssessmentResultData {
  unit: {
    _id: string;
    title: string;
    description: string;
    order: number;
  };
  score: number;
  passMark: number;
  passed: boolean;
  dateScored: string;
  moduleId: string;
  candidateId: string;
}

function UnitAssessmentResult() {
  const { moduleId, unitId } = useParams();

  const [result, setResult] = useState<UnitAssessmentResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getResult = async () => {
    if (!moduleId || !unitId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await httpService.get(
        "/moduleprogress/get_unit_assessment_score",
        {
          params: {
            moduleId,
            unitId,
          },
        },
      );

      setResult(response.data.data ?? response.data);
    } catch (error) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, [moduleId, unitId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-6">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C63C38]" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your assessment result...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-6">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <CircleAlert className="h-8 w-8 text-slate-500" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Result Unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            We could not retrieve the assessment result for this unit. Please
            return to your learning workspace and try again.
          </p>

          <Link
            to={`/module/moduleprogress/${moduleId}`}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-[#C63C38] px-6 text-sm font-semibold text-white transition hover:bg-[#B63431]"
          >
            Back to Learning
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(result.dateScored).toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  const formattedTime = new Date(result.dateScored).toLocaleTimeString(
    "en-NG",
    {
      hour: "numeric",
      minute: "2-digit",
    },
  );

  const scoreDifference = result.score - result.passMark;

  return (
    <div className="min-h-screen bg-[#F7F8F8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link
          to={`/module/moduleprogress/${moduleId}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Learning
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div
            className={`relative overflow-hidden px-6 py-10 sm:px-10 ${
              result.passed ? "bg-emerald-50" : "bg-red-50"
            }`}
          >
            <div
              className={`absolute -right-16 -top-20 h-56 w-56 rounded-full blur-3xl ${
                result.passed ? "bg-emerald-200/50" : "bg-red-200/50"
              }`}
            />

            <div className="relative">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                  result.passed
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {result.passed ? (
                  <CheckCircle2 className="h-9 w-9" />
                ) : (
                  <XCircle className="h-9 w-9" />
                )}
              </div>

              <div className="mt-5 text-center">
                <p
                  className={`text-sm font-bold uppercase tracking-[0.18em] ${
                    result.passed ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  Assessment {result.passed ? "Passed" : "Not Passed"}
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                  Unit Assessment Result
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Your assessment result for{" "}
                  <span className="font-semibold text-slate-800">
                    {result.unit.title}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Result Body */}
          <div className="p-6 sm:p-10">
            {/* Score */}
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#C63C38]/10 text-[#C63C38]">
                  <Award className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Your Score
                </p>

                <p className="mt-1 text-4xl font-bold text-slate-900">
                  {result.score}%
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Target className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Pass Mark
                </p>

                <p className="mt-1 text-4xl font-bold text-slate-900">
                  {result.passMark}%
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Date Taken
                </p>

                <p className="mt-1 text-base font-bold text-slate-900">
                  {formattedDate}
                </p>

                <p className="mt-1 text-xs text-slate-500">{formattedTime}</p>
              </div>
            </div>

            {/* Score Progress */}
            <div className="mt-8 rounded-2xl border border-slate-200 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Assessment Performance
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your score compared with the required pass mark.
                  </p>
                </div>

                <span
                  className={`text-sm font-bold ${
                    result.passed ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {result.score}%
                </span>
              </div>

              <div className="relative mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.passed ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(result.score, 100)}%`,
                  }}
                />

                {/* Pass mark indicator */}
                <div
                  className="absolute top-[-4px] h-5 w-0.5 bg-slate-700"
                  style={{
                    left: `${result.passMark}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>0%</span>

                <span className="font-semibold text-slate-600">
                  Pass mark: {result.passMark}%
                </span>

                <span>100%</span>
              </div>
            </div>

            {/* Unit Information */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Unit {result.unit.order}
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    {result.unit.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {result.unit.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div
              className={`mt-6 rounded-2xl border p-5 ${
                result.passed
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.passed ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                )}

                <div>
                  <p
                    className={`text-sm font-bold ${
                      result.passed ? "text-emerald-800" : "text-red-800"
                    }`}
                  >
                    {result.passed
                      ? "Well done! You passed this assessment."
                      : "You did not meet the required pass mark."}
                  </p>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      result.passed ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {result.passed
                      ? "You can continue to the next stage of your MCPDP learning journey."
                      : `You scored ${Math.abs(scoreDifference)} percentage point${
                          Math.abs(scoreDifference) === 1 ? "" : "s"
                        } below the required pass mark. You can retake the assessment to continue.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                to="/mymodules"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                My Modules
              </Link>

              {result.passed ? (
                <Link
                  to={`/module/moduleprogress/${moduleId}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#C63C38] px-6 text-sm font-semibold text-white transition hover:bg-[#B63431]"
                >
                  <BookOpen className="h-4 w-4" />
                  Continue Learning
                </Link>
              ) : (
                <Link
                  to={`/module/moduleprogress/${moduleId}/${unitId}/assessment`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#C63C38] px-6 text-sm font-semibold text-white transition hover:bg-[#B63431]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Retake Assessment
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitAssessmentResult;
