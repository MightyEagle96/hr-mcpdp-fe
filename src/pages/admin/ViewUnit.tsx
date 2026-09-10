import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  Edit3,
  FileText,
  Layers3,
  Plus,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { httpService } from "../../httpService";

interface Module {
  _id: string;
  title: string;
  code: string;
}

interface Unit {
  _id: string;
  module: Module;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

function ViewUnit() {
  const { identifier } = useParams<{ identifier: string }>();

  const [unit, setUnit] = useState<Unit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUnit = async () => {
    try {
      setIsLoading(true);

      // TODO: Connect to API
      //
      const { data } = await httpService.get(`/unit/find_unit/${identifier}`);

      console.log(data);

      setUnit(data.data);
      console.log("Fetching unit:", identifier);
    } catch (error) {
      console.error("Failed to fetch unit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (identifier) {
      getUnit();
    }
  }, [identifier]);

  if (isLoading) {
    return <ViewUnitSkeleton />;
  }

  if (!unit) {
    return <UnitNotFound />;
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 overflow-x-auto text-sm">
        <Link
          to="/modules"
          className="shrink-0 font-medium text-slate-500 transition-colors hover:text-[#C63C38]"
        >
          Modules
        </Link>

        <ChevronRight size={15} className="shrink-0 text-slate-300" />

        <Link
          to={`/modules/view/${unit.module._id}`}
          className="max-w-[220px] truncate font-medium text-slate-500 transition-colors hover:text-[#C63C38]"
        >
          {unit.module.title}
        </Link>

        <ChevronRight size={15} className="shrink-0 text-slate-300" />

        <span className="shrink-0 font-semibold text-slate-900">
          Unit {unit.order}
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {/* Unit Badge */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-lg font-black text-[#C63C38]">
              {unit.order}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C63C38]">
                Unit {unit.order}
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {unit.title}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            {unit.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
          >
            <Edit3 size={17} />
            Edit Unit
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-50"
          >
            <Trash2 size={17} />
            Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Topics */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Layers3 size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">Topics</h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Organize this unit into focused learning topics.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431]"
            >
              <Plus size={17} />
              Add Topic
            </button>
          </div>

          {/* Empty Topics */}
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <FileText size={24} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No topics added yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Start building this unit by adding the topics that learners will
              study.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B63431]"
            >
              <Plus size={16} />
              Add First Topic
            </button>
          </div>
        </div>

        {/* Unit Information */}
        <div className="space-y-6">
          {/* Module */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Parent Module</h3>

            <Link
              to={`/admin/modules/${unit.module._id}`}
              className="mt-4 block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-[#C63C38]/30 hover:bg-[#C63C38]/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C63C38] shadow-sm">
                  <BookOpen size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {unit.module.title}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#C63C38]">
                    {unit.module.code}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Unit Information */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Unit Information</h3>

            <div className="mt-5 space-y-5">
              <InfoItem
                icon={<HashIcon />}
                label="Unit Order"
                value={`Unit ${unit.order}`}
              />

              <InfoItem
                icon={<CalendarDays size={17} />}
                label="Created"
                value={formatDate(unit.createdAt)}
              />

              <InfoItem
                icon={<Clock3 size={17} />}
                label="Last Updated"
                value={formatDate(unit.updatedAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUnit;

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

        <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function HashIcon() {
  return <span className="text-sm font-black">#</span>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ViewUnitSkeleton() {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="h-5 w-64 animate-pulse rounded bg-slate-200" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />

          <div className="space-y-2">
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
            <div className="h-8 w-72 animate-pulse rounded bg-slate-200" />
          </div>
        </div>

        <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
      </div>

      {/* Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="h-96 animate-pulse rounded-3xl bg-white" />

        <div className="space-y-6">
          <div className="h-44 animate-pulse rounded-3xl bg-white" />
          <div className="h-56 animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    </div>
  );
}

function UnitNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Layers3 size={27} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Unit not found
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          The unit you're looking for may have been removed or the identifier is
          invalid.
        </p>

        <Link
          to="/modules"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B63431]"
        >
          <ArrowLeft size={17} />
          Back to Modules
        </Link>
      </div>
    </div>
  );
}
