"use client";

/**
 * ThemeProvider Component
 * 
 * A wrapper component that provides theme context to the application.
 * Uses next-themes to handle theme switching functionality.
 * 
 * Features:
 * - Enables light/dark mode switching throughout the application
 * - Persists theme preference
 * - Supports system theme detection
 * - Wraps children with theme context
 */
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
