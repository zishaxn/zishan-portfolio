"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TechnicalNoteCardProps {
  title: string;
  preview: string;
  content: string;
  images?: string[];
  diagrams?: string[];
  tags: string[];
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left w-full border border-[rgba(255,255,255,0.08)] rounded-xl bg-[#1a1f29] p-6 hover:border-[rgba(79,124,255,0.3)] transition-all duration-300"
      >
        <div className="flex items-center gap-2 mb-3">
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
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-start justify-center p-4 pt-16 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-3xl bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 md:p-12 relative">
            <button
              onClick={() => setOpen(false)}
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
            <div className="prose prose-invert max-w-none text-[#9ca3af] leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
