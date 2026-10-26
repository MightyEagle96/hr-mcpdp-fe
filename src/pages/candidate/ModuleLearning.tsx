import { useState, useEffect } from "react";

//import ModuleContent from "./ModuleContent";
import ModuleProgress, { type ModuleLearningWorkspace } from "./ModuleProgress";
import { useParams } from "react-router-dom";
import { httpService } from "../../httpService";
import ModuleContent from "./ModuleContent";
import { Menu, X, BookOpen, PanelLeftOpen, PanelLeftClose } from "lucide-react";

function ModuleLearning() {
  const { id } = useParams();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [workspace, setWorkspace] = useState<ModuleLearningWorkspace | null>(
    null,
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          setError("Unable to load the learning workspace.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (!id) {
      setError("The module ID is missing.");
      setLoading(false);
      return;
    }

    getData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <ModuleLearningSkeleton />;
  }

  if (error || !workspace) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] p-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Unable to Load Module
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error || "The learning workspace could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B63431]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <div className="relative flex min-h-screen">
        {/* Desktop sidebar: stays mounted during topic navigation */}
        {/* <aside className="hidden w-80 shrink-0 md:block">
          <ModuleProgress
            workspace={workspace}
            selectedTopicId={selectedTopicId}
            onTopicSelect={setSelectedTopicId}
          />
        </aside> */}
        {/* Desktop sidebar */}
        <aside
          aria-hidden={isSidebarCollapsed}
          className={`relative hidden shrink-0 overflow-hidden border-slate-200 bg-white transition-[width,border-width] duration-300 ease-in-out md:block ${
            isSidebarCollapsed ? "w-0 border-r-0" : "w-80 border-r"
          }`}
        >
          <div className="absolute inset-0 w-80">
            {workspace && (
              <ModuleProgress
                workspace={workspace}
                selectedTopicId={selectedTopicId}
                onTopicSelect={setSelectedTopicId}
              />
            )}
          </div>
        </aside>

        {/* Main content: manages its own topic loading state */}
        {/* <main className="min-w-0 flex-1">
          <div className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
            <button
              type="button"
              onClick={() => setIsProgressOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C63C38] px-4 py-2 text-sm font-medium text-white hover:bg-[#B63431]"
            >
              <Menu size={18} />
              Course Contents
            </button>
          </div>

          <div className="hidden items-center gap-3 border-b border-slate-200 bg-white px-5 py-3 md:flex">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed((previous) => !previous)}
              aria-label={
                isSidebarCollapsed
                  ? "Show course contents"
                  : "Hide course contents"
              }
              aria-expanded={!isSidebarCollapsed}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Menu size={18} />
              {isSidebarCollapsed
                ? "Show course contents"
                : "Hide course contents"}
            </button>

            {isSidebarCollapsed && (
              <span className="text-sm text-slate-400">Focus mode</span>
            )}
          </div>
          <ModuleContent />
        </main> */}
        <main className="min-w-0 flex-1">
          {/* Desktop reading toolbar */}
          <div className="sticky top-0 z-30 hidden items-center gap-3 border-b border-slate-200 bg-white/95 px-5 py-3 backdrop-blur md:flex">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed((previous) => !previous)}
              aria-label={
                isSidebarCollapsed
                  ? "Show course contents"
                  : "Hide course contents"
              }
              aria-expanded={!isSidebarCollapsed}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[#C63C38]/30 hover:bg-[#FCEDEC] hover:text-[#C63C38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C63C38]"
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}

              {isSidebarCollapsed
                ? "Show course contents"
                : "Hide course contents"}
            </button>

            {isSidebarCollapsed && (
              <span className="text-xs font-medium text-slate-400">
                Focus mode
              </span>
            )}
          </div>

          {/* Existing mobile toolbar */}
          <div className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
            <button
              type="button"
              onClick={() => setIsProgressOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C63C38] px-4 py-2 text-sm font-medium text-white hover:bg-[#B63431]"
            >
              <Menu size={18} />
              Course Contents
            </button>
          </div>

          {/* Lesson content manages its own topic loading */}
          <ModuleContent />
        </main>

        {/* Mobile drawer */}
        {isProgressOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close course contents"
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsProgressOpen(false)}
            />

            <aside className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
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

              <ModuleProgress
                workspace={workspace}
                selectedTopicId={selectedTopicId}
                onTopicSelect={(topicId) => {
                  setSelectedTopicId(topicId);
                  setIsProgressOpen(false);
                }}
              />
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
