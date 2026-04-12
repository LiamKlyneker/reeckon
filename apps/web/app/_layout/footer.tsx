import Container from "@/components/container";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-black text-white">
      <Container className="mb-20 pt-20 pb-32">
        <ul>
          <li>
            <a href="#">the why</a>
          </li>
          <li>
            <a href="#">docs</a>
          </li>
          <li>
            <a href="#">buy me a coffee</a>
          </li>
        </ul>
      </Container>
      <div className="relative flex flex-col lg:flex-row lg:items-end">
        <span className="relative bottom-[-12px] left-[-16px] order-2 text-[22vw] leading-none font-medium text-white/10 lg:bottom-[-20px] lg:-order-1 lg:text-[12vw] xl:bottom-[-40px] 2xl:bottom-[-60px]">
          reeckon
        </span>
        <p className="relative text-sm text-white/50 lg:pb-4">
          designed and coded by @liamklyneker with a lot of{" "}
          <Heart size="12" className="inline" /> in some part of planet earth
          <div className="bg-primary absolute bottom-0 left-0 z-50 h-[2px] w-full lg:bottom-3" />
        </p>
        <div className="bg-primary absolute right-0 bottom-0 z-50 h-[2px] w-[100vw] lg:bottom-3 lg:w-[calc(25vw)]" />
      </div>
    </footer>
  );
}
