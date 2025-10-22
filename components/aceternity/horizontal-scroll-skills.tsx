"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const HorizontalScrollSkills = ({
    skills,
    className
}: {
    skills: Array<{
        title: string
        skills: string[]
    }>
    className?: string
}) => {
    return (
        <div className={cn("w-full overflow-hidden", className)}>
            <div className="flex gap-4 animate-scroll">
                {/* Duplicate the content for seamless loop */}
                {[...skills, ...skills].map((category, categoryIndex) => (
                    <div key={categoryIndex} className="flex-shrink-0">
                        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 min-w-[200px]">
                            <h3 className="font-semibold text-primary mb-3 text-sm">{category.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.span
                                        key={skillIndex}
                                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors cursor-default"
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: skillIndex * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
