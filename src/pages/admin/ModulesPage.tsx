import React, { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  ImageOff,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  });

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getModules = async () => {
    try {
      setIsLoading(true);

      const { data } = await httpService.get("/module/find_all_modules", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search,
        },
      });

      setModules(data.data);
      setPagination(data.pagination);

      console.log(data);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModules();
  }, [pagination.page, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handlePreviousPage = () => {
    if (pagination.page <= 1) return;

    setPagination((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  const handleNextPage = () => {
    if (pagination.page >= pagination.totalPages) return;

    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
              <BookOpen size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Learning Modules
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage the curated learning modules available on the MCPDP
                platform.
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/modules/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C63C38] to-[#B63431] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/25"
        >
          <Plus size={18} />
          Create Module
        </Link>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search modules by title or code..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                text-slate-800
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:border-[#C63C38]
                focus:bg-white
                focus:ring-4
                focus:ring-red-100
              "
            />
          </div>

          {/* Count */}
          <div className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">
              {pagination.total}
            </span>{" "}
            {pagination.total === 1 ? "module" : "modules"}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Module
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Code
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Created
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <ModuleTableSkeleton />
              ) : modules.length === 0 ? (
                <EmptyTableState />
              ) : (
                modules.map((module) => (
                  <ModuleRow key={module._id} module={module} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="divide-y divide-slate-100 md:hidden">
          {isLoading ? (
            <MobileModuleSkeleton />
          ) : modules.length === 0 ? (
            <div className="px-6 py-16">
              <EmptyMobileState />
            </div>
          ) : (
            modules.map((module) => (
              <MobileModuleCard key={module._id} module={module} />
            ))
          )}
        </div>

        {/* Pagination */}
        {!isLoading && modules.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-semibold text-slate-700">
                {pagination.page}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {pagination.totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={pagination.page <= 1}
                className="
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-semibold
                  text-slate-600
                  transition-all
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={pagination.page >= pagination.totalPages}
                className="
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-semibold
                  text-slate-600
                  transition-all
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModulesPage;

function ModuleRow({ module }: { module: Module }) {
  return (
    <tr className="transition-colors hover:bg-slate-50/60">
      {/* Module */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <ModuleThumbnail module={module} />

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {module.title}
            </h3>

            <p className="mt-1 max-w-xl truncate text-sm text-slate-500">
              {module.description}
            </p>
          </div>
        </div>
      </td>

      {/* Code */}
      <td className="px-6 py-4">
        <span className="inline-flex rounded-lg bg-[#C63C38]/10 px-3 py-1.5 text-xs font-bold text-[#C63C38]">
          {module.code}
        </span>
      </td>

      {/* Created */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={15} />

          {new Date(module.createdAt).toLocaleDateString()}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/modules/view/${module._id}`}
            title="View module"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <Eye size={17} />
          </Link>

          <Link
            to={`/admin/modules/${module._id}/edit`}
            title="Edit module"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#C63C38]"
          >
            <Edit3 size={17} />
          </Link>

          <button
            type="button"
            title="Delete module"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function ModuleThumbnail({ module }: { module: Module }) {
  return (
    <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
      {module.imageUrl ? (
        <img
          src={module.imageUrl}
          alt={module.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <ImageOff size={20} className="text-slate-300" />
      )}
    </div>
  );
}

function MobileModuleCard({ module }: { module: Module }) {
  return (
    <div className="p-5">
      <div className="flex gap-4">
        <ModuleThumbnail module={module} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-slate-900">
                {module.title}
              </h3>

              <span className="mt-2 inline-flex rounded-lg bg-[#C63C38]/10 px-2.5 py-1 text-[11px] font-bold text-[#C63C38]">
                {module.code}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
        {module.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CalendarDays size={14} />
          {new Date(module.createdAt).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-1">
          <Link
            to={`/modules/view/${module._id}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <Eye size={16} />
          </Link>

          <Link
            to={`/admin/modules/${module._id}/edit`}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-[#C63C38]"
          >
            <Edit3 size={16} />
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyTableState() {
  return (
    <tr>
      <td colSpan={4}>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <BookOpen size={27} />
          </div>

          <h3 className="mt-5 font-semibold text-slate-900">
            No modules found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            There are no learning modules matching your search.
          </p>

          <Link
            to="/admin/modules/create"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B63431]"
          >
            <Plus size={17} />
            Create Module
          </Link>
        </div>
      </td>
    </tr>
  );
}
function EmptyMobileState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <BookOpen size={27} />
      </div>

      <h3 className="mt-5 font-semibold text-slate-900">No modules found</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        There are no learning modules matching your search.
      </p>

      <Link
        to="/admin/modules/create"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B63431]"
      >
        <Plus size={17} />
        Create Module
      </Link>
    </div>
  );
}

function ModuleTableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          <td className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-20 animate-pulse rounded-xl bg-slate-100" />

              <div className="space-y-2">
                <div className="h-4 w-48 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-72 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          </td>

          <td className="px-6 py-5">
            <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-100" />
          </td>

          <td className="px-6 py-5">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          </td>

          <td className="px-6 py-5">
            <div className="ml-auto h-9 w-28 animate-pulse rounded-xl bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

function MobileModuleSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-5">
          <div className="flex gap-4">
            <div className="h-14 w-20 animate-pulse rounded-xl bg-slate-100" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-6 w-20 animate-pulse rounded-lg bg-slate-100" />
            </div>
          </div>

          <div className="mt-4 h-10 w-full animate-pulse rounded bg-slate-100" />
        </div>
      ))}
    </>
  );
}
