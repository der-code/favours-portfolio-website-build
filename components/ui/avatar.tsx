"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface AvatarProps {
    name: string
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
    src?: string
}

const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
}

export const Avatar = ({ name, size = "md", className, src }: AvatarProps) => {
    const [imageError, setImageError] = useState(false)

    // Generate avatar URL using ui-avatars.com service
    const getAvatarUrl = (name: string, size: string) => {
        const initials = name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2)

        const sizeMap = {
            sm: '32',
            md: '40',
            lg: '48',
            xl: '64'
        }

        const params = new URLSearchParams({
            name: initials,
            background: 'random',
            color: 'fff',
            size: sizeMap[size as keyof typeof sizeMap],
            font_size: '0.5',
            bold: 'true',
            format: 'svg'
        })

        return `https://ui-avatars.com/api/?${params.toString()}`
    }

    const avatarUrl = getAvatarUrl(name, size)
    const initials = name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)

    if (imageError || !src) {
        // Fallback to gradient circle with initials
        return (
            <div className={cn(
                "rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold",
                sizeClasses[size],
                className
            )}>
                {initials}
            </div>
        )
    }

    return (
        <img
            src={src || avatarUrl}
            alt={`${name} avatar`}
            className={cn("rounded-full object-cover", sizeClasses[size], className)}
            onError={() => setImageError(true)}
            loading="lazy"
        />
    )
}
