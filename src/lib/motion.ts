// Framer Motion configuration for the "Liquid Glass" feel

export const liquidSpringPhysics = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
  mass: 1,
};

// "Liquid Wipe" page transition
export const liquidWipeVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: liquidSpringPhysics },
  exit: { opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.2 } },
};

// Organic Interactions
export const organicInteractions = {
  hover: { scale: 1.01, transition: liquidSpringPhysics },
  tap: { scale: 0.97, transition: liquidSpringPhysics },
};

// Glass Panel entry animation
export const glassPanelVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(20px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: {
      ...liquidSpringPhysics,
      delayChildren: 0.1,
      staggerChildren: 0.05
    } 
  }
};

export const childItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: liquidSpringPhysics }
};
