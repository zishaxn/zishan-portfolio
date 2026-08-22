"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface TechnicalNoteCardProps {
  title: string;
  preview: string;
  content: string;
  images?: string[];
  diagrams?: string[];
  tags: string[];
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-[#f3f4f6]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="font-mono text-sm text-[#4f7cff] bg-[#4f7cff]/10 px-1.5 py-0.5 rounded"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function ArticleContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let paragraph: string[] = [];
  let listItems: { title: string; description: string }[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    elements.push(
      <p key={`p-${elements.length}`} className="text-[#9ca3af] leading-relaxed">
        {renderInline(paragraph.join(" "))}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ol key={`ol-${elements.length}`} className="space-y-4 list-none">
        {listItems.map((item, index) => (
          <li key={item.title} className="flex gap-4">
            <span className="shrink-0 w-7 h-7 rounded-full bg-[#4f7cff]/10 border border-[#4f7cff]/20 text-[#4f7cff] text-xs font-mono flex items-center justify-center">
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-[#f3f4f6] mb-1">{item.title}</p>
              <p className="text-[#9ca3af] leading-relaxed">{renderInline(item.description)}</p>
            </div>
          </li>
        ))}
      </ol>
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="text-lg font-semibold text-[#f3f4f6] pt-2"
        >
          {trimmed.slice(4)}
        </h3>
      );
      continue;
    }

    const listMatch = trimmed.match(/^\d+\.\s\*\*(.+?)\*\*$/);
    if (listMatch) {
      flushParagraph();
      listItems.push({ title: listMatch[1], description: "" });
      continue;
    }

    if (listItems.length > 0 && line.startsWith("   ")) {
      listItems[listItems.length - 1].description = trimmed;
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return <div className="space-y-4">{elements}</div>;
}

function FullViewImage({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-[#9ca3af] hover:text-[#f3f4f6] transition-colors duration-200"
        aria-label="Close full view"
      >
        <X size={24} />
      </button>
      <div
        className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={3386}
          height={1858}
          quality={100}
          unoptimized
          className="max-w-full max-h-[95vh] w-auto h-auto object-contain"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}

export default function TechnicalNoteCard({
  title,
  preview,
  content,
  images = [],
  diagrams = [],
  tags,
}: TechnicalNoteCardProps) {
  const [open, setOpen] = useState(false);
  const [fullViewSrc, setFullViewSrc] = useState<string | null>(null);

  const closeArticle = () => {
    setOpen(false);
    setFullViewSrc(null);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left w-full border border-[rgba(255,255,255,0.08)] rounded-xl bg-[#1a1f29] p-6 hover:border-[rgba(79,124,255,0.3)] transition-all duration-300"
      >
        <div className={`flex flex-col gap-5 ${images.length > 0 ? "md:flex-row md:items-stretch" : ""}`}>
          {images.length > 0 && (
            <div className="relative w-full md:w-80 md:shrink-0 aspect-[3386/1858] rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#12151b]">
              <Image
                src={images[0]}
                alt={title}
                fill
                quality={100}
                unoptimized
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-[#4f7cff] border border-[#4f7cff]/20 bg-[#4f7cff]/10 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              <span className="text-[10px] text-[#6b7280]">{Math.ceil(content.split(' ').length / 200)} min read</span>
            </div>
            <h3 className="text-base font-semibold text-[#f3f4f6] leading-snug mb-2">{title}</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed line-clamp-3">{preview}</p>
            <p className="mt-4 text-sm text-[#4f7cff]">Read note →</p>
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-start justify-center p-4 pt-16 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && closeArticle()}
        >
          <div
            className={`w-full bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 md:p-12 relative ${
              images.length > 0 ? "max-w-5xl" : "max-w-3xl"
            }`}
          >
            <button
              onClick={closeArticle}
              className="absolute top-6 right-6 text-[#6b7280] hover:text-[#f3f4f6] transition-colors duration-200"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-[#4f7cff] border border-[#4f7cff]/20 bg-[#4f7cff]/10 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              <span className="text-xs text-[#6b7280]">{Math.ceil(content.split(' ').length / 200)} min read</span>
            </div>
            <h2 className="text-2xl font-semibold text-[#f3f4f6] mb-8 leading-snug">{title}</h2>
            {images.length > 0 && (
              <div className="space-y-6 mb-8">
                {images.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setFullViewSrc(src)}
                    className="group relative w-full rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#12151b] cursor-zoom-in transition-all duration-200 hover:border-[rgba(79,124,255,0.4)]"
                    aria-label="Open image in full view"
                  >
                    <Image
                      src={src}
                      alt={title}
                      width={3386}
                      height={1858}
                      quality={100}
                      unoptimized
                      className="w-full h-auto"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ZoomIn size={14} />
                      View full size
                    </span>
                  </button>
                ))}
              </div>
            )}
            {diagrams.length > 0 && (
              <div className="space-y-6 mb-8">
                {diagrams.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setFullViewSrc(src)}
                    className="group relative w-full rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] cursor-zoom-in transition-all duration-200 hover:border-[rgba(79,124,255,0.4)]"
                    aria-label="Open diagram in full view"
                  >
                    <Image
                      src={src}
                      alt={`${title} diagram`}
                      width={1200}
                      height={800}
                      quality={100}
                      unoptimized
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ZoomIn size={14} />
                      View full size
                    </span>
                  </button>
                ))}
              </div>
            )}
            <ArticleContent content={content} />
          </div>
          {fullViewSrc && (
            <FullViewImage
              src={fullViewSrc}
              alt={title}
              onClose={() => setFullViewSrc(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
