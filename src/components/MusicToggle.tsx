"use client";

import { useRef, useEffect } from "react";
import { weddingConfig } from "@/lib/config";

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(weddingConfig.music);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked — user needs interaction
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      className={`music-toggle ${isPlaying ? "playing" : ""}`}
      aria-label={isPlaying ? "Pause musik" : "Play musik"}
    >
      <div className={`music-bars ${!isPlaying ? "paused" : ""}`}>
        <span className="music-bar" />
        <span className="music-bar" />
        <span className="music-bar" />
        <span className="music-bar" />
      </div>
    </button>
  );
}
