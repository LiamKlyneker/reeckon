import Hero from "./_components/hero";
import MainFeatures from "./_components/main-features";
import SupportedTools from "./_components/supported-tools";
import HowItWorks from "./_components/how-it-works";
import Cta from "./_components/cta";

export default function Page() {
  return (
    <main>
      <Hero />
      <div className="h-1.5 bg-black" />
      <MainFeatures />
      <SupportedTools />
      <HowItWorks />
      <Cta />
    </main>
  );
}
