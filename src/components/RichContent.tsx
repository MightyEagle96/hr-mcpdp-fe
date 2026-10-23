import { Fragment } from "react";
import DOMPurify from "dompurify";
import parse, {
  domToReact,
  type DOMNode,
  type Element,
  type HTMLReactParserOptions,
} from "html-react-parser";

interface RichContentProps {
  html?: string;
  className?: string;
}

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

function getYouTubeEmbedUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl.trim());
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (
      [
        "youtube.com",
        "m.youtube.com",
        "music.youtube.com",
        "youtube-nocookie.com",
      ].includes(host)
    ) {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else {
        const match = parsed.pathname.match(
          /^\/(?:embed|shorts|live|v)\/([a-zA-Z0-9_-]+)/,
        );

        videoId = match?.[1] ?? null;
      }
    }

    if (!videoId || !YOUTUBE_ID_REGEX.test(videoId)) {
      return null;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

function getMediaType(rawUrl: string): "video" | "audio" | null {
  try {
    const parsed = new URL(rawUrl);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }

    const path = parsed.pathname.toLowerCase();

    if (/\.(mp4|webm|ogv|ogg|mov|m4v)$/.test(path)) {
      return "video";
    }

    if (/\.(mp3|wav|m4a|aac|oga|opus|flac)$/.test(path)) {
      return "audio";
    }

    return null;
  } catch {
    return null;
  }
}

function YouTubePlayer({ url }: { url: string }) {
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-sm">
      <iframe
        src={url}
        title="YouTube educational video"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function MediaPlayer({ src, type }: { src: string; type: "video" | "audio" }) {
  if (type === "audio") {
    return (
      <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <audio controls preload="metadata" className="w-full" src={src}>
          Your browser does not support audio playback.
        </audio>
      </div>
    );
  }

  return (
    <div className="my-6 w-full overflow-hidden rounded-2xl bg-black shadow-sm">
      <video
        controls
        playsInline
        preload="metadata"
        className="block max-h-[75vh] w-full"
        src={src}
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
}

function renderUrl(url: string, key: number) {
  const youtubeUrl = getYouTubeEmbedUrl(url);

  if (youtubeUrl) {
    return <YouTubePlayer key={key} url={youtubeUrl} />;
  }

  const mediaType = getMediaType(url);

  if (mediaType) {
    return <MediaPlayer key={key} src={url} type={mediaType} />;
  }

  return (
    <a
      key={key}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words text-[#C63C38] underline underline-offset-4"
    >
      {url}
    </a>
  );
}

function renderTextWithMedia(text: string) {
  const urlRegex = /https?:\/\/[^\s<>"']+/gi;
  const parts: React.ReactNode[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    let url = match[0];
    let trailing = "";

    while (/[.,!?;:)\]}]$/.test(url)) {
      trailing = url.slice(-1) + trailing;
      url = url.slice(0, -1);
    }

    if (!url) continue;

    parts.push(text.slice(lastIndex, match.index));
    parts.push(renderUrl(url, key++));
    parts.push(trailing);

    lastIndex = match.index + match[0].length;
  }

  if (parts.length === 0) {
    return null;
  }

  parts.push(text.slice(lastIndex));

  return <Fragment>{parts}</Fragment>;
}

function isHttpUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl, window.location.origin);

    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export default function RichContent({
  html = "",
  className = "",
}: RichContentProps) {
  const cleanHtml = DOMPurify.sanitize(html, {
    ADD_TAGS: ["oembed"],
    ADD_ATTR: ["url", "data-callout-type"],
    FORBID_TAGS: ["iframe", "object", "embed"],
    FORBID_ATTR: ["srcdoc"],
  });

  const options: HTMLReactParserOptions = {
    replace(node: DOMNode) {
      // 1. Handle CKEditor 5 media embeds FIRST.
      // Example: <oembed url="https://youtu.be/VIDEO_ID"></oembed>
      if (node.type === "tag" && node.name === "oembed") {
        const mediaNode = node as Element;
        const url = mediaNode.attribs.url?.trim();

        if (!url || !isHttpUrl(url)) {
          return (
            <p className="my-4 text-sm text-slate-500">
              This media URL is invalid.
            </p>
          );
        }

        const embedUrl = getYouTubeEmbedUrl(url);

        if (embedUrl) {
          return <YouTubePlayer url={embedUrl} />;
        }

        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C63C38] underline"
          >
            Open media
          </a>
        );
      }

      // 2. Handle images using their URLs.
      if (node.type === "tag" && node.name === "img") {
        const imageNode = node as Element;
        const src = imageNode.attribs.src || "";
        const alt = imageNode.attribs.alt || "Educational content image";

        if (!isHttpUrl(src)) {
          return (
            <span className="text-sm text-slate-500">[Image unavailable]</span>
          );
        }

        const safeSrc = new URL(src, window.location.origin).href;

        return (
          <figure className="my-6">
            <img
              src={safeSrc}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="block h-auto max-w-full rounded-2xl border border-slate-100 shadow-sm"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            {imageNode.attribs.alt && (
              <figcaption className="mt-2 text-center text-sm text-slate-500">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }

      // 3. Handle hyperlinks, including linked YouTube URLs.
      if (node.type === "tag" && node.name === "a") {
        const linkNode = node as Element;
        const href = linkNode.attribs.href || "";

        if (!isHttpUrl(href)) {
          return undefined;
        }

        const youtubeUrl = getYouTubeEmbedUrl(href);

        if (youtubeUrl) {
          return <YouTubePlayer url={youtubeUrl} />;
        }

        const mediaType = getMediaType(href);

        if (mediaType) {
          return <MediaPlayer src={href} type={mediaType} />;
        }

        linkNode.attribs.target = "_blank";
        linkNode.attribs.rel = "noopener noreferrer";

        return undefined;
      }

      // 4. Handle tables with horizontal scrolling on mobile.
      if (node.type === "tag" && node.name === "table") {
        const tableNode = node as Element;

        return (
          <div
            className="table-scroll-wrapper"
            role="region"
            aria-label="Scrollable table"
            tabIndex={0}
          >
            <table {...tableNode.attribs}>
              {domToReact(tableNode.children as DOMNode[], options)}
            </table>
          </div>
        );
      }
      // 5. Handle plain-text URLs.
      if (node.type === "text") {
        const textNode = node;

        // Avoid generating nested links inside existing anchors.
        if (
          textNode.parent &&
          textNode.parent.type === "tag" &&
          textNode.parent.name === "a"
        ) {
          return undefined;
        }

        return renderTextWithMedia(textNode.data) ?? undefined;
      }

      // 5. Preserve paragraphs, headings, tables, lists, and other HTML.
      return undefined;
    },
  };

  return (
    <article
      className={`
    prose-table:w-full
prose-table:my-0
prose-table:border-collapse
prose-table:text-sm

prose-thead:bg-slate-100

prose-th:border
prose-th:border-slate-200
prose-th:bg-slate-100
prose-th:px-4
prose-th:py-3
prose-th:font-semibold
prose-th:text-slate-900
prose-th:text-left

prose-td:border
prose-td:border-slate-200
prose-td:px-4
prose-td:py-3
prose-td:align-top
prose-td:text-slate-700

rich-content prose prose-slate max-w-none
    ${className}
  `}
    >
      {parse(cleanHtml, options)}
    </article>
  );
}
