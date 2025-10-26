import { screensetService } from '@hai3/uicore';
import { demoScreenset } from './drafts/demo/demoScreenset';

/**
 * Screenset Registry
 * Project-level registry that only knows about screensets, not individual screens
 * Each screenset is self-contained and manages its own screens internally
 * 
 * All IDs (screenset, screen, icon) are well-known constants defined where they belong:
 * - Screenset ID: in screenset file (e.g., DEMO_SCREENSET_ID in demoScreenset.ts)
 * - Screen IDs: in screen files (e.g., HELLO_WORLD_SCREEN_ID in HelloWorldScreen.tsx)
 * - Icon IDs: in icon files (e.g., WORLD_ICON_ID in WorldIcon.tsx)
 * 
 * This pattern prevents circular imports and follows vertical slice architecture
 */

/**
 * Register all screensets
 * This runs automatically when the module is imported
 */
screensetService.register(demoScreenset);

// Add more screensets here and they'll auto-register
// import { anotherScreenset } from './production/another/anotherScreenset';
// screensetService.register(anotherScreenset);
