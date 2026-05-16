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
        <div className="w-3 h-3 rounded-full border-2 border-[#5b8cff] bg-[#0f1115] shrink-0 mt-1" />
        {!isLast && <div className="w-px flex-1 bg-[rgba(255,255,255,0.08)] mt-2" />}
      </div>
      <div className={`pb-12 flex-1 ${isLast ? "pb-0" : ""}`}>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold text-[#f3f4f6]">{title}</h3>
          <span className="text-xs text-[#6b7280]">{period}</span>
        </div>
        <p className="text-sm text-[#5b8cff] mb-4">{company}</p>
        <p className="text-[#9ca3af] leading-relaxed mb-5">{overview}</p>
        <ul className="space-y-2 mb-5">
          {highlights.map((h) => (
            <li key={h} className="text-sm text-[#9ca3af] flex items-start gap-2">
              <span className="text-[#5b8cff] shrink-0 mt-0.5">›</span>
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#9ca3af] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
