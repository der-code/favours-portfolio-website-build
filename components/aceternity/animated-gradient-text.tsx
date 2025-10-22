"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent blur-xl"
        animate={{
          backgroundPosition: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      <div className={`relative bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent`}>
        {children}
      </div>
    </motion.div>
  )
}
