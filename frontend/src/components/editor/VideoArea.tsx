/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Stage, Layer, Line } from "react-konva";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Link as LinkIcon,
  Pencil,
  Eraser,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Annotation, Comment } from "../../types";
import { nanoid } from "nanoid";

interface VideoAreaProps {
  activeTool: "draw" | "erase";
  annotations: Annotation[];
  comments: Comment[];
  userColor: string;
  socketId?: string;
  onAnnotationCreated: (annotation: Annotation) => void;
  onClearAll: () => void;
  onToolChange: (tool: "draw" | "erase") => void;
  onVideoChange: () => void;
  onTimeUpdate: (time: number) => void;
  formatTime: (seconds: number) => string;
}

export interface VideoAreaHandle {
  seek: (time: number) => void;
}

export const VideoArea = forwardRef<VideoAreaHandle, VideoAreaProps>(
  (
    {
      activeTool,
      annotations,
      comments,
      userColor,
      socketId,
      onAnnotationCreated,
      onClearAll,
      onToolChange,
      onVideoChange,
      onTimeUpdate,
      formatTime,
    },
    ref,
  ) => {
    const [videoUrl, setVideoUrl] = useState(
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    );
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentLine, setCurrentLine] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [strokeWidth] = useState(3);

    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      seek: (time: number) => {
        handleSeek([time]);
      },
    }));

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
      }
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const time = videoRef.current.currentTime;
        setCurrentTime(time);
        onTimeUpdate(time);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const handleSeek = (val: number[]) => {
      if (videoRef.current) {
        videoRef.current.currentTime = val[0];
        setCurrentTime(val[0]);
        onTimeUpdate(val[0]);
      }
    };

    // Exposed method for parent to seek (e.g. from comments)
    // We can handle manual seek via props or just keep it simple with parent passing a seek trigger
    // For now, parent passes onSeek to DiscussionSidebar which calls handleSeek if we use a ref,
    // but let's keep the handleSeek logic in parent for things that need to cross components if needed,
    // OR use a useImperativeHandle.

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        onVideoChange();
      }
    };

    const handleUrlChange = () => {
      const url = window.prompt("Enter Video URL (mp4, webm, etc.):");
      if (url) {
        setVideoUrl(url);
        onVideoChange();
      }
    };

    const handleMouseDown = (e: any) => {
      if (activeTool !== "draw") return;
      setIsDragging(true);
      const pos = e.target.getStage().getPointerPosition();
      setCurrentLine([pos.x, pos.y]);
    };

    const handleMouseMove = (e: any) => {
      if (!isDragging || activeTool !== "draw") return;
      const pos = e.target.getStage().getPointerPosition();
      setCurrentLine((prev) => [...prev, pos.x, pos.y]);
    };

    const handleMouseUp = () => {
      if (!isDragging || activeTool !== "draw") return;
      setIsDragging(false);

      const newAnnotation: Annotation = {
        id: nanoid(),
        userId: "local-user",
        points: currentLine,
        color: userColor,
        strokeWidth: strokeWidth,
        timestamp: Date.now(),
      };

      onAnnotationCreated(newAnnotation);
      setCurrentLine([]);
    };

    return (
      <div className="flex-1 flex flex-col relative bg-[#E5E2DE] group/canvas border border-[#1A1A1A] m-5">
        <div className="flex items-center justify-between px-4 py-3 bg-[#F4F2EE] border-b border-[#1A1A1A]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToolChange("draw")}
              className={`w-10 h-10 flex items-center justify-center transition-all duration-200 border border-[#1A1A1A] shadow-md rounded-none ${
                activeTool === "draw"
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-[#1A1A1A] hover:bg-[#F4F2EE]"
              }`}
              title="Draw"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => onToolChange("erase")}
              className={`w-10 h-10 flex items-center justify-center transition-all duration-200 border border-[#1A1A1A] shadow-md rounded-none ${
                activeTool === "erase"
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-[#1A1A1A] hover:bg-[#F4F2EE]"
              }`}
              title="Erase"
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button
              onClick={onClearAll}
              className="w-10 h-10 bg-white border border-[#1A1A1A] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-md rounded-none"
              title="Clear All"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-[#1A1A1A] gap-2 text-[10px] uppercase font-bold tracking-widest bg-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Local
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-[#1A1A1A] gap-2 text-[10px] uppercase font-bold tracking-widest bg-white"
              onClick={handleUrlChange}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              Link Video
            </Button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            className="max-w-full max-h-full aspect-video"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
          />

          <div className="absolute inset-0 z-10 pointer-events-auto">
            {videoRef.current && (
              <Stage
                width={videoRef.current.clientWidth}
                height={videoRef.current.clientHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="mx-auto"
              >
                <Layer>
                  {annotations.map((line) => (
                    <Line
                      key={line.id}
                      points={line.points}
                      stroke={line.color}
                      strokeWidth={line.strokeWidth}
                      tension={0.5}
                      lineCap="round"
                      lineJoin="round"
                      globalCompositeOperation={
                        line.userId === "eraser"
                          ? "destination-out"
                          : "source-over"
                      }
                    />
                  ))}
                  {currentLine.length > 0 && (
                    <Line
                      points={currentLine}
                      stroke={userColor}
                      strokeWidth={strokeWidth}
                      tension={0.5}
                      lineCap="round"
                      lineJoin="round"
                    />
                  )}
                </Layer>
              </Stage>
            )}
          </div>

          <div className="absolute top-10 right-10 z-20 pointer-events-none">
            <div className="bg-[#FF5C00] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Reviewing Active
            </div>
          </div>
        </div>

        <div className="h-20 bg-white border-t border-[#1A1A1A] flex items-center px-6 gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-zinc-100 rounded-none shrink-0"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="fill-black" />
            ) : (
              <Play className="fill-black ml-0.5" />
            )}
          </Button>

          <div className="flex-1 flex items-center gap-4 group/timeline">
            <span className="text-[10px] font-bold tabular-nums w-10">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative h-6 flex items-center">
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={(val) =>
                  handleSeek(Array.isArray(val) ? val : [val])
                }
                className="w-full"
              />
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="absolute w-0.5 h-4 -translate-y-1/2 pointer-events-none rounded-none"
                  style={{
                    left: `${(c.videoTime / duration) * 100}%`,
                    backgroundColor: "#1A1A1A",
                    top: "50%",
                    opacity: 0.3,
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold tabular-nums w-10 text-right">
              {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4 px-4 overflow-hidden w-40">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-black"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
            </Button>
            <Slider
              value={isMuted ? [0] : [volume]}
              max={1}
              step={0.1}
              className="w-20"
              onValueChange={(val) => {
                const volume = Array.isArray(val) ? val[0] : val;
                setVolume(volume);
                if (videoRef.current) videoRef.current.volume = volume;
                setIsMuted(volume === 0);
              }}
            />
          </div>
        </div>
      </div>
    );
  },
);
