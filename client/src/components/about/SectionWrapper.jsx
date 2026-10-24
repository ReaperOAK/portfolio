import { motion } from "framer-motion";

export default function SectionWrapper({ children, delay = 0.1, className = "", ...props }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={`my-16 ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
}
