import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-lg bg-background border border-border text-center transition-all hover:border-primary/50">
              <Phone size={28} className="mx-auto mb-3 text-primary" />
              <p className="font-display font-semibold text-foreground text-sm mb-1">Phone</p>
              <a href="tel:+971564669092" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                +971 56 466 9092
              </a>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border text-center transition-all hover:border-primary/50">
              <Mail size={28} className="mx-auto mb-3 text-primary" />
              <p className="font-display font-semibold text-foreground text-sm mb-1">Email</p>
              <a href="mailto:Mahmoudorora@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mahmoudorora@gmail.com
              </a>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border text-center transition-all hover:border-primary/50">
              <MapPin size={28} className="mx-auto mb-3 text-primary" />
              <p className="font-display font-semibold text-foreground text-sm mb-1">Location</p>
              <p className="text-sm text-muted-foreground">Dubai Production City – UAE</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:Mahmoudorora@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-wide transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <Mail size={16} /> Email Me
            </a>
            <a
              href="https://wa.me/971564669092"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-silver font-display font-semibold text-sm uppercase tracking-wide transition-all hover:bg-secondary hover:border-primary/50 hover:text-foreground"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-silver font-display font-semibold text-sm uppercase tracking-wide transition-all hover:bg-secondary hover:border-primary/50 hover:text-foreground"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
