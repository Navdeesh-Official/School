
import React from 'react';
import { motion, TargetAndTransition, Variants } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cardVariants as scrollCardVariants, scaleUpVariants, fadeUpVariants } from '../utils/animationVariants';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: TargetAndTransition;
  delay?: number;
  hover?: 'lift' | 'glow' | 'scale' | 'tilt' | 'none';
  scrollAnimation?: boolean;
  animationVariant?: 'card' | 'scaleUp' | 'fadeUp' | 'default';
  threshold?: number;
}

// Enhanced hover variants with modern effects
const hoverVariants = {
  lift: {
    y: -12,
    scale: 1.03,
    boxShadow: '0 25px 80px rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  glow: {
    boxShadow: '0 0 60px 8px rgba(99, 102, 241, 0.2), 0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(99, 102, 241, 0.4)',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  scale: {
    scale: 1.06,
    y: -6,
    boxShadow: '0 20px 60px rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  tilt: {
    rotateY: 8,
    rotateX: 4,
    scale: 1.03,
    y: -4,
    boxShadow: '0 20px 60px rgba(255, 255, 255, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Card reveal animation variants
const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    rotateX: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  whileHover, 
  delay = 0, 
  hover = 'lift',
  scrollAnimation = true,
  animationVariant = 'default',
  threshold = 0.1
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    delay: delay * 1000,
    triggerOnce: true
  });

  const defaultHover = hover !== 'none' ? hoverVariants[hover] : undefined;
  const finalHover = whileHover || defaultHover;

  const getAnimationVariant = () => {
    switch (animationVariant) {
      case 'card':
        return scrollCardVariants;
      case 'scaleUp':
        return scaleUpVariants;
      case 'fadeUp':
        return fadeUpVariants;
      default:
        return cardVariants;
    }
  };

  const CardContent = (
    <>
      {/* Enhanced gradient overlays for more depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/2 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-white/3 to-transparent pointer-events-none" />
      
      {/* Animated border highlight with rainbow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        whileHover={{ 
          opacity: 1,
          background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1), transparent)',
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Floating particles effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
            }}
            transition={
              { 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            }
            }
          />
        ))}
      </motion.div>
      
      <div className="relative z-10">
        {children}
      </div>
    </>
  );

  if (scrollAnimation) {
    return (
      <motion.div
        ref={ref}
        className={`group bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg relative overflow-hidden ${className}`}
        variants={getAnimationVariant()}
        initial={animationVariant === 'default' ? "initial" : "hidden"}
        animate={
          animationVariant === 'default' 
            ? "animate" 
            : (isVisible ? "visible" : "hidden")
        }
        whileHover={finalHover}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {CardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`group bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg relative overflow-hidden ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={finalHover}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      transition={{
        duration: 0.3,
        delay,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {CardContent}
    </motion.div>
  );
};

export default GlassCard;
