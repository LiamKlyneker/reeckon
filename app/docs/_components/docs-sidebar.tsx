"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsNav } from "@/app/docs/_lib/docs-nav";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0">
      <div className="sticky top-8 space-y-6">
        {docsNav.map((section) => (
          <div key={section.title}>
            <h4 className="text-foreground mb-2 text-sm font-semibold">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-1.5 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
