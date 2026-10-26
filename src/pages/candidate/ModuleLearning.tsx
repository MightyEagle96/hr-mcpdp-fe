import { useState, useEffect } from "react";

//import ModuleContent from "./ModuleContent";
import ModuleProgress, { type ModuleLearningWorkspace } from "./ModuleProgress";
import { useParams, useSearchParams } from "react-router-dom";
import { httpService } from "../../httpService";
import ModuleContent from "./ModuleContent";

function ModuleLearning() {
  const { id } = useParams();
  const [params] = useSearchParams();

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
    <div className="min-h-screen bg-[#F7F8F8]">
      <div className="flex min-h-screen">
        {/* Left */}
        {workspace && (
          <ModuleProgress
            workspace={workspace}
            selectedTopicId={selectedTopicId}
            onTopicSelect={setSelectedTopicId}
          />
        )}
        {/* Right */}
        <ModuleContent />
      </div>
    </div>
  );
}

export default ModuleLearning;
