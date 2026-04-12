import Hero from "./_components/hero";
import MainFeatures from "./_components/main-features";

export default function Page() {
  return (
    <main>
      <Hero />
      <div className="h-2 bg-black" />
      <MainFeatures />
    </main>
  );
}
