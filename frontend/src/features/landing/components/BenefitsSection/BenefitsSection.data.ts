export interface BenefitItem {
  id: string;
  target: string;
  title: string;
  description: string;
}

export interface BenefitsData {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: BenefitItem[];
}

export const BENEFITS_DATA: BenefitsData = {
  tag: "Platform Benefits",
  title: "Value Proposition",
  subtitle: "Elevating the Stadium Experience for Everyone",
  description:
    "By connecting real-time telemetry with AI agents, ArenaOS AI drives improvements across all operational workflows.",
  benefits: [
    {
      id: "benefit-fans",
      target: "Fans",
      title: "Zero Queue Frustrations",
      description: "Adaptive paths guide fans to the shortest concession lines and open gates.",
    },
    {
      id: "benefit-ops",
      target: "Operators",
      title: "Streamlined Operations",
      description:
        "Real-time vendor tracking and staff coordination decrease resource bottlenecks.",
    },
    {
      id: "benefit-security",
      target: "Security",
      title: "Rapid Incident Response",
      description:
        "Immediate hazard alert dispatch loops optimize security first-responder routing.",
    },
    {
      id: "benefit-volunteers",
      target: "Staff",
      title: "Coordinated Field Guides",
      description:
        "Event volunteers receive clear instructions, placing help density where crowds bottleneck.",
    },
  ],
};
