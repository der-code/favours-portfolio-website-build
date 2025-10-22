"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingDockProps {
  items: Array<{
    title: string
    icon: React.ReactNode
    href: string
  }>
  className?: string
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ items, className }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-2xl bg-card/50 backdrop-blur-md border border-border px-6 py-3",
        className,
      )}
    >
      {items.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.href}
          title={item.title}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
          whileHover={{ scale: 1.2, y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.icon}
        </motion.a>
      ))}
    </motion.div>
  )
}
