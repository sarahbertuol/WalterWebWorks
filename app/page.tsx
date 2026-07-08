import Hero from "@/components/home/Hero";
import WhoSection from "@/components/home/WhoSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import DiffSection from "@/components/home/DiffSection";
import TeamSection from "@/components/home/TeamSection";
import FullWidthCTA from "@/components/home/FullWidthCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoSection />
      <ServicesGrid />
      <DiffSection />
      <TeamSection />
      <FullWidthCTA />
    </>
  );
}
