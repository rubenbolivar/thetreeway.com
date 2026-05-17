// Single source of truth for Rubén's links (REFACTOR §8).
// Confirmed by Rubén 2026-05-17. Used in author-section, /equipo, etc.
// Firm contact stays hola@thetreeway.com (footer); these are the author's.

export const social = {
  github: "https://github.com/rubenbolivar",
  linkedin: "https://www.linkedin.com/in/rubenbolivar/",
  x: "https://x.com/RubenBolivar",
  instagram: "https://www.instagram.com/rubenbolivar/",
  whatsapp: "https://wa.me/584121010744",
} as const;

export const calUrl = "https://cal.com/ruben-bolivar";

export const socialList = [
  { key: "linkedin", href: social.linkedin, label: "LinkedIn" },
  { key: "github", href: social.github, label: "GitHub" },
  { key: "x", href: social.x, label: "X" },
  { key: "instagram", href: social.instagram, label: "Instagram" },
  { key: "whatsapp", href: social.whatsapp, label: "WhatsApp" },
] as const;
