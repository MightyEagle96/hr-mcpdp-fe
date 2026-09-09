import React from "react";

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
            to={`/admin/modules/${module._id}`}
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
export default ModuleRow;
