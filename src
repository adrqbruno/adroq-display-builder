export const FORMATS = [
  // ── IAB Core ──────────────────────────────────────────────────────────────
  { label: "Medium Rectangle",    w: 300,  h: 250,  cat: "IAB" },
  { label: "Leaderboard",         w: 728,  h: 90,   cat: "IAB" },
  { label: "Wide Skyscraper",     w: 160,  h: 600,  cat: "IAB" },
  { label: "Half Page",           w: 300,  h: 600,  cat: "IAB" },
  { label: "Billboard",           w: 970,  h: 250,  cat: "IAB" },
  { label: "Mobile Banner",       w: 320,  h: 50,   cat: "IAB" },
  { label: "Mobile Interstitial", w: 320,  h: 100,  cat: "IAB" },

  // ── IAB Extended ─────────────────────────────────────────────────────────
  { label: "Large Leaderboard",   w: 970,  h: 90,   cat: "IAB" },
  { label: "Large Rectangle",     w: 336,  h: 280,  cat: "IAB" },
  { label: "Small Rectangle",     w: 180,  h: 150,  cat: "IAB" },
  { label: "Skyscraper",          w: 120,  h: 600,  cat: "IAB" },
  { label: "Square",              w: 250,  h: 250,  cat: "IAB" },
  { label: "Small Square",        w: 200,  h: 200,  cat: "IAB" },
  { label: "Vertical Banner",     w: 120,  h: 240,  cat: "IAB" },
  { label: "Banner",              w: 468,  h: 60,   cat: "IAB" },
  { label: "Half Banner",         w: 234,  h: 60,   cat: "IAB" },
  { label: "Portrait",            w: 300,  h: 1050, cat: "IAB" },

  // ── Native ────────────────────────────────────────────────────────────────
  { label: "Native Feed",         w: 1200, h: 628,  cat: "Native" },
  { label: "Native Square",       w: 1080, h: 1080, cat: "Native" },
  { label: "Native Story",        w: 1080, h: 1920, cat: "Native" },
];

export const FONTS = ["Inter","Arial","Georgia","Helvetica","Trebuchet MS","Verdana"];

export const ANIMS = ["none","fade-in","slide-left","slide-up","zoom-in","bounce"];

export const ANIM_MAP = {
  "fade-in":   "adsFadeIn",
  "slide-left":"adsSlideLeft",
  "slide-up":  "adsSlideUp",
  "zoom-in":   "adsZoomIn",
  "bounce":    "adsBounce",
};

export const SCALE_MAX = 420;

export function getScale(fmt) {
  return Math.min(1, SCALE_MAX / Math.max(fmt.w, fmt.h));
}
