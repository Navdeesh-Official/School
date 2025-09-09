import { Variants } from 'framer-motion';

// Modern easing curves
export const easings = {
  // Smooth and professional
  smooth: [0.25, 0.46, 0.45, 0.94],
  // Bouncy but controlled
  bouncy: [0.34, 1.56, 0.64, 1],
  // Sharp and snappy
  sharp: [0.4, 0, 0.2, 1],
  // Gentle and organic
  gentle: [0.25, 0.1, 0.25, 1],
  // Dramatic entrance
  dramatic: [0.68, -0.55, 0.265, 1.55],
} as const;

// Fade animations
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

export const fadeLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

export const fadeRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.bouncy,
    },
  },
};

export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.dramatic,
    },
  },
};

// Blur animations
export const blurVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1,
      ease: easings.smooth,
    },
  },
};

// Rotation animations
export const rotateVariants: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.dramatic,
    },
  },
};

// Slide animations with modern feel
export const slideVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: easings.smooth,
    },
  },
};

// Stagger container variants
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.5,
    },
  },
};

export const staggerItemVariants: Variants = {
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
      ease: easings.smooth,
    },
  },
};

// Card-specific animations
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: easings.dramatic,
    },
  },
};

// Image animations
export const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.2,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: easings.smooth,
    },
  },
};

// Text animations
export const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

// Hero section specific animations
export const heroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: easings.dramatic,
    },
  },
};

// Navigation animations
export const navVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    backdropFilter: 'blur(20px)',
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

// Modern reveal animations
export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 1,
      ease: easings.smooth,
    },
  },
};

// Floating animations for ambient effects
export const floatVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Pulse effect
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
