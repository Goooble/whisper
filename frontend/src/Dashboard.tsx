/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Plus, History, Settings, LogOut } from "lucide-react";
import { useAuth } from "./auth/AuthContext";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";

export function Dashboard() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    console.log("logged out");
  };

  const recentSessions = [
    {
      id: "1",
      name: "Commercial Spot V2",
      date: "2 hours ago",
      Status: "In Review",
    },
    {
      id: "2",
      name: "Feature Film Opener",
      date: "Yesterday",
      Status: "Completed",
    },
    {
      id: "3",
      name: "Color Grade Check",
      date: "3 days ago",
      Status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#1A1A1A] flex flex-col font-sans">
      <header className="h-20 border-b border-[#1A1A1A] flex items-center justify-between px-10 bg-[#F4F2EE] sticky top-0 z-50">
        <h2 className="text-3xl font-serif italic font-bold tracking-tight">
          SyncMark.
        </h2>
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
            Director: {username || "Guest"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="rounded-none border border-[#1A1A1A] hover:bg-black hover:text-white"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-10 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex items-end justify-between border-b border-[#1A1A1A] pb-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-serif italic font-bold">
              Studio Dashboard
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
              Review your recent editorial sessions
            </p>
          </div>
          <Button
            className="bg-[#1A1A1A] text-[#F4F2EE] rounded-none h-14 px-8 text-xs uppercase tracking-[0.2em] font-bold"
            onClick={() => navigate("/editor")}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Editorial Session
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="col-span-2 p-10 border-[#1A1A1A] rounded-none bg-white space-y-6">
            <div className="flex items-center gap-3 opacity-60">
              <History className="w-4 h-4" />
              <h3 className="text-[10px] uppercase font-bold tracking-widest">
                Recent Activity
              </h3>
            </div>

            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="group p-6 border border-[#1A1A1A]/10 hover:border-[#1A1A1A] cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="font-serif italic font-bold text-lg">
                      {session.name}
                    </h4>
                    <span className="text-[10px] uppercase font-bold opacity-40">
                      {session.date}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="group-hover:bg-[#1A1A1A] group-hover:text-white rounded-none transition-colors"
                    onClick={() => navigate("/editor")}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <aside className="space-y-10">
            <Card className="p-8 border-[#1A1A1A] rounded-none bg-[#1A1A1A] text-white space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic font-bold">
                  Analytics
                </h3>
                <p className="text-[10px] uppercase opacity-60 tracking-wider">
                  Session performance
                </p>
              </div>
              <div className="h-1 bg-white/20 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-2xl font-bold">12</span>
                  <p className="text-[8px] uppercase tracking-widest opacity-60">
                    Total Sessions
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold">48</span>
                  <p className="text-[8px] uppercase tracking-widest opacity-60">
                    Remarks Made
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-[#1A1A1A] rounded-none bg-white space-y-6 overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                <Settings className="w-6 h-6" />
                <h3 className="text-lg font-bold uppercase tracking-widest">
                  Settings
                </h3>
                <p className="text-xs opacity-60">
                  Manage your workspace preferences and integrations.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-zinc-200 text-zinc-400 hover:text-black hover:border-black rounded-none h-12 text-[10px] uppercase font-bold tracking-widest"
                >
                  Configure Studio
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
