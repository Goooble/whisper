/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { User } from "../../types";

interface EditorHeaderProps {
  roomId: string;
  users: Record<string, User>;
  onExit: () => void;
  onLogoClick: () => void;
}

export function EditorHeader({
  roomId,
  users,
  onExit,
  onLogoClick,
}: EditorHeaderProps) {
  return (
    <header className="h-20 border-b border-[#1A1A1A] flex items-center justify-between px-10 bg-[#F4F2EE] sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <h2
          className="text-3xl font-serif italic font-bold tracking-tight cursor-pointer"
          onClick={onLogoClick}
        >
          SyncMark.
        </h2>
        <div className="hidden md:flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest opacity-60">
          <span className="flex items-center gap-2">
            Project: Review_Session_V1
          </span>
          <Separator orientation="vertical" className="h-4 bg-[#1A1A1A]/20" />
          <span className="flex items-center gap-2 bg-[#1A1A1A] text-[#F4F2EE] px-2 py-0.5 rounded-none">
            Room: {roomId}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {Object.keys(users || {}).length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {Object.values(users || {}).map((u) => (
                <div
                  key={u.id}
                  className="w-7 h-7 border border-[#1A1A1A] flex items-center justify-center text-[9px] font-bold"
                  style={{ backgroundColor: u.color, color: "#fff" }}
                  title={u.name}
                >
                  {u.name.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
              {Object.keys(users || {}).length} Reviewers
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          className="text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-black hover:text-white rounded-none border border-[#1A1A1A]"
          onClick={onExit}
        >
          Exit Suite
        </Button>
      </div>
    </header>
  );
}
