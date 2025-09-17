
import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  fadeUpVariants, 
  staggerContainerVariants, 
  staggerItemVariants,
  cardVariants,
  slideVariants
} from '../utils/animationVariants';

// Sophisticated page transition variants with modern easing
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: 'blur(4px)',
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Modern cubic-bezier easing
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    y: -16,
    scale: 0.96,
    filter: 'blur(2px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'card' | 'slide';
  threshold?: number;
  delay?: number;
}

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeUp' | 'card' | 'slide' | 'stagger';
  threshold?: number;
}

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

// New scroll-triggered animated section
export const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({ 
  children, 
  className = '', 
  variant = 'fadeUp',
  threshold = 0.1,
  delay = 0
}) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold, 
    delay: delay * 1000,
    triggerOnce: true 
  });

  const getVariant = () => {
    switch (variant) {
      case 'card':
        return cardVariants;
      case 'slide':
        return slideVariants;
      default:
        return fadeUpVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getVariant()}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Container for staggered child animations with scroll trigger
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  stagger = true
}) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    delay: delay * 1000,
    triggerOnce: true 
  });

  const variants = stagger ? staggerContainerVariants : {
    initial: { opacity: 0 },
    in: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial={stagger ? "hidden" : "initial"}
      animate={stagger ? (isVisible ? "visible" : "hidden") : "in"}
    >
      {children}
    </motion.div>
  );
};

// Individual animated item for staggered reveals with scroll trigger
export const AnimatedItem: React.FC<AnimatedItemProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  variant = 'stagger',
  threshold = 0.1
}) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold,
    delay: delay * 1000,
    triggerOnce: true 
  });

  const getVariant = () => {
    switch (variant) {
      case 'fadeUp':
        return fadeUpVariants;
      case 'card':
        return cardVariants;
      case 'slide':
        return slideVariants;
      default:
        return {
          initial: {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          in: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay,
            },
          },
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
    }
  };

  const variants = getVariant();
  const useScroll = variant !== 'stagger';

  if (useScroll) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// New component for grid layouts with staggered animations
export const AnimatedGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  cols?: number;
}> = ({ children, className = '', cols = 3 }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-6 ${className}`}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={staggerItemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
