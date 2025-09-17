import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeUpVariants, imageVariants } from '../utils/animationVariants';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
      filter: 'blur(4px)'
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)'
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? -10 : 10,
      filter: 'blur(2px)'
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Loading skeleton component
const ImageSkeleton: React.FC = () => (
  <div className="absolute inset-0 bg-gray-800/50 animate-pulse rounded-lg flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
  </div>
);

const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
);
const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
);


interface CarouselProps {
  images: string[];
  scrollAnimation?: boolean;
  threshold?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  scrollAnimation = true,
  threshold = 0.1,
  className = ''
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <motion.div 
        ref={ref}
        className="relative w-full aspect-video flex justify-center items-center bg-black/20 rounded-lg overflow-hidden"
        variants={fadeUpVariants}
        initial="hidden"
        animate={scrollAnimation ? (isVisible ? "visible" : "hidden") : "visible"}
      >
        <p className="text-gray-400 text-center">No images available</p>
      </motion.div>
    );
  }

  // We have to use a modulo operator to wrap the index correctly, even for negative numbers
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setImageLoaded(false);
  };

  React.useEffect(() => {
    // Initialize loading states
    setLoadingStates(new Array(images.length).fill(false));
  }, [images.length]);

  const handleImageLoad = (index: number) => {
    setImageLoaded(true);
    setLoadingStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  // Determine if images are likely A4/poster format based on file names
  const hasA4Images = images.some(img => 
    img.toLowerCase().includes('poster') || 
    img.toLowerCase().includes('.png') ||
    img.toLowerCase().includes('a4')
  );
  
  // Use appropriate aspect ratio based on image type
  const baseContainerClasses = hasA4Images 
    ? "relative w-full max-w-5xl mx-auto min-h-[700px] sm:min-h-[800px] lg:min-h-[900px] flex justify-center items-center bg-gradient-to-br from-black/25 to-black/15 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
    : "relative w-full max-w-7xl mx-auto min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex justify-center items-center bg-gradient-to-br from-black/25 to-black/15 rounded-2xl overflow-hidden border border-white/10 shadow-2xl";
  
  const containerClasses = `${baseContainerClasses} ${className}`;

  const CarouselContent = (
    <>
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
      
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 25 },
            opacity: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            rotateY: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
            filter: { duration: 0.3 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {!imageLoaded && <ImageSkeleton />}
          {images[imageIndex].toLowerCase().endsWith('.pdf') ? (
            <iframe
              src={`${images[imageIndex]}#view=FitH`}
              className="w-full h-full"
              onLoad={() => handleImageLoad(imageIndex)}
              style={{ backgroundColor: 'white' }}
            />
          ) : (
            <motion.img
              src={images[imageIndex]}
              alt={`Image ${imageIndex + 1}`}
              className="w-full h-full object-contain"
              onLoad={() => handleImageLoad(imageIndex)}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0,
                scale: imageLoaded ? 1 : 1.05,
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
      
          {/* Enhanced navigation buttons - only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <motion.button 
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10 bg-black/30 backdrop-blur-xl p-4 rounded-full text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
            onClick={() => paginate(-1)}
            aria-label="Previous Image"
            whileHover={{ 
              scale: 1.15, 
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderColor: 'rgba(255,255,255,0.4)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={scrollAnimation ? {
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : -30,
              scale: isVisible ? 1 : 0.8
            } : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeftIcon />
            </motion.div>
          </motion.button>
          <motion.button 
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10 bg-black/30 backdrop-blur-xl p-4 rounded-full text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
            onClick={() => paginate(1)}
            aria-label="Next Image"
            whileHover={{ 
              scale: 1.15, 
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderColor: 'rgba(255,255,255,0.4)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={scrollAnimation ? {
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : 30,
              scale: isVisible ? 1 : 0.8
            } : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon />
            </motion.div>
          </motion.button>
          
          {/* Enhanced indicators with background */}
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-3 bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={scrollAnimation ? {
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 30,
              scale: isVisible ? 1 : 0.8
            } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {images.map((_, index) => (
              <motion.button
                key={index}
                className={`relative rounded-full transition-all duration-300 ${
                  index === imageIndex 
                    ? 'w-8 h-3 bg-white shadow-lg shadow-white/50' 
                    : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                }`}
                onClick={() => {
                  const newDirection = index > imageIndex ? 1 : -1;
                  setPage([index, newDirection]);
                }}
                aria-label={`Go to image ${index + 1}`}
                whileHover={{ 
                  scale: index === imageIndex ? 1.1 : 1.3,
                  backgroundColor: index === imageIndex ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.8 }}
              >
                {index === imageIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
      
      {/* Image counter */}
      <motion.div 
        className="absolute top-4 right-4 bg-black/30 backdrop-blur-xl rounded-full px-4 py-2 text-sm text-white border border-white/20 font-mono"
        initial={{ opacity: 0, x: 20, scale: 0.8 }}
        animate={scrollAnimation ? {
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 20,
          scale: isVisible ? 1 : 0.8
        } : { opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {imageIndex + 1} / {images.length}
      </motion.div>
    </>
  );

  if (scrollAnimation) {
    return (
      <motion.div 
        ref={ref}
        className={containerClasses}
        variants={fadeUpVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {CarouselContent}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses}>
      {CarouselContent}
    </div>
  );
};

export default Carousel;
