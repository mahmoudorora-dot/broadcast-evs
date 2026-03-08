import { motion } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Broadcast control room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="absolute inset-0 scanline pointer-events-none" />
      </div>

      {/* Live indicator */}
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-live animate-pulse-glow" />
        <span className="text-xs font-display font-semibold tracking-widest uppercase text-live">Live</span>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <MapPin size={14} className="text-primary" />
            <span className="text-xs font-medium tracking-wide text-primary">Dubai Production City, UAE</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-4">
            <span className="text-foreground">Mahmoud Fathy</span>
            <br />
            <span className="text-gradient">Orabi</span>
          </h1>

          <p className="text-lg md:text-xl font-display font-medium tracking-wide text-silver uppercase mb-6">
            EVS Operator &nbsp;|&nbsp; OB Technician &nbsp;|&nbsp; Media Systems Operator
          </p>

          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed mb-10 text-sm md:text-base">
            Broadcast technician with more than 8 years of experience in live sports production,
            EVS replay systems, media playback, and outside broadcast operations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#experience"
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold tracking-wide text-sm uppercase transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
            >
              View Experience
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-md border border-silver/30 text-silver font-display font-semibold tracking-wide text-sm uppercase transition-all hover:bg-secondary hover:border-primary/50 hover:text-foreground"
            >
              Contact Me
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-md border border-border text-muted-foreground font-display font-semibold tracking-wide text-sm uppercase transition-all hover:bg-secondary hover:text-foreground"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
