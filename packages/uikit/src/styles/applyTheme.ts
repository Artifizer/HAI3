/**
 * Theme application utility
 * Generates CSS variables from theme objects dynamically
 * Single source of truth: theme objects in TypeScript
 * Maps to shadcn CSS variable naming convention
 */

import type { Theme } from './themeTypes';

/**
 * Normalize color value for CSS variable
 * - HSL format (hsl(221 83% 53%)) → strip hsl() wrapper for shadcn
 * - Special values (transparent) → used as-is
 */
const hslToVar = (color: string): string => {
  // Handle special cases
  if (color === 'transparent') {
    return 'transparent';
  }

  // HSL format - strip wrapper for shadcn compatibility
  if (color.startsWith('hsl(')) {
    return color.replace('hsl(', '').replace(')', '');
  }

  // Return as-is (shouldn't happen with HSL-only system)
  return color;
};

/**
 * Apply theme to document by injecting CSS variables
 * Theme objects are the single source of truth
 * @param theme - Theme object to apply
 * @param themeName - Optional theme name for data attribute
 */
export const applyTheme = (theme: Theme, themeName?: string): void => {
  const root = document.documentElement;

  // Set theme attribute for CSS selectors
  if (themeName) {
    root.setAttribute('data-theme', themeName);
  }

  // Apply shadcn color variables
  root.style.setProperty('--background', hslToVar(theme.colors.background));
  root.style.setProperty('--foreground', hslToVar(theme.colors.foreground));
  root.style.setProperty('--card', hslToVar(theme.colors.background));
  root.style.setProperty('--card-foreground', hslToVar(theme.colors.foreground));
  root.style.setProperty('--popover', hslToVar(theme.colors.background));
  root.style.setProperty('--popover-foreground', hslToVar(theme.colors.foreground));
  root.style.setProperty('--primary', hslToVar(theme.colors.primary));
  root.style.setProperty('--primary-foreground', hslToVar(theme.colors.background));
  root.style.setProperty('--secondary', hslToVar(theme.colors.secondary));
  root.style.setProperty('--secondary-foreground', hslToVar(theme.colors.foreground));
  root.style.setProperty('--muted', hslToVar(theme.colors.muted));
  root.style.setProperty('--muted-foreground', hslToVar(theme.colors.foreground));
  root.style.setProperty('--accent', hslToVar(theme.colors.accent));
  root.style.setProperty('--accent-foreground', hslToVar(theme.colors.background));
  root.style.setProperty('--destructive', hslToVar(theme.colors.error));
  root.style.setProperty('--destructive-foreground', hslToVar(theme.colors.foreground));
  root.style.setProperty('--border', hslToVar(theme.colors.border));
  root.style.setProperty('--input', hslToVar(theme.colors.border));
  root.style.setProperty('--ring', hslToVar(theme.colors.primary));

  // Apply state colors
  root.style.setProperty('--error', hslToVar(theme.colors.error));
  root.style.setProperty('--warning', hslToVar(theme.colors.warning));
  root.style.setProperty('--success', hslToVar(theme.colors.success));
  root.style.setProperty('--info', hslToVar(theme.colors.info));

  // Apply left menu colors
  root.style.setProperty('--left-menu', hslToVar(theme.colors.mainMenu.DEFAULT));
  root.style.setProperty('--left-menu-foreground', hslToVar(theme.colors.mainMenu.foreground));
  root.style.setProperty('--left-menu-hover', hslToVar(theme.colors.mainMenu.hover));
  root.style.setProperty('--left-menu-selected', hslToVar(theme.colors.mainMenu.selected));

  // Apply spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Apply border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });

  // Apply shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });

  // Apply transitions
  Object.entries(theme.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value);
  });

  // For -large themes: scale base font size
  if (themeName?.endsWith('-large')) {
    root.style.fontSize = '125%';
  } else {
    root.style.fontSize = '';
  }
};
