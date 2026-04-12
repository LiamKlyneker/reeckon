import Hero from "./_components/hero";
import MainFeatures from "./_components/main-features";
import SupportedTools from "./_components/supported-tools";
import HowItWorks from "./_components/how-it-works";
import Cta from "./_components/cta";
import { JsonLd } from "./_components/json-ld";

export default function Page() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Reeckon",
          url: "https://reeckon.io",
          description:
            "Define reusable AI skills as Markdown files. Preview with a local dashboard, deploy a static viewer, and install across Claude Code, Cursor, Codex, and 12+ tools.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Reeckon",
          url: "https://reeckon.io",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Cross-platform",
          description:
            "Build, preview, and share AI Skills across your team and every coding tool.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
      <Hero />
      <div className="h-1.5 bg-black" />
      <MainFeatures />
      <SupportedTools />
      <HowItWorks />
      <Cta />
    </main>
  );
}
