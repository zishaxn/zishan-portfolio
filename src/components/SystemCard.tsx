import { ExternalLink, Github } from "lucide-react";

interface SystemCardProps {
  title: string;
  status: string;
  statusColor?: "blue" | "yellow" | "green" | "purple";
  overview: string;
  responsibilities: string[];
  tech: string[];
  images?: string[];
  videos?: string[];
  diagrams?: string[];
  github?: {
    enabled: boolean;
    private: boolean;
    url: string;
  };
  liveUrl?: string;
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
  liveUrl,
}: SystemCardProps) {
  return (
    <div className="flex flex-col gap-4">
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
        <p className="text-xs text-[#6b7280] mb-2">Key Responsibilities</p>
        <ul className="space-y-1.5">
          {responsibilities.slice(0, 4).map((r) => (
            <li key={r} className="text-sm text-[#9ca3af] flex items-start gap-2">
              <span className="text-[#4f7cff] mt-1 shrink-0">›</span>
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

      {(github?.enabled || liveUrl) && (
        <div className="flex gap-4 pt-2 border-t border-[rgba(255,255,255,0.08)]">
          {github?.enabled && (
            <>
              {github.private ? (
                <span className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                  <Github size={13} /> Private Repository
                </span>
              ) : (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#f3f4f6] transition-colors duration-200"
                >
                  <Github size={13} /> GitHub
                </a>
              )}
            </>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#f3f4f6] transition-colors duration-200"
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
