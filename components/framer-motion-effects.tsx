"use client"

import type React from "react"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

export const ParallaxSection = ({
  children,
  offset = 50,
}: {
  children: React.ReactNode
  offset?: number
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export const RevealOnScroll = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {
        opacity: 0,
        y: 50,
        scale: 0.9
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export const MorphingButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      className="relative px-8 py-3 rounded-lg font-semibold overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0"
        whileHover={{ opacity: 0.1 }}
      />
      <span className="relative">{children}</span>
    </motion.button>
  )
}

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode[]
  staggerDelay?: number
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {Array.isArray(children) &&
        children.map((child, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
    </motion.div>
  )
}

export const RotatingBorder = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <motion.div ref={ref} style={{ rotate }} className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity p-0.5">
        <div className="absolute inset-0.5 bg-background rounded-lg" />
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  )
}

export const FloatingElement = ({
  children,
  duration = 3,
}: {
  children: React.ReactNode
  duration?: number
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export const GradientText = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent ${className}`}
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
    >
      {children}
    </motion.span>
  )
}
