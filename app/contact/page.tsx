"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { motion, Variants } from "framer-motion"
import { Mail, Linkedin, Github, Twitter, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { RevealOnScroll } from "@/components/framer-motion-effects"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success
      setSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)

    } catch (err) {
      console.error('Email sending failed:', err)
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again or contact me directly.")
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:maxotif@gmail.com",
      label: "maxoti@gmail.com",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/max-otifavour",
      label: "LinkedIn Profile",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/kellslte",
      label: "GitHub Profile",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/thekellslte",
      label: "Twitter Profile",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-card pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
            {/* Header */}
            <motion.div variants={itemVariants as Variants} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
              <p className="text-lg text-muted-foreground">
                Have a project in mind or want to collaborate? I'd love to hear from you. Reach out and let's create
                something amazing together.
              </p>
            </motion.div>

            {/* Content Grid */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div variants={itemVariants as Variants} className="space-y-6">
                <h2 className="text-2xl font-semibold">Send me a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  {/* Success Message */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                    >
                      <p className="font-medium">✅ Message sent successfully!</p>
                      <p className="text-sm">I'll get back to you within 24-48 hours.</p>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                    >
                      <p className="font-medium">❌ {error}</p>
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants as Variants} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Mail,
                        title: "Email",
                        content: "maxotif@gmail.com",
                      },
                      {
                        icon: MapPin,
                        title: "Location",
                        content: "Enugu, Nigeria",
                      },
                      {
                        icon: Phone,
                        title: "Phone",
                        content: "+234 (0) 810 468 4978",
                      },
                    ].map((item, idx) => (
                      <RevealOnScroll key={idx} delay={idx * 0.1}>
                        <motion.div className="flex items-start gap-4" whileHover={{ x: 8 }}>
                          <div className="p-3 rounded-lg bg-primary/10">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground">{item.content}</p>
                          </div>
                        </motion.div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                          <motion.div
                            whileHover={{ y: -4, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all flex items-center gap-3"
                          >
                            <Icon className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm font-medium">{link.name}</p>
                              <p className="text-xs text-muted-foreground">{link.label}</p>
                            </div>
                          </motion.div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Availability */}
                <RevealOnScroll delay={0.3}>
                  <motion.div
                    whileHover={{ borderColor: "var(--color-primary)", scale: 1.02 }}
                    className="p-6 rounded-lg border border-border bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm"
                  >
                    <h3 className="font-semibold mb-2">Availability</h3>
                    <p className="text-sm text-muted-foreground">
                      I'm currently available for freelance projects and full-time opportunities. Response time: 24-48
                      hours.
                    </p>
                  </motion.div>
                </RevealOnScroll>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
