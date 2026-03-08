import { motion } from "framer-motion";
import { Trophy, MapPin, CalendarDays } from "lucide-react";

const events = [
  { title: "World Snooker Championship", location: "Riyadh", year: "2024" },
  { title: "World 9-Ball Championship", location: "Jeddah", year: "2024" },
  { title: "World Karate Championship", location: "Fujairah", year: "2025" },
  { title: "World Jiu-Jitsu Championship", location: "Fujairah", year: "2025" },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Major Broadcast <span className="text-gradient">Events</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground text-sm mb-12">
            International sports productions delivered with MAP Production.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative p-6 rounded-lg bg-background border border-border transition-all hover:border-primary/50 hover:glow-border"
              >
                <Trophy size={32} className="text-primary mb-4 transition-transform group-hover:scale-110" />
                <h3 className="font-display font-bold text-lg text-foreground mb-3 leading-tight">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1.5">
                  <MapPin size={12} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <CalendarDays size={12} />
                  <span>{event.year}</span>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
