import { cn } from "@/lib/utils";

type WindowFrameProps = {
  variant?: "browser" | "terminal";
  className?: string;
  children: React.ReactNode;
};

export default function WindowFrame({
  variant = "browser",
  className,
  children,
}: WindowFrameProps) {
  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-xl border",
        variant === "terminal" && "bg-[#1a1a1a]",
        variant === "browser" && "bg-background",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 px-4 py-3",
          variant === "terminal"
            ? "border-b border-[#333]"
            : "border-border border-b"
        )}
      >
        <span className="bg-muted-foreground/30 block size-2.5 rounded-full" />
        <span className="bg-muted-foreground/30 block size-2.5 rounded-full" />
        <span className="bg-muted-foreground/30 block size-2.5 rounded-full" />
      </div>
      <div className={cn(variant === "terminal" && "text-[#e0e0e0]")}>
        {children}
      </div>
    </div>
  );
}
