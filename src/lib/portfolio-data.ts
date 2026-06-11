import boutique from "@/assets/work/boutique.jpg";
import studioBrand from "@/assets/work/studio-brand.jpg";
import linkedinGrowth from "@/assets/work/linkedin-growth.jpg";
import cafeContent from "@/assets/work/cafe-content.jpg";
import carousel from "@/assets/work/carousel.jpg";
import festival from "@/assets/work/festival.jpg";
import educator from "@/assets/work/educator.jpg";
import wellness from "@/assets/work/wellness.jpg";

export type CaseStudy = {
  slug: string;
  title: string;
  category: "Social Media" | "Branding" | "Content" | "Design" | "LinkedIn";
  cover: string;
  gallery: string[];
  summary: string;
  roles: string[];
  tools: string[];
  outcomes: { label: string; value: string }[];
  tone: [string, string];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "boutique-relaunch",
    title: "Local Boutique Relaunch",
    category: "Social Media",
    cover: boutique,
    gallery: [boutique, carousel, studioBrand],
    summary:
      "A six-week social-led relaunch for a heritage boutique — new content pillars, weekly reels, and a refreshed feed aesthetic that doubled saves and shares.",
    roles: ["Social Strategy", "Content Direction", "Community Mgmt."],
    tools: ["Canva", "Notion", "Meta Business Suite"],
    outcomes: [
      { label: "Engagement", value: "+128%" },
      { label: "Saves", value: "2.1×" },
      { label: "Reach / month", value: "184K" },
    ],
    tone: ["#b388ff", "#7fd6ff"],
  },
  {
    slug: "studio-brand-system",
    title: "Creative Studio Brand System",
    category: "Branding",
    cover: studioBrand,
    gallery: [studioBrand, carousel, wellness],
    summary:
      "Brand identity refresh for a creative studio — logo refinement, palette, typography, and a templated social system the team can run themselves.",
    roles: ["Visual Identity", "Template System", "Brand Guidelines"],
    tools: ["Figma", "Canva", "Adobe Express"],
    outcomes: [
      { label: "Templates", value: "24" },
      { label: "Posting cadence", value: "5×/week" },
      { label: "Brand recall", value: "+62%" },
    ],
    tone: ["#ff9ec7", "#ffd6a5"],
  },
  {
    slug: "founder-linkedin-growth",
    title: "Founder LinkedIn Growth",
    category: "LinkedIn",
    cover: linkedinGrowth,
    gallery: [linkedinGrowth, educator, carousel],
    summary:
      "Strategy + ghostwriting for an early-stage founder. Built a content pillar map, a weekly hook bank, and a publishing rhythm that took their LinkedIn from quiet to magnetic.",
    roles: ["LinkedIn Strategy", "Ghostwriting", "Personal Branding"],
    tools: ["Notion", "Taplio", "Canva"],
    outcomes: [
      { label: "Followers", value: "+8.4K" },
      { label: "Impressions", value: "1.2M" },
      { label: "Inbound DMs", value: "+340%" },
    ],
    tone: ["#7fd6ff", "#6fe7d8"],
  },
  {
    slug: "cafe-content-calendar",
    title: "Cafe Content Calendar",
    category: "Content",
    cover: cafeContent,
    gallery: [cafeContent, boutique, festival],
    summary:
      "A 90-day content calendar for a neighborhood cafe — seasonal menu launches, weekly reels and a story playbook that pulled regulars in off the timeline.",
    roles: ["Content Planning", "Caption Writing", "Reels Direction"],
    tools: ["Notion", "Later", "CapCut"],
    outcomes: [
      { label: "Avg. reach", value: "+92%" },
      { label: "Footfall lift", value: "+31%" },
      { label: "UGC tags", value: "+74%" },
    ],
    tone: ["#ffd6a5", "#ff9ec7"],
  },
  {
    slug: "carousel-design-system",
    title: "Carousel Design System",
    category: "Design",
    cover: carousel,
    gallery: [carousel, studioBrand, educator],
    summary:
      "Reusable carousel system — covers, body slides, quote slides and CTAs — that a creator can fill in under 10 minutes and ship a polished post.",
    roles: ["Design System", "Typography", "Layout"],
    tools: ["Figma", "Canva", "Adobe Express"],
    outcomes: [
      { label: "Production time", value: "−68%" },
      { label: "Save rate", value: "2.4×" },
      { label: "Slide variants", value: "32" },
    ],
    tone: ["#b388ff", "#ff9ec7"],
  },
  {
    slug: "festival-campaign-push",
    title: "Festival Campaign Push",
    category: "Social Media",
    cover: festival,
    gallery: [festival, carousel, boutique],
    summary:
      "A 10-day festive sprint — daily creatives, story takeovers, an influencer micro-collab and a paid amplification plan that filled the calendar.",
    roles: ["Campaign Strategy", "Creative Direction", "Paid Amplification"],
    tools: ["Meta Ads", "Canva", "Notion"],
    outcomes: [
      { label: "ROAS", value: "4.2×" },
      { label: "New followers", value: "+2.3K" },
      { label: "Story reach", value: "210K" },
    ],
    tone: ["#ff9c5b", "#ff5fa2"],
  },
  {
    slug: "educator-personal-brand",
    title: "Educator Personal Brand",
    category: "LinkedIn",
    cover: educator,
    gallery: [educator, linkedinGrowth, carousel],
    summary:
      "Positioning and content system for an educator — quote cards, mini-essays and a weekly carousel cadence that built an audience of practitioners.",
    roles: ["Positioning", "Content Pillars", "Visual Templates"],
    tools: ["Figma", "Canva", "Notion"],
    outcomes: [
      { label: "Followers", value: "+5.1K" },
      { label: "Avg. engagement", value: "+212%" },
      { label: "Cohort waitlist", value: "+480" },
    ],
    tone: ["#c9a8ff", "#9a8bff"],
  },
  {
    slug: "wellness-brand-visuals",
    title: "Wellness Brand Visuals",
    category: "Design",
    cover: wellness,
    gallery: [wellness, studioBrand, cafeContent],
    summary:
      "Calm, botanical visual world for a wellness brand — logo, packaging direction, Instagram grid and a launch carousel set.",
    roles: ["Visual Identity", "Packaging Direction", "Social Launch"],
    tools: ["Figma", "Canva"],
    outcomes: [
      { label: "Launch reach", value: "96K" },
      { label: "Pre-orders", value: "+340" },
      { label: "Press features", value: "5" },
    ],
    tone: ["#6fe7d8", "#b388ff"],
  },
];
