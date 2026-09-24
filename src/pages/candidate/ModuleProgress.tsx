import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  Circle,
  Clock3,
  Lock,
  PlayCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export interface LearningTopic {
  _id: string;

  title: string;
  order: number;
  status: "locked" | "pending" | "incomplete" | "complete";
}

export interface LearningUnit {
  _id: string;
  title: string;
  description: string;
  order: number;
  score?: number;
  topics: LearningTopic[];
}

export interface ModuleInfo {
  _id: string;
  title: string;
  description: string;
  code: string;
  imageUrl?: string;
}

export interface ModuleProgressData {
  progressPercentage: number;
  completed: boolean;
  pretestTaken: boolean;
  posttestTaken: boolean;

  currentContent: {
    topic: string;
    unit: string;
  };

  nextContent?: {
    topic: string;
    unit: string;
  };
}

export interface ModuleLearningWorkspace {
  module: ModuleInfo;
  progress: ModuleProgressData;
  units: LearningUnit[];
}

interface ModuleProgressProps {
  workspace: ModuleLearningWorkspace;

  selectedTopicId: string | null;

  onTopicSelect: (topicId: string) => void;

  onClose?: () => void;
}

function ModuleProgress({
  workspace,
  selectedTopicId,
  onTopicSelect,
  onClose,
}: ModuleProgressProps) {
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({});

  const [params] = useSearchParams();

  const { id } = useParams();

  const route = {
    unit: params.get("unit"),
    topic: params.get("topic"),
    module: id,
  };

  const navigate = useNavigate();

  const toggleUnit = (unitId: string) => {
    setOpenUnits((current) => ({
      ...current,
      [unitId]: !current[unitId],
    }));
  };

  const handleTopicClick = (topic: LearningTopic, unitId: string) => {
    if (topic.status === "locked") {
      return;
    }

    navigate(
      `/module/moduleprogress/${route.module}?unit=${unitId}&topic=${topic._id}`,
    );

    //console.log(topic, openUnits);
    onTopicSelect(topic._id);

    onClose?.();
  };

  return (
    <aside className="sticky top-0 h-screen w-[320px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
      <div className="flex min-h-full flex-col">
        {/* Header */}
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C63C38]/10 text-[#C63C38]">
                <BookOpen size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  MCPDP Module
                </p>

                <h2 className="mt-0.5 truncate text-sm font-bold text-slate-900">
                  {workspace.module.title}
                </h2>

                <p className="mt-0.5 text-[10px] font-semibold text-slate-400">
                  {workspace.module.code}
                </p>
              </div>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                aria-label="Close contents"
              >
                <ChevronLeft size={18} />
              </button>
            )}
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Overall Progress
              </span>

              <span className="text-xs font-bold text-[#C63C38]">
                {workspace.progress.progressPercentage}%
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#C63C38] transition-all duration-500"
                style={{
                  width: `${workspace.progress.progressPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Learning Contents */}
        <div className="flex-1 p-4">
          <div className="mb-3 px-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Learning Contents
            </p>
          </div>

          <div className="space-y-2">
            {workspace.units.map((unit) => {
              const isOpen = openUnits[unit._id];

              const completedTopics = unit.topics.filter(
                (topic) => topic.status === "complete",
              ).length;

              const allTopicsCompleted =
                unit.topics.length > 0 &&
                completedTopics === unit.topics.length;

              return (
                <div key={unit._id}>
                  {/* Unit */}
                  <button
                    type="button"
                    onClick={() => toggleUnit(unit._id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-slate-50"
                  >
                    <div
                      className={`
                        flex h-8 w-8 shrink-0 items-center
                        justify-center rounded-lg text-xs font-bold
                        ${
                          allTopicsCompleted
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {allTopicsCompleted ? <Check size={15} /> : unit.order}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {unit.title}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {completedTopics} of {unit.topics.length} topics
                        complete
                      </p>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`
                        shrink-0 text-slate-400
                        transition-transform duration-200
                        ${isOpen ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {/* Topics */}
                  {isOpen && (
                    <div className="ml-4 border-l border-slate-200 pl-4">
                      <div className="space-y-1">
                        {unit.topics.map((topic) => {
                          const isActive = selectedTopicId === topic._id;

                          const isLocked = topic.status === "locked";

                          return (
                            <button
                              key={topic._id}
                              type="button"
                              disabled={isLocked}
                              onClick={() => handleTopicClick(topic, unit._id)}
                              className={`
                                flex w-full items-center gap-3
                                rounded-xl px-3 py-2.5
                                text-left transition-all
                                ${
                                  isActive
                                    ? "bg-[#C63C38]/10 text-[#C63C38]"
                                    : isLocked
                                      ? "cursor-not-allowed text-slate-300"
                                      : "text-slate-600 hover:bg-slate-50"
                                }
                              `}
                            >
                              <TopicStatusIcon
                                status={topic.status}
                                active={isActive}
                              />

                              <span className="min-w-0 flex-1 truncate text-xs font-medium">
                                {topic.order}. {topic.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#C63C38] shadow-sm">
                <Clock3 size={16} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  Keep learning
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-slate-400">
                  Complete each topic to unlock the next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface TopicStatusIconProps {
  status: LearningTopic["status"];
  active: boolean;
}

function TopicStatusIcon({ status, active }: TopicStatusIconProps) {
  if (status === "complete") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check size={13} />
      </span>
    );
  }

  if (status === "locked") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-300">
        <Lock size={14} />
      </span>
    );
  }

  if (active) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C63C38] text-white">
        <PlayCircle size={14} />
      </span>
    );
  }

  if (status === "incomplete") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <Clock3 size={13} />
      </span>
    );
  }

  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-400">
      <Circle size={13} />
    </span>
  );
}

export default ModuleProgress;
