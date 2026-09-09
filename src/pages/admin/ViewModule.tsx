import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  Edit3,
  FileText,
  ImageOff,
  Layers3,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { httpService } from "../../httpService";

interface Module {
  _id: string;
  title: string;
  description: string;
  code: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

function ViewModule() {
  const { identifier } = useParams<{ identifier: string }>();

  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (identifier) {
      getModule();
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
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/admin/modules"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#C63C38]"
          >
            <ArrowLeft size={17} />
            Back to Modules
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
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
