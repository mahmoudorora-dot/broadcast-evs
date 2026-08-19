import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Monitor, Radio, Camera, Cable, Tv, Video, Airplay, AudioLines, Presentation, Globe, PlayCircle, Settings, Wifi, Cloud, Smartphone, Laptop, Tablet } from "lucide-react";

const skills = [
  // Replay & Playout Systems
  { label: "EVS XT2 / XT3", icon: Monitor, level: 95 },
  { label: "InFlow Replay", icon: Video, level: 90 },
  { label: "Slow-Motion Control", icon: PlayCircle, level: 92 },
  { label: "Highlight Edits", icon: Cpu, level: 88 },
  { label: "Ingest & Playout", icon: Radio, level: 90 },
  
  // Live Studio Operations
  { label: "Blackmagic ATEM", icon: Tv, level: 88 },
  { label: "Sony Exposure", icon: Monitor, level: 85 },
  { label: "Teleprompter", icon: Presentation, level: 92 },
  { label: "Character Generator", icon: Laptop, level: 80 },
  { label: "Multiviewers", icon: Airplay, level: 87 },
  
  // IP Video & Streaming
  { label: "RTMP / RTMPS", icon: Globe, level: 93 },
  { label: "SRT Protocol", icon: Wifi, level: 90 },
  { label: "NDI Protocols", icon: Cloud, level: 88 },
  { label: "Wirecast Pro", icon: Video, level: 90 },
  { label: "vMix", icon: Tv, level: 92 },
  { label: "OBS Studio", icon: PlayCircle, level: 95 },
  { label: "Restream.io", icon: Cloud, level: 85 },
  
  // Broadcast Engineering & Hardware
  { label: "Signal Routing", icon: Cable, level: 92 },
  { label: "Patch Panels", icon: Settings, level: 88 },
  { label: "Camera CCU Setup", icon: Camera, level: 90 },
  { label: "SDI / Fiber Converters", icon: Cable, level: 87 },
  { label: "Multi-Channel Recorders", icon: Cpu, level: 85 },
  
  // IT & Networking
  { label: "Layer-1 Troubleshooting", icon: Wifi, level: 90 },
  { label: "PoE Verification", icon: Laptop, level: 88 },
  { label: "LAN / WLAN Config", icon: Globe, level: 92 },
  { label: "Hardware Diagnostics", icon: Cpu, level: 90 },
];

const CircularMeter = ({ level, icon: Icon, label, delay }: { level: number; icon: React.ElementType; label: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group flex flex-col items-center gap-3 p-4"
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="4"
          />
          {/* Animated progress */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isInView ? strokeDashoffset : circumference}
            className="transition-all duration-[1.5s] ease-out"
            style={{
              filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.4))",
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon
            size={20}
            className="text-muted-foreground transition-colors duration-300 group-hover:text-primary mb-1"
          />
          <span className="text-sm font-display font-bold text-foreground">
            {isInView ? `${level}%` : "0%"}
          </span>
        </div>
        {/* Glow ring on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_hsl(var(--primary)/0.2)]" />
      </div>
      <span className="text-[11px] font-display font-semibold tracking-wide text-silver text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-card/50 relative overflow-hidden">
      {/* Dashboard-style background */}
      <div className="absolute inset-0 broadcast-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-display font-semibold tracking-widest uppercase text-primary">
              System Status: Online
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
            {skills.map((skill, i) => (
              <CircularMeter
                key={skill.label}
                icon={skill.icon}
                label={skill.label}
                level={skill.level}
                delay={i * 0.08}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
