import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ChevronDown, Play, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import { withBase, getAssetUrl } from "@/lib/media";

const heroVideoSrc = withBase("videos/showreel-6.mp4");
const profilePhoto = withBase("/profile-photo.jpeg");

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Video Background - z-0 to be behind overlays */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        {videoError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle size={48} className="text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-xs text-muted-foreground">Video unavailable</p>
            </div>
          </div>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-[120%] object-cover"
            onError={(e) => {
              const error = e.currentTarget.error;
              console.error('[Hero Video] Error:', error?.message);
              setVideoError(true);
            }}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Cinematic overlays - reduced opacity so video is visible */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/70 via-background/40 to-background/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background/50 via-transparent to-background/20" />
      <div className="absolute inset-0 z-0 scanline pointer-events-none opacity-20" />

      {/* Animated corner frames */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-20 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-20 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

      {/* Live indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-6 left-6 flex items-center gap-2 z-10"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-live animate-pulse-glow" />
        <span className="text-xs font-display font-semibold tracking-widest uppercase text-live">
          Live
        </span>
      </motion.div>

      {/* Timecode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-6 right-6 z-10 font-mono text-xs text-primary/50 tracking-widest"
      >
        REC ● 00:00:00:00
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 container mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/20">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <AlertTriangle size={32} className="text-muted-foreground opacity-50" />
                  </div>
                ) : (
                  <img
                    src={profilePhoto}
                    alt="Mahmoud Fathy Orabi"
                    className="w-full h-full object-contain bg-background/50"
                    onError={() => {
                      console.error('[Profile Photo] Error loading:', profilePhoto);
                      setImageError(true);
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-5"
            >
              <MapPin size={14} className="text-primary" />
              <span className="text-xs font-medium tracking-wide text-primary">
                Dubai Production City, UAE
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-3"
            >
              <span className="text-foreground">Mahmoud Fathy</span>
              <br />
              <span className="text-gradient">Orabi</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-sm md:text-base font-display font-medium tracking-wider text-silver uppercase mb-2"
            >
              Broadcast & EVS Operator
            </motion.p>
            <motion.p
              custom={2.5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-xs md:text-sm font-display tracking-wide text-muted-foreground uppercase mb-6"
            >
              Media Production Specialist
            </motion.p>

            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="max-w-xl text-primary leading-relaxed mb-8 text-sm md:text-base"
            >
              Broadcast technician with more than 8 years of experience in live sports production,
              EVS replay systems, media playback, and outside broadcast operations.
            </motion.p>

            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center md:justify-start gap-4"
            >
              <a
                href="#showreel"
                className="group inline-flex items-center gap-2.5 px-8 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold tracking-wide text-sm uppercase transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
              >
                <Play size={16} className="transition-transform group-hover:scale-110" />
                Watch Showreel
              </a>
              <a
                href="#experience"
                className="px-8 py-3 rounded-md border border-silver/30 text-silver font-display font-semibold tracking-wide text-sm uppercase transition-all hover:bg-secondary hover:border-primary/50 hover:text-foreground"
              >
                View Experience
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-md border border-border text-muted-foreground font-display font-semibold tracking-wide text-sm uppercase transition-all hover:bg-secondary hover:text-foreground"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] font-display tracking-widest text-muted-foreground uppercase">
          Scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
