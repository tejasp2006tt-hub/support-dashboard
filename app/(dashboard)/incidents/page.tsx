export default function IncidentsPage() {
  const incidents = [
    {
      id: "INC-001",
      title: "Auth API elevated error rates",
      service: "Authentication",
      owner: "Priya K",
      status: "Active",
      severity: "Critical",
      updated: "5 min ago",
    },
    {
      id: "INC-002",
      title: "GraphQL gateway latency spike",
      service: "GraphQL Gateway",
      owner: "Dev R",
      status: "Monitoring",
      severity: "High",
      updated: "18 min ago",
    },
    {
      id: "INC-003",
      title: "Webhook delivery delays",
      service: "Webhook Service",
      owner: "Sarah M",
      status: "Resolved",
      severity: "Medium",
      updated: "1 hr ago",
    },
  ];

  return (
    <div className="p-8 bg-[#080d14] text-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Incidents</h1>

          <p className="text-zinc-400 mt-2">
            Monitor and manage platform incidents
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search incidents..."
            className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm w-72 outline-none focus:border-red-500/50"
          />

          <span className="px-4 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium">
            3 Active
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400">Total Incidents</p>
          <h2 className="text-4xl font-bold mt-3">34</h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400">Active</p>
          <h2 className="text-4xl font-bold text-red-400 mt-3">3</h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400">Monitoring</p>
          <h2 className="text-4xl font-bold text-yellow-400 mt-3">1</h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400">Resolved Today</p>
          <h2 className="text-4xl font-bold text-green-400 mt-3">12</h2>
        </div>
      </div>

      {/* Incident Cards */}
      <div className="space-y-5">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 hover:border-red-500/30 hover:bg-[#111c34] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  {incident.title}
                </h2>

                <div className="flex flex-wrap gap-6 text-zinc-400 text-sm">
                  <span>{incident.id}</span>
                  <span>{incident.service}</span>
                  <span>{incident.owner}</span>
                  <span>Updated {incident.updated}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span
                  className={`px-4 py-2 rounded-full text-xs font-medium ${
                    incident.status === "Active"
                      ? "bg-red-500/20 text-red-400"
                      : incident.status === "Monitoring"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {incident.status}
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-xs font-medium ${
                    incident.severity === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : incident.severity === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {incident.severity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}