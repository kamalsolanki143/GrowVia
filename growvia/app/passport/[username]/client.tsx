"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import Logo from "@/components/shared/Logo";
import PassportHeader from "@/components/talent-passport/PassportHeader";
import PassportDNA from "@/components/talent-passport/PassportDNA";
import PassportSkills from "@/components/talent-passport/PassportSkills";
import PassportBadges from "@/components/talent-passport/PassportBadges";
import { mockUser, mockDNA } from "@/mock/user";

export default function PublicPassportClient({ username }: { username?: string }) {
  // TODO: Replace mock data with real fetch based on username param

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${mockUser.name}'s Talent Passport`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple top bar */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-8 px-3 rounded-lg bg-[#0077b5] text-white text-xs font-semibold hover:bg-[#006699] transition-colors"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6"
      >
        <PassportHeader user={mockUser} isPublic />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PassportDNA dna={mockDNA} />
          <div className="space-y-6">
            <PassportSkills />
            <PassportBadges />
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <span className="font-semibold text-gradient">Growvia</span> —
            India&apos;s Career OS for Students
          </p>
        </div>
      </motion.div>
    </div>
  );
}
