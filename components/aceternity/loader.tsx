"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export const Loader = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-card", className)}>
            <div className="relative flex flex-col items-center">
                {/* Animated Logo */}
                <motion.div
                    className="relative mb-8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2
                    }}
                >
                    {/* Rotating background ring */}
                    <motion.div
                        className="absolute inset-0 w-24 h-24 border-2 border-primary/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Pulsing background ring */}
                    <motion.div
                        className="absolute inset-2 w-20 h-20 border border-primary/10 rounded-full"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Logo Image */}
                    <motion.div
                        className="relative z-10 flex items-center justify-center"
                        animate={{
                            y: [0, -5, 0],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src="/logo.png"
                            alt="Favour Max-Oti Logo"
                            width={80}
                            height={80}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* Loading text with typewriter effect */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <motion.h2
                        className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
                        animate={{
                            backgroundPosition: ["0%", "100%", "0%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: "200% 200%"
                        }}
                    >
                        Favour Max-Oti
                    </motion.h2>

                    <motion.p
                        className="text-sm text-muted-foreground font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        Web Experience Engineer
                    </motion.p>
                </motion.div>

                {/* Animated dots */}
                <motion.div
                    className="flex space-x-2 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.3,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
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
