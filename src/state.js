import { FORMATS } from "./constants.js";

export const DEFAULT_LAYERS = (fmt) => {
  const w = fmt ? fmt.w : 300;
  const h = fmt ? fmt.h : 250;

  const isThin      = h <= 100;
  const isWide      = w >= 700 && h >= 200 && w > h && w !== 1080;
  const isPortrait  = w === 300 && h === 1050;
  const isSquare    = w === 1080 && h === 1080;
  const isStory     = w === 1080 && h === 1920;
  const isFeed      = w === 1200 && h === 628;
  const area        = w * h;
  const minDim      = Math.min(w, h);

  let hlSize, bdSize, ctaSize, ctaW, ctaH, hlX, hlY, bdX, bdY, ctaX, ctaY;

  if (isThin) {
    hlSize  = Math.max(11, Math.round(minDim * 0.22));
    bdSize  = 0;
    ctaSize = Math.max(10, Math.round(minDim * 0.14));
    ctaW    = Math.round(w * 0.25);
    ctaH    = Math.round(h * 0.60);
    hlX = 50; hlY = 50;
    bdX = 50; bdY = 50;
    ctaX = 50; ctaY = 50;

  } else if (isSquare) {
    hlSize  = 126;
    bdSize  = 70;
    ctaSize = 76;
    ctaW    = 1152;
    ctaH    = 126;
    hlX = 50; hlY = 26;
    bdX = 50; bdY = 54;
    ctaX = 50; ctaY = 92;

  } else if (isStory) {
    hlSize  = 150;
    bdSize  = 100;
    ctaSize = 70;
    ctaW    = 1000;
    ctaH    = 200;
    hlX = 50; hlY = 19;
    bdX = 50; bdY = 54;
    ctaX = 50; ctaY = 92;

  } else if (isFeed) {
    hlSize  = 80;
    bdSize  = 46;
    ctaSize = 50;
    ctaW    = 360;
    ctaH    = 90;
    hlX = 50; hlY = 36;
    bdX = 50; bdY = 56;
    ctaX = 50; ctaY = 76;

  } else if (isWide) {
    hlSize  = Math.round(h * 0.16);
    bdSize  = Math.round(h * 0.09);
    ctaSize = Math.round(h * 0.09);
    ctaW    = Math.round(h * 1.1);
    ctaH    = Math.round(h * 0.20);
    hlX = 50; hlY = 35;
    bdX = 50; bdY = 54;
    ctaX = 50; ctaY = 76;

  } else if (isPortrait) {
    hlSize  = Math.round(Math.sqrt(area) * 0.07);
    bdSize  = Math.round(Math.sqrt(area) * 0.043);
    ctaSize = Math.round(Math.sqrt(area) * 0.047);
    ctaW    = Math.round(w * 0.78);
    ctaH    = Math.round(Math.sqrt(area) * 0.11);
    hlX = 50; hlY = 36;
    bdX = 50; bdY = 52;
    ctaX = 50; ctaY = 72;

  } else {
    hlSize  = Math.round(Math.sqrt(area) * 0.09);
    bdSize  = Math.round(Math.sqrt(area) * 0.055);
    ctaSize = Math.round(Math.sqrt(area) * 0.06);
    ctaW    = Math.round(Math.sqrt(area) * 0.48);
    ctaH    = Math.round(Math.sqrt(area) * 0.14);
    hlX = 50; hlY = 38;
    bdX = 50; bdY = 56;
    ctaX = 50; ctaY = 76;
  }

  return {
    bg:       { color: "#1a1a2e" },
    image:    { src: null, x: 0, y: 0, w: 100, h: 100, opacity: 100 },
    logo:     { src: null, x: 10, y: 10, w: 80, h: 40, opacity: 100 },
    visual:   { src: null, x: 50, y: 50, w: 200, h: 200, opacity: 100 },
    headline: { text: "Your Headline Here",           color: "#ffffff", size: hlSize,  font: "Inter", bold: true,  x: hlX, y: hlY, anim: "fade-in"  },
    body:     { text: "Supporting message goes here", color: "#cccccc", size: bdSize,  font: "Inter", bold: false, x: bdX, y: bdY, anim: "slide-up" },
    cta:      { text: "Learn More", bgColor: "#0066ff", textColor: "#ffffff", size: ctaSize, font: "Inter", w: ctaW, h: ctaH, radius: 6, x: ctaX, y: ctaY, anim: "zoom-in" },
  };
};

export const state = {
  fmt:       FORMATS[0],
  layers:    DEFAULT_LAYERS(FORMATS[0]),
  mode:      "static",
  activeTab: "bg",
};
