import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileQuestion,
  RotateCcw,
  ShieldCheck,
  Trophy,
  XCircle,
} from "lucide-react";

import { httpService } from "../../httpService";
import { toastError } from "../../components/CustomToast";

interface PostTestResult {
  postTestId: string;
  score: number;
  passed: boolean;
  dateScored: string;
  module: {
    _id: string;
    title: string;
    description: string;
    code: string;
    imageUrl?: string;
  };
}

function PostTestResult() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState<PostTestResult | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    if (!moduleId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await httpService.get(
        "/moduleprogress/get_posttest_score/",
        {
          params: {
            moduleId,
          },
        },
      );

      setResult(data.data ?? data);
    } catch (error) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [moduleId]);

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C63C38]" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your posttest result...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Result unavailable
   */
  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C63C38]">
            <FileQuestion size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Result unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't find a posttest result for this module.
          </p>

          <button
            type="button"
            onClick={() => navigate("/candidate/modules")}
            className="
              mt-6 inline-flex items-center gap-2
              rounded-xl bg-[#C63C38] px-5 py-3
              text-sm font-bold text-white
              transition-colors hover:bg-[#B63431]
            "
          >
            <ArrowLeft size={17} />
            Back to My Modules
          </button>
        </div>
      </div>
    );
  }

  const passed = result.passed;

  const formattedDate = new Date(result.dateScored).toLocaleString("en-NG", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/candidate/modules")}
          className="
            mb-6 inline-flex items-center gap-2
            text-sm font-semibold text-slate-500
            transition-colors hover:text-slate-900
          "
        >
          <ArrowLeft size={17} />
          My Modules
        </button>

        {/* Result Card */}
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          {/* Hero */}
          <div className="relative overflow-hidden bg-[#242625]">
            {result.module.imageUrl && (
              <img
                src={result.module.imageUrl}
                alt={result.module.title}
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-[#242625] via-[#242625]/95 to-[#C63C38]/80" />

            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                      {result.module.code}
                    </span>

                    <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                      MCPDP Posttest
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {result.module.title}
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                    {result.module.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <div
                    className={`
                      flex h-24 w-24 items-center justify-center
                      rounded-[2rem] border backdrop-blur-md
                      ${
                        passed
                          ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-300"
                          : "border-red-300/30 bg-red-400/15 text-red-300"
                      }
                    `}
                  >
                    {passed ? <Trophy size={42} /> : <XCircle size={42} />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-10">
            {/* Status */}
            <div className="text-center">
              <div
                className={`
                  mx-auto inline-flex items-center gap-2
                  rounded-full px-4 py-2 text-sm font-bold
                  ${
                    passed
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-[#C63C38]"
                  }
                `}
              >
                {passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}

                {passed ? "Posttest Passed" : "Posttest Not Passed"}
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
                {passed ? "Congratulations!" : "Posttest Result"}
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                {passed
                  ? "You have successfully completed the posttest and fulfilled the assessment requirement for this module."
                  : "You have completed the posttest, but your score did not reach the required pass mark."}
              </p>
            </div>

            {/* Score */}
            <div className="mx-auto mt-8 max-w-sm rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Your Score
              </p>

              <div
                className={`
                  mt-3 text-6xl font-black tracking-tight
                  ${passed ? "text-emerald-600" : "text-[#C63C38]"}
                `}
              >
                {result.score}%
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} />
                Pass mark: 50%
              </div>
            </div>

            {/* Details */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Clock3 size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Submitted
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-xl
                      ${
                        passed
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-[#C63C38]"
                      }
                    `}
                  >
                    {passed ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <XCircle size={18} />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Module Status
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {passed ? "Completed" : "Not Completed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passed */}
            {passed && (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-emerald-900">
                      Module completed successfully
                    </p>

                    <p className="mt-1 text-sm leading-6 text-emerald-700">
                      Your learning journey for this module is now complete.
                      Your completion record has been saved.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Failed */}
            {!passed && (
              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={21}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-amber-900">
                      Pass mark not reached
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-700">
                      A minimum score of 50% is required to complete this
                      module. You may review the module content and retake the
                      posttest.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {passed ? (
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/module/moduleprogress/${result.module._id}`)
                  }
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-[#C63C38] px-6 py-3.5
                    text-sm font-bold text-white
                    transition-colors hover:bg-[#B63431]
                  "
                >
                  View Module
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/module/moduleprogress/${result.module._id}/posttest`,
                    )
                  }
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-[#C63C38] px-6 py-3.5
                    text-sm font-bold text-white
                    transition-colors hover:bg-[#B63431]
                  "
                >
                  <RotateCcw size={17} />
                  Retake Posttest
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate("/mymodules")}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl border border-slate-200 bg-white
                  px-6 py-3.5 text-sm font-semibold text-slate-700
                  transition-colors hover:bg-slate-50
                "
              >
                <ArrowLeft size={17} />
                My Modules
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostTestResult;
