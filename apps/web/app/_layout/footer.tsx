import Container from "@/components/container";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-black text-white">
      <Container className="mb-20 py-32">
        <ul className="grid place-content-end gap-2">
          <li className="text-right">
            <Link href="/docs">docs</Link>
          </li>
          <li className="text-right">
            <Link href="/about-the-project">about the project</Link>
          </li>
          <li className="text-right">
            <Link href="/buy-me-a-coffee">buy me a coffee</Link>
          </li>
        </ul>
      </Container>
      <div className="relative flex flex-col lg:flex-row lg:items-end">
        <span className="relative bottom-[-12px] left-[-16px] order-2 text-[22vw] leading-none font-medium text-white/10 lg:bottom-[-20px] lg:-order-1 lg:text-[12vw] xl:bottom-[-40px] 2xl:bottom-[-60px]">
          reeckon
        </span>
        <p className="relative text-sm text-white/50 lg:pb-2.5">
          designed and coded by @liamklyneker with a lot of{" "}
          <Heart size="12" className="inline" /> in some part of planet earth
          <span className="bg-primary absolute bottom-0 left-0 z-50 h-[2px] w-full lg:h-3" />
        </p>
        <div className="bg-primary absolute right-0 bottom-0 z-50 h-[2px] w-[100vw] lg:h-3 lg:w-[calc(25vw)]" />
      </div>
    </footer>
  );
}
