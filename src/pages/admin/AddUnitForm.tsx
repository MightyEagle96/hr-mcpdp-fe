import React, { useState } from "react";
import { BookOpen, FileText, Hash, Save, X } from "lucide-react";

interface AddUnitFormProps {
  nextOrder: number;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    content: string;
    order: number;
  }) => void;
}

function AddUnitForm({
  nextOrder,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: AddUnitFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      order: nextOrder,
    });
  };

  return (
    <div className="mt-5 rounded-3xl border border-[#C63C38]/20 bg-[#C63C38]/[0.03] p-5 sm:p-6">
      {/* Form Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C63C38]/10 text-[#C63C38]">
              <BookOpen size={19} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Add New Unit</h3>

              <p className="mt-0.5 text-xs text-slate-500">Unit {nextOrder}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="unit-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Unit Title
            <span className="ml-1 text-[#C63C38]">*</span>
          </label>

          <div className="relative">
            <BookOpen
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="unit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Introduction to Computer-Based Testing"
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white
                pl-11
                pr-4
                text-sm
                text-slate-800
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:border-[#C63C38]
                focus:ring-4
                focus:ring-red-100
              "
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="unit-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
            <span className="ml-1 text-[#C63C38]">*</span>
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              id="unit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Briefly describe what this unit covers..."
              className="
                w-full
                resize-none
                rounded-2xl
                border
                border-slate-300
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                leading-6
                text-slate-800
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:border-[#C63C38]
                focus:ring-4
                focus:ring-red-100
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition-colors
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#C63C38]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-red-500/20
              transition-all
              hover:-translate-y-0.5
              hover:bg-[#B63431]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Save size={17} />

            {isSubmitting ? "Adding Unit..." : "Add Unit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUnitForm;
