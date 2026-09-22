import {
  ClipboardList,
  Eye,
  FileSpreadsheet,
  FileText,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { httpService } from "../../httpService";
import { toastError } from "../../components/CustomToast";
import { toast } from "sonner";

// interface Question {
//   question: string;
//   answer: string;
//   options: string[];
// }

// interface Assessment {
//   _id: string;
//   module: string;
//   unit: string;
//   questions: Question[];
//   createdAt: string;
//   updatedAt: string;
// }

interface Statistics {
  totalBanks: number;
  totalQuestions: number;
  banks: { _id: string; questionCount: number; createdAt: string }[];
}

interface AssessmentQuestion {
  question: string;
  answer: string;
  options: string[];
  explanation: string;
}

interface DeleteAssessmentProps {
  _id: string;
  questionCount: number;
}
function UnitAssessment() {
  const { moduleId, unitId } = useParams();

  const [statistics, setStatistics] = useState<Statistics>({
    totalBanks: 0,
    totalQuestions: 0,
    banks: [],
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [viewAssessment, setViewAssessment] = useState<string | null>(null);

  const [editAssessment, setEditAssessment] = useState<string | null>(null);

  const [deleteAssessment, setDeleteAssessment] =
    useState<DeleteAssessmentProps | null>(null);

  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const getAssessmentQuestions = async (assessmentId: string) => {
    try {
      setViewAssessment(assessmentId);
      setLoadingQuestions(true);
      setQuestions([]);

      const { data } = await httpService.get(
        `/assessment/view_questions/${assessmentId}`,
      );

      setQuestions(data);

      setLoadingQuestions(false);
      //setQuestions(data.data)
    } catch (error) {
      toastError(error);
    }
  };

  const getAssessmentStats = async () => {
    try {
      const { data } = await httpService.post(
        "/assessment/view_assessment_stats",
        { module: moduleId, unit: unitId },
      );

      setStatistics(data.data);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getAssessmentStats();
  }, [moduleId, unitId]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            to="/modules"
            className="transition-colors hover:text-[#C63C38]"
          >
            Modules
          </Link>

          <span>/</span>

          <Link
            to={`/modules/view/${moduleId}`}
            className="transition-colors hover:text-[#C63C38]"
          >
            Module
          </Link>

          <span>/</span>

          <Link
            to={`/modules/view/unit/${unitId}`}
            className="transition-colors hover:text-[#C63C38]"
          >
            Unit
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-800">Assessments</span>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#242625] text-white">
                <ClipboardList size={20} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Unit Assessments
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Question Banks
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage the assessment question banks associated with this unit.
              Questions can be uploaded in bulk using an Excel spreadsheet.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431]"
          >
            <Plus size={18} />
            Add Assessment
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Question Banks
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {statistics.totalBanks}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Questions
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {statistics.totalQuestions}
            </p>
          </div>
        </div>

        {/* Assessment Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Question Bank
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Created
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Questions
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {statistics.banks.map((assessment, index) => (
                  <tr
                    key={assessment._id}
                    className="transition-colors hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                          {index + 1}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            Bank {index + 1}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Assessment question bank
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatDate(assessment.createdAt)}
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {assessment.questionCount} Questions
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => getAssessmentQuestions(assessment._id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Eye size={16} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditAssessment(assessment._id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Upload size={16} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteAssessment(assessment)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition-colors hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-100 md:hidden">
            {statistics.banks.map((assessment, index) => (
              <div key={assessment._id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Bank {index + 1}
                      </p>

                      <p className="text-xs text-slate-400">
                        {formatDate(assessment.createdAt)}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                    {assessment.questionCount} Questions
                  </span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewAssessment(assessment._id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditAssessment(assessment._id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    <Upload size={16} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteAssessment(assessment)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Assessment Modal */}
      {showAddModal && (
        <AssessmentUploadModal
          title="Add Assessment"
          description="Upload an Excel file containing the questions for this question bank."
          onClose={() => setShowAddModal(false)}
          onSubmit={(file) => {
            getAssessmentStats();
            console.log("Add assessment:", file);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Edit Assessment Modal */}
      {editAssessment && (
        <AssessmentUploadModal
          title="Update Question Bank"
          description="Upload a new Excel file to update this question bank."
          onClose={() => setEditAssessment(null)}
          onSubmit={(file) => {
            console.log("Update assessment:", editAssessment, file);

            setEditAssessment(null);
          }}
        />
      )}

      {/* View Questions Modal */}
      {viewAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Assessment Questions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {loadingQuestions
                    ? "Loading questions..."
                    : `${questions.length} question${
                        questions.length === 1 ? "" : "s"
                      }`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setViewAssessment(null);
                  setQuestions([]);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {loadingQuestions ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-sm font-medium text-slate-500">
                    Loading questions...
                  </div>
                </div>
              ) : questions.length === 0 ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <FileText size={32} className="mx-auto text-slate-300" />

                    <p className="mt-3 font-semibold text-slate-700">
                      No questions found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      This question bank does not contain any questions.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((item, index) => (
                    <div
                      key={`${viewAssessment}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      {/* Question */}
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C63C38]/10 text-xs font-bold text-[#C63C38]">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-6 text-slate-900">
                            {item.question}
                          </p>

                          {/* Options */}
                          <div className="mt-4 grid gap-2">
                            {item.options.map((option, optionIndex) => {
                              const letter = String.fromCharCode(
                                65 + optionIndex,
                              );

                              const isCorrect =
                                item.answer === letter ||
                                item.answer === option;

                              return (
                                <div
                                  key={optionIndex}
                                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                                    isCorrect
                                      ? "border-emerald-200 bg-emerald-50"
                                      : "border-slate-100 bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                      isCorrect
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-white text-slate-500"
                                    }`}
                                  >
                                    {letter}
                                  </span>

                                  <span
                                    className={`pt-1 text-sm ${
                                      isCorrect
                                        ? "font-semibold text-emerald-800"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {option}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation */}
                          {item.explanation && (
                            <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
                              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                                Explanation
                              </p>

                              <p className="mt-1 text-sm leading-6 text-blue-900">
                                {item.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end border-t border-slate-200 bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setViewAssessment(null);
                  setQuestions([]);
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteAssessment && (
        <DeleteAssessmentModal
          assessment={deleteAssessment}
          onClose={() => setDeleteAssessment(null)}
          onConfirm={async () => {
            try {
              await httpService.delete(
                `/assessment/delete_assessment/${deleteAssessment._id}`,
              );
              getAssessmentStats();
              toast.success("Assessment deleted successfully");
            } catch (error) {
              toastError(error);
            }

            setDeleteAssessment(null);
          }}
        />
      )}
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

interface AssessmentUploadModalProps {
  title: string;
  description: string;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

function AssessmentUploadModal({
  title,
  description,
  onClose,
  onSubmit,
}: AssessmentUploadModalProps) {
  const { moduleId, unitId } = useParams();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("module", moduleId || "");
      formData.append("unit", unitId || "");

      const response = await httpService.post(
        "/assessment/create_assessment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Assessment created:", response.data);

      onSubmit(file);
    } catch (error) {
      console.error("Failed to create assessment:", error);
      toastError(error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <label
            htmlFor="assessment-file"
            className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition-all hover:border-[#C63C38] hover:bg-red-50/30"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm transition-colors group-hover:text-[#C63C38]">
              <FileSpreadsheet size={27} />
            </div>

            <p className="mt-4 font-semibold text-slate-900">
              {file ? file.name : "Choose an Excel spreadsheet"}
            </p>

            <p className="mt-1 text-sm text-slate-500">XLSX or XLS files</p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Upload size={16} />
              Browse File
            </span>

            <input
              id="assessment-file"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Expected Columns
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "question",

                "option 1",
                "option 2",
                "option 3",
                "option 4",
                "answer",
              ].map((column) => (
                <span
                  key={column}
                  className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                >
                  {column}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload size={16} />
            Upload Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

interface DeleteAssessmentModalProps {
  assessment: DeleteAssessmentProps;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteAssessmentModal({
  assessment,
  onClose,
  onConfirm,
}: DeleteAssessmentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <Trash2 size={21} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Delete Question Bank?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This will permanently delete this question bank and its{" "}
          <strong className="text-slate-700">
            {assessment.questionCount} questions
          </strong>
          . This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete Bank
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnitAssessment;
