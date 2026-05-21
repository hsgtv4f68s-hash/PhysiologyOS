"use client";

import { Bell, Search, RefreshCw } from "lucide-react";

export default function GlobalTopbar() {
  return (
    <div className="sticky top-6 z-40 mb-8">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_60px_rgba(255,255,255,0.03)]">
        <div className="absolute inset-0">
          <div className="absolute left-[10%] top-[-120%] h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />

          <div className="absolute right-[8%] top-[-100%] h-44 w-44 rounded-full bg-white/[0.025] blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b]/70 px-4 py-3">
            <Search className="h-4 w-4 text-white/35" />

            <input
              placeholder="Search athletes, interventions, metrics..."
              className="w-full bg-transparent text-sm text-white/75 outline-none placeholder:text-white/30"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.08] hover:text-white">
              <RefreshCw className="h-4 w-4" />
              Synced
            </button>

            <button className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-white/65 transition hover:bg-white/[0.08] hover:text-white">
              <Bell className="h-4 w-4" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-300 shadow-[0_0_14px_rgba(253,186,116,0.7)]" />
            </button>

            <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:bg-white/[0.08]">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-300/80 to-emerald-300/80 shadow-[0_0_18px_rgba(125,211,252,0.25)]" />

              <div className="text-left">
                <p className="text-sm font-medium text-white/80">
                  Coach
                </p>

                <p className="text-xs text-white/35">
                  Performance Staff
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}