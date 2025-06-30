"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Shield, Sparkles, MessageCircle, ArrowRight, Play, Menu, X, Star } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, -30])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.9])

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Demo", href: "#demo" },
    { name: "Contact", href: "#contact" },
  ]

  if (!mounted) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-indigo-50/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Organic Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/5 to-emerald-600/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/4 to-indigo-600/2 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Enhanced Navigation with Scroll Effect */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-4 lg:p-6 transition-all duration-300 ${
          scrolled ? "py-3 lg:py-4" : "py-4 lg:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className={`transition-all duration-300 rounded-2xl px-6 py-4 ${
              scrolled
                ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
                : "bg-transparent"
            }`}
            initial={false}
            animate={{
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                    LinguaBot
                  </span>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI Support</div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors duration-200 relative group py-2 px-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md ${
                      scrolled
                        ? "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                        : "text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
                <ThemeToggle />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 font-semibold px-6 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Get Started
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="lg:hidden flex items-center space-x-4">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-slate-200/50 dark:border-slate-700/50 mt-4 pt-4"
              >
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold"
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section - Added top padding for fixed nav */}
      <motion.section
        className="relative z-10 px-4 lg:px-6 pt-24 lg:pt-32 pb-16 lg:pb-24"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Improved Typography Hierarchy */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 bg-clip-text text-transparent">
                    Speak Your Customers' Language.
                  </span>
                  <br />
                  <span className="text-slate-900 dark:text-slate-100">Instantly.</span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Multilingual AI support bots that understand India's diverse customers and respond in their preferred
                  language.
                </motion.p>
              </motion.div>

              {/* Enhanced CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transform hover:scale-[1.02] transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 group"
                >
                  Book a Free Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-600 font-medium text-lg group px-8 py-6 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 bg-transparent"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  See How It Works
                </Button>
              </motion.div>

              {/* Enhanced Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4"
              >
                {/* Social Proof */}
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  <span className="font-medium">Trusted by 120+ brands across India</span>
                </div>

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
                  >
                    <Globe className="w-4 h-4 mr-2 text-indigo-500" />
                    10+ Languages
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
                  >
                    <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                    GDPR Compliant
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                    99.9% Uptime
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Enhanced Visual Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Glass Card with Better Proportions */}
              <div className="relative w-full max-w-lg mx-auto">
                <motion.div
                  className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-6 lg:p-8 hover:scale-[1.01] transition-transform duration-500"
                  whileHover={{ rotateY: 2, rotateX: 2 }}
                >
                  {/* Chat Interface Mockup */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-medium ml-4">
                        Customer Support Chat
                      </span>
                    </div>

                    {/* Customer Message */}
                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="bg-indigo-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                        <p className="text-sm font-medium">मुझे अपने ऑर्डर की स्थिति जानना है</p>
                        <span className="text-xs opacity-75 block mt-1">Hindi • Customer</span>
                      </div>
                    </motion.div>

                    {/* Typing Indicator */}
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="bg-slate-200 dark:bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Bot Response */}
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 }}
                    >
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-2xl rounded-bl-md max-w-xs shadow-lg">
                        <p className="text-sm font-medium">
                          I can help you check your order status! Please provide your order number.
                        </p>
                        <span className="text-xs opacity-75 block mt-1">English • AI Assistant</span>
                      </div>
                    </motion.div>

                    {/* Translation Indicator */}
                    <motion.div
                      className="flex items-center justify-center space-x-2 py-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Real-time translation active
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Floating Chat Bubbles */}
                <FloatingBubble
                  text="नमस्ते"
                  delay={0}
                  position="top-4 -left-8"
                  color="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                />
                <FloatingBubble
                  text="Hello"
                  delay={1}
                  position="top-16 -right-12"
                  color="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                />
                <FloatingBubble
                  text="வணக்கம்"
                  delay={2}
                  position="bottom-8 -left-12"
                  color="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                />
                <FloatingBubble
                  text="مرحبا"
                  delay={1.5}
                  position="bottom-16 -right-8"
                  color="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Demo Content Section - To show scroll effect */}
      <section className="relative z-10 px-4 lg:px-6 py-24 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Scroll to see the navbar effect
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Notice how the navigation becomes more prominent as you scroll down, providing better usability while
            keeping the hero section clean.
          </p>
        </div>
      </section>
    </div>
  )
}

function FloatingBubble({
  text,
  delay,
  position,
  color,
}: { text: string; delay: number; position: string; color: string }) {
  return (
    <motion.div
      className={`absolute ${position} ${color} backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-white/50 dark:border-slate-700/50 text-sm font-medium`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: {
          delay: delay + 0.5,
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
    >
      {text}
    </motion.div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 animate-pulse">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-20 mb-8"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-slate-200 dark:bg-slate-800 rounded-lg h-16 w-3/4"></div>
              <div className="bg-slate-200 dark:bg-slate-800 rounded-lg h-8 w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-800 rounded-lg h-12 w-1/2"></div>
            </div>
            <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl h-96"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
