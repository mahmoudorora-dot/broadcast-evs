import { motion } from "framer-motion";
import { Camera, Award, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { withBase } from "@/lib/media";

const workPhotos = [
  { src: withBase("images/gallery-on-air.jpeg"), caption: "On Air – Live Broadcast Studio" },
  { src: withBase("images/gallery-control-room.jpeg"), caption: "Broadcast Control Room" },
  { src: withBase("images/gallery-evs-operator.jpeg"), caption: "EVS Operation – Live Production" },
  { src: withBase("images/gallery-evs-equipment.jpg"), caption: "EVS XT Server – Signal Routing" },
  { src: withBase("images/gallery-stadium.jpg"), caption: "Live Sports – Stadium Coverage" },
  { src: withBase("images/gallery-ob-van.jpg"), caption: "OB Van – Production Switcher" },
  { src: withBase("images/gallery-server-room.jpg"), caption: "OB Van – Server & Monitoring" },
  { src: withBase("images/gallery-control-station.jpg"), caption: "Behind the Scenes – Workstation" },
  { src: withBase("images/gallery-falcon-event.jpg"), caption: "Falcon Championship – Live Event" },
  { src: withBase("images/gallery-headset-selfie.jpg"), caption: "On Location – Field Work" },
  { src: withBase("images/gallery-evs-remote.jpg"), caption: "EVS LSM Remote Controller" },
  { src: withBase("images/attached-photo-1.jpg"), caption: "Professional Broadcasting Setup – Control Room" },
  { src: withBase("images/attached-photo-2.jpg"), caption: "Live Event Production – Technical Operations" },
  { src: withBase("images/attached-photo-3.jpg"), caption: "Broadcast Equipment – Advanced Systems" },
  { src: withBase("images/attached-photo-4.jpg"), caption: "Studio Operations – Professional Environment" },
  { src: withBase("images/attached-photo-5.jpg"), caption: "Media Production – High-Tech Setup" },
];

const achievements = [
  {
    src: withBase("images/certificate-mansour.jpg"),
    title: "شهادة شكر وتقدير",
    description: "جائزة الشيخ منصور بن زايد للتميز الزراعي – الدورة الرابعة 2025-2026",
  },
  {
    src: withBase("images/badge-zayed-festival.jpg"),
    title: "Sheikh Zayed Festival 2025",
    description: "AL Fakhr Exhibition – Partner Badge",
  },
];

const GallerySection = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (key: string, src: string) => {
    console.error("Image failed to load:", src);
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };
  return (
    <section id="gallery" className="py-24 relative">
      <div className="absolute inset-0 broadcast-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        {/* Work Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-2">
            <Camera size={24} className="text-primary" />
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Behind the <span className="text-gradient">Scenes</span>
            </h2>
          </div>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground text-sm mb-10">
            Snapshots from live productions and broadcast environments.
          </p>

          {/* Masonry-style grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {workPhotos.map((photo, i) => {
              const hasError = imageErrors[`work-${photo.caption}`];
              return (
                <motion.div
                  key={photo.caption}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:glow-border break-inside-avoid"
                >
                  <div className="overflow-hidden">
                    {hasError ? (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <AlertTriangle size={24} className="text-muted-foreground mx-auto mb-2 opacity-50" />
                          <p className="text-xs text-muted-foreground">Image unavailable</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={() => handleImageError(`work-${photo.caption}`, photo.src)}
                      />
                    )}
                  </div>
                  {!hasError && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-xs font-display font-semibold text-foreground">{photo.caption}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements & Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Award size={24} className="text-primary" />
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Certificates & <span className="text-gradient">Achievements</span>
            </h2>
          </div>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground text-sm mb-10">
            Recognition and accreditations earned throughout the career.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((item, i) => {
              const hasError = imageErrors[`achievement-${item.title}`];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="rounded-lg overflow-hidden border border-border bg-card hover:border-primary/50 transition-all hover:glow-border"
                >
                  <div className="aspect-video overflow-hidden bg-background">
                    {hasError ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <AlertTriangle size={32} className="text-muted-foreground mx-auto mb-2 opacity-50" />
                          <p className="text-xs text-muted-foreground">Image unavailable</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                        onError={() => handleImageError(`achievement-${item.title}`, item.src)}
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
