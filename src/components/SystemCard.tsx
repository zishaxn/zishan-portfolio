import { ExternalLink, Github } from "lucide-react";

interface SystemCardProps {
  title: string;
  status: string;
  statusColor?: "blue" | "yellow" | "green" | "purple";
  overview: string;
  architecture?: string[];
  responsibilities: string[];
  tech: string[];
  challenges: string;
  github?: string;
  demo?: string;
}

const statusColors: Record<string, string> = {
  blue: "text-[#3b82f6] bg-[#3b82f610] border-[#3b82f620]",
  yellow: "text-[#eab308] bg-[#eab30810] border-[#eab30820]",
  green: "text-[#22c55e] bg-[#22c55e10] border-[#22c55e20]",
  purple: "text-[#a855f7] bg-[#a855f710] border-[#a855f720]",
};

export default function SystemCard({
  title,
  status,
  statusColor = "blue",
  overview,
  architecture,
  responsibilities,
  tech,
  challenges,
  github,
  demo,
}: SystemCardProps) {
  return (
    <div className="border border-[#262626] rounded-lg bg-[#111111] p-6 hover:border-[#262626] hover:bg-[#141414] transition-colors duration-200 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-[#e5e5e5] leading-snug">{title}</h3>
        <span
          className={`shrink-0 text-[10px] font-mono tracking-widest px-2 py-1 rounded border ${statusColors[statusColor]}`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-[#a3a3a3] leading-relaxed">{overview}</p>

      {architecture && architecture.length > 0 && (
        <div>
          <p className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-2">
            Architecture
          </p>
          <div className="font-mono text-xs text-[#737373] border border-[#262626] rounded bg-[#0d0d0d] px-4 py-3 space-y-0.5">
            {architecture.map((line, i) => (
              <div key={i} className={line.startsWith("↓") ? "text-[#3b82f6] pl-2" : "text-[#a3a3a3]"}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-2">
          Responsibilities
        </p>
        <ul className="space-y-1">
          {responsibilities.map((r) => (
            <li key={r} className="text-sm text-[#a3a3a3] flex items-start gap-2">
              <span className="text-[#3b82f6] mt-1 shrink-0">›</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-2">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-[#737373] border border-[#262626] px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-2">
          Key Challenge
        </p>
        <p className="text-sm text-[#737373] italic leading-relaxed">{challenges}</p>
      </div>

      {(github || demo) && (
        <div className="flex gap-4 pt-1 border-t border-[#262626]">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#e5e5e5] transition-colors duration-200"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#e5e5e5] transition-colors duration-200"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      )}
    </div>
  );
}
