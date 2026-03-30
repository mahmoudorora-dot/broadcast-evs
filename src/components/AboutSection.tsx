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
                Mahmoud Fathy Orabi is an experienced EVS Operator and Broadcast Technician with more than
                8 years of experience in live production and international sports broadcasting. He specializes
                in EVS replay systems, media playback tools, teleprompter operation, and outside broadcast
                camera setups.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mahmoud has worked on multiple international championships and large-scale live productions
                and is known for reliability, technical precision, and strong teamwork in high pressure
                broadcast environments.
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
