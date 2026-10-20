import { Fragment } from "react";
import DOMPurify from "dompurify";
import parse, { type HTMLReactParserOptions } from "html-react-parser";
import { Element, Text } from "domhandler";

interface RichContentProps {
  html?: string;
  className?: string;
}

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (
      ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
    ) {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else {
        const match = parsed.pathname.match(
          /^\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]+)/,
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

function getMediaType(url: string): "video" | "audio" | null {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;

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
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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

// Handle URLs pasted directly into text, not just hyperlinks.
function renderTextWithMedia(text: string) {
  const urlRegex = /https?:\/\/[^\s<>"']+/gi;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    let url = match[0];
    let trailing = "";

    // Keep punctuation outside the URL.
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

  if (parts.length === 0) return null;

  parts.push(text.slice(lastIndex));

  return <Fragment>{parts}</Fragment>;
}

export default function RichContent({
  html = "",
  className = "",
}: RichContentProps) {
  const cleanHtml = DOMPurify.sanitize(html, {
    FORBID_TAGS: ["iframe", "object", "embed"],
    FORBID_ATTR: ["srcdoc"],
  });

  const options: HTMLReactParserOptions = {
    replace(node) {
      // Convert YouTube hyperlinks and direct media links.
      if (node instanceof Element && node.name === "a") {
        const href = node.attribs.href || "";

        const youtubeUrl = getYouTubeEmbedUrl(href);

        if (youtubeUrl) {
          return <YouTubePlayer url={youtubeUrl} />;
        }

        const mediaType = getMediaType(href);

        if (mediaType) {
          return <MediaPlayer src={href} type={mediaType} />;
        }

        // Open ordinary external links safely.
        if (/^https?:\/\//i.test(href)) {
          node.attribs.target = "_blank";
          node.attribs.rel = "noopener noreferrer";
        }
      }

      // Make images responsive.
      if (node instanceof Element && node.name === "img") {
        const src = node.attribs.src || "";

        // Permit only HTTP(S) images.
        try {
          const parsed = new URL(src, window.location.origin);

          if (!["http:", "https:"].includes(parsed.protocol)) {
            return <span>[Image unavailable]</span>;
          }
        } catch {
          return <span>[Image unavailable]</span>;
        }

        return (
          <img
            src={src}
            alt={node.attribs.alt || "Educational content image"}
            loading="lazy"
            className="my-6 h-auto max-w-full rounded-2xl shadow-sm"
          />
        );
      }

      // Handle plain-text URLs inside paragraphs and other elements.
      if (node instanceof Text) {
        return renderTextWithMedia(node.data) ?? undefined;
      }

      // Existing headings, paragraphs, lists, tables, etc. stay intact.
      return undefined;
    },
  };

  return (
    <article
      className={`
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
        ${className}
      `}
    >
      {parse(cleanHtml, options)}
    </article>
  );
}
