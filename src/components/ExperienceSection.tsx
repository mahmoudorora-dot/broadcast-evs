import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "MAP Production",
    role: "Broadcast Operations Specialist | EVS & Replay Operator | Live Production & Streaming Technician",
    period: "2022 – Present",
    location: "United Arab Emirates",
    description:
      "Operate EVS replay systems during live sports and entertainment broadcasts. Manage live media playback and teleprompter systems for studio and outdoor productions. Operate and configure playback software such as vMix and Resolume Arena. Coordinate with directors and technical teams to ensure smooth, error-free broadcasts.",
    highlights: ["World Snooker Championship", "World 9-Ball Pool Championship", "World Karate Championship", "World Jiu-Jitsu Championship"],
  },
  {
    company: "Media House Production",
    role: "EVS Operator & Broadcast Technician",
    period: "August 2020 – January 2022",
    location: "Egypt",
    description:
      "Operated EVS systems for live sports and TV shows. Managed replay sequences, highlights, and video inserts during live transmissions. Supported OB setup and coordination for multiple production projects.",
    highlights: ["EVS Systems", "Live Sports", "TV Shows"],
  },
  {
    company: "AFTCO EGYPT",
    role: "Government Relations Specialist (Telecom Infrastructure)",
    period: "August 2012 – August 2020",
    location: "Cairo, Egypt",
    description:
      "Managed government relations, permits, and regulatory compliance to facilitate telecommunication tower site acquisitions and infrastructure deployment for major telecom operators. Coordinated with local authorities, landowners, and field engineering teams to ensure smooth operational rollout and site readiness.",
    highlights: ["Government Relations", "Telecom Infrastructure", "Project Coordination"],
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
