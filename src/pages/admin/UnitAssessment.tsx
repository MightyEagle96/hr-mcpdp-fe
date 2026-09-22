import {
  ClipboardList,
  Eye,
  FileSpreadsheet,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Question {
  question: string;
  answer: string;
  options: string[];
  explanation: string;
}

interface Assessment {
  _id: string;
  module: string;
  unit: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

const sampleAssessments: Assessment[] = [
  {
    _id: "1",
    module: "module-1",
    unit: "unit-1",
    createdAt: "2026-09-22T08:30:00.000Z",
    updatedAt: "2026-09-22T08:30:00.000Z",
    questions: Array.from({ length: 50 }, (_, index) => ({
      question: `Sample assessment question ${index + 1}`,
      answer: "Option A",
      options: ["Option A", "Option B", "Option C", "Option D"],
      explanation: "Explanation for this question.",
    })),
  },
  {
    _id: "2",
    module: "module-1",
    unit: "unit-1",
    createdAt: "2026-09-18T10:15:00.000Z",
    updatedAt: "2026-09-18T10:15:00.000Z",
    questions: Array.from({ length: 100 }, (_, index) => ({
      question: `Another assessment question ${index + 1}`,
      answer: "Option B",
      options: ["Option A", "Option B", "Option C", "Option D"],
      explanation: "Explanation for this question.",
    })),
  },
];

function UnitAssessment() {
  const { moduleId, unitId } = useParams();

  const [assessments, setAssessments] =
    useState<Assessment[]>(sampleAssessments);

  const [showAddModal, setShowAddModal] = useState(false);
  const [viewAssessment, setViewAssessment] = useState<Assessment | null>(null);

  const [editAssessment, setEditAssessment] = useState<Assessment | null>(null);

  const [deleteAssessment, setDeleteAssessment] = useState<Assessment | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            to="/admin/modules"
            className="transition-colors hover:text-[#C63C38]"
          >
            Modules
          </Link>

          <span>/</span>

          <Link
            to={`/admin/modules/${moduleId}`}
            className="transition-colors hover:text-[#C63C38]"
          >
            Module
          </Link>

          <span>/</span>

          <Link
            to={`/admin/modules/${moduleId}/units/${unitId}`}
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
              {assessments.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Questions
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {assessments.reduce(
                (total, assessment) => total + assessment.questions.length,
                0,
              )}
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
                {assessments.map((assessment, index) => (
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
                        {assessment.questions.length} Questions
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setViewAssessment(assessment)}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Eye size={16} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditAssessment(assessment)}
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
            {assessments.map((assessment, index) => (
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
                    {assessment.questions.length}
                  </span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewAssessment(assessment)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditAssessment(assessment)}
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
            console.log("Update assessment:", editAssessment._id, file);

            setEditAssessment(null);
          }}
        />
      )}

      {/* View Questions Modal */}
      {viewAssessment && (
        <ViewQuestionsModal
          assessment={viewAssessment}
          onClose={() => setViewAssessment(null)}
        />
      )}

      {/* Delete Modal */}
      {deleteAssessment && (
        <DeleteAssessmentModal
          assessment={deleteAssessment}
          onClose={() => setDeleteAssessment(null)}
          onConfirm={() => {
            setAssessments((current) =>
              current.filter((item) => item._id !== deleteAssessment._id),
            );

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
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) return;

    onSubmit(file);
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
                "answer",
                "option 1",
                "option 2",
                "option 3",
                "option 4",
                "explanation",
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

interface ViewQuestionsModalProps {
  assessment: Assessment;
  onClose: () => void;
}

function ViewQuestionsModal({ assessment, onClose }: ViewQuestionsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">
                Question Bank
              </h2>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                {assessment.questions.length} Questions
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Created {formatDate(assessment.createdAt)}
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

        {/* Questions */}
        <div className="overflow-y-auto p-6">
          <div className="space-y-4">
            {assessment.questions.map((question, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#242625] text-xs font-bold text-white">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-6 text-slate-900">
                      {question.question}
                    </p>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`rounded-xl border px-3 py-2.5 text-sm ${
                            option === question.answer
                              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                              : "border-slate-200 bg-white text-slate-600"
                          }`}
                        >
                          <span className="mr-2 font-bold">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>

                          {option}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Explanation
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-100 bg-slate-50/70 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#242625] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5D605F]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface DeleteAssessmentModalProps {
  assessment: Assessment;
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
            {assessment.questions.length} questions
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
