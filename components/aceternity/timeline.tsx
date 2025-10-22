"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const Timeline = ({
    experiences,
    className,
}: {
    experiences: Array<{
        title: string
        company: string
        period: string
        description: string
        technologies?: string[]
    }>
    className?: string
}) => {
    return (
        <div className={cn("relative", className)}>
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            <div className="space-y-8">
                {experiences.map((experience, index) => (
                    <motion.div
                        key={index}
                        className="relative flex items-start gap-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* Timeline dot */}
                        <div className="relative z-10 flex-shrink-0">
                            <div className="w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                                <div className="space-y-3">
                                    {/* Header */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {experience.title}
                                        </h3>
                                        <p className="text-primary font-medium">
                                            {experience.company}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {experience.period}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground leading-relaxed">
                                        {experience.description}
                                    </p>

                                    {/* Technologies */}
                                    {experience.technologies && experience.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {experience.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-2 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
