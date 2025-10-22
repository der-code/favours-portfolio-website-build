"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardHoverEffectProps {
  items: Array<{
    title: string
    description: string
    icon?: React.ReactNode
  }>
  className?: string
}

export const CardHoverEffect: React.FC<CardHoverEffectProps> = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group cursor-pointer"
        >
          <motion.div
            animate={{
              scale: hoveredIndex === idx ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative h-full p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0"
              animate={{
                opacity: hoveredIndex === idx ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10 space-y-3">
              {item.icon && <div className="text-2xl">{item.icon}</div>}
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
