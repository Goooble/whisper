/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Comment } from "../../types";

interface DiscussionSidebarProps {
  comments: Comment[];
  currentTime: number;
  onSeek: (time: number) => void;
  onAddComment: (text: string) => void;
  formatTime: (seconds: number) => string;
}

export function DiscussionSidebar({
  comments,
  currentTime,
  onSeek,
  onAddComment,
  formatTime,
}: DiscussionSidebarProps) {
  return (
    <aside className="w-100 border-l border-[#1A1A1A] bg-[#F4F2EE] flex flex-col">
      <div className="p-3 border-b border-[#1A1A1A]">
        <h3 className="text-3xl font-serif italic font-bold">Discussion</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-[#1A1A1A]/10">
          {comments.length === 0 ? (
            <div className="p-4 text-center space-y-2">
              <MessageSquare className="w-10 h-10 text-zinc-300 mx-auto" />
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">
                No remarks on timeline
              </p>
            </div>
          ) : (
            comments
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 space-y-2 hover:bg-white transition-colors group cursor-pointer"
                  onClick={() => onSeek(comment.videoTime)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#1A1A1A] text-[#F4F2EE] px-1.5 py-0.5 text-[9px] font-bold tabular-nums">
                        {formatTime(comment.videoTime)}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest">
                        {comment.userName}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold opacity-30 uppercase">
                      {new Date(comment.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#333]">
                    {comment.text}
                  </p>
                </div>
              ))
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-[#1A1A1A] bg-white">
        <div className="space-y-2 pt-2">
          <textarea
            placeholder={`Add remark at ${formatTime(currentTime)}...`}
            className="w-full bg-[#F4F2EE] border border-[#1A1A1A] p-2 text-sm font-sans min-h-20 outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-all resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                onAddComment(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
              ⌘ + Enter to post
            </span>
            <button
              onClick={(e) => {
                const textarea = e.currentTarget.parentElement
                  ?.previousElementSibling as HTMLTextAreaElement;
                onAddComment(textarea.value);
                textarea.value = "";
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-4 hover:text-[#FF5C00] transition-colors"
            >
              Post Remark
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
