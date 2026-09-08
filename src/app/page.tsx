import Hero from "@/components/Hero";
import CategoryShowcase from "@/components/CategoryShowcase";
import StorySection from "@/components/StorySection";
import Benefits from "@/components/Benefits";
import TrackOrderSection from "@/components/TrackOrderSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <StorySection />
      <Benefits />
      <TrackOrderSection />
    </>
  );
}
