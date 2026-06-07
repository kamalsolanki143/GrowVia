"use client";

import { useTheme as useNextTheme } from "next-themes";

/**
 * Custom hook wrapping next-themes useTheme.
 * Provides a simplified API for theme management.
 * TODO: Replace with Supabase user preferences when backend is ready.
 */
export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    theme,
    isDark,
    toggle,
    setTheme,
  };
}
