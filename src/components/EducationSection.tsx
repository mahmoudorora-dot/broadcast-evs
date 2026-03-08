import { motion } from "framer-motion";
import { GraduationCap, Globe } from "lucide-react";

const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="absolute inset-0 broadcast-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Education & <span className="text-gradient">Languages</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="p-6 rounded-lg bg-card border border-border glow-border">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap size={24} className="text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Education</h3>
              </div>
              <p className="font-display font-semibold text-foreground mb-1">
                Bachelor's Degree in Accounting & Business Administration
              </p>
              <p className="text-sm text-muted-foreground">Banha University – Egypt • 2010</p>
            </div>

            {/* Languages */}
            <div className="p-6 rounded-lg bg-card border border-border glow-border">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={24} className="text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Languages</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-display font-semibold text-foreground">Arabic</span>
                    <span className="text-xs text-primary">Native</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-full rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-display font-semibold text-foreground">English</span>
                    <span className="text-xs text-primary">Good</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
