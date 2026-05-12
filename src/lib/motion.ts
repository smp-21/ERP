// =========================================================
// LIQUID GLASS — Physics Engine
// Apple Spring Dynamics + Micro-Interactions
// =========================================================

/**
 * Core Apple Spring Physics
 * Stiffness 300, Damping 25, Mass 1 — the "perfect glass" feel.
 */
export const liquidSpringPhysics = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
  mass: 1,
};

/**
 * Snappy spring for smaller, quicker elements (badges, chips, toggles).
 */
export const snappySpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

/**
 * Gentle spring for page-level transitions.
 */
export const gentleSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
  mass: 1.2,
};

// =========================================================
// PAGE TRANSITION VARIANTS
// "Liquid Wipe" — blur-dissolve with vertical drift
// =========================================================
export const liquidWipeVariants = {
  initial: { opacity: 0, y: 24, filter: "blur(12px)", scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    scale: 1,
    transition: liquidSpringPhysics 
  },
  exit: { 
    opacity: 0, 
    y: -16, 
    filter: "blur(8px)", 
    scale: 0.98,
    transition: { duration: 0.18, ease: "easeIn" } 
  },
};

// =========================================================
// ORGANIC INTERACTIONS — "The Squish"
// Hover: scale 1.02 + subtle glow
// Tap: scale 0.97
// =========================================================
export const organicInteractions = {
  hover: { 
    scale: 1.02, 
    transition: liquidSpringPhysics 
  },
  tap: { 
    scale: 0.97, 
    transition: { ...liquidSpringPhysics, stiffness: 400 }
  },
};

/**
 * Subtle version for table rows, list items
 */
export const subtleInteractions = {
  hover: { 
    scale: 1.005, 
    transition: snappySpring 
  },
  tap: { 
    scale: 0.995, 
    transition: snappySpring 
  },
};

// =========================================================
// GLASS PANEL VARIANTS — Staggered entry for card groups
// =========================================================
export const glassPanelVariants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      ...liquidSpringPhysics,
      delayChildren: 0.08,
      staggerChildren: 0.06,
    },
  },
};

// =========================================================
// CHILD ITEM VARIANTS — For staggered children within panels
// =========================================================
export const childItemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: liquidSpringPhysics,
  },
};

// =========================================================
// SLIDE PANEL VARIANTS — For slide-out panels, drawers
// =========================================================
export const slidePanelVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: liquidSpringPhysics 
  },
  exit: { 
    x: "100%", 
    opacity: 0, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
};

// =========================================================
// FADE SCALE VARIANTS — For modals, tooltips
// =========================================================
export const fadeScaleVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: liquidSpringPhysics 
  },
  exit: { 
    opacity: 0, 
    scale: 0.92, 
    filter: "blur(8px)",
    transition: { duration: 0.15 } 
  },
};

// =========================================================
// FLOAT ANIMATION — Ambient floating effect for hero elements
// =========================================================
export const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  },
};
