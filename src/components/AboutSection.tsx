import { motion, useInView } from "framer-motion";
import { Monitor, Radio, Tv, Users, Globe, PlayCircle, Wifi, Cloud, Smartphone, Settings, Camera, Video } from "lucide-react";
import { useRef } from "react";

const highlights = [
  { icon: Monitor, label: "EVS Replay Systems", value: "8+" },
  { icon: Radio, label: "Live Broadcast", value: "200+" },
  { icon: Tv, label: "Media Playback", value: "50+" },
  { icon: Users, label: "Team Projects", value: "100+" },
];

const streamingSkills = [
  { icon: PlayCircle, label: "OBS Studio", level: "Expert" },
  { icon: Monitor, label: "vMix", level: "Advanced" },
  { icon: Video, label: "Wirecast", level: "Advanced" },
  { icon: Globe, label: "YouTube Live", level: "Expert" },
  { icon: PlayCircle, label: "Twitch", level: "Expert" },
  { icon: Globe, label: "Facebook Live", level: "Expert" },
  { icon: Smartphone, label: "Instagram Live", level: "Advanced" },
  { icon: Smartphone, label: "TikTok Live", level: "Advanced" },
  { icon: Cloud, label: "StreamYard", level: "Advanced" },
  { icon: Settings, label: "StreamElements", level: "Intermediate" },
  { icon: Wifi, label: "Multi-Platform", level: "Expert" },
  { icon: Camera, label: "Mobile Streaming", level: "Advanced" },
];

const CountUp = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="text-2xl font-display font-bold text-primary">
      {isInView ? value : "0"}
    </span>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 broadcast-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <p className="text-secondary-foreground leading-relaxed mb-6">
                Hands-on Broadcast Operations Specialist, EVS Replay Operator, and Live Production Technician with dedicated experience in high-profile broadcast environments since March 2023. Proven track record in executing real-time slow-motion replays, live clip creation, and turnaround highlight packages using EVS (XT2/XT3) and InFlow servers for tier-1 regional networks, including Abu Dhabi Media, Dubai TV, and Saudi Sports.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Technical expertise bridges traditional SDI/Fiber baseband infrastructure with modern AV-over-IP workflows. Experienced in full studio integration—managing signal paths from camera sensors and CCUs to matrix switchers, multiviewers, and multi-channel SSD recorders. Highly proficient in configuring multi-destination IP streaming platforms (Wirecast Pro, vMix, OBS) using RTMP/RTMPS, SRT, and NDI protocols with live audio filtering and real-time graphics insertion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                NDI Basics Certified with an active focus on AV-over-IP network architecture, focusing on rapid Layer-1 physical diagnostics and network troubleshooting under zero-downtime live production constraints.
              </p>

              {/* Live Streaming Skills Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <PlayCircle size={20} />
                  Live Streaming Operator Skills
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {streamingSkills.map((skill, i) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 hover:bg-background/70 transition-all duration-300"
                    >
                      <skill.icon
                        size={16}
                        className="text-primary/80 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground truncate">
                          {skill.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {skill.level}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group p-5 rounded-lg bg-card border border-border hover:border-primary/40 hover:glow-border transition-all duration-500 flex flex-col items-center text-center gap-2"
                >
                  <item.icon
                    size={24}
                    className="text-primary transition-all group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                  />
                  <CountUp value={item.value} />
                  <span className="text-[10px] font-display font-semibold tracking-wide uppercase text-silver">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
