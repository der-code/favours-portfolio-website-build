"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const PhotoGallery = ({
    photos,
    className,
}: {
    photos: Array<{
        src: string
        alt: string
        caption?: string
    }>
    className?: string
}) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
            {photos.map((photo, index) => (
                <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <div className="aspect-square relative">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {photo.caption && (
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <p className="text-white p-4 text-sm">{photo.caption}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export const ProfilePhoto = ({
    src,
    alt,
    className,
}: {
    src: string
    alt: string
    className?: string
}) => {
    return (
        <motion.div
            className={cn("relative overflow-hidden rounded-full border-4 border-primary/20", className)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <Image
                src={src}
                alt={alt}
                width={300}
                height={300}
                className="object-cover"
            />
        </motion.div>
    )
}
