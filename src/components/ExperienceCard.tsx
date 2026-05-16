interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  overview: string;
  highlights: string[];
  tags: string[];
  isLast?: boolean;
}

export default function ExperienceCard({
  title,
  company,
  period,
  overview,
  highlights,
  tags,
  isLast = false,
}: ExperienceCardProps) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full border-2 border-[#3b82f6] bg-[#0a0a0a] shrink-0 mt-1" />
        {!isLast && <div className="w-px flex-1 bg-[#262626] mt-2" />}
      </div>
      <div className={`pb-12 flex-1 ${isLast ? "pb-0" : ""}`}>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-[#e5e5e5]">{title}</h3>
          <span className="text-xs font-mono text-[#525252]">{period}</span>
        </div>
        <p className="text-sm text-[#3b82f6] mb-3">{company}</p>
        <p className="text-sm text-[#a3a3a3] leading-relaxed mb-4">{overview}</p>
        <ul className="space-y-1.5 mb-4">
          {highlights.map((h) => (
            <li key={h} className="text-sm text-[#737373] flex items-start gap-2">
              <span className="text-[#3b82f6] shrink-0 mt-0.5">›</span>
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-[#525252] border border-[#262626] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
