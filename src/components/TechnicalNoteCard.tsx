"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TechnicalNoteCardProps {
  title: string;
  excerpt: string;
  body: string;
  tag: string;
  readTime: string;
}

export default function TechnicalNoteCard({
  title,
  excerpt,
  body,
  tag,
  readTime,
}: TechnicalNoteCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left w-full border border-[#262626] rounded-lg bg-[#111111] p-5 hover:border-[#3b82f620] hover:bg-[#141414] transition-colors duration-200"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-[#3b82f6] tracking-widest uppercase border border-[#3b82f620] bg-[#3b82f610] px-2 py-0.5 rounded">
            {tag}
          </span>
          <span className="text-[10px] font-mono text-[#525252]">{readTime}</span>
        </div>
        <h3 className="text-sm font-semibold text-[#e5e5e5] leading-snug mb-2">{title}</h3>
        <p className="text-xs text-[#737373] leading-relaxed line-clamp-3">{excerpt}</p>
        <p className="mt-3 text-xs text-[#3b82f6]">Read note →</p>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center p-4 pt-16 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-2xl bg-[#111111] border border-[#262626] rounded-lg p-8 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#525252] hover:text-[#e5e5e5] transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono text-[#3b82f6] tracking-widest uppercase border border-[#3b82f620] bg-[#3b82f610] px-2 py-0.5 rounded">
                {tag}
              </span>
              <span className="text-[10px] font-mono text-[#525252]">{readTime}</span>
            </div>
            <h2 className="text-lg font-semibold text-[#e5e5e5] mb-6 leading-snug">{title}</h2>
            <div className="prose prose-sm prose-invert max-w-none text-[#a3a3a3] leading-relaxed whitespace-pre-wrap text-sm">
              {body}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
