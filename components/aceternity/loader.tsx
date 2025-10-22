"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const Loader = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-card", className)}>
            <div className="relative">
                {/* Outer rotating ring */}
                <motion.div
                    className="w-16 h-16 border-4 border-primary/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Inner pulsing dot */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Loading text */}
                <motion.div
                    className="absolute top-20 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-sm text-muted-foreground font-medium">Loading...</p>
                </motion.div>
            </div>
        </div>
    )
}

export const Spinner = ({ size = "md", className }: { size?: "sm" | "md" | "lg", className?: string }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    }

    return (
        <motion.div
            className={cn("border-2 border-primary/20 border-t-primary rounded-full", sizeClasses[size], className)}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    )
}

export const DotLoader = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex space-x-2", className)}>
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

export const PulseLoader = ({ className }: { className?: string }) => {
    return (
        <motion.div
            className={cn("w-12 h-12 bg-primary/20 rounded-full", className)}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    )
}
