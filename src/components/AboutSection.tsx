import { motion, useInView } from "framer-motion";
import { Monitor, Radio, Tv, Users } from "lucide-react";
import { useRef } from "react";

const highlights = [
  { icon: Monitor, label: "EVS Replay Systems", value: "8+" },
  { icon: Radio, label: "Live Broadcast", value: "200+" },
  { icon: Tv, label: "Media Playback", value: "50+" },
  { icon: Users, label: "Team Projects", value: "100+" },
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
