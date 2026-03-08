import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "MAP Production – Dubai",
    role: "EVS Operator",
    period: "2022 – Present",
    description:
      "EVS replay operation, media playback systems, teleprompter control, and live broadcast coordination with production teams.",
  },
  {
    company: "Media House Production – Cairo",
    role: "EVS Operator",
    period: "2017 – 2019",
    description:
      "Operated EVS systems for sports broadcasts and television programs, managing highlights and replay sequences during live transmissions.",
  },
  {
    company: "OB Vision Egypt – Cairo",
    role: "OB Technician",
    period: "2015 – 2017",
    description:
      "Responsible for OB camera setup, signal routing, cabling systems, and technical testing before live broadcasts.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 broadcast-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 md:left-6 top-1 w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="p-6 rounded-lg bg-card border border-border transition-all hover:border-primary/40">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Briefcase size={16} className="text-primary" />
                      <span className="font-display font-bold text-foreground">{exp.company}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-sm font-display font-semibold text-primary">{exp.role}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
