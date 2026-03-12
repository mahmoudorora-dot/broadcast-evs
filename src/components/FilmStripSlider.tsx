import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const photos = [
  { src: "/images/gallery-on-air.jpeg", caption: "On Air – Live Broadcast" },
  { src: "/images/gallery-control-room.jpeg", caption: "Broadcast Control Room" },
  { src: "/images/gallery-evs-operator.jpeg", caption: "EVS Operation" },
  { src: "/images/gallery-evs-equipment.jpg", caption: "EVS XT Server" },
  { src: "/images/gallery-stadium.jpg", caption: "Stadium Coverage" },
  { src: "/images/gallery-ob-van.jpg", caption: "OB Van Production" },
  { src: "/images/gallery-server-room.jpg", caption: "Server & Monitoring" },
  { src: "/images/gallery-control-station.jpg", caption: "Workstation Setup" },
  { src: "/images/gallery-falcon-event.jpg", caption: "Falcon Championship" },
  { src: "/images/gallery-headset-selfie.jpg", caption: "On Location" },
  { src: "/images/gallery-evs-remote.jpg", caption: "EVS LSM Remote" },
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

const FilmFrame = ({ photo }: { photo: { src: string; caption: string } }) => (
  <div className="shrink-0 w-[280px] md:w-[340px] flex flex-col mx-1">
    {/* Top sprockets */}
    <SprocketRow count={8} />
    {/* Image frame */}
    <div className="relative border-x-[3px] border-border/40 overflow-hidden group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      {/* Vignette overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none" />
      {/* Caption on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3">
        <span className="text-xs font-display font-semibold tracking-wide text-foreground">
          {photo.caption}
        </span>
      </div>
      {/* Film frame number */}
      <div className="absolute top-2 right-3 text-[9px] font-mono text-primary/40 tracking-widest">
        {photo.caption.length}A
      </div>
    </div>
    {/* Bottom sprockets */}
    <SprocketRow count={8} />
  </div>
);

const FilmStripSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;
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

  const allPhotos = [...photos, ...photos];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background grain */}
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
            A cinematic look at broadcast production moments.
          </p>
        </motion.div>
      </div>

      {/* Film strip container */}
      <div className="relative overflow-hidden">
        {/* Film strip edges - top/bottom lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* The film strip */}
        <div className="py-4 bg-card/20 border-y border-border/30">
          <div
            ref={containerRef}
            className="flex will-change-transform"
            style={{ width: "max-content" }}
          >
            {allPhotos.map((photo, i) => (
              <FilmFrame key={`${photo.caption}-${i}`} photo={photo} />
            ))}
          </div>
        </div>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-30" />
    </section>
  );
};

export default FilmStripSlider;
