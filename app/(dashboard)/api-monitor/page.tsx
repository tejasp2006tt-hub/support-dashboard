export default function ApiMonitorPage() {
  const apis = [
    {
      name: "Authentication API",
      uptime: "99.99%",
      latency: "87ms",
      status: "Operational",
      health: 99,
      color: "green",
      requests: "1.2M",
    },
    {
      name: "Payments API",
      uptime: "99.95%",
      latency: "102ms",
      status: "Operational",
      health: 96,
      color: "green",
      requests: "2.8M",
    },
    {
      name: "GraphQL Gateway",
      uptime: "98.80%",
      latency: "342ms",
      status: "Degraded",
      health: 78,
      color: "yellow",
      requests: "890K",
    },
  ];

  return (
    <div className="p-8 bg-[#080d14] text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            API Monitor
          </h1>

          <p className="text-zinc-400 mt-2">
            Real-time service monitoring and health metrics
          </p>
        </div>

        <span className="px-4 py-3 rounded-xl bg-green-500/20 text-green-400 text-sm font-medium">
          Live Monitoring
        </span>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">
            Total APIs
          </p>

          <h2 className="text-4xl font-bold mt-3">
            12
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">
            Operational
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            10
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">
            Degraded
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-3">
            2
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">
            Avg Latency
          </p>

          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            177ms
          </h2>
        </div>
      </div>

      {/* API Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {apis.map((api) => (
          <div
            key={api.name}
            className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {api.name}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  api.color === "green"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {api.status}
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-zinc-500 text-sm">
                  Uptime
                </p>

                <h3 className="text-3xl font-bold text-green-400">
                  {api.uptime}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Latency
                </p>

                <h3 className="text-2xl font-semibold">
                  {api.latency}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm mb-2">
                  Health Score
                </p>

                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      api.color === "green"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                      width: `${api.health}%`,
                    }}
                  />
                </div>

                <p className="text-sm text-zinc-400 mt-2">
                  {api.health}%
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Requests / Day
                </p>

                <h3 className="text-xl font-semibold text-blue-400">
                  {api.requests}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">
            Peak Traffic
          </p>

          <h2 className="text-4xl font-bold text-violet-400 mt-3">
            5.4M
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">
            Error Rate
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-3">
            0.3%
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm">
            Availability
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            99.7%
          </h2>
        </div>
      </div>
    </div>
  );
}