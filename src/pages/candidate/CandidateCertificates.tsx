import { useMemo, useState } from "react";
import {
  Award,
  Download,
  Eye,
  Search,
  ShieldCheck,
  FileBadge,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  certificateNumber: string;
  issuedDate: string;
  expiryDate: string;
  status: "Issued" | "Processing" | "Expired";
  duration: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    title: "Professional Ethics and Nursing Practice",
    certificateNumber: "MCPDP-2026-00124",
    issuedDate: "12 Sep 2026",
    expiryDate: "12 Sep 2027",
    status: "Issued",
    duration: "12 Hours",
  },
  {
    id: "2",
    title: "Patient Safety and Quality Healthcare",
    certificateNumber: "MCPDP-2026-00108",
    issuedDate: "28 Aug 2026",
    expiryDate: "28 Aug 2027",
    status: "Issued",
    duration: "8 Hours",
  },
  {
    id: "3",
    title: "Infection Prevention and Control",
    certificateNumber: "MCPDP-2026-00096",
    issuedDate: "15 Aug 2026",
    expiryDate: "15 Aug 2027",
    status: "Issued",
    duration: "10 Hours",
  },
  {
    id: "4",
    title: "Leadership and Management in Nursing",
    certificateNumber: "MCPDP-2026-00131",
    issuedDate: "",
    expiryDate: "",
    status: "Processing",
    duration: "6 Hours",
  },
  {
    id: "5",
    title: "Evidence-Based Nursing Practice",
    certificateNumber: "MCPDP-2025-00042",
    issuedDate: "10 Jun 2025",
    expiryDate: "10 Jun 2026",
    status: "Expired",
    duration: "8 Hours",
  },
];

const statusStyles = {
  Issued: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Processing: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Expired: "bg-red-50 text-red-700 ring-red-600/20",
};

function CandidateCertificates() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const filteredCertificates = useMemo(() => {
    return mockCertificates.filter((certificate) => {
      const matchesSearch =
        certificate.title.toLowerCase().includes(search.toLowerCase()) ||
        certificate.certificateNumber
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || certificate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCertificates.length / pageSize),
  );

  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const issuedCount = mockCertificates.filter(
    (certificate) => certificate.status === "Issued",
  ).length;

  const processingCount = mockCertificates.filter(
    (certificate) => certificate.status === "Processing",
  ).length;

  const expiredCount = mockCertificates.filter(
    (certificate) => certificate.status === "Expired",
  ).length;

  const handleViewCertificate = (certificate: Certificate) => {
    // Certificate preview will be implemented later.
    console.log("View certificate:", certificate.id);
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    // PDF download will be implemented later.
    console.log("Download certificate:", certificate.id);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <BookOpen size={16} />
              <span>My Learning</span>
              <span>/</span>
              <span className="font-medium text-emerald-700">Certificates</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Certificates
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              View and download certificates earned from your completed
              professional development programmes.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
            <ShieldCheck className="text-emerald-600" size={22} />
            <div>
              <p className="text-xs text-slate-500">Professional records</p>
              <p className="text-sm font-semibold text-slate-800">
                Secure & verified
              </p>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Award size={23} />
              </div>
              <span className="text-xs font-medium text-slate-400">
                ALL TIME
              </span>
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              {mockCertificates.length.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm text-slate-500">Total certificates</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FileBadge size={23} />
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              {issuedCount.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm text-slate-500">Certificates issued</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock size={23} />
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              {processingCount.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm text-slate-500">Processing</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FileBadge size={23} />
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              {expiredCount.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm text-slate-500">Expired certificates</p>
          </div>
        </div>

        {/* Certificate list */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Certificate records
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  A record of your professional development achievements.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    placeholder="Search certificates..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-64"
                  />
                </div>

                <div className="relative">
                  <Filter
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    value={statusFilter}
                    onChange={(event) => handleStatusChange(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-44"
                  >
                    <option value="All">All statuses</option>
                    <option value="Issued">Issued</option>
                    <option value="Processing">Processing</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80">
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Certificate</th>
                  <th className="px-6 py-4">Certificate number</th>
                  <th className="px-6 py-4">Date issued</th>
                  <th className="px-6 py-4">Validity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedCertificates.map((certificate) => (
                  <tr
                    key={certificate.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <Award size={21} />
                        </div>
                        <div className="max-w-xs">
                          <p className="text-sm font-semibold text-slate-800">
                            {certificate.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {certificate.duration} of learning
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                      {certificate.certificateNumber}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                      {certificate.issuedDate || "—"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                      {certificate.expiryDate || "—"}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[certificate.status]}`}
                      >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                        {certificate.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewCertificate(certificate)}
                          title="View certificate"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={certificate.status !== "Issued"}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadCertificate(certificate)}
                          title="Download certificate"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={certificate.status !== "Issued"}
                        >
                          <Download size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedCertificates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Award size={27} />
                      </div>
                      <p className="mt-4 font-semibold text-slate-800">
                        No certificates found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try another search term or change the status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile certificate cards */}
          <div className="space-y-3 p-4 md:hidden">
            {paginatedCertificates.map((certificate) => (
              <article
                key={certificate.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Award size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-5 text-slate-900">
                      {certificate.title}
                    </h3>
                    <p className="mt-1 break-all text-xs text-slate-500">
                      {certificate.certificateNumber}
                    </p>
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[certificate.status]}`}
                      >
                        {certificate.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
                  <div>
                    <p className="text-xs text-slate-500">Date issued</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {certificate.issuedDate || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Valid until</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {certificate.expiryDate || "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    disabled={certificate.status !== "Issued"}
                    onClick={() => handleViewCertificate(certificate)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    type="button"
                    disabled={certificate.status !== "Issued"}
                    onClick={() => handleDownloadCertificate(certificate)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </article>
            ))}

            {paginatedCertificates.length === 0 && (
              <div className="px-4 py-12 text-center">
                <Award size={30} className="mx-auto text-slate-300" />
                <p className="mt-3 font-semibold text-slate-800">
                  No certificates found
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredCertificates.length === 0
                  ? 0
                  : (currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-slate-700">
                {Math.min(currentPage * pageSize, filteredCertificates.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {filteredCertificates.length}
              </span>{" "}
              certificates
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage >= totalPages}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Helpful note */}
        <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-700" />
          <div>
            <p className="text-sm font-semibold text-emerald-900">
              Keep your professional records up to date
            </p>
            <p className="mt-1 text-sm leading-6 text-emerald-800/80">
              Download and retain copies of your certificates for your
              professional records. If a certificate is missing or contains
              incorrect information, please contact the programme administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateCertificates;
