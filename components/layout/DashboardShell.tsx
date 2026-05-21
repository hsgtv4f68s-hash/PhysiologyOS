import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import GlobalTopbar from "@/components/layout/GlobalTopbar";

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <Sidebar />

      <div className="page-breathe-in relative z-10 mx-auto max-w-7xl px-8 py-8 pl-28">
  <GlobalTopbar />

  {children}
</div>
    </main>
  );
}