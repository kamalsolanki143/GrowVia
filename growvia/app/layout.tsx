import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import PageLoader from "@/components/shared/PageLoader";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";


export const metadata: Metadata = {
  title: "Growvia | Career OS for Students",
  description:
    "India's first AI-powered Career Operating System. Get a personalized career roadmap, verified internships, and AI guidance — all in one place.",
  keywords: [
    "career",
    "students",
    "internships",
    "career guidance",
    "AI",
    "talent passport",
    "career DNA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Cloudflare Turnstile — loads once globally for all pages */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <PageLoader />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
