import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  { src: "/videos/showreel-1.mp4", title: "Live Production Highlights" },
  { src: "/videos/showreel-3.mp4", title: "Production Setup & Field Work" },
];

const ShowreelSection = () => {
  return (
    <section id="showreel" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Production <span className="text-gradient">Showreel</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground text-sm mb-12">
            Highlights from live broadcast productions and events.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="group relative rounded-lg overflow-hidden border border-border bg-background hover:border-primary/50 transition-all hover:glow-border"
              >
                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                  playsInline
                />
                <div className="p-4 flex items-center gap-3">
                  <Play size={16} className="text-primary shrink-0" />
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
