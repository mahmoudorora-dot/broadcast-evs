import { motion } from "framer-motion";
import { Trophy, MapPin, CalendarDays } from "lucide-react";

const events = [
  { title: "Sona'a Al Amal – Live Broadcast", location: "Dubai", year: "2024 – 2025" },
  { title: "TikTok World 2025", location: "UAE", year: "2025" },
  { title: "Camel Racing Championships", location: "UAE", year: "2024 – 2025" },
  { title: "World Jiu-Jitsu Championship", location: "Fujairah", year: "2024" },
  { title: "World Karate Championship", location: "Fujairah", year: "2024" },
  { title: "World Snooker Championship", location: "Riyadh", year: "2024" },
  { title: "World 9-Ball Championship", location: "Jeddah", year: "2024" },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 broadcast-grid opacity-10 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
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
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-lg bg-background border border-border transition-all duration-500 hover:border-primary/50 hover:glow-border overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <Trophy
                  size={28}
                  className="text-primary mb-4 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                />
                <h3 className="font-display font-bold text-base text-foreground mb-3 leading-tight">
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
