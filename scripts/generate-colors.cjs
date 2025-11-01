/**
 * Build-time script to generate Tailwind colors in HSL format
 * Converts Tailwind's hex colors to HSL once at build time
 * Output: src/themes/tailwindColors.ts (generated file)
 * @file This is a CommonJS Node.js script, not TypeScript
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const allColors = require('tailwindcss/colors');

/**
 * Convert hex color to HSL format
 * #2563eb -> hsl(221 83% 53%)
 * @param {string} hex - Hex color string
 * @returns {string} HSL color string
 */
function hexToHsl(hex) {
  // Handle special cases
  if (hex === 'inherit' || hex === 'currentColor' || hex === 'transparent') {
    return hex;
  }

  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Expand shorthand hex (e.g., "fff" -> "ffffff", "000" -> "000000")
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  // Grayscale colors (including black and white)
  if (max === min) {
    return `hsl(0 0% ${Math.round(l * 100)}%)`;
  }

  const d = max - min;
  // Avoid division by zero for edge cases
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  // Handle NaN from division edge cases
  if (isNaN(s)) {
    return `hsl(0 0% ${Math.round(l * 100)}%)`;
  }

  let h = 0;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
  }

  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

// Remove deprecated color names (intentionally unused - we're filtering them out)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {
  lightBlue,
  warmGray,
  trueGray,
  coolGray,
  blueGray,
  ...tailwindColors
} = allColors;

// Convert all colors to HSL
const colors = {};

for (const [colorName, colorValue] of Object.entries(tailwindColors)) {
  if (typeof colorValue === 'string') {
    // Simple color (inherit, currentColor, transparent, black, white)
    colors[colorName] = hexToHsl(colorValue);
  } else if (typeof colorValue === 'object') {
    // Color scale (slate, gray, etc.)
    colors[colorName] = {};
    for (const [shade, hex] of Object.entries(colorValue)) {
      colors[colorName][shade] = hexToHsl(hex);
    }
  }
}

// Generate TypeScript file
const output = `/**
 * Tailwind colors in HSL format (AUTO-GENERATED)
 * Generated at build time from tailwindcss/colors
 * DO NOT EDIT MANUALLY - run 'npm run generate:colors' to regenerate
 */

export interface TailwindColors {
  inherit: string;
  current: string;
  transparent: string;
  black: string;
  white: string;
  slate: ColorScale;
  gray: ColorScale;
  zinc: ColorScale;
  neutral: ColorScale;
  stone: ColorScale;
  red: ColorScale;
  orange: ColorScale;
  amber: ColorScale;
  yellow: ColorScale;
  lime: ColorScale;
  green: ColorScale;
  emerald: ColorScale;
  teal: ColorScale;
  cyan: ColorScale;
  sky: ColorScale;
  blue: ColorScale;
  indigo: ColorScale;
  violet: ColorScale;
  purple: ColorScale;
  fuchsia: ColorScale;
  pink: ColorScale;
  rose: ColorScale;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

const colors: TailwindColors = ${JSON.stringify(colors, null, 2)};

export default colors;
`;

// Write to packages/uikit/src/styles/tailwindColors.ts
// eslint-disable-next-line no-undef
const outputPath = path.join(__dirname, '../packages/uikit/src/styles/tailwindColors.ts');
fs.writeFileSync(outputPath, output, 'utf8');

console.log('✓ Generated packages/uikit/src/styles/tailwindColors.ts');
console.log(`  ${Object.keys(colors).length} color families converted to HSL`);
