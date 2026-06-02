export default function TicketsPage() {
  const tickets = [
    {
      id: "TKT-001",
      title: "Login page not loading",
      customer: "Acme Corp",
      assignee: "Priya K",
      status: "Open",
      severity: "High",
      updated: "2m ago",
    },
    {
      id: "TKT-002",
      title: "Payment API timeout",
      customer: "Stripe Inc",
      assignee: "Dev R",
      status: "In Progress",
      severity: "Critical",
      updated: "12m ago",
    },
    {
      id: "TKT-003",
      title: "Dashboard slow response",
      customer: "Notion",
      assignee: "Sarah M",
      status: "Resolved",
      severity: "Medium",
      updated: "1h ago",
    },
    {
      id: "TKT-004",
      title: "Webhook delivery failures",
      customer: "Shopify",
      assignee: "Unassigned",
      status: "Open",
      severity: "Critical",
      updated: "3h ago",
    },
    {
      id: "TKT-005",
      title: "Custom domain SSL issue",
      customer: "Vercel",
      assignee: "Priya K",
      status: "Resolved",
      severity: "Low",
      updated: "5h ago",
    },
  ];

  return (
    <div className="p-8 text-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Tickets
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage and track support requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search tickets..."
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 w-64"
          />

          <span className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium">
            {tickets.length} Active
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-5">
          <p className="text-zinc-500 text-sm">
            Total Tickets
          </p>

          <h2 className="text-4xl font-bold mt-3">
            248
          </h2>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-5">
          <p className="text-zinc-500 text-sm">
            Open
          </p>

          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            47
          </h2>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-5">
          <p className="text-zinc-500 text-sm">
            Critical
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-3">
            8
          </h2>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-5">
          <p className="text-zinc-500 text-sm">
            Resolved Today
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            23
          </h2>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-5">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-[#151d2c] transition-all cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {ticket.title}
                </h2>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-zinc-500">
                  <span>{ticket.id}</span>
                  <span>{ticket.customer}</span>
                  <span>{ticket.assignee}</span>
                  <span>Updated {ticket.updated}</span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.status === "Resolved"
                      ? "bg-green-500/20 text-green-400"
                      : ticket.status === "In Progress"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {ticket.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.severity === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : ticket.severity === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : ticket.severity === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {ticket.severity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}