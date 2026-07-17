import React from "react";
import { GradientBackground, NoiseTexture, PageTransition } from "@/components/shared";
import {
  AnnouncementBanner,
  NavbarContainer,
  HeroSection,
  TrustedTechSection,
  ProblemSection,
  SolutionSection,
  AgentPreviewSection,
  FeaturesSection,
  ArchitectureSection,
  BenefitsSection,
  TechStackSection,
  CtaSection,
  FooterContainer,
} from "@/features/landing/components";

/**
 * Root Landing Page for ArenaOS AI (Sprint 1.3).
 * Renders as a pure React Server Component (no client-side logic on page wrapper),
 * composting our 13 modular data-driven landing sections.
 */
export default function Home() {
  return (
    <GradientBackground>
      {/* Subtle OS-style static grain overlay */}
      <NoiseTexture opacity={0.015} />

      {/* Dynamic fade route page transition */}
      <PageTransition preset="fade">
        {/* Navigation block */}
        <div className="flex flex-col w-full z-50">
          <AnnouncementBanner />
          <NavbarContainer />
        </div>

        {/* Vertical stacking layout sections */}
        <div className="flex flex-col flex-grow w-full relative z-10">
          <HeroSection />
          <TrustedTechSection />
          <ProblemSection />
          <SolutionSection />
          <AgentPreviewSection />
          <FeaturesSection />
          <ArchitectureSection />
          <BenefitsSection />
          <TechStackSection />
          <CtaSection />
        </div>

        {/* Footer block */}
        <FooterContainer />
      </PageTransition>
    </GradientBackground>
  );
}
