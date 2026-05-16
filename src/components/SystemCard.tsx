import { ExternalLink, Github } from "lucide-react";

interface SystemCardProps {
  title: string;
  status: string;
  statusColor?: "blue" | "yellow" | "green" | "purple";
  overview: string;
  responsibilities: string[];
  tech: string[];
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
  responsibilities,
  tech,
  github,
  demo,
}: SystemCardProps) {
  return (
    <div className="bg-[#1a1f29] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[rgba(91,140,255,0.3)] transition-all duration-300 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-[#f3f4f6] leading-snug">{title}</h3>
        <span
          className={`shrink-0 text-[10px] font-mono px-2 py-1 rounded border ${statusColors[statusColor]}`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-[#9ca3af] leading-relaxed">{overview}</p>

      <div>
        <p className="text-xs text-[#6b7280] mb-2">
          Key Responsibilities
        </p>
        <ul className="space-y-1.5">
          {responsibilities.map((r) => (
            <li key={r} className="text-sm text-[#9ca3af] flex items-start gap-2">
              <span className="text-[#5b8cff] mt-1 shrink-0">›</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs text-[#9ca3af] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>

      {(github || demo) && (
        <div className="flex gap-4 pt-2 border-t border-[rgba(255,255,255,0.08)]">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#f3f4f6] transition-colors duration-200"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#f3f4f6] transition-colors duration-200"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      )}
    </div>
  );
}
