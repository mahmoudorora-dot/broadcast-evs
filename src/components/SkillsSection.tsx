import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Monitor, Radio, Camera, Cable, Tv, Video, Airplay, AudioLines, Presentation, Globe, PlayCircle, Settings, Wifi, Cloud, Smartphone, Laptop, Tablet } from "lucide-react";

const skills = [
  // EVS & Replay Systems
  { label: "EVS XT / VIA Replay", icon: Monitor, level: 95 },
  { label: "EVS LSM Remote", icon: Wifi, level: 90 },
  { label: "EVS C-Cast", icon: Cloud, level: 85 },
  
  // Streaming Software
  { label: "vMix", icon: Tv, level: 90 },
  { label: "Wirecast", icon: Video, level: 85 },
  { label: "OBS Studio", icon: PlayCircle, level: 92 },
  { label: "Streamlabs OBS", icon: PlayCircle, level: 88 },
  { label: "XSplit Broadcaster", icon: Monitor, level: 80 },
  { label: "Resolume Arena", icon: Airplay, level: 85 },
  { label: "Livestream Studio", icon: Settings, level: 82 },
  
  // Streaming Platforms
  { label: "YouTube Live", icon: PlayCircle, level: 95 },
  { label: "Twitch Streaming", icon: PlayCircle, level: 90 },
  { label: "Facebook Live", icon: Globe, level: 92 },
  { label: "Instagram Live", icon: Smartphone, level: 88 },
  { label: "TikTok Live", icon: Smartphone, level: 85 },
  { label: "LinkedIn Live", icon: Globe, level: 80 },
  { label: "Vimeo Live", icon: Video, level: 87 },
  { label: "Restream.io", icon: Cloud, level: 83 },
  { label: "StreamYard", icon: Laptop, level: 86 },
  { label: "StreamElements", icon: Settings, level: 84 },
  
  // Hardware & Equipment
  { label: "Teleprompter Systems", icon: Presentation, level: 92 },
  { label: "OB Camera Setup", icon: Camera, level: 88 },
  { label: "Signal Routing", icon: Cable, level: 90 },
  { label: "Live Broadcast", icon: Radio, level: 95 },
  { label: "Audio/Video Signals", icon: AudioLines, level: 88 },
  { label: "Multi-Platform Streaming", icon: Globe, level: 93 },
  
  // Production Tools
  { label: "Broadcast PPT", icon: Cpu, level: 80 },
  { label: "Mobile Streaming", icon: Smartphone, level: 87 },
  { label: "Tablet Production", icon: Tablet, level: 82 },
  { label: "WebRTC Streaming", icon: Wifi, level: 78 },
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
