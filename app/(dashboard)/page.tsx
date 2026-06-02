"use client";

import Link from "next/link";
import StatCard from "@/components/StatCard";
import { useState } from "react";
import {
  LayoutDashboard,
  Ticket,
  AlertTriangle,
  Activity,
  Settings,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Zap,
  Globe,
  Server,
  Shield,
  Users,
  BarChart3,

  Circle,
  MoreHorizontal,
  RefreshCw,
  Filter,
  ExternalLink,
  Cpu,
  Database,
  Wifi,
  ChevronRight,
  MonitorDot,
  BookOpen,
  MessageSquare,
  LogOut,
  HelpCircle,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type Severity = "critical" | "high" | "medium" | "low";
type Status = "open" | "in_progress" | "resolved" | "closed";
type ApiStatus = "operational" | "degraded" | "outage";

interface Ticket {
  id: string;
  title: string;
  customer: string;
  severity: Severity;
  status: Status;
  assignee: string;
  created: string;
  updated: string;
}

interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: "active" | "monitoring" | "resolved";
  affectedServices: string[];
  duration: string;
  responders: number;
}

interface ApiEndpoint {
  name: string;
  path: string;
  status: ApiStatus;
  latency: number;
  uptime: number;
  rps: number;
  trend: "up" | "down" | "stable";
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const tickets: Ticket[] = [
  {
    id: "TKT-9821",
    title: "Authentication service returning 503 on EU region",
    customer: "Stripe Inc.",
    severity: "critical",
    status: "in_progress",
    assignee: "Priya K.",
    created: "2m ago",
    updated: "1m ago",
  },
  {
    id: "TKT-9820",
    title: "Webhook delivery failures for payment events",
    customer: "Shopify",
    severity: "high",
    status: "open",
    assignee: "Unassigned",
    created: "14m ago",
    updated: "14m ago",
  },
  {
    id: "TKT-9819",
    title: "API rate limit misconfiguration for Enterprise tier",
    customer: "Notion",
    severity: "medium",
    status: "in_progress",
    assignee: "Dev R.",
    created: "1h ago",
    updated: "22m ago",
  },
  {
    id: "TKT-9818",
    title: "SDK v4 migration — TypeScript type errors",
    customer: "Linear",
    severity: "low",
    status: "open",
    assignee: "Sara M.",
    created: "2h ago",
    updated: "45m ago",
  },
  {
    id: "TKT-9817",
    title: "Custom domain SSL certificate not renewing",
    customer: "Vercel",
    severity: "high",
    status: "open",
    assignee: "Unassigned",
    created: "3h ago",
    updated: "3h ago",
  },
  {
    id: "TKT-9816",
    title: "Data export job timing out for large datasets",
    customer: "Figma",
    severity: "medium",
    status: "resolved",
    assignee: "Priya K.",
    created: "5h ago",
    updated: "1h ago",
  },
];

const incidents: Incident[] = [
  {
    id: "INC-441",
    title: "Elevated error rates on Auth API — EU-WEST-1",
    severity: "critical",
    status: "active",
    affectedServices: ["Auth", "Sessions", "OAuth"],
    duration: "18m",
    responders: 4,
  },
  {
    id: "INC-440",
    title: "Elevated p99 latency on GraphQL gateway",
    severity: "high",
    status: "monitoring",
    affectedServices: ["GraphQL", "API Gateway"],
    duration: "1h 12m",
    responders: 2,
  },
  {
    id: "INC-439",
    title: "Intermittent 502s on webhook delivery service",
    severity: "medium",
    status: "monitoring",
    affectedServices: ["Webhooks"],
    duration: "2h 04m",
    responders: 1,
  },
];

const apiEndpoints: ApiEndpoint[] = [
  {
    name: "Authentication",
    path: "/v1/auth",
    status: "degraded",
    latency: 342,
    uptime: 98.2,
    rps: 1204,
    trend: "down",
  },
  {
    name: "Payments API",
    path: "/v1/payments",
    status: "operational",
    latency: 87,
    uptime: 99.98,
    rps: 3819,
    trend: "stable",
  },
  {
    name: "Webhooks",
    path: "/v1/webhooks",
    status: "degraded",
    latency: 521,
    uptime: 97.1,
    rps: 892,
    trend: "down",
  },
  {
    name: "GraphQL Gateway",
    path: "/graphql",
    status: "operational",
    latency: 128,
    uptime: 99.91,
    rps: 5402,
    trend: "up",
  },
  {
    name: "Storage",
    path: "/v1/storage",
    status: "operational",
    latency: 64,
    uptime: 99.99,
    rps: 2107,
    trend: "stable",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

const severityConfig: Record<Severity, { label: string; dot: string; badge: string }> = {
  critical: {
    label: "Critical",
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-400 border border-red-500/20",
  },
  high: {
    label: "High",
    dot: "bg-orange-500",
    badge: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  },
  medium: {
    label: "Medium",
    dot: "bg-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  },
  low: {
    label: "Low",
    dot: "bg-sky-500",
    badge: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  },
};

const statusConfig: Record<Status, { label: string; color: string }> = {
  open: { label: "Open", color: "text-amber-400" },
  in_progress: { label: "In Progress", color: "text-blue-400" },
  resolved: { label: "Resolved", color: "text-emerald-400" },
  closed: { label: "Closed", color: "text-zinc-500" },
};

const apiStatusConfig: Record<ApiStatus, { label: string; color: string; dot: string }> = {
  operational: { label: "Operational", color: "text-emerald-400", dot: "bg-emerald-500" },
  degraded: { label: "Degraded", color: "text-amber-400", dot: "bg-amber-500" },
  outage: { label: "Outage", color: "text-red-400", dot: "bg-red-500" },
};

// ── Sub-components ─────────────────────────────────────────────────────────

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
  <Link
  href={
    label === "Dashboard"
      ? "/"
      : label === "Tickets"
      ? "/tickets"
      : label === "Incidents"
      ? "/incidents"
      : label === "Analytics"
      ? "/analytics"
      : "#"
  }
>
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
        ${
          active
            ? "bg-[#1e3a5f] text-white shadow-[inset_0_0_0_1px_rgba(56,139,253,0.3)]"
            : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
        }`}
    >
      <Icon
        size={16}
        className={
          active
            ? "text-blue-400"
            : "text-zinc-500 group-hover:text-zinc-300"
        }
      />

      <span className="flex-1 text-left">{label}</span>

      {badge != null && (
        <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold">
          {badge}
        </span>
      )}
    </button>
  </Link>
);
}



function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${color}`}
      />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Dashboard() {
  const [sidebarOpen] = useState(true);

  const openTickets = tickets.filter((t) => t.status === "open" || t.status === "in_progress");
  const criticalCount = tickets.filter((t) => t.severity === "critical").length;

  return (
    <div className="flex h-screen bg-[#080d14] text-white overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Top Navbar ── */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/[0.05] bg-[#090e17] flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="text-zinc-600">SupportOps</span>
            <ChevronRight size={13} className="text-zinc-700" />
            <span className="text-zinc-300 font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />
              <input
                className="bg-white/[0.04] border border-white/[0.06] rounded-lg pl-8 pr-10 py-1.5 text-xs text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] w-52 transition-all"
                placeholder="Search tickets, incidents..."
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-white/5 rounded px-1 py-0.5">
                ⌘K
              </kbd>
            </div>

            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors relative">
              <Bell size={15} />
              {criticalCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors">
              <HelpCircle size={15} />
            </button>

            <div className="w-px h-5 bg-white/[0.08] mx-1" />

            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-2 py-1.5 rounded-lg transition-colors">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
                PK
              </div>
              <ChevronDown size={12} className="text-zinc-600" />
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Page heading */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white tracking-tight">
                Support Overview
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Last refreshed 32 seconds ago &nbsp;·&nbsp; Thursday, 28 May 2026
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] px-3 py-1.5 rounded-lg transition-colors">
                <Filter size={12} />
                Filter
              </button>
              <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] px-3 py-1.5 rounded-lg transition-colors">
                <RefreshCw size={12} />
                Refresh
              </button>
            </div>
          </div>

          {/* ── Active incident banner ── */}
          {incidents.some((i) => i.status === "active") && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/[0.08] border border-red-500/20">
              <PulseDot color="bg-red-500" />
              <span className="text-sm text-red-300 font-medium">
                Active incident:{" "}
                <span className="text-red-200">
                  {incidents.find((i) => i.status === "active")?.title}
                </span>
              </span>
              <button className="ml-auto flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
                View <ExternalLink size={11} />
              </button>
            </div>
          )}

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Open Tickets"
              value="47"
              change="+3 since yesterday"
              changeType="down"
              icon={Ticket}
              accent="bg-blue-500/10 text-blue-400"
            />
            <StatCard
              label="Active Incidents"
              value="3"
              change="1 critical active"
              changeType="down"
              icon={AlertTriangle}
              accent="bg-red-500/10 text-red-400"
            />
            <StatCard
              label="Avg Response"
              value="4.2m"
              change="↓ 18% vs last week"
              changeType="up"
              icon={Clock}
              accent="bg-emerald-500/10 text-emerald-400"
            />
            <StatCard
              label="API Uptime"
              value="99.7%"
              change="2 endpoints degraded"
              changeType="neutral"
              icon={Globe}
              accent="bg-violet-500/10 text-violet-400"
            />
          </div>

          {/* ── Tickets + Incidents Row ── */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
            {/* Ticket Activity */}
            <div className="xl:col-span-3 bg-[#0f1724] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <Ticket size={14} className="text-blue-400" />
                  <span className="text-sm font-semibold text-white">Ticket Activity</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                    {tickets.length}
                  </span>
                </div>
                <button className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
                  View all <ChevronRight size={12} />
                </button>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {tickets.map((ticket) => {
                  const sev = severityConfig[ticket.severity];
                  const st = statusConfig[ticket.status];
                  return (
                    <div
                      key={ticket.id}
                      className="px-5 py-3.5 flex items-start gap-3 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${sev.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-zinc-200 group-hover:text-white transition-colors truncate">
                            {ticket.title}
                          </p>
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0 ${sev.badge}`}
                          >
                            {sev.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-zinc-600 font-mono">{ticket.id}</span>
                          <span className="text-[11px] text-zinc-500">{ticket.customer}</span>
                          <span className={`text-[11px] font-medium ${st.color}`}>{st.label}</span>
                          <span className="text-[11px] text-zinc-600 ml-auto">{ticket.updated}</span>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-zinc-400">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Incident Management */}
            <div className="xl:col-span-2 bg-[#0f1724] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <span className="text-sm font-semibold text-white">Incidents</span>
                </div>
                <button className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
                  All <ChevronRight size={12} />
                </button>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {incidents.map((incident) => {
                  const sev = severityConfig[incident.severity];
                  const statusDot =
                    incident.status === "active"
                      ? "bg-red-500"
                      : incident.status === "monitoring"
                      ? "bg-amber-500"
                      : "bg-emerald-500";
                  const statusLabel =
                    incident.status === "active"
                      ? "Active"
                      : incident.status === "monitoring"
                      ? "Monitoring"
                      : "Resolved";
                  const statusColor =
                    incident.status === "active"
                      ? "text-red-400"
                      : incident.status === "monitoring"
                      ? "text-amber-400"
                      : "text-emerald-400";

                  return (
                    <div
                      key={incident.id}
                      className="px-5 py-4 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm text-zinc-200 group-hover:text-white transition-colors leading-snug">
                          {incident.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${sev.badge}`}
                        >
                          {sev.label}
                        </span>
                        <div className="flex items-center gap-1">
                          {incident.status === "active" ? (
                            <PulseDot color={statusDot} />
                          ) : (
                            <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                          )}
                          <span className={`text-[10px] font-medium ${statusColor}`}>
                            {statusLabel}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                          <Clock size={9} /> {incident.duration}
                        </span>
                        <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                          <Users size={9} /> {incident.responders}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {incident.affectedServices.map((svc) => (
                          <span
                            key={svc}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500 border border-white/[0.06]"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick stats */}
              <div className="px-5 py-4 border-t border-white/[0.05] grid grid-cols-3 gap-3">
                {[
                  { label: "MTTR", value: "23m", icon: RefreshCw },
                  { label: "MTTA", value: "4.1m", icon: Zap },
                  { label: "This Week", value: "7", icon: BarChart3 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <Icon size={9} /> {label}
                    </div>
                    <div className="text-sm font-bold text-zinc-200 font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── API Monitoring ── */}
          <div className="bg-[#0f1724] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.05]">
              <div className="flex items-center gap-2.5">
                <Activity size={14} className="text-violet-400" />
                <span className="text-sm font-semibold text-white">API Health Monitor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Operational
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Degraded
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Outage
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    {["Endpoint", "Status", "Latency", "RPS", "Uptime (30d)", "Trend"].map(
                      (col) => (
                        <th
                          key={col}
                          className="text-left text-[10px] uppercase tracking-widest text-zinc-600 px-5 py-3 font-medium first:rounded-tl-none"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {apiEndpoints.map((ep) => {
                    const st = apiStatusConfig[ep.status];
                    return (
                      <tr
                        key={ep.name}
                        className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      >
                        <td className="px-5 py-3.5">
                          <div className="text-zinc-200 font-medium group-hover:text-white transition-colors">
                            {ep.name}
                          </div>
                          <div className="text-[11px] text-zinc-600 font-mono">{ep.path}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            {ep.status === "operational" ? (
                              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            ) : (
                              <PulseDot color={st.dot} />
                            )}
                            <span className={`text-xs font-medium ${st.color}`}>{st.label}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`font-mono text-sm font-semibold ${
                              ep.latency > 300
                                ? "text-red-400"
                                : ep.latency > 150
                                ? "text-amber-400"
                                : "text-emerald-400"
                            }`}
                          >
                            {ep.latency}ms
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-sm text-zinc-300">
                            {ep.rps.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  ep.uptime >= 99.9
                                    ? "bg-emerald-500"
                                    : ep.uptime >= 98
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${ep.uptime}%` }}
                              />
                            </div>
                            <span
                              className={`font-mono text-xs ${
                                ep.uptime >= 99.9
                                  ? "text-emerald-400"
                                  : ep.uptime >= 98
                                  ? "text-amber-400"
                                  : "text-red-400"
                              }`}
                            >
                              {ep.uptime}%
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          {ep.trend === "up" ? (
                            <div className="flex items-center gap-1 text-emerald-400">
                              <TrendingUp size={13} />
                              <span className="text-xs">Improving</span>
                            </div>
                          ) : ep.trend === "down" ? (
                            <div className="flex items-center gap-1 text-red-400">
                              <TrendingDown size={13} />
                              <span className="text-xs">Declining</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-zinc-500">
                              <Circle size={11} className="fill-current" />
                              <span className="text-xs">Stable</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom row: Resource health ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "CPU Usage", value: "67%", icon: Cpu, color: "text-blue-400", bar: 67, barColor: "bg-blue-500" },
              { label: "Memory", value: "4.2 GB / 8 GB", icon: Server, color: "text-violet-400", bar: 52, barColor: "bg-violet-500" },
              { label: "DB Connections", value: "312 / 500", icon: Database, color: "text-emerald-400", bar: 62, barColor: "bg-emerald-500" },
              { label: "Network I/O", value: "1.8 Gbps", icon: Wifi, color: "text-amber-400", bar: 45, barColor: "bg-amber-500" },
            ].map(({ label, value, icon: Icon, color, bar, barColor }) => (
              <div
                key={label}
                className="bg-[#0f1724] border border-white/[0.06] rounded-xl p-4 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-500">{label}</span>
                  <Icon size={13} className={color} />
                </div>
                <div className={`text-sm font-semibold ${color} font-mono mb-3`}>{value}</div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${bar}%` }}
                  />
                </div>
                <div className="text-[10px] text-zinc-600 mt-1">{bar}% utilized</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}