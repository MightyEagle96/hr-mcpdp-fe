import React, { useState } from "react";
import { ArrowLeft, ImagePlus, BookOpen, FileText, Hash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import ConfirmModuleDialog from "./ConfirmModuleDialog";
import { httpService } from "../../httpService";
import { toast } from "sonner";
import { toastError } from "../../components/CustomToast";

interface ModuleFormData {
  title: string;
  description: string;
  code: string;
  imageUrl: string;
}

function CreateModule() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ModuleFormData>({
    title: "",
    description: "",
    code: "",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirmCreation = async () => {
    try {
      setIsSubmitting(true);

      setShowConfirmDialog(true);

      const { data } = await httpService.post(
        "/module/create_module",
        formData,
      );

      toast.success(data);

      setShowConfirmDialog(false);

      // After successful creation
      // navigate("/admin/modules");
    } catch (error) {
      console.error(error);
      toastError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelConfirmation = () => {
    if (isSubmitting) return;

    setShowConfirmDialog(false);
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/modules"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#C63C38]"
          >
            <ArrowLeft size={17} />
            Back to Modules
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
              <BookOpen size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create Module
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Add a new learning module to the HRORBN MCPDP platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* Main form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900">
                Module Information
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Provide the basic information learners will see when viewing
                this module.
              </p>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <Input
                label="Module Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Professional Ethics in Health Records Management"
                icon={<BookOpen size={18} />}
              />

              {/* Code */}
              <Input
                label="Module Code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. HRORBN-M01"
                icon={<Hash size={18} />}
                helperText="Use a unique code for this module."
              />

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-4 text-slate-400">
                    <FileText size={18} />
                  </div>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe what learners will gain from this module..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#C63C38] focus:ring-4 focus:ring-[#C63C38]/10"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Keep the description clear and concise. It will appear on the
                  module listing.
                </p>
              </div>

              {/* Image URL */}
              <Input
                label="Module Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                icon={<ImagePlus size={18} />}
                helperText="Optional. Add an image URL to represent this module."
              />
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/modules")}
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-gradient-to-r from-[#C63C38] to-[#B63431] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating Module..." : "Create Module"}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Module Preview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                See how the module may appear to learners.
              </p>
            </div>

            {/* Image */}
            <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt={formData.title || "Module preview"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                    <ImagePlus size={24} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-500">
                    Module image
                  </p>

                  <p className="mt-1 text-xs text-slate-400">Optional image</p>
                </div>
              )}
            </div>

            {/* Preview content */}
            <div className="mt-5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#C63C38]/10 px-3 py-1 text-xs font-bold text-[#C63C38]">
                  {formData.code || "MODULE CODE"}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold leading-tight text-slate-900">
                {formData.title || "Your module title"}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {formData.description ||
                  "Your module description will appear here once you begin filling out the form."}
              </p>
            </div>
          </div>
        </div>
      </form>

      <ConfirmModuleDialog
        open={showConfirmDialog}
        module={{
          title: formData.title,
          code: formData.code,
          description: formData.description,
        }}
        isSubmitting={isSubmitting}
        onCancel={handleCancelConfirmation}
        onConfirm={handleConfirmCreation}
      />
    </div>
  );
}

export default CreateModule;
