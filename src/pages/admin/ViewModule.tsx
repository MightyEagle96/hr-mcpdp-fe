import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Edit3,
  FileText,
  ImageOff,
  Layers3,
  LoaderCircle,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { httpService } from "../../httpService";
import AddUnitForm from "./AddUnitForm";
import { toast } from "sonner";
import { toastError } from "../../components/CustomToast";

interface Module {
  _id: string;
  title: string;
  description: string;
  code: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface Unit {
  _id: string;
  module: string;
  title: string;
  description: string;
  content?: string;
  order: number;
  topics: number;
  createdAt: string;
  updatedAt: string;
}

type PreviewTopic = {
  id: string;
  title: string;
  order: number;
  hasContent: boolean;
};

type PreviewUnit = {
  id: string;
  title: string;
  order: number;
  topicCount: number;
  topicsWithContent: number;
  topicsWithoutContent: number;
  topics: PreviewTopic[];
  assessment: {
    exists: boolean;
    bankCount: number;
  };
};

type ModulePreview = {
  module: {
    id: string;
    title: string;
    code: string;
    status: string;
  };
  summary: {
    totalUnits: number;
    totalTopics: number;
    topicsWithContent: number;
    topicsWithoutContent: number;
    unitsWithAssessment: number;
    unitsWithoutAssessment: number;
    totalUnitAssessmentBanks: number;
    totalPretestBanks: number;
    totalPostTestBanks: number;
    hasPretest: boolean;
    hasPostTest: boolean;
    readyForPublication: boolean;
    issueCount: number;
  };
  units: PreviewUnit[];
  issues: {
    code: string;
    message: string;
    unitId?: string;
    topicId?: string;
  }[];
};
function ViewModule() {
  const { identifier } = useParams<{ identifier: string }>();

  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [units, setUnits] = useState<Unit[]>([]);
  const [showAddUnit, setShowAddUnit] = useState(false);

  const [isCreatingUnit, setIsCreatingUnit] = useState(false);

  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<ModulePreview | null>(null);
  const [previewError, setPreviewError] = useState("");

  const handlePreviewModule = async () => {
    setPreviewLoading(true);
    setPreviewError("");
    setPreviewOpen(true);
    setPreviewData(null);

    try {
      const response = await httpService.get(
        `/module/preview_module/${identifier}`,
      );

      setPreviewData(response.data.data);
    } catch (error) {
      if (error) {
        toastError(error);
        // setPreviewError(
        //   error.response?.data?.message ??
        //     error.response?.data?.error ??
        //     "Unable to generate the module preview. Please try again.",
        // );
      } else {
        setPreviewError("An unexpected error occurred.");
      }
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleCreateUnit = async (data: {
    title: string;
    description: string;
    content: string;
    order: number;
  }) => {
    if (!identifier) return;

    try {
      setIsCreatingUnit(true);

      const payload = {
        module: identifier,
        title: data.title,
        description: data.description,
        content: data.content,
        order: data.order,
      };

      const response = await httpService.post("unit/create_unit", payload);

      toast.success(response.data.message);

      getUnits();
      // TODO:
      // const { data: response } = await httpService.post(
      //   "/units",
      //   payload,
      // );

      // setUnits((prev) => [...prev, response.data]);

      setShowAddUnit(false);
    } catch (error) {
      toastError(error);
      console.error("Failed to create unit:", error);
    } finally {
      setIsCreatingUnit(false);
    }
  };

  const getModule = async () => {
    try {
      setIsLoading(true);

      // TODO: Connect to API
      //
      const { data } = await httpService.get(
        `/module/find_module/${identifier}`,
      );
      console.log(data);
      setModule(data.data);

      console.log("Fetching module:", identifier);
    } catch (error) {
      console.error("Failed to fetch module:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUnits = async () => {
    try {
      const { data } = await httpService.get("unit/find_all_units", {
        params: { module: identifier },
      });

      setUnits(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (identifier) {
      getModule();

      getUnits();
    }
  }, [identifier]);
  if (isLoading) {
    return <ViewModuleSkeleton />;
  }

  if (!module) {
    return <ModuleNotFound />;
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* Page Heading */}
        <div>
          <Link
            to="/modules"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#C63C38]"
          >
            <ArrowLeft size={17} />
            Back to Modules
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
              <BookOpen size={21} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C63C38]">
                Learning Module
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Module Details
              </h1>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Module Actions */}
          <div className="flex items-center gap-3">
            <Link
              to={`/admin/modules/${module._id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
            >
              <Edit3 size={17} />
              Edit Module
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-50"
            >
              <Trash2 size={17} />
              Delete
            </button>
          </div>

          {/* Assessment Actions */}
          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-3">
            <Link
              to={`/modules/pretest/${module._id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#C63C38]/20 bg-[#C63C38]/5 px-4 py-2.5 text-sm font-semibold text-[#C63C38] shadow-sm transition-all hover:bg-[#C63C38]/10"
            >
              <ClipboardCheck size={17} />
              Pre-Test
            </Link>

            <Link
              to={`/modules/posttest/${module._id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-100"
            >
              <ClipboardCheck size={17} />
              Post-Test
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Module Overview */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Image */}
          <div className="relative aspect-[16/6] overflow-hidden bg-slate-100">
            {module.imageUrl ? (
              <img
                src={module.imageUrl}
                alt={module.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-slate-400">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <ImageOff size={27} />
                </div>

                <p className="mt-3 text-sm font-medium">No module image</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#C63C38]/10 px-3 py-1.5 text-xs font-bold text-[#C63C38]">
                {module.code}
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                Active
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              {module.title}
            </h2>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-[#C63C38]" />

                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Description
                </h3>
              </div>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
                {module.description}
              </p>
            </div>
          </div>
        </div>

        {/* Module Information */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Module Information</h3>

            <div className="mt-5 space-y-5">
              <InfoItem
                icon={<BookOpen size={17} />}
                label="Module Code"
                value={module.code}
              />

              <InfoItem
                icon={<CalendarDays size={17} />}
                label="Created"
                value={formatDate(module.createdAt)}
              />

              <InfoItem
                icon={<Clock3 size={17} />}
                label="Last Updated"
                value={formatDate(module.updatedAt)}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C63C38] shadow-sm">
                  <ClipboardCheck size={20} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-800">
                    Module Quality Control
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Review your module structure, verify lesson content, and
                    ensure all required assessment banks are available before
                    publication.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePreviewModule}
                disabled={previewLoading}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {previewLoading ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Generating Preview...
                  </>
                ) : (
                  <>
                    <ClipboardCheck size={17} />
                    Preview Module
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content Management */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Layers3 size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">Learning Content</h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Lessons, learning materials and assessments associated with
                  this module will appear here.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold text-slate-600">
                Content management coming next
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                We'll build the module curriculum and assessment workflow around
                this section.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Layers3 size={20} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Learning Content</h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Organize this module into units and topics.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddUnit(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431]"
          >
            <Plus size={17} />
            Add Unit
          </button>
        </div>

        {/* Add Unit Form */}
        {showAddUnit && (
          <AddUnitForm
            nextOrder={units.length + 1}
            onCancel={() => setShowAddUnit(false)}
            onSubmit={handleCreateUnit}
            isSubmitting={isCreatingUnit}
          />
        )}

        {/* Units */}
        <div className="mt-6 space-y-3">
          {units.length === 0 ? (
            <EmptyUnitsState onAddUnit={() => setShowAddUnit(true)} />
          ) : (
            units.map((unit) => <UnitCard key={unit._id} unit={unit} />)
          )}
        </div>
      </div>

      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="module-preview-title"
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FCEDEC] text-[#C63C38]">
                  <ClipboardCheck size={22} />
                </div>

                <div>
                  <h2
                    id="module-preview-title"
                    className="text-lg font-bold text-slate-900 sm:text-xl"
                  >
                    Module Quality Preview
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review your learning content and assessment readiness.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                aria-label="Close module preview"
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              {previewLoading && (
                <div className="flex min-h-64 flex-col items-center justify-center gap-4">
                  <LoaderCircle
                    size={38}
                    className="animate-spin text-[#C63C38]"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-slate-800">
                      Inspecting module...
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Checking units, topics, content and assessment banks.
                    </p>
                  </div>
                </div>
              )}

              {!previewLoading && previewError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      size={22}
                      className="shrink-0 text-red-600"
                    />
                    <div>
                      <p className="font-semibold text-red-800">
                        Preview could not be generated
                      </p>
                      <p className="mt-1 text-sm leading-6 text-red-700">
                        {previewError}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePreviewModule}
                    className="mt-4 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#B63431]"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!previewLoading && !previewError && previewData && (
                <div className="space-y-6">
                  {/* Module overview */}
                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {previewData.module.code}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-slate-900">
                        {previewData.module.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Module status: {previewData.module.status}
                      </p>
                    </div>

                    <div
                      className={`inline-flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${
                        previewData.summary.readyForPublication
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {previewData.summary.readyForPublication ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <AlertTriangle size={18} />
                      )}

                      {previewData.summary.readyForPublication
                        ? "All Checks Passed"
                        : `${previewData.summary.issueCount} Issue(s) Found`}
                    </div>
                  </div>

                  {/* Summary cards */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      {
                        label: "Total Units",
                        value: previewData.summary.totalUnits,
                      },
                      {
                        label: "Total Topics",
                        value: previewData.summary.totalTopics,
                      },
                      {
                        label: "Topics With Content",
                        value: previewData.summary.topicsWithContent,
                      },
                      {
                        label: "Assessment Banks",
                        value: previewData.summary.totalUnitAssessmentBanks,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="text-xs leading-5 text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Required assessment banks */}
                  <section>
                    <h3 className="mb-3 font-bold text-slate-900">
                      Module Assessments
                    </h3>

                    <div className="space-y-3">
                      {[
                        {
                          label: "Pretest",
                          count: previewData.summary.totalPretestBanks,
                          exists: previewData.summary.hasPretest,
                        },
                        {
                          label: "Post-test",
                          count: previewData.summary.totalPostTestBanks,
                          exists: previewData.summary.hasPostTest,
                        },
                      ].map((assessment) => (
                        <div
                          key={assessment.label}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
                        >
                          <div>
                            <p className="font-semibold text-slate-800">
                              {assessment.label}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {assessment.count} bank(s) found
                            </p>
                          </div>

                          {assessment.exists ? (
                            <CheckCircle2
                              size={20}
                              className="shrink-0 text-emerald-600"
                            />
                          ) : (
                            <AlertTriangle
                              size={20}
                              className="shrink-0 text-red-600"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Unit and topic inspection */}
                  <section>
                    <h3 className="mb-3 font-bold text-slate-900">
                      Units and Learning Topics
                    </h3>

                    {previewData.units.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                        No units have been added to this module.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {previewData.units.map((unit) => (
                          <div
                            key={unit.id}
                            className="overflow-hidden rounded-2xl border border-slate-200"
                          >
                            <div className="flex flex-col gap-3 bg-slate-50 p-4 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                  Unit {unit.order + 1}
                                </p>
                                <h4 className="mt-1 font-bold text-slate-900">
                                  {unit.title}
                                </h4>
                                <p className="mt-1 text-sm text-slate-500">
                                  {unit.topicCount} topic(s)
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <span
                                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                                    unit.assessment.exists
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  {unit.assessment.bankCount} assessment bank(s)
                                </span>

                                <span className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                                  {unit.topicsWithContent}/{unit.topicCount}{" "}
                                  populated
                                </span>
                              </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                              {unit.topics.map((topic) => (
                                <div
                                  key={topic.id}
                                  className="flex items-start gap-3 p-4"
                                >
                                  {topic.hasContent ? (
                                    <CheckCircle2
                                      size={18}
                                      className="mt-0.5 shrink-0 text-emerald-600"
                                    />
                                  ) : (
                                    <AlertTriangle
                                      size={18}
                                      className="mt-0.5 shrink-0 text-red-600"
                                    />
                                  )}

                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-800">
                                      {topic.title}
                                    </p>
                                    {!topic.hasContent && (
                                      <p className="mt-1 text-xs font-medium text-red-600">
                                        Learning content is missing
                                      </p>
                                    )}
                                  </div>

                                  <span className="shrink-0 text-xs text-slate-400">
                                    Topic {topic.order + 1}
                                  </span>
                                </div>
                              ))}

                              {unit.topics.length === 0 && (
                                <p className="p-4 text-sm text-red-600">
                                  This unit has no topics.
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* Issues */}
                  <section>
                    <h3 className="mb-3 font-bold text-slate-900">
                      Quality Control Findings
                    </h3>

                    {previewData.issues.length === 0 ? (
                      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <CheckCircle2
                          size={21}
                          className="shrink-0 text-emerald-700"
                        />
                        <div>
                          <p className="font-semibold text-emerald-800">
                            Excellent work!
                          </p>
                          <p className="mt-1 text-sm text-emerald-700">
                            All configured module quality checks have passed.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {previewData.issues.map((issue, index) => (
                          <div
                            key={`${issue.code}-${issue.topicId ?? issue.unitId ?? index}`}
                            className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-3.5"
                          >
                            <AlertTriangle
                              size={18}
                              className="mt-0.5 shrink-0 text-red-600"
                            />
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {issue.message}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                {issue.code}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
              <p className="hidden text-xs text-slate-500 sm:block">
                Module quality control report
              </p>

              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="ml-auto rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
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

export default ViewModule;

function ModuleNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <BookOpen size={27} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Module not found
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          The module you're looking for may have been removed or the identifier
          is invalid.
        </p>

        <Link
          to="/admin/modules"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B63431]"
        >
          <ArrowLeft size={17} />
          Back to Modules
        </Link>
      </div>
    </div>
  );
}

function ViewModuleSkeleton() {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-200" />

          <div className="space-y-2">
            <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
            <div className="h-7 w-48 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="aspect-[16/6] animate-pulse bg-slate-100" />

          <div className="space-y-5 p-6 sm:p-8">
            <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
            <div className="h-9 w-2/3 animate-pulse rounded bg-slate-100" />

            <div className="space-y-3">
              <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-64 animate-pulse rounded-3xl bg-white" />
          <div className="h-52 animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function UnitCard({ unit }: { unit: Unit }) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-slate-50/60 transition-all hover:border-slate-300 hover:bg-slate-50">
      <Link
        to={`/modules/view/unit/${unit._id}`}
        className="flex items-start gap-4 p-4 pr-24 sm:p-5 sm:pr-28"
      >
        {/* Order */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#C63C38] shadow-sm">
          {unit.order}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-slate-900 transition-colors group-hover:text-[#C63C38]">
            {unit.title}
          </h4>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {unit.description}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Topics</span>

            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-500">
              {unit.topics}
            </span>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white hover:text-[#C63C38]"
          title="Edit unit"
        >
          <Edit3 size={16} />
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
          title="Delete unit"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function EmptyUnitsState({ onAddUnit }: { onAddUnit: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
        <Layers3 size={24} />
      </div>

      <h4 className="mt-4 font-semibold text-slate-900">No units added yet</h4>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Start building this module by adding its first learning unit.
      </p>

      <button
        type="button"
        onClick={onAddUnit}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B63431]"
      >
        <Plus size={16} />
        Add First Unit
      </button>
    </div>
  );
}
