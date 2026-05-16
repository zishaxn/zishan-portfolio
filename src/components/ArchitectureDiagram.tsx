"use client";

const layers = [
  { label: "Client", sub: "HTTP Request" },
  { label: "API Gateway", sub: "Auth · Rate Limit · Routing" },
  { label: "Lambda Functions", sub: "Business Logic · Validation" },
  { label: "DynamoDB / PostgreSQL", sub: "Persistent Data Store" },
  { label: "CloudWatch Logs", sub: "Monitoring · Alerts · Traces" },
];

export default function ArchitectureDiagram() {
  return (
    <div className="w-full font-mono text-sm select-none">
      <div className="border border-[#262626] rounded-lg bg-[#0d0d0d] p-5 space-y-1">
        <p className="text-[#525252] text-xs mb-4 tracking-widest">SYSTEM ARCHITECTURE</p>
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1 shrink-0" />
                {i < layers.length - 1 && (
                  <div className="w-px h-8 bg-[#262626] mt-1" />
                )}
              </div>
              <div className="pb-2">
                <p className="text-[#e5e5e5] font-medium leading-tight">{layer.label}</p>
                <p className="text-[#525252] text-xs mt-0.5">{layer.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-[#525252]">
        <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" />
        <span>All services operational</span>
      </div>
    </div>
  );
}
