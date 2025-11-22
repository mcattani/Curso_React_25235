import { motion } from "framer-motion";

// Google Material Design 3: Shared Axis (Z) transition

export default function MaterialWrapper({ children }) {
  const variants = {
    initial: {
      opacity: 0,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.2, 0.0, 0, 1] 
      }
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 1, 1] 
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}