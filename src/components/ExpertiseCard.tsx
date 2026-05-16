interface ExpertiseCardProps {
  title: string;
  items: string[];
}

export default function ExpertiseCard({ title, items }: ExpertiseCardProps) {
  return (
    <div className="border border-[#262626] rounded-lg bg-[#111111] p-5 hover:border-[#3b82f620] transition-colors duration-200">
      <h3 className="text-xs font-mono text-[#3b82f6] tracking-widest uppercase mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-[#a3a3a3] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
