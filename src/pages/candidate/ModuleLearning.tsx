import { useState, useEffect } from "react";

//import ModuleContent from "./ModuleContent";
import ModuleProgress, { type ModuleLearningWorkspace } from "./ModuleProgress";
import { useParams, useSearchParams } from "react-router-dom";
import { httpService } from "../../httpService";
import ModuleContent from "./ModuleContent";
import { Menu, X, BookOpen } from "lucide-react";

function ModuleLearning() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const unit = params.get("unit");
  const topic = params.get("topic");
  const [workspace, setWorkspace] = useState<ModuleLearningWorkspace | null>(
    null,
  );

  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const getData = async () => {
    try {
      const { data } = await httpService.get(
        `/moduleprogress/get_module_learning_workspace/${id}`,
      );
      setWorkspace(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [unit, topic]);
  return (
    // <div className="min-h-screen bg-[#F7F8F8]">
    //   <div className="flex min-h-screen">
    //     {/* Left */}
    //     {workspace && (
    //       <ModuleProgress
    //         workspace={workspace}
    //         selectedTopicId={selectedTopicId}
    //         onTopicSelect={setSelectedTopicId}
    //       />
    //     )}
    //     {/* Right */}
    //     <ModuleContent />
    //   </div>
    // </div>

    <div className="min-h-screen bg-[#F7F8F8]">
      <div className="relative flex min-h-screen">
        {/* Desktop sidebar */}
        {workspace && (
          <aside className="hidden md:block md:w-80 md:shrink-0">
            <ModuleProgress
              workspace={workspace}
              selectedTopicId={selectedTopicId}
              onTopicSelect={setSelectedTopicId}
            />
          </aside>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Mobile course contents button */}
          {workspace && (
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
          )}

          <ModuleContent />
        </main>

        {/* Mobile drawer */}
        {workspace && isProgressOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close course contents"
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsProgressOpen(false)}
            />

            {/* Drawer panel */}
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
