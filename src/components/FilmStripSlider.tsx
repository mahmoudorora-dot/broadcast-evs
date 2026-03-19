import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, AlertTriangle } from "lucide-react";
import { withBase } from "@/lib/media";

const photos = [
  { src: withBase("images/gallery-on-air.jpeg"), caption: "On Air – Live Broadcast" },
  { src: withBase("images/gallery-control-room.jpeg"), caption: "Broadcast Control Room" },
  { src: withBase("images/gallery-evs-operator.jpeg"), caption: "EVS Operation" },
  { src: withBase("images/gallery-evs-equipment.jpg"), caption: "EVS XT Server" },
  { src: withBase("images/gallery-stadium.jpg"), caption: "Stadium Coverage" },
  { src: withBase("images/gallery-ob-van.jpg"), caption: "OB Van Production" },
  { src: withBase("images/gallery-server-room.jpg"), caption: "Server & Monitoring" },
  { src: withBase("images/gallery-control-station.jpg"), caption: "Workstation Setup" },
  { src: withBase("images/gallery-falcon-event.jpg"), caption: "Falcon Championship" },
  { src: withBase("images/gallery-headset-selfie.jpg"), caption: "On Location" },
  { src: withBase("images/gallery-evs-remote.jpg"), caption: "EVS LSM Remote" },
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
  photo,
  onOpen,
}: {
  photo: { src: string; caption: string };
  onOpen: () => void;
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="shrink-0 w-[280px] md:w-[340px] flex flex-col mx-1">
      <SprocketRow count={8} />
      <div
        className="relative border-x-[3px] border-border/40 overflow-hidden group cursor-pointer"
        onClick={onOpen}
      >
        {hasError ? (
          <div className="aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle size={32} className="text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-xs text-muted-foreground">Image unavailable</p>
            </div>
          </div>
        ) : (
          <>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={() => {
                  console.error("Film strip image failed to load:", photo.src);
                  setHasError(true);
                }}
              />
            </div>
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-between p-3">
              <span className="text-xs font-display font-semibold tracking-wide text-foreground">
                {photo.caption}
              </span>
              <ZoomIn size={16} className="text-primary shrink-0" />
            </div>
            <div className="absolute top-2 right-3 text-[9px] font-mono text-primary/40 tracking-widest">
              {photo.caption.length}A
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
  photo,
  onClose,
}: {
  photo: { src: string; caption: string } | null;
  onClose: () => void;
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [photo]);

  if (!photo) return null;

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
              <p className="text-sm text-muted-foreground">Image unavailable</p>
            </div>
          </div>
        ) : (
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            onError={() => {
              console.error("Lightbox image failed to load:", photo.src);
              setHasError(true);
            }}
          />
        )}
        <p className="text-center font-display font-semibold text-foreground mt-4 text-sm tracking-wide">
          {photo.caption}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FilmStripSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string } | null>(null);

  const handleClose = useCallback(() => setSelectedPhoto(null), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.75; // 50% faster
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
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedPhoto]);

  const allPhotos = [...photos, ...photos];

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
                Production <span className="text-gradient">Reel</span>
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
              {allPhotos.map((photo, i) => (
                <FilmFrame
                  key={`${photo.caption}-${i}`}
                  photo={photo}
                  onOpen={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 scanline pointer-events-none opacity-30" />
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedPhoto && <Lightbox photo={selectedPhoto} onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
};

export default FilmStripSlider;
