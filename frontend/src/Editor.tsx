/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { Annotation, Comment } from "./types";

// Modular Components
import { EditorHeader } from "./components/editor/EditorHeader";
import { VideoArea, VideoAreaHandle } from "./components/editor/VideoArea";
import { DiscussionSidebar } from "./components/editor/DiscussionSidebar";

export function Editor() {
  const navigate = useNavigate();
  const { username } = useAuth();

  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTool, setActiveTool] = useState<"draw" | "erase">("draw");
  const [currentTime, setCurrentTime] = useState(0);

  const videoAreaRef = useRef<VideoAreaHandle>(null);

  if (!username) {
    navigate("/");
    return null;
  }

  const clearAll = () => {
    setAnnotations([]);
  };

  const addComment = (text: string) => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: nanoid(),
      userId: "local-user",
      userName: username,
      userColor: "#FF5C00",
      text,
      timestamp: Date.now(),
      videoTime: currentTime,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnnotationCreated = (newAnnotation: Annotation) => {
    setAnnotations((prev) => [...prev, newAnnotation]);
  };

  return (
    <div className="max-h-screen bg-[#F4F2EE] text-[#1A1A1A] flex flex-col font-sans overflow-hidden">
      <EditorHeader
        roomId="local"
        users={{}}
        onExit={() => navigate("/dashboard")}
        onLogoClick={() => navigate("/dashboard")}
      />

      <main className="flex-1 flex overflow-hidden">
        <VideoArea
          ref={videoAreaRef}
          activeTool={activeTool}
          annotations={annotations}
          comments={comments}
          userColor="#FF5C00"
          socketId={undefined}
          onAnnotationCreated={handleAnnotationCreated}
          onClearAll={clearAll}
          onToolChange={setActiveTool}
          onVideoChange={() => {
            setAnnotations([]);
            setComments([]);
          }}
          onTimeUpdate={setCurrentTime}
          formatTime={formatTime}
        />

        <DiscussionSidebar
          comments={comments}
          currentTime={currentTime}
          onSeek={(time) => videoAreaRef.current?.seek(time)}
          onAddComment={addComment}
          formatTime={formatTime}
        />
      </main>
    </div>
  );
}
