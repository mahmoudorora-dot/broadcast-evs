import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "MAP (Media Production)",
    role: "Broadcast Technician & Replay Operator",
    period: "March 2023 – Present",
    location: "Dubai, UAE",
    description:
      "Operated EVS (XT2/XT3) and InFlow replay systems during live international sports and high-profile entertainment events broadcasted on Abu Dhabi Sports, Dubai TV, and Saudi Sports. Executed real-time slow-motion replays, live clip creation, and turnaround highlight packages under tight live broadcast deadlines.",
    highlights: ["EVS XT2/XT3", "InFlow Replay", "Live Sports"],
  },
  {
    company: "Independent Live Production Project",
    role: "Live Production & Systems Technician",
    period: "2024 – 2025",
    location: "Dubai, UAE",
    description:
      "Integrated and deployed a 4-camera live production control room setup from bare infrastructure to operational status. Managed complete hardware integration including Cameras, CCUs, Switchers, Multiviewers, and Multi-channel SSD Recorders.",
    highlights: ["Control Room Setup", "Hardware Integration", "Multi-Channel Recording"],
  },
  {
    company: "Derna Live Production Setup",
    role: "EVS Operator & Studio Installation Technician",
    period: "June 2026",
    location: "Derna, Libya",
    description:
      "Collaborated with lead broadcast engineers in setting up control room infrastructure, cabling, and monitoring systems for field operations. Served as the primary EVS operator for live coverage feeds across regional networks.",
    highlights: ["Field Operations", "Studio Installation", "Live Coverage"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 broadcast-grid opacity-15 pointer-events-none" />
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

          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative p-6 rounded-lg bg-card border border-border transition-all duration-500 hover:border-primary/50 hover:glow-border hover:-translate-y-1"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Briefcase size={18} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-display font-bold text-primary block leading-tight">
                      {exp.role}
                    </span>
                    <span className="text-xs text-muted-foreground">{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={11} />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={11} />
                    {exp.location}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-display font-semibold tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
