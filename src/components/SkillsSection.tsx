import { motion } from "framer-motion";
import { Cpu, Monitor, Radio, Camera, Cable, Tv, Video, Airplay, AudioLines, Presentation } from "lucide-react";

const skills = [
  { label: "EVS XT / VIA Replay Systems", icon: Monitor },
  { label: "vMix", icon: Tv },
  { label: "Resolume Arena", icon: Airplay },
  { label: "Teleprompter Systems", icon: Presentation },
  { label: "OB Camera Setup (Wired & Wireless)", icon: Camera },
  { label: "Signal Routing and Cabling", icon: Cable },
  { label: "Live Broadcast Production", icon: Radio },
  { label: "Wirecast Live Streaming", icon: Video },
  { label: "Video and Audio Signal Management", icon: AudioLines },
  { label: "PowerPoint Broadcast Presentations", icon: Cpu },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group p-5 rounded-lg bg-background border border-border text-center transition-all hover:border-primary/50 hover:glow-border"
              >
                <skill.icon
                  size={28}
                  className="mx-auto mb-3 text-muted-foreground transition-colors group-hover:text-primary"
                />
                <span className="text-xs font-display font-semibold tracking-wide text-silver">
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
