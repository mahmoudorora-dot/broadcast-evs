import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ZoomIn, AlertTriangle } from "lucide-react";
import { withBase } from "@/lib/media";

const videos = [
  { src: withBase("videos/showreel-3.mp4"), caption: "Production Setup & Field Work" },
  { src: withBase("videos/showreel-4.mp4"), caption: "Broadcast Operations" },
  { src: withBase("videos/showreel-5.mp4"), caption: "Live Event Coverage" },
  { src: withBase("videos/showreel-6.mp4"), caption: "Behind the Scenes" },
];

const Sprocket = () => (
  <div className="w-3 h-4 rounded-sm bg-background/80 border border-border/50" />
);

const SprocketRow = ({ count }: { count: number }) => (
  <div className="flex justify-around items-center px-2 py-1.5 shrink-0">
    {Array.from({ length: count }).map((_, i) => (
      <Sprocket key={i} />
    ))}
  </div>
);

const FilmFrame = ({
  video,
  onOpen,
}: {
  video: { src: string; caption: string };
  onOpen: () => void;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasError && videoRef.current) {
      videoRef.current.play();
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
    <div className="shrink-0 w-[280px] md:w-[340px] flex flex-col mx-1">
      <SprocketRow count={8} />
      <div
        className="relative border-x-[3px] border-border/40 overflow-hidden group cursor-pointer"
        onClick={onOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hasError ? (
          <div className="aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle size={32} className="text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-xs text-muted-foreground">Video unavailable</p>
            </div>
          </div>
        ) : (
          <>
            <div className="aspect-[4/3] overflow-hidden">
              <video
                ref={videoRef}
                src={video.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => {
                  console.error("Film strip video failed to load:", video.src);
                  setHasError(true);
                }}
              />
            </div>
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-between p-3">
              <span className="text-xs font-display font-semibold tracking-wide text-foreground">
                {video.caption}
              </span>
              <ZoomIn size={16} className="text-primary shrink-0" />
            </div>
            <div className="absolute top-2 right-3 text-[9px] font-mono text-primary/40 tracking-widest">
              {video.caption.length}V
            </div>
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full border-2 border-primary/60 bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                <Play size={20} className="text-primary ml-1" />
              </div>
            </div>
          </>
        )}
      </div>
      <SprocketRow count={8} />
    </div>
  );
};

/* Fullscreen lightbox */
const Lightbox = ({
  video,
  onClose,
}: {
  video: { src: string; caption: string } | null;
  onClose: () => void;
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [video]);

  if (!video) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:border-primary transition-colors z-10"
      >
        <X size={20} />
      </button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {hasError ? (
          <div className="w-full aspect-video bg-muted flex items-center justify-center rounded-lg">
            <div className="text-center">
              <AlertTriangle size={48} className="text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">Video unavailable</p>
            </div>
          </div>
        ) : (
          <video
            src={video.src}
            controls
            autoPlay
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            onError={() => {
              console.error("Lightbox video failed to load:", video.src);
              setHasError(true);
            }}
          />
        )}
        <p className="text-center font-display font-semibold text-foreground mt-4 text-sm tracking-wide">
          {video.caption}
        </p>
      </motion.div>
    </motion.div>
  );
};

const ShowreelSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; caption: string } | null>(null);

  const handleClose = useCallback(() => setSelectedVideo(null), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.75;
    let isPaused = false;

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        const halfWidth = container.scrollWidth / 2;
        if (scrollPos >= halfWidth) scrollPos = 0;
        container.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleEnter = () => { isPaused = true; };
    const handleLeave = () => { isPaused = false; };

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedVideo]);

  const allVideos = [...videos, ...videos];

  return (
    <>
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />

        <div className="container mx-auto px-6 mb-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-live animate-pulse-glow" />
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Production <span className="text-gradient">Showreel</span>
              </h2>
            </div>
            <div className="w-16 h-1 bg-primary rounded-full mb-4" />
            <p className="text-muted-foreground text-sm">
              A cinematic look at broadcast production moments. Click to view fullscreen.
            </p>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="py-4 bg-card/20 border-y border-border/30">
            <div
              ref={containerRef}
              className="flex will-change-transform"
              style={{ width: "max-content" }}
            >
              {allVideos.map((video, i) => (
                <FilmFrame
                  key={`${video.caption}-${i}`}
                  video={video}
                  onOpen={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 scanline pointer-events-none opacity-30" />
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedVideo && <Lightbox video={selectedVideo} onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
};

export default ShowreelSection;
