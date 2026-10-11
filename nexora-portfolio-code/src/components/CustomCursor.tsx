/*
  NEXORA — Custom Cursor (desktop only)
  - Minimal gold circle
  - Expands with glow on hover
  - Shows "VIEW" on elements with data-cursor="view"
*/

import { useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "view" | "cta">("default");
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const supportsHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(hover: hover)")?.matches ?? true;
  }, []);

  useEffect(() => {
    if (isMobile || !supportsHover) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const el = document.getElementById("nexora-cursor");
        if (!el) return;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      });
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const cursor = t.closest<HTMLElement>("[data-cursor]");
      const kind = cursor?.dataset.cursor;
      if (kind === "view") return setVariant("view");
      if (kind === "cta") return setVariant("cta");
      if (t.closest("a,button,[role='button']")) return setVariant("hover");
      setVariant("default");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isMobile, supportsHover]);

  if (!enabled) return null;

  return (
    <div
      id="nexora-cursor"
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2",
        "transition-[width,height,box-shadow,background,opacity] duration-200",
        variant === "default" && "h-3 w-3 rounded-full bg-[color:var(--lux-gold)]/70",
        variant === "hover" &&
          "h-8 w-8 rounded-full bg-[color:var(--lux-gold)]/20 ring-1 ring-[color:var(--lux-gold)]/50 shadow-[0_0_30px_rgba(166,130,74,0.35)]",
        variant === "cta" &&
          "h-10 w-10 rounded-full bg-[color:var(--lux-gold)]/20 ring-1 ring-[color:var(--lux-gold)]/65 shadow-[0_0_44px_rgba(166,130,74,0.45)]",
        variant === "view" &&
          "h-12 w-12 rounded-full bg-[color:var(--lux-gold)]/20 ring-1 ring-[color:var(--lux-gold)]/65 shadow-[0_0_54px_rgba(166,130,74,0.55)]"
      )}
    >
      {variant === "view" && (
        <div className="absolute inset-0 grid place-items-center text-[10px] tracking-[0.28em] text-[color:var(--lux-cream)] font-semibold">
          VIEW
        </div>
      )}
    </div>
  );
}
