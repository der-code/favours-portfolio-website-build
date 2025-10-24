"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TextReveal } from "./text-reveal"

export const Loader = ({ className }: { className?: string }) => {
    const [currentStep, setCurrentStep] = useState(0)

    const steps = [
        "Initializing...",
        "Loading Portfolio...",
        "Preparing Experience...",
        "Almost Ready..."
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={cn("flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-card", className)}>
            <div className="relative flex flex-col items-center space-y-8">
                {/* Animated Spinner */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Outer rotating ring */}
                    <motion.div
                        className="w-20 h-20 border-4 border-primary/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Inner pulsing ring */}
                    <motion.div
                        className="absolute inset-2 w-16 h-16 border-2 border-primary/30 rounded-full"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Center dot */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Multistep Text Animation */}
                <div className="text-center space-y-4">
                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <TextReveal
                            text="Favour Max-Oti"
                            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                        />
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <TextReveal
                            text="Web Experience Engineer"
                            className="text-lg text-muted-foreground font-medium"
                        />
                    </motion.div>

                    {/* Loading Step */}
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="h-8 flex items-center justify-center"
                    >
                        <TextReveal
                            text={steps[currentStep]}
                            className="text-sm text-primary font-medium"
                        />
                    </motion.div>
                </div>

                {/* Progress Dots */}
                <motion.div
                    className="flex space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    {steps.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentStep
                                    ? "bg-primary scale-125"
                                    : "bg-primary/30"
                                }`}
                            animate={{
                                scale: index === currentStep ? [1, 1.25, 1] : 1,
                                opacity: index === currentStep ? [0.5, 1, 0.5] : 0.3
                            }}
                            transition={{
                                duration: 1,
                                repeat: index === currentStep ? Infinity : 0,
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
