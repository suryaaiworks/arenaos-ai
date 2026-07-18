export interface CtaData {
  title: string;
  subtitle: string;
  description: string;
  primaryButton: { label: string; href: string };
  secondaryButton: { label: string; href: string };
}

export const CTA_DATA: CtaData = {
  title: "Deploy ArenaOS AI",
  subtitle: "Ready to Automate Your Venue?",
  description:
    "Join leading smart arenas orchestrating operations, crowd routing, safety, and transport logistics using cooperative AI agent systems.",
  primaryButton: { label: "Request Partnership Access", href: "#contact" },
  secondaryButton: { label: "Contact Engineering", href: "mailto:support@arenaos.ai" },
};
