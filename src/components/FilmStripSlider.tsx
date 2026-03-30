import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { X, ZoomIn, AlertTriangle, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { withBase } from "@/lib/media";

const photos = [
  { src: withBase("images/gallery-on-air.jpeg"), caption: "On Air – Live Broadcast", subtitle: "Professional broadcast studio environment" },
  { src: withBase("images/gallery-control-room.jpeg"), caption: "Broadcast Control Room", subtitle: "Advanced production control systems" },
  { src: withBase("images/gallery-evs-operator.jpeg"), caption: "EVS Operation", subtitle: "Live replay and slow-motion systems" },
  { src: withBase("images/gallery-evs-equipment.jpg"), caption: "EVS XT Server", subtitle: "High-end video processing equipment" },
  { src: withBase("images/gallery-stadium.jpg"), caption: "Stadium Coverage", subtitle: "Large-scale sports production" },
  { src: withBase("images/gallery-ob-van.jpg"), caption: "OB Van Production", subtitle: "Mobile broadcast unit operations" },
  { src: withBase("images/gallery-server-room.jpg"), caption: "Server & Monitoring", subtitle: "24/7 broadcast infrastructure" },
  { src: withBase("images/gallery-control-station.jpg"), caption: "Workstation Setup", subtitle: "Professional editing stations" },
  { src: withBase("images/gallery-falcon-event.jpg"), caption: "Falcon Championship", subtitle: "Prestigious sports event coverage" },
  { src: withBase("images/gallery-headset-selfie.jpg"), caption: "On Location", subtitle: "Field production expertise" },
  { src: withBase("images/gallery-evs-remote.jpg"), caption: "EVS LSM Remote", subtitle: "Remote production capabilities" },
  { src: withBase("images/attached-photo-1.jpg"), caption: "Production Moment 1", subtitle: "Behind the scenes excellence" },
  { src: withBase("images/attached-photo-2.jpg"), caption: "Production Moment 2", subtitle: "Technical precision in action" },
  { src: withBase("images/attached-photo-3.jpg"), caption: "Production Moment 3", subtitle: "Live event mastery" },
  { src: withBase("images/attached-photo-4.jpg"), caption: "Production Moment 4", subtitle: "Broadcast innovation showcase" },
  { src: withBase("images/attached-photo-5.jpg"), caption: "Production Moment 5", subtitle: "Professional crew coordination" },
  { src: withBase("images/attached-photo-6.jpg"), caption: "Production Moment 6", subtitle: "State-of-the-art technology" },
  { src: withBase("images/certificate-mansour.jpg"), caption: "Professional Achievement", subtitle: "Excellence in broadcast services" },
  { src: withBase("images/badge-zayed-festival.jpg"), caption: "Festival Recognition", subtitle: "Award-winning production quality" },
];

const Sprocket = () => (
  <div className="w-3 h-4 rounded-sm bg-background/80 border border-border/50" />
);

const SprocketRow = ({ count }: { count: number }) => (
  <div className="flex justify-around items-center px-2 py-1.5 shrink-0">
    {Array.from({ length: count }).map((_, i) => (
      <Sprocket key={i} />
    ))}
  </div>
);

// Enhanced 3D Cinematic Frame with physics
const CinematicFrame = ({
  photo,
  onOpen,
  isActive,
  isPrev,
  isNext,
  index,
  currentIndex,
  totalSlides,
  dragX,
  isMobile,
  onClick,
}: {
  photo: { src: string; caption: string; subtitle: string };
  onOpen: () => void;
  isActive: boolean;
  isPrev: boolean;
  isNext: boolean;
  index: number;
  currentIndex: number;
  totalSlides: number;
  dragX: any;
  isMobile: boolean;
  onClick: () => void;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  // Calculate 3D position with perspective
  const calculatePosition = () => {
    const diff = index - currentIndex;
    const total = totalSlides;
    
    // Handle infinite loop positioning
    let normalizedDiff = diff;
    if (Math.abs(diff) > total / 2) {
      normalizedDiff = diff > 0 ? diff - total : diff + total;
    }
    
    return normalizedDiff;
  };

  const position = calculatePosition();
  const isLeftSide = position < 0;
  const isRightSide = position > 0;

  // 3D transform calculations
  const rotateY = position * -15; // Perspective rotation
  const translateZ = isActive ? 100 : Math.abs(position) * -50;
  const translateX = position * 120;
  const scale = isActive ? 1 : Math.max(0.7, 1 - Math.abs(position) * 0.15);
  const opacity = isActive ? 1 : Math.max(0.4, 1 - Math.abs(position) * 0.2);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: isMobile ? "360px" : "560px",
        height: isMobile ? "270px" : "450px",
        left: "50%",
        top: "50%",
        transformOrigin: "center",
        perspective: "1000px",
        margin: isActive ? "auto" : "none",
        transform: isActive ? "translate(-50%, -50%) translateZ(0)" : `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      }}
      animate={{
        x: translateX,
        y: 0,
        z: translateZ,
        scale,
        opacity,
        rotateY,
        filter: isActive ? "none" : `blur(${Math.abs(position) * 1.2}px) brightness(${0.75 + Math.abs(position) * 0.1})`,
        zIndex: isActive ? 30 : 20 - Math.abs(position),
      }}
      transition={{
        duration: 0.25,
        ease: [0.23, 0.1, 0.25, 1],
      }}
      whileHover={isActive ? { 
        scale: 1.08,
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphism container with upscale effect */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
        {/* Dynamic background blur effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: `url(${photo.src})`,
            filter: "blur(6px) brightness(0.75)",
            transform: `scale(${1.08})`,
            transition: "transform 0.8s ease-out",
          }}
        />
        
        {/* Main image with parallax */}
        <motion.div 
          className="absolute inset-2 rounded-xl overflow-hidden"
          animate={{
            scale: isActive && isHovered ? 1.12 : 1,
            y: dragX.get() * -0.03, // Smoother parallax effect
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover"
            style={{ 
              objectFit: "cover",
              objectPosition: "center"
            }}
            loading="lazy"
            onError={() => {
              console.error("Cinematic image failed to load:", photo.src);
              setHasError(true);
            }}
          />
          
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
          
          {/* Vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />
        </motion.div>
        
        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
            <div className="text-center">
              <AlertTriangle size={48} className="text-white/50 mx-auto mb-3" />
              <p className="text-white/70 text-sm">Image unavailable</p>
            </div>
          </div>
        )}
        
        {/* Animated text overlay */}
        <AnimatePresence>
          {(isActive || isHovered) && !hasError && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 p-6 z-20"
            >
              <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 rounded-b-2xl">
                <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
                  {photo.caption}
                </h3>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {photo.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Click to explore</span>
                  <ZoomIn size={18} className="text-white/80" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Floating glow effect for active slide */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: isHovered 
                ? "0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1)"
                : "0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.05)",
            }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Film strip borders */}
        <div className="absolute top-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </motion.div>
  );
};

// Enhanced lightbox with cinematic styling
const CinematicLightbox = ({
  photo,
  onClose,
}: {
  photo: { src: string; caption: string; subtitle: string } | null;
  onClose: () => void;
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [photo]);

  if (!photo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-110 opacity-20"
        style={{ backgroundImage: `url(${photo.src})` }}
      />
      
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 z-10"
      >
        <X size={28} />
      </button>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className="max-w-7xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {hasError ? (
          <div className="w-full aspect-video bg-black/80 flex items-center justify-center rounded-3xl border border-white/10">
            <div className="text-center">
              <AlertTriangle size={64} className="text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">Image unavailable</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-auto max-h-[85vh] object-contain rounded-3xl shadow-2xl"
              onError={() => {
                console.error("Lightbox image failed to load:", photo.src);
                setHasError(true);
              }}
            />
            
            {/* Enhanced text overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 rounded-b-3xl">
              <h2 className="text-white font-bold text-3xl mb-3 drop-shadow-2xl">
                {photo.caption}
              </h2>
              <p className="text-white/90 text-lg mb-4 max-w-3xl">
                {photo.subtitle}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-white/60 rounded-full" />
                <span className="text-white/60 text-sm">Broadcast Production Gallery</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const FilmStripSlider = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string; subtitle: string } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  
  const controls = useAnimation();
  const totalSlides = photos.length;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClose = useCallback(() => setSelectedPhoto(null), []);

  // Autoplay with 1000ms delay - pause on desktop hover only
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      if (!isPaused || isMobile) {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }, 1000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPaused, isMobile, totalSlides]);

  // Drag handlers with physics
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    
    const { offset, velocity } = info;
    const threshold = 50;
    const velocityThreshold = 500;

    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > velocityThreshold) {
      if (offset.x > 0 || velocity.x > velocityThreshold) {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      } else {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }
    
    // Spring back animation
    controls.start({
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    });
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedPhoto]);

  // Progress calculation for animated progress bar
  const progress = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <>
      <section 
        className="py-24 relative overflow-hidden"
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
      >
        {/* Dynamic background with blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: `url(${photos[currentIndex].src})`,
            filter: "blur(40px) brightness(0.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 scanline pointer-events-none opacity-30" />

        {/* Header */}
        <div className="container mx-auto px-6 mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-4 rounded-full bg-live animate-pulse-glow shadow-lg shadow-live/50" />
              <h2 className="text-4xl md:text-6xl font-display font-bold">
                Cinematic <span className="text-gradient">Experience</span>
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-6" />
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              Immerse yourself in premium broadcast production moments. Experience cinema-grade visuals with physics-based interactions and 3D depth effects.
            </p>
          </motion.div>
        </div>

        {/* 3D Carousel Container - Responsive Heights */}
        <div className={`relative flex items-center justify-center overflow-hidden ${isMobile ? 'h-[60vh] md:h-[75vh]' : 'h-[900px]'}`}>
          {/* Navigation arrows with enhanced styling */}
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-40 shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-40 shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>

          {/* 3D Carousel Stage - Perfect Centering */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-7xl h-full flex items-center justify-center"
            style={{ 
              perspective: "2000px", 
              transformStyle: "preserve-3d",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {/* Render all slides in 3D space */}
            {photos.map((photo, index) => {
              const position = index - currentIndex;
              const isActive = index === currentIndex;
              const isPrev = position === -1 || (currentIndex === 0 && index === totalSlides - 1);
              const isNext = position === 1 || (currentIndex === totalSlides - 1 && index === 0);

              return (
                <CinematicFrame
                  key={`${photo.caption}-${index}`}
                  photo={photo}
                  onOpen={() => setSelectedPhoto(photo)}
                  isActive={isActive}
                  isPrev={isPrev}
                  isNext={isNext}
                  index={index}
                  currentIndex={currentIndex}
                  totalSlides={totalSlides}
                  dragX={dragX}
                  isMobile={isMobile}
                  onClick={() => {
                    if (!isActive) {
                      setCurrentIndex(index);
                    } else {
                      setSelectedPhoto(photo);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Enhanced progress bar */}
        <div className="container mx-auto px-6 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/60 text-sm font-medium">
                {currentIndex + 1} / {totalSlides}
              </span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>
            
            {/* Animated progress bar */}
            <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            {/* Slide indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "bg-white w-8 shadow-lg shadow-white/30"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side gradients for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black/50 to-transparent z-20 pointer-events-none" />
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedPhoto && <CinematicLightbox photo={selectedPhoto} onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
};

export default FilmStripSlider;
