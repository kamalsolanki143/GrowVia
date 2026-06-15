"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import PassportHeader from "@/components/talent-passport/PassportHeader";
import PassportDNA from "@/components/talent-passport/PassportDNA";
import PassportSkills from "@/components/talent-passport/PassportSkills";
import PassportBadges from "@/components/talent-passport/PassportBadges";
import { mockDNA } from "@/mock/user";
import { supabase } from "@/lib/supabase";

export default function TalentPassportPage() {
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [dna, setDna] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [{ data: prof }, { data: dnaData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('career_dna').select('*').eq('user_id', user.id).order('completed_at', { ascending: false }).limit(1).single()
      ]);
      setProfile(prof);
      let parsedDna = mockDNA;
      if (dnaData?.result) {
        parsedDna = typeof dnaData.result === 'string' ? JSON.parse(dnaData.result) : dnaData.result;
      }
      setDna(parsedDna);
      setLoading(false);
    }
    loadData();
  }, []);

  const passportUrl = profile?.username ? `/passport/${profile.username}` : '#';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${passportUrl}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.log("Failed to copy");
    }
  };

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" /></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <BadgeCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Talent Passport</h1>
          <p className="text-sm text-muted-foreground">
            Your verified career profile
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-brand-success" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Passport Link
            </>
          )}
        </button>
        <Link
          href={passportUrl}
          target="_blank"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 transition-all shadow-md shadow-brand-primary/20"
        >
          <ExternalLink className="h-4 w-4" />
          View Public Passport
        </Link>
      </div>

      {/* Passport preview */}
      <div className="space-y-6">
        <PassportHeader 
          user={profile} 
          editable 
          onUpdate={(updates) => setProfile({ ...profile, ...updates })} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PassportDNA dna={dna} />
          <div className="space-y-6">
            <PassportSkills 
              initialSkills={profile?.skills || []} 
              editable 
              onSave={async (skills) => {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                  await supabase.from('profiles').update({ skills }).eq('id', user.id);
                  setProfile({ ...profile, skills });
                }
              }}
            />
            <PassportBadges />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
