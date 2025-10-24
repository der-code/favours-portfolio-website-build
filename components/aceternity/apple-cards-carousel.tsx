"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestimonialCardProps {
    quote: string
    name: string
    title: string
    company: string
    className?: string
}

const TestimonialCard = ({
    quote,
    name,
    title,
    company,
    className,
}: TestimonialCardProps) => {
    return (
        <div
            className={cn(
                "relative p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10",
                className
            )}
        >
            <div className="space-y-6">
                {/* Quote */}
                <div className="relative">
                    <svg
                        className="absolute -top-3 -left-3 h-10 w-10 text-primary/20"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                    >
                        <path d="M9.352 4C4.456 4 0 8.456 0 13.352c0 4.896 4.456 9.352 9.352 9.352 1.888 0 3.648-.592 5.088-1.6l-.8-2.4c-1.12.384-2.32.576-3.52.576-3.456 0-6.24-2.784-6.24-6.24s2.784-6.24 6.24-6.24c1.12 0 2.24.192 3.2.576l.8-2.4c-1.44-1.008-3.2-1.6-5.088-1.6z" />
                    </svg>
                    <p className="text-muted-foreground leading-relaxed pl-8 text-lg">{quote}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                    <Avatar name={name} size="lg" />
                    <div>
                        <p className="font-semibold text-foreground text-lg">{name}</p>
                        <p className="text-muted-foreground">
                            {title} @ {company}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface AppleCardsCarouselProps {
    testimonials: Array<{
        quote: string
        name: string
        title: string
        company: string
    }>
    className?: string
    autoPlay?: boolean
    autoPlayInterval?: number
}

export const AppleCardsCarousel = ({
    testimonials,
    className,
    autoPlay = true,
    autoPlayInterval = 5000,
}: AppleCardsCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying && autoPlay) {
            intervalRef.current = setInterval(nextSlide, autoPlayInterval)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isAutoPlaying, autoPlay, autoPlayInterval])

    // Pause auto-play on hover
    const handleMouseEnter = () => {
        setIsAutoPlaying(false)
    }

    const handleMouseLeave = () => {
        if (autoPlay) {
            setIsAutoPlaying(true)
        }
    }

    return (
        <div
            className={cn(
                "relative w-full max-w-4xl mx-auto",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full"
                    >
                        <TestimonialCard
                            quote={testimonials[currentIndex].quote}
                            name={testimonials[currentIndex].name}
                            title={testimonials[currentIndex].title}
                            company={testimonials[currentIndex].company}
                            className="mx-auto"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="h-12 w-12 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "h-3 w-3 rounded-full transition-all duration-300 cursor-pointer",
                                index === currentIndex
                                    ? "bg-primary scale-125"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            )}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="h-12 w-12 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                    {currentIndex + 1} of {testimonials.length}
                </p>
            </div>
        </div>
    )
}
