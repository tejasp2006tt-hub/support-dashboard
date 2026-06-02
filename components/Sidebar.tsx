"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Ticket,
  AlertTriangle,
  Activity,
  MonitorDot,
  BarChart3,
  Database,
  BookOpen,
  MessageSquare,
  Users,
  Shield,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

function SidebarItem({
  href,
  icon: Icon,
  label,
  badge,
  active = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  active?: boolean;
}) {
  return (
    <Link href={href}>
      <button
  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
  ${
    active
      ? "bg-[#1e3a5f] text-white"
      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
  }`}
>
        <Icon size={16} />
        <span className="flex-1 text-left">{label}</span>

        {badge != null && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400">
            {badge}
          </span>
        )}
      </button>
    </Link>
  );
}

export default function Sidebar() {
    const pathname = usePathname();
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col bg-[#090e17] border-r border-white/[0.05]">
      <div className="h-14 flex items-center px-5 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Zap size={14} />
          </div>

          <span className="text-sm font-semibold text-white">
            SupportOps
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-widest text-zinc-600 px-3 pb-2">
          Overview
        </div>

        <SidebarItem
  href="/"
  icon={LayoutDashboard}
  label="Dashboard"
  active={pathname === "/"}
/>

        <SidebarItem
          href="/tickets"
          icon={Ticket}
          label="Tickets"
          badge={5}
          active={pathname === "/tickets"}
        />

        <SidebarItem
          href="/incidents"
          icon={AlertTriangle}
          label="Incidents"
          badge={1}
          active={pathname === "/incidents"}
        />

        <SidebarItem
  href="/api-monitor"
  icon={Activity}
  label="API Monitor"
  active={pathname === "/api-monitor"}
/>

<SidebarItem
  href="/status"
  icon={MonitorDot}
  label="Status Page"
  active={pathname === "/status"}
/>

        <div className="text-[10px] uppercase tracking-widest text-zinc-600 px-3 pb-2 pt-4">
          Engineering
        </div>

        <SidebarItem
          href="/analytics"
          icon={BarChart3}
          label="Analytics"
          active={pathname === "/analytics"}
        />

        <SidebarItem
          href="#"
          icon={Database}
          label="Runbooks"
        />

        <SidebarItem
          href="#"
          icon={BookOpen}
          label="Docs"
        />

        <SidebarItem
          href="#"
          icon={MessageSquare}
          label="Slack Sync"
        />

        <div className="text-[10px] uppercase tracking-widest text-zinc-600 px-3 pb-2 pt-4">
          Admin
        </div>

        <SidebarItem
          href="#"
          icon={Users}
          label="Team"
        />

        <SidebarItem
          href="#"
          icon={Shield}
          label="Permissions"
        />

        <SidebarItem
          href="#"
          icon={Settings}
          label="Settings"
        />
      </nav>

      <div className="px-3 py-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs">
            PK
          </div>

          <div className="flex-1">
            <div className="text-xs text-zinc-200">
              Priya Kumar
            </div>

            <div className="text-[10px] text-zinc-500">
              Sr. Solutions Eng.
            </div>
          </div>

          <LogOut size={13} className="text-zinc-600" />
        </div>
      </div>
    </aside>
  );
}