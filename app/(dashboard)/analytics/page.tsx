export default function AnalyticsPage() {
  const stats = [
    {
      label: "Total Tickets",
      value: "1,248",
      change: "+12%",
      color: "text-blue-400",
    },
    {
      label: "Resolved",
      value: "1,102",
      change: "+8%",
      color: "text-green-400",
    },
    {
      label: "Avg Response",
      value: "4.2m",
      change: "-18%",
      color: "text-yellow-400",
    },
    {
      label: "SLA Compliance",
      value: "99.7%",
      change: "+2%",
      color: "text-violet-400",
    },
  ];

  const weeklyData = [45, 68, 35, 85, 62, 95, 78];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="p-8 bg-[#080d14] text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Analytics</h1>

          <p className="text-zinc-400 mt-2">
            Performance metrics, trends and operational insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search analytics..."
            className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 w-72 text-sm outline-none focus:border-blue-500/50"
          />

          <span className="px-4 py-3 rounded-xl bg-green-500/20 text-green-400 text-sm font-medium">
            Live Data
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
          >
            <p className="text-zinc-400 text-sm">{stat.label}</p>

            <h2 className={`text-4xl font-bold mt-3 ${stat.color}`}>
              {stat.value}
            </h2>

            <p
              className={`mt-3 text-sm font-medium ${
                stat.change.startsWith("+")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Ticket Trend */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-8">
            Weekly Ticket Volume
          </h2>

          <div className="h-72 flex items-end gap-4">
            {weeklyData.map((value, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 hover:opacity-90 transition-all"
                  style={{ height: `${value}%` }}
                />

                <span className="text-xs text-zinc-500 mt-3">
                  {days[index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Breakdown */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-8">
            Incident Distribution
          </h2>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <span>Critical Incidents</span>
                <span className="text-red-400">15%</span>
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-red-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>High Priority</span>
                <span className="text-orange-400">30%</span>
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[30%] bg-orange-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Medium Priority</span>
                <span className="text-yellow-400">55%</span>
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[55%] bg-yellow-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="bg-[#111c34] rounded-xl p-4 text-center">
              <p className="text-zinc-500 text-xs">
                MTTR
              </p>
              <h3 className="text-2xl font-bold text-green-400 mt-2">
                23m
              </h3>
            </div>

            <div className="bg-[#111c34] rounded-xl p-4 text-center">
              <p className="text-zinc-500 text-xs">
                MTTA
              </p>
              <h3 className="text-2xl font-bold text-blue-400 mt-2">
                4m
              </h3>
            </div>

            <div className="bg-[#111c34] rounded-xl p-4 text-center">
              <p className="text-zinc-500 text-xs">
                SLA
              </p>
              <h3 className="text-2xl font-bold text-violet-400 mt-2">
                99.7%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400">Customer Satisfaction</p>
          <h2 className="text-4xl font-bold text-green-400 mt-3">
            96%
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400">Escalation Rate</p>
          <h2 className="text-4xl font-bold text-orange-400 mt-3">
            7%
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
          <p className="text-zinc-400">First Contact Resolution</p>
          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            88%
          </h2>
        </div>
      </div>
    </div>
  );
}