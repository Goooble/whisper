/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Pencil, Eraser, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface EditorToolbarProps {
  activeTool: "draw" | "erase";
  onToolChange: (tool: "draw" | "erase") => void;
  onClearAll: () => void;
}

export function EditorToolbar({
  activeTool,
  onToolChange,
  onClearAll,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-row gap-4 z-40 px-10 py-6 bg-[#F4F2EE] border-b border-[#1A1A1A]">
      <ToolButton
        active={activeTool === "draw"}
        onClick={() => onToolChange("draw")}
        icon={<Pencil className="w-5 h-5" />}
        label="Draw"
      />
      <ToolButton
        active={activeTool === "erase"}
        onClick={() => onToolChange("erase")}
        icon={<Eraser className="w-5 h-5" />}
        label="Erase"
      />
      <button
        onClick={onClearAll}
        className="w-12 h-12 bg-white border border-[#1A1A1A] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-md group"
        title="Clear All"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

function ToolButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-12 h-12 flex items-center justify-center transition-all duration-200 border border-[#1A1A1A] shadow-md",
        active
          ? "bg-[#1A1A1A] text-white"
          : "bg-white text-[#1A1A1A] hover:bg-[#F4F2EE]",
      )}
      title={label}
    >
      {icon}
    </button>
  );
}
