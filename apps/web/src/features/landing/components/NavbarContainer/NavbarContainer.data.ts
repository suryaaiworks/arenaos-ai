export interface NavLink {
  label: string;
  href: string;
}

export interface NavAction {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "outline" | "ghost" | "destructive";
}

export interface NavbarData {
  links: NavLink[];
  actions: NavAction[];
}

export const NAVBAR_DATA: NavbarData = {
  links: [
    { label: "Home", href: "#top" },
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "Technology", href: "#technology" },
    { label: "Contact", href: "#contact" },
  ],
  actions: [
    { label: "GitHub", href: "https://github.com", variant: "outline" },
    { label: "Get Started", href: "#contact", variant: "primary" },
  ],
};
