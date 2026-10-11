/*
  NEXORA — Top Navigation
  Design philosophy: precise, minimal, gold micro-glow on interaction.
*/

import { Link } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, SunMedium, Sparkles } from "lucide-react";
import { LOCALES, type Locale } from "@/lib/i18n";
import { useI18n } from "@/contexts/I18nContext";
import { cn } from "@/lib/utils";

export default function TopNav({ onCtaClick }: { onCtaClick?: () => void }) {
  const { locale, setLocale, t } = useI18n();
  const { theme, cycleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link
              href="/"
              className={cn(
                "group inline-flex items-center gap-3",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-xl px-2 py-1"
              )}
            >
              <div className="h-9 w-9 rounded-xl bg-[color:var(--lux-gold)]/10 ring-1 ring-[color:var(--lux-gold)]/25 grid place-items-center">
                <span className="font-heading text-lg" style={{ color: "var(--lux-gold)" }}>
                  N
                </span>
              </div>
              <div className="leading-tight">
                <div className="font-heading text-lg tracking-wide">NEXORA</div>
                <div className="text-xs text-muted-foreground">Luxury digital agency</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/work" className="text-foreground/80 hover:text-foreground transition-colors">
                {t("nav_work")}
              </Link>
              <Link href="/system" className="text-foreground/80 hover:text-foreground transition-colors">
                {t("nav_system")}
              </Link>
              <Link href="/proof" className="text-foreground/80 hover:text-foreground transition-colors">
                {t("nav_proof")}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={cycleTheme}
                className="h-9 w-9 rounded-xl border border-border/40 bg-background/40"
                aria-label="Theme"
                title={theme}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : theme === "hybrid" ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  <SunMedium className="h-4 w-4" />
                )}
              </Button>

              <div className="hidden sm:block">
                <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
                  <SelectTrigger className="h-9 w-[150px] bg-background/40 border-border/40">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-xl">
                    {LOCALES.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={onCtaClick}
                className="h-9 rounded-xl bg-[color:var(--lux-gold)] text-black hover:bg-[color:var(--lux-gold-2)]"
              >
                {t("nav_contact")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
