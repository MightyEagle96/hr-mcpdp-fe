import {
  ArrowLeft,
  ClipboardCheck,
  Eye,
  FileText,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UploadQuestionBankModal from "../../components/UploadQuestionBankModal";
import { httpService } from "../../httpService";
import { toast } from "sonner";

interface Statistics {
  totalBanks: number;
  totalQuestions: number;
  banks: { _id: string; questionCount: number; createdAt: string }[];
}
interface QuestionBank {
  _id: string;
  questionCount: number;
  createdAt: string;
}
interface IQuestion {
  question: string;
  answer: string;
  options: string[];
  explanation: string;
}
function ModulePostTest() {
  const { moduleId } = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statistics, setStatistics] = useState<Statistics>({
    totalBanks: 0,
    totalQuestions: 0,
    banks: [],
    // _id: "",
    // questionCount: 0,
    // createdAt: "",
  });

  const [assessmentToDelete, setAssessmentToDelete] =
    useState<QuestionBank | null>(null);

  const [deletingAssessment, setDeletingAssessment] = useState<string | null>(
    null,
  );
  const [viewAssessment, setViewAssessment] = useState<string | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const handleUploadQuestionBank = async (file: File) => {
    if (!moduleId) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("module", moduleId);

      await httpService.post("/moduleassessment/create_posttest", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      viewStats();
      toast.success("Question bank uploaded successfully");

      setShowUploadModal(false);

      // Refresh stats/question banks here
      //await fetchAssessmentStats();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload question bank");
    } finally {
      setUploading(false);
    }
  };

  const viewStats = async () => {
    try {
      const { data } = await httpService.get(
        `/moduleassessment/view_posttest_stats/${moduleId}`,
      );
      setStatistics(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    viewStats();
  }, []);

  const handleViewAssessment = async (assessmentId: string) => {
    try {
      setViewAssessment(assessmentId);
      setLoadingQuestions(true);
      setQuestions([]);

      const response = await httpService.get(
        `/moduleassessment/view_posttest_questions/${assessmentId}`,
      );

      setQuestions(response.data);
    } catch (error) {
      console.error("Failed to fetch post-test questions:", error);

      toast.error("Failed to load assessment questions");

      setViewAssessment(null);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleDeleteAssessment = async () => {
    if (!assessmentToDelete) return;

    try {
      setDeletingAssessment(assessmentToDelete._id);

      await httpService.delete(
        `/moduleassessment/delete_posttest/${assessmentToDelete._id}`,
      );

      toast.success("Question bank deleted successfully");

      setAssessmentToDelete(null);

      await viewStats();
    } catch (error) {
      console.error("Failed to delete question bank:", error);
      toast.error("Failed to delete question bank");
    } finally {
      setDeletingAssessment(null);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              to={`/modules/view/${moduleId}`}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#C63C38]"
            >
              <ArrowLeft size={17} />
              Back to Module
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
                <ClipboardCheck size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#C63C38]">
                  Module Assessment
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Post-Test
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage the assessment questions learners take before
                  completing this module.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
            >
              <Eye size={17} />
              Preview
            </button>

            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#B63431]"
            >
              <Upload size={17} />
              Upload Questions
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Question Banks
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {statistics.totalBanks}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C63C38]/10 text-[#C63C38]">
                <FileText size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Questions
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {statistics.totalQuestions}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ClipboardCheck size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Question Banks */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Section Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Question Banks</h2>

              <p className="mt-1 text-sm text-slate-500">
                Question banks available for this module post-test.
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-[#C63C38]/20 bg-[#C63C38]/5 px-4 py-2.5 text-sm font-semibold text-[#C63C38] transition-colors hover:bg-[#C63C38]/10"
            >
              <Upload size={16} />
              Add Question Bank
            </button>
          </div>

          {/* Empty State */}
          {statistics.banks.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                <FileText size={24} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No question banks yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Upload an Excel question bank to begin building the post-test
                for this module.
              </p>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B63431]"
              >
                <Upload size={16} />
                Upload First Question Bank
              </button>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Question Bank
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Questions
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Created
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {statistics.banks.map((bank, index) => (
                    <tr
                      key={bank._id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      {/* Question Bank */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C63C38]/10 text-sm font-bold text-[#C63C38]">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                            <FileText size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              Question Bank {index + 1}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Post-Test Assessment
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Question Count */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                          {bank.questionCount}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {new Date(bank.createdAt).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewAssessment(bank._id)}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          {/* <button
                            type="button"
                            onClick={() => handleDeleteAssessment(bank)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition-colors hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button> */}

                          <button
                            type="button"
                            onClick={() => setAssessmentToDelete(bank)}
                            disabled={deletingAssessment === bank._id}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
          </div>
        </section>
      </main>

      <UploadQuestionBankModal
        isOpen={showUploadModal}
        loading={uploading}
        onClose={() => setShowUploadModal(false)}
        onSubmit={handleUploadQuestionBank}
      />

      {viewAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Post-Test Questions
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

            {/* Questions */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {loadingQuestions ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#C63C38]" />
                    Loading questions...
                  </div>
                </div>
              ) : questions.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <FileText size={32} className="text-slate-300" />

                  <p className="mt-3 font-semibold text-slate-700">
                    No questions found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    This question bank does not contain any questions.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <div className="flex gap-4">
                        {/* Number */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C63C38]/10 text-xs font-bold text-[#C63C38]">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* Question */}
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
                            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
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
            <div className="flex justify-end border-t border-slate-200 bg-white px-6 py-4">
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

      {assessmentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Trash2 size={20} />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Delete Question Bank
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAssessmentToDelete(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <p className="text-sm leading-6 text-slate-600">
                Are you sure you want to delete this question bank?
              </p>

              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Question Bank
                    </p>

                    <p className="text-xs text-slate-500">
                      {assessmentToDelete.questionCount} questions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setAssessmentToDelete(null)}
                disabled={!!deletingAssessment}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAssessment}
                disabled={!!deletingAssessment}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingAssessment ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Question Bank
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModulePostTest;
