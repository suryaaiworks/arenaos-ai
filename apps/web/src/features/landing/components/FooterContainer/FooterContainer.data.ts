export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContainerData {
  columns: FooterColumn[];
  socials: FooterLink[];
}

export const FOOTER_CONTAINER_DATA: FooterContainerData = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "AI Orchestrator", href: "#solution" },
        { label: "Specialized Agents", href: "#agents-preview" },
        { label: "API Telemetry", href: "#architecture" },
        { label: "Platform Features", href: "#features" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "System Blueprint", href: "#architecture" },
        { label: "Ecosystem Stack", href: "#technology" },
        { label: "Security Policies", href: "#architecture" },
        { label: "Volunteers Guide", href: "#features" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About ArenaOS", href: "#top" },
        { label: "Google Partnership", href: "#top" },
        { label: "Contact Engineering", href: "mailto:support@arenaos.ai" },
        { label: "Developer Docs", href: "#architecture" },
      ],
    },
  ],
  socials: [
    { label: "Twitter", href: "https://twitter.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};
