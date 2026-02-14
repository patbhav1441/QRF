import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MissionSection } from "@/components/mission-section";
import { FocusAreasSection } from "@/components/focus-areas-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResourcesSection } from "@/components/resources-section";
import { GetInvolvedSection } from "@/components/get-involved-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <MissionSection />
        <FocusAreasSection />
        <ProjectsSection />
        <ResourcesSection />
        <GetInvolvedSection />
      </main>
      <Footer />
    </div>
  );
}
