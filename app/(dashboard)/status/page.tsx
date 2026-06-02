export default function StatusPage() {
  const services = [
    {
      name: "Authentication API",
      status: "Operational",
      uptime: "99.99%",
      color: "green",
    },
    {
      name: "Payment Service",
      status: "Operational",
      uptime: "99.95%",
      color: "green",
    },
    {
      name: "GraphQL Gateway",
      status: "Degraded",
      uptime: "98.80%",
      color: "yellow",
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#080d14] text-white overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            System Status
          </h1>

          <p className="text-zinc-500 mt-2">
            Live service health overview
          </p>
        </div>

        <span className="px-3 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm">
          Live Status
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">
                {service.name}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  service.color === "green"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {service.status}
              </span>
            </div>

            <p className="text-zinc-500 text-sm mb-2">
              Service Health
            </p>

            <h3
              className={`text-3xl font-bold ${
                service.color === "green"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {service.uptime}
            </h3>

            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  service.color === "green"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
                style={{
                  width:
                    service.color === "green"
                      ? "99%"
                      : "80%",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-500 text-sm">
            Operational Services
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            2
          </h2>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-500 text-sm">
            Degraded Services
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-3">
            1
          </h2>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-500 text-sm">
            Average Uptime
          </p>

          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            99.58%
          </h2>
        </div>
      </div>
    </div>
  );
}