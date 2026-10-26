import { useState, useEffect } from "react";

//import ModuleContent from "./ModuleContent";
import ModuleProgress, { type ModuleLearningWorkspace } from "./ModuleProgress";
import { useParams, useSearchParams } from "react-router-dom";
import { httpService } from "../../httpService";
import ModuleContent from "./ModuleContent";
import { Menu, X, BookOpen, RefreshCw, AlertCircle } from "lucide-react";

function ModuleLearning() {
  const { id } = useParams();
  const [params] = useSearchParams();

  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [workspace, setWorkspace] = useState<ModuleLearningWorkspace | null>(
    null,
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const unit = params.get("unit");
  const topic = params.get("topic");

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await httpService.get(
          `/moduleprogress/get_module_learning_workspace/${id}`,
        );

        if (!cancelled) {
          setWorkspace(data.data);
        }
      } catch {
        if (!cancelled) {
          setError("We couldn't load your learning content. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (id) {
      getData();
    } else {
      setError("The module ID is missing.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [id, unit, topic]);

  if (loading) {
    return <ModuleLearningSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] p-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C63C38]">
            <AlertCircle size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Unable to Load Module
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B63431]"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <div className="relative flex min-h-screen">
        {workspace && (
          <aside className="hidden w-80 shrink-0 lg:block">
            <ModuleProgress
              workspace={workspace}
              selectedTopicId={selectedTopicId}
              onTopicSelect={setSelectedTopicId}
            />
          </aside>
        )}

        <main className="min-w-0 flex-1">
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsProgressOpen(true)}
              aria-label="Open course contents"
              aria-expanded={isProgressOpen}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C63C38] px-3 py-2 text-sm font-medium text-white hover:bg-[#B63431]"
            >
              <Menu size={18} />
              Course Contents
            </button>
          </div>

          <ModuleContent />
        </main>

        {isProgressOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close course contents"
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsProgressOpen(false)}
            />

            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Course contents"
              className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2 font-semibold text-[#242625]">
                  <BookOpen size={20} />
                  Course Contents
                </div>

                <button
                  type="button"
                  aria-label="Close course contents"
                  onClick={() => setIsProgressOpen(false)}
                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                <ModuleProgress
                  workspace={workspace}
                  selectedTopicId={selectedTopicId}
                  onTopicSelect={(topicId) => {
                    setSelectedTopicId(topicId);
                    setIsProgressOpen(false);
                  }}
                />
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModuleLearning;

function ModuleLearningSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-[#F7F8F8]">
      <div className="flex min-h-screen">
        {/* Desktop sidebar skeleton */}
        <aside className="hidden w-80 shrink-0 border-r border-slate-200 bg-white p-5 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-3 w-24 rounded bg-slate-100" />
            </div>
          </div>

          <div className="mb-6 h-2 w-full rounded-full bg-slate-100" />

          <div className="space-y-4">
            {[1, 2, 3, 4].map((unit) => (
              <div
                key={unit}
                className="rounded-xl border border-slate-100 p-3"
              >
                <div className="mb-4 h-4 w-3/4 rounded bg-slate-200" />

                <div className="space-y-3 pl-2">
                  {[1, 2, 3].map((topic) => (
                    <div key={topic} className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-slate-100" />
                      <div
                        className={`h-3 rounded bg-slate-100 ${
                          topic === 1 ? "w-4/5" : "w-3/5"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content skeleton */}
        <main className="min-w-0 flex-1">
          {/* Mobile toolbar */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="h-9 w-36 rounded-lg bg-slate-200" />
            <div className="h-4 w-16 rounded bg-slate-100" />
          </div>

          <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-10">
            {/* Breadcrumbs */}
            <div className="flex gap-2">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-3 w-4 rounded bg-slate-100" />
              <div className="h-3 w-28 rounded bg-slate-200" />
            </div>

            {/* Topic heading */}
            <div className="space-y-3">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-8 w-full max-w-xl rounded-lg bg-slate-200" />
              <div className="h-4 w-full max-w-2xl rounded bg-slate-100" />
            </div>

            {/* Learning content */}
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
              <div className="h-5 w-2/5 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-5/6 rounded bg-slate-100" />

              <div className="h-44 w-full rounded-xl bg-slate-100 sm:h-64" />

              <div className="space-y-3">
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-4/5 rounded bg-slate-100" />
              </div>
            </div>

            {/* Previous / next navigation */}
            <div className="flex justify-between gap-4">
              <div className="h-11 w-28 rounded-xl bg-slate-200" />
              <div className="h-11 w-32 rounded-xl bg-slate-200" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
