import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { httpService } from "../../httpService";
import { toastError } from "../../components/CustomToast";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Loader2,
} from "lucide-react";

interface TopicContent {
  _id: string;
  topic: string;
  content: string;
  order: number;
  unit: string;
  module: string;
}

function ModuleContent() {
  const [params] = useSearchParams();

  const { id } = useParams();

  const unit = params.get("unit");
  const topic = params.get("topic");

  const [content, setContent] = useState<TopicContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getData = async () => {
    if (!unit || !topic) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await httpService.get("/moduleprogress/get_content", {
        params: {
          unit,
          topic,
        },
      });

      setContent(data.data ?? data);
    } catch (error) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [unit, topic]);

  const markAsComplete = async () => {
    try {
      const { data } = await httpService.post(
        `/moduleprogress/mark_as_complete`,
        {
          module: id,
          unit,
          topic,
        },
      );
      navigate(data.nextRoute);
    } catch (error) {
      toastError(error);
    }
  };

  if (!unit || !topic) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-[#F7F8F8] p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
            <BookOpen size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Select a topic
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Select a topic from the learning menu to begin studying.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <ContentSkeleton />;
  }

  if (!content) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-[#F7F8F8] p-6">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            Unable to load this topic.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-w-0 flex-1 bg-[#F7F8F8]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C63C38]/10 text-[#C63C38]">
              <BookOpen size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Learning Content
              </p>

              <p className="truncate text-sm font-semibold text-slate-800">
                Topic {content.order}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <Clock3 size={15} />
            <span>Learning session</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Topic heading */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-[#C63C38]/10 px-3 py-1 text-xs font-bold text-[#C63C38]">
              Topic {content.order}
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {content.topic}
          </h1>

          <div className="mt-5 h-1 w-16 rounded-full bg-[#C63C38]" />
        </header>

        {/* Rich text content */}
        <article
          className="
            prose prose-slate max-w-none
            prose-headings:font-bold
            prose-headings:text-slate-900
            prose-p:text-[16px]
            prose-p:leading-8
            prose-p:text-slate-700
            prose-li:text-slate-700
            prose-strong:text-slate-900
            prose-a:text-[#C63C38]
            prose-blockquote:border-[#C63C38]
            prose-blockquote:text-slate-600
            prose-img:rounded-2xl
            prose-img:shadow-sm
            prose-table:w-full
          "
          dangerouslySetInnerHTML={{
            __html: content.content || "",
          }}
        />

        {/* Completion section */}
        <div className="mt-14 border-t border-slate-200 pt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Finished this topic?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Mark this topic as complete to continue with your learning.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={markAsComplete}
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-[#C63C38] px-5
                  text-sm font-bold text-white
                  shadow-sm transition
                  hover:bg-[#B63431]
                  focus:outline-none
                  focus:ring-4 focus:ring-red-100
                "
              >
                <CheckCircle2 size={17} />
                Mark as Complete
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="
              inline-flex h-11 items-center justify-center gap-2
              rounded-xl border border-slate-200 bg-white px-5
              text-sm font-semibold text-slate-700
              transition hover:bg-slate-50
            "
          >
            <ArrowLeft size={17} />
            Previous Topic
          </button>

          <button
            type="button"
            className="
              inline-flex h-11 items-center justify-center gap-2
              rounded-xl bg-slate-900 px-5
              text-sm font-semibold text-white
              transition hover:bg-slate-800
            "
          >
            Next Topic
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </main>
  );
}

function ContentSkeleton() {
  return (
    <main className="min-w-0 flex-1 bg-[#F7F8F8]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-5 sm:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />

        <div className="mt-5 h-12 w-3/4 animate-pulse rounded-xl bg-slate-200" />

        <div className="mt-10 space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
          <div className="h-32 w-full animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </main>
  );
}

export default ModuleContent;
