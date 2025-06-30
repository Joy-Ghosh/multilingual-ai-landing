import Script from "next/script"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LinguaBot - Multilingual AI Customer Support",
  description: "Multilingual AI support bots for India's diverse customers. Speak your customers' language instantly.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Script
          src="https://linguachatbotapi.netlify.app/chatbot.js"
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
