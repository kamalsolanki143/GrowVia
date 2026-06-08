"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { supabase } from "@/lib/supabase";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export default function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
    }
    loadProfile();
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-4 sm:px-6 gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary to-violet-600 flex items-center justify-center cursor-pointer">
          <span className="text-white text-xs font-bold">
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : "G"}
          </span>
        </div>
      </div>
    </header>
  );
}
