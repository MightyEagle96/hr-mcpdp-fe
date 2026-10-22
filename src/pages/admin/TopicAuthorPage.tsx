import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Eye,
  Save,
  MoreVertical,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { httpService } from "../../httpService";

import TopicEditor from "../../components/editor/TopicEditor";
import { toast } from "sonner";
import { toastError } from "../../components/CustomToast";
import DeleteTopicDialog from "./DeleteTopicDialog";
import EditTopicDialog from "./EditTopicDialog";
import RichContent from "../../components/RichContent";
interface Module {
  _id: string;
  title: string;
  code: string;
}

interface Unit {
  _id: string;
  title: string;
  order: number;
}

interface Topic {
  _id: string;
  module: Module;
  unit: Unit;
  topic: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

function TopicAuthorPage() {
  const { moduleId, unitId, topicId } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdatingTopic, setIsUpdatingTopic] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchTopic = async () => {
    try {
      setIsLoading(true);

      // Replace with your actual API service
      const response = await httpService(`/topic/find_topic/${topicId}`);

      console.log(response.data);
      const data = response.data;

      console.log(data);

      setTopic(data);
      setContent(data.content || "");
      // if (!response.ok) {
      //   throw new Error("Failed to retrieve topic.");
      // }

      // const result = await response.json();

      // const data = result.data;

      // setTopic(data);
      //setContent(data.content || "");
    } catch (error) {
      console.error("Failed to load topic:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (topicId) {
      fetchTopic();
    }
  }, [topicId]);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const { data } = await httpService.post("topic/update_topic_content", {
        topicId,
        content,
      });

      toast.success(data.message);
    } catch (error) {
      toastError(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-5 w-64 rounded bg-slate-200" />
          <div className="h-10 w-2/3 rounded bg-slate-200" />
          <div className="h-[500px] rounded-3xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <h2 className="text-xl font-bold text-slate-900">Topic not found</h2>

          <p className="mt-2 text-sm text-slate-500">
            The topic you're looking for could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#B63431]"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = async (values: { topic: string; order: number }) => {
    if (isUpdatingTopic) return;

    try {
      setIsUpdatingTopic(true);

      await httpService.patch(`/topic/update_topic/${topic._id}`, values);

      setIsEditDialogOpen(false);

      // Reload the topic and its unit's topic list
      // so the updated title and order are displayed.
      await fetchTopic();
    } catch (error) {
      toastError(error);
      console.error("Failed to update topic:", error);
      // Display your application's error toast here.
    } finally {
      setIsUpdatingTopic(false);
    }
  };
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const deleteTopic = async () => {
    setIsDeleting(true);
    try {
      console.log(topicId);
      await httpService.delete(`/topic/delete_topic/${topicId}`);

      navigate(`/modules/view/unit/${unitId}`);
    } catch (error) {
      toastError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/modules"
            className="font-medium text-slate-500 transition hover:text-slate-900"
          >
            Modules
          </Link>

          <ChevronRight size={15} className="text-slate-300" />

          <Link
            to={`/modules/view/${moduleId}`}
            className="font-medium text-slate-500 transition hover:text-slate-900"
          >
            {topic.module.title}
          </Link>

          <ChevronRight size={15} className="text-slate-300" />

          <Link
            to={`/modules/view/unit/${unitId}`}
            className="font-medium text-slate-500 transition hover:text-slate-900"
          >
            Unit {topic.unit.order}
          </Link>

          <ChevronRight size={15} className="text-slate-300" />

          <span className="font-semibold text-slate-900">
            Topic {topic.order}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
              <BookOpen size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C63C38]">
                  Topic {topic.order}
                </span>
              </div>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {topic.topic}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {topic.module.title} · Unit {topic.unit.order}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Eye size={17} />
              Preview
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <Save size={17} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            {/* Actions Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Topic actions"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <MoreVertical size={20} />
              </button>

              {isMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsEditDialogOpen(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#C63C38]"
                  >
                    <Pencil size={16} />
                    Edit Topic
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      // TODO: Connect your delete confirmation.
                      handleDelete();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Delete Topic
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Authoring workspace */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Editor */}
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <TopicEditor
              value={content}
              onChange={setContent}
              placeholder="Start developing this topic..."
            />
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">Topic Information</h3>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Topic
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {topic.topic}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Module
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {topic.module.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Unit
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    Unit {topic.unit.order}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Topic Order
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {topic.order}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#C63C38]/10 bg-[#C63C38]/5 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Authoring tip
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Build the topic in clear sections and use headings, examples,
                images and videos where they help learners understand the
                material.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <DeleteTopicDialog
        isOpen={isDeleteDialogOpen}
        topicTitle={topic.topic}
        onClose={() => setIsDeleteDialogOpen(false)}
        isDeleting={isDeleting}
        onConfirm={deleteTopic}
      />

      <EditTopicDialog
        isOpen={isEditDialogOpen}
        topicTitle={topic.topic}
        currentOrder={topic.order}
        isSaving={isUpdatingTopic}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEdit}
      />

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsPreviewOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="content-preview-title"
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2
                  id="content-preview-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Content Preview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Preview how this content will appear to learners.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                aria-label="Close preview"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Preview content */}
            <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
              <RichContent html={content || ""} />
            </div>

            {/* Modal footer */}
            <div className="flex shrink-0 justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-xl bg-[#C63C38] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B63431]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicAuthorPage;
