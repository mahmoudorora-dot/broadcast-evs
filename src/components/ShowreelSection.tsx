import { motion } from "framer-motion";
import { Play, Film, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import { withBase } from "@/lib/media";

const videos = [
  { src: withBase("videos/showreel-3.mp4"), title: "Production Setup & Field Work" },
  { src: withBase("videos/showreel-4.mp4"), title: "Broadcast Operations" },
  { src: withBase("videos/showreel-5.mp4"), title: "Live Event Coverage" },
  { src: withBase("videos/showreel-6.mp4"), title: "Behind the Scenes" },
];

const ShowreelSection = () => {
  return (
    <section id="showreel" className="py-24 bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 broadcast-grid opacity-10 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Film size={20} className="text-primary" />
            <span className="text-xs font-display font-semibold tracking-widest uppercase text-primary">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Production <span className="text-gradient">Showreel</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground text-sm mb-12">
            Highlights from live broadcast productions and events.
          </p>

          {/* Featured row - 2 large */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
{videos.slice(0, 2).map((video, i) => (
              <VideoCard key={video.title} video={video} delay={i * 0.15} featured />
            ))}
          </div>

          {/* Secondary row */}
          <div className="grid md:grid-cols-2 gap-6">
{videos.slice(2).map((video, i) => (
              <VideoCard key={video.title} video={video} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const VideoCard = ({
  video,
  delay,
  featured,
}: {
  video: { src: string; title: string };
  delay: number;
  featured?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!videoError) {
      videoRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-lg overflow-hidden border border-border bg-background hover:border-primary/50 transition-all duration-500 hover:glow-border cursor-pointer"
    >
      {videoError ? (
        <div className="w-full aspect-video bg-muted flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle size={32} className="text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-xs text-muted-foreground">Video unavailable</p>
          </div>
        </div>
      ) : (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src={video.src}
            muted
            preload="metadata"
            loop
            playsInline
            crossOrigin="anonymous"
            className={`w-full aspect-video object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={(e) => {
              const error = e.currentTarget.error;
              console.error(`[Video "${video.title}"] Error:`, error?.message);
              setVideoError(true);
            }}
            onVolumeChange={(e) => {
              const vid = e.currentTarget;
              if (!vid.muted) {
                vid.muted = true;
                vid.volume = 0;
              }
            }}
          />
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent flex items-center justify-center transition-opacity duration-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-14 h-14 rounded-full border-2 border-primary/60 bg-primary/10 backdrop-blur-sm flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/20">
              <Play size={24} className="text-primary ml-1" />
            </div>
          </div>
        </>
      )}

      {/* Title bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          <h3 className="font-display font-semibold text-sm text-foreground">
            {video.title}
          </h3>
        </div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-20" />
    </motion.div>
  );
};

export default ShowreelSection;
