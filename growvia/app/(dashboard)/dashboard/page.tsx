"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Radar, Flame, Dna, Search, BadgeCheck, ArrowRight } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import MissionCard from "@/components/dashboard/MissionCard";
import CareerReadiness from "@/components/dashboard/CareerReadiness";
import OpportunityPreview from "@/components/dashboard/OpportunityPreview";
import { supabase } from "@/lib/supabase";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [dna, setDna] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [recentOpps, setRecentOpps] = useState<any[]>([]);
  const [appliedCount, setAppliedCount] = useState(0);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [
        { data: profData },
        { data: dnaData },
        { data: missionData },
        { data: oppsData },
        { data: savedOpps },
      ] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("career_dna").select("*").eq("user_id", user.id).order('completed_at', { ascending: false }).limit(1).single(),
        supabase.from("missions").select("*").eq("user_id", user.id).limit(5),
        supabase.from("opportunities").select("*").order("created_at", { ascending: false }).limit(3),
        supabase.from("user_saved_opportunities").select("*").eq("user_id", user.id)
      ]);

      setProfile(profData);
      setDna(dnaData);
      setMissions(missionData || []);
      setRecentOpps(oppsData || []);
      setAppliedCount(savedOpps?.length || 0);
      setLoading(false);
    }
    loadDashboard();
  }, []);

  // Calculate career readiness score
  let readinessScore = 0;
  if (profile?.full_name) readinessScore += 20;
  if (dna) readinessScore += 30;
  if (missions.some(m => m.is_completed)) readinessScore += 10;
  if (appliedCount > 0) readinessScore += 20;
  // +20 for passport filled (assuming basic details complete)
  if (profile?.college) readinessScore += 20;

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" /></div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-6xl"
    >
      {/* Welcome card */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-gradient-to-r from-brand-primary/10 via-violet-600/5 to-transparent p-6 sm:p-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          {getGreeting()}, {profile?.full_name?.split(" ")[0] || 'Explorer'} 👋
        </h1>
        <p className="text-muted-foreground mt-1">{today}</p>
      </motion.div>

      {/* Stats + Career Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats */}
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard
              icon={TrendingUp}
              label="Career Readiness"
              value={`${readinessScore}%`}
              gradient="from-cyan-500 to-blue-500"
            />
            <StatsCard
              icon={Radar}
              label="Opportunities Applied"
              value={appliedCount}
              gradient="from-violet-500 to-purple-600"
            />
            <StatsCard
              icon={Flame}
              label="Missions Done"
              value={missions.filter(m => m.is_completed).length}
              gradient="from-amber-500 to-orange-500"
            />
          </div>
        </motion.div>

        {/* Career Readiness */}
        <motion.div variants={fadeUp}>
          <CareerReadiness score={readinessScore} />
        </motion.div>
      </div>

      {/* Missions + Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Missions */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Today&apos;s Missions</h2>
            <span className="text-xs text-muted-foreground">
              {missions.filter((m) => m.is_completed).length}/{missions.length} done
            </span>
          </div>
          <div className="space-y-3">
            {missions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Check back tomorrow for new missions.</p>
            ) : (
              missions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} onComplete={() => {
                  setMissions(missions.map(m => m.id === mission.id ? { ...m, is_completed: true } : m));
                }} />
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Opportunities */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Recent Opportunities</h2>
            <Link
              href="/opportunity-radar"
              className="text-xs text-brand-primary font-medium hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOpps.map((opp) => (
              <OpportunityPreview key={opp.id} opportunity={opp} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/career-dna">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-brand-primary/30 transition-all cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Dna className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium group-hover:text-brand-primary transition-colors">
                  Take Career DNA
                </p>
                <p className="text-xs text-muted-foreground">
                  Discover your path
                </p>
              </div>
            </motion.div>
          </Link>

          <Link href="/opportunity-radar">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-violet-500/30 transition-all cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium group-hover:text-violet-500 transition-colors">
                  Browse Opportunities
                </p>
                <p className="text-xs text-muted-foreground">
                  Find your next move
                </p>
              </div>
            </motion.div>
          </Link>

          <Link href="/talent-passport">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-amber-500/30 transition-all cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium group-hover:text-amber-500 transition-colors">
                  View Passport
                </p>
                <p className="text-xs text-muted-foreground">
                  Share your profile
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
