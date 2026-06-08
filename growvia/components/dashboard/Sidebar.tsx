"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Dna,
  Radar,
  BadgeCheck,
  LogOut,
  ChevronLeft,
  X,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { supabase } from "@/lib/supabase";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Career DNA",
    href: "/career-dna",
    icon: Dna,
  },
  {
    label: "Opportunity Radar",
    href: "/opportunity-radar",
    icon: Radar,
  },
  {
    label: "Talent Passport",
    href: "/talent-passport",
    icon: BadgeCheck,
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile({ ...data, email: user.email });
      }
    }
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <Logo showText={!collapsed} />
        {/* Desktop collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-200 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="lg:hidden h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors flex"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 h-10 px-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 px-3 py-2">
          {/* Avatar */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary to-violet-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : "G"}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name || "Explorer"}</p>
              <p className="text-xs text-muted-foreground truncate">
                {profile?.email || ""}
              </p>
            </div>
          )}
        </div>
        {/* Logout */}
        <button
          className={`flex items-center gap-3 w-full h-9 px-3 rounded-lg text-sm text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors mt-1 ${
            collapsed ? "justify-center" : ""
          }`}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 bottom-0 bg-card border-r border-border z-30 transition-all duration-200 ${
          collapsed ? "w-[68px]" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
