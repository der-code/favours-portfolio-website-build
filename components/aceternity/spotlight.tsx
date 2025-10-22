"use client"

import React from "react"
import { motion } from "framer-motion"

interface SpotlightProps {
  className?: string
  fill?: string
}

export const Spotlight: React.FC<SpotlightProps> = ({ className = "", fill = "white" }) => {
  return (
    <svg
      className={`pointer-events-none absolute z-0 h-full w-full ${className}`}
      width="960"
      height="540"
      viewBox="0 0 960 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_86_1236)">
        <circle cx="200" cy="100" r="200" fill={fill} fillOpacity="0.5" />
      </g>
      <defs>
        <filter
          id="filter0_f_86_1236"
          x="-200"
          y="-300"
          width="800"
          height="800"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="150" />
        </filter>
      </defs>
    </svg>
  )
}

export const SpotlightCard: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = "" }) => {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = React.useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !isMounted) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-sm ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.3), transparent 80%)`,
          opacity,
        }}
      />
      {children}
    </div>
  )
}
