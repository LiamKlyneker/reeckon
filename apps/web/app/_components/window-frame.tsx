import { cn } from "@/lib/utils";

type WindowFrameProps = {
  variant?: "browser" | "terminal";
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export default function WindowFrame({
  variant = "browser",
  title,
  className,
  children,
}: WindowFrameProps) {
  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-xl border",
        variant === "terminal" && "bg-[#0d0d10]",
        variant === "browser" && "bg-background",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 px-4 py-3",
          variant === "terminal"
            ? "border-b border-[#1e1e24]"
            : "border-border border-b"
        )}
      >
        <span className="bg-muted-foreground/30 block size-2.5 rounded-full" />
        <span className="bg-muted-foreground/30 block size-2.5 rounded-full" />
        <span className="bg-muted-foreground/30 block size-2.5 rounded-full" />
        {title && (
          <span
            className={cn(
              "ml-2.5 font-mono text-[11px]",
              variant === "terminal"
                ? "text-[#6a6a72]"
                : "text-muted-foreground"
            )}
          >
            {title}
          </span>
        )}
      </div>
      <div className={cn(variant === "terminal" && "text-[#e8e8e8]")}>
        {children}
      </div>
    </div>
  );
}
