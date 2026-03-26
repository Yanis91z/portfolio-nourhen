'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { getVideos, Video } from '@/lib/api';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function VideoCard({ video }: { video: Video }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setPlaying(true);
          } else {
            videoRef.current?.pause();
            setPlaying(false);
          }
        });
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const videoSrc = video.videoUrl.startsWith('http') ? video.videoUrl : `${API}${video.videoUrl}`;

  return (
    <div className="snap-start h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-black border border-card-border aspect-[9/16]">
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted={muted}
          playsInline
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold text-lg">{video.title}</h3>
          {video.description && (
            <p className="text-white/70 text-sm mt-1 line-clamp-2">{video.description}</p>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos()
      .then(setVideos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">Vidéos</span>
          </h1>
          <p className="text-muted text-lg mb-8">
            Mes créations vidéo et contenus.
          </p>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="w-12 h-12 border-4 border-card-border border-t-[var(--color-primary)] rounded-full animate-spin" />
        </div>
      ) : videos.length === 0 ? (
        <p className="text-muted text-center py-20">Aucune vidéo pour le moment.</p>
      ) : (
        <div className="snap-y snap-mandatory overflow-y-auto" style={{ height: 'calc(100vh - 12rem)' }}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}
