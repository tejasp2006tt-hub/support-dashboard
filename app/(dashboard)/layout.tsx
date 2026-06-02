import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#080d14] text-white flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  );
}