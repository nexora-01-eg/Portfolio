/*
  NEXORA — Home (single-page)
  Design Movement: Neo-Lux Minimalism (Old Money × Modern Tech)
  Core principles:
  1) Dark atmosphere + gold precision highlights
  2) Editorial typography (serif headings) + clean rhythm
  3) Cinematic motion: staggered reveals, scroll-triggered transitions
  4) Conversion-first narrative: Pain → System → Proof → CTA
*/

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import heroBg from "@/assets/hero-cinematic-orb.jpeg";
import TopNav from "@/components/TopNav";
import CustomCursor from "@/components/CustomCursor";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PROJECTS, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface HomeProps {
  targetSection?: string;
}

function useRotatingWords(words: string[], ms = 2000) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((p) => (p + 1) % words.length), ms);
    return () => window.clearInterval(id);
  }, [ms, words.length]);
  return words[i];
}

function Metric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });

  return (
    <div ref={ref} className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-6">
      <div className="font-heading text-3xl md:text-4xl tracking-tight" style={{ color: "var(--lux-cream)" }}>
        <motion.span initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          {value}
        </motion.span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const { t, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);

  const rotating = useRotatingWords(
    [t("hero_headline_rotating_1"), t("hero_headline_rotating_2"), t("hero_headline_rotating_3")],
    2100
  );

  // Scroll to target section when URL changes (e.g., /#/work → #work)
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetSection]);

  const openProject = (p: Project) => {
    setActive(p);
    setOpen(true);
  };

  const painCards = useMemo(
    () => [
      { text: t("pain_1") },
      { text: t("pain_2") },
      { text: t("pain_3") },
    ],
    [t]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <TopNav onCtaClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />

      {/* HERO */}
      <main id="top" className="relative">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.95)",
            }}
          />

          {/* Gold grid + grain */}
          <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(1200px 600px at 50% 40%, rgba(166,130,74,0.18), transparent 60%), linear-gradient(to bottom, rgba(7,15,5,0.35), rgba(7,15,5,0.9))" }} />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(166,130,74,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(166,130,74,0.12) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(60% 50% at 50% 40%, black 50%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"180\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"180\" height=\"180\" filter=\"url(%23n)\" opacity=\"0.6\"/%3E%3C/svg%3E')" }} />

          <div className="relative mx-auto max-w-6xl px-4 pt-32 md:pt-40 pb-20">
            <div className="max-w-3xl">
              <Reveal>
                <h1 className={cn("font-heading text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance", dir === "rtl" ? "text-right" : "text-left")}
                >
                  <span className="text-foreground/90">{t("hero_headline_a")} </span>
                  <span className="relative inline-block">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={rotating}
                        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[color:var(--lux-cream)]"
                      >
                        {rotating}
                      </motion.span>
                    </AnimatePresence>
                    <span
                      className="absolute -bottom-2 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(166,130,74,0.75), transparent)" }}
                    />
                  </span>{" "}
                  <span className="text-foreground/90">{t("hero_headline_b")}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className={cn("mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed", dir === "rtl" ? "text-right" : "text-left")}>
                  {t("hero_sub")}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className={cn("mt-10 flex items-center gap-3", dir === "rtl" ? "justify-end" : "justify-start")}>
                  <Button
                    data-cursor="cta"
                    className="h-11 rounded-xl bg-[color:var(--lux-gold)] text-black hover:bg-[color:var(--lux-gold-2)] relative overflow-hidden"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span className="relative z-10">{t("hero_cta")}</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                      style={{
                        background:
                          "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.35) 45%, transparent 70%)",
                        transform: "translateX(-30%)",
                        animation: "nexora-shimmer 2.4s infinite",
                      }}
                    />
                  </Button>

                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {t("nav_work")}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PAIN */}
        <section id="pain" className="relative py-20 md:py-28">
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(93,30,33,0.18), transparent 70%)" }} />
          <div className="relative mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className={cn("font-heading text-3xl md:text-4xl tracking-tight", dir === "rtl" ? "text-right" : "text-left")}>
                {t("pain_title")}
              </h2>
            </Reveal>

            <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
              {painCards.map((c, idx) => (
                <StaggerItem key={idx}>
                  <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-6">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "radial-gradient(600px 220px at 50% 0%, rgba(166,130,74,0.22), transparent 60%)" }}
                    />
                    <div className={cn("relative font-heading text-xl leading-snug", dir === "rtl" ? "text-right" : "text-left")}>
                      {c.text}
                    </div>
                    <div className={cn("mt-3 text-sm text-muted-foreground", dir === "rtl" ? "text-right" : "text-left")}>
                      {dir === "rtl"
                      ? idx === 0
                        ? "التحويل نظام، لا حظ."
                        : idx === 1
                          ? "الزيارات بدون نية… ضجيج."
                          : "الانطباع يجب أن يطابق القيمة."
                      : idx === 0
                        ? "Conversion is a system."
                        : idx === 1
                          ? "Traffic without intent is noise."
                          : "Perception must match value."}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* SYSTEM / PROCESS */}
        <section id="system" className="relative py-20 md:py-28">
          <div className="relative mx-auto max-w-6xl px-4">
            <Reveal>
              <div className={cn("flex items-end justify-between gap-6", dir === "rtl" ? "flex-row-reverse" : "")}
              >
                <h2 className="font-heading text-3xl md:text-4xl tracking-tight">{t("process_title")}</h2>
                <div className="text-sm text-muted-foreground max-w-md">
                  Research → Strategy → Design → Launch. One narrative.
                </div>
              </div>
            </Reveal>

            <div className="mt-12 relative">
              <div
                aria-hidden
                className="absolute left-1/2 top-0 hidden md:block h-full w-px -translate-x-1/2"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(166,130,74,0.55), transparent)" }}
              />

              <div className="grid gap-6">
                {[t("step_1"), t("step_2"), t("step_3"), t("step_4")].map((step, idx) => (
                  <Reveal key={step} delay={idx * 0.08}>
                    <div className={cn("grid items-stretch gap-4 md:grid-cols-2", idx % 2 === 0 ? "" : "md:[&>div:first-child]:order-2")}
                    >
                      <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="font-heading text-xl">{step}</div>
                          <div className="font-heading text-3xl opacity-30">0{idx + 1}</div>
                        </div>
                        <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {idx === 0
                            ? "نعرف السوق قبل أن نرسم أي بكسل."
                            : idx === 1
                              ? "نحوّل القيمة إلى رسالة قابلة للبيع."
                              : idx === 2
                                ? "نصمم إيقاعاً بصرياً يقود القرار."
                                : "نطلق بسرعة، ونقيس، ونحسن."}
                        </div>
                      </div>
                      <div className="hidden md:block" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WORK / PORTFOLIO */}
        <section id="work" className="relative py-20 md:py-28">
          <div className="relative mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl tracking-tight">{t("work_title")}</h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[12rem]">
              {PROJECTS.map((p, idx) => (
                <Reveal key={p.id} delay={idx * 0.06}>
                  <button
                    data-cursor="view"
                    onClick={() => openProject(p)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 text-left",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                      idx === 0 ? "lg:row-span-2" : idx === 1 ? "lg:col-span-2" : ""
                    )}
                  >
                    <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover scale-[1.03] group-hover:scale-[1.08] transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,15,5,0.92), rgba(7,15,5,0.18) 55%, transparent)" }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(700px 240px at 50% 15%, rgba(166,130,74,0.25), transparent 60%)" }} />

                    <div className="relative h-full p-5 flex flex-col justify-end">
                      <div className="text-xs tracking-[0.28em] uppercase text-foreground/70">{p.type}</div>
                      <div className="mt-2 font-heading text-xl text-foreground">{p.title}</div>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm text-[color:var(--lux-gold-2)]">
                        <span>{t("work_open")}</span>
                        <span className="h-px w-10" style={{ background: "linear-gradient(90deg, rgba(207,157,123,1), transparent)" }} />
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section id="proof" className="relative py-20 md:py-28">
          <div className="relative mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl tracking-tight">{t("proof_title")}</h2>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Metric value="+120" label={t("metric_1_label")} />
              <Metric value="+40%" label={t("metric_2_label")} />
              <Metric value="+98%" label={t("metric_3_label")} />
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-border/50 bg-card/40">
                <div className="py-5">
                  <div className="flex gap-10 whitespace-nowrap will-change-transform" style={{ animation: "nexora-marquee 18s linear infinite" }}>
                    {["“Cinematic. Fast. Strategic.”", "“The first agency that felt like a partner.”", "“Conversion improved in weeks.”", "“Luxury without noise.”", "“Systems, not just visuals.”"].map((q, i) => (
                      <div key={i} className="px-10 text-sm text-foreground/80">
                        {q}
                      </div>
                    ))}
                    {["“Cinematic. Fast. Strategic.”", "“The first agency that felt like a partner.”", "“Conversion improved in weeks.”", "“Luxury without noise.”", "“Systems, not just visuals.”"].map((q, i) => (
                      <div key={`d${i}`} className="px-10 text-sm text-foreground/80">
                        {q}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* DIFFERENTIATION */}
        <section id="different" className="relative py-20 md:py-28 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "radial-gradient(900px 260px at 50% 0%, rgba(166,130,74,0.22), transparent 60%)",
            }}
          />
          <div className="absolute inset-0">
            <div
              className="absolute -top-20 left-1/2 w-[1400px] -translate-x-1/2 text-center font-heading text-[120px] md:text-[180px] leading-none opacity-[0.06] select-none"
              style={{
                color: "var(--lux-cream)",
                transform: "translateX(-50%) translateY(var(--nexora-parallax, 0px))",
              }}
            >
              NEXORA NEXORA NEXORA
            </div>
          </div>

          <ParallaxDriver />

          <div className="relative mx-auto max-w-6xl px-4">
            <Reveal>
              <div className={cn("max-w-4xl", dir === "rtl" ? "ml-auto" : "mr-auto")}>
                <p className={cn("font-heading text-4xl md:text-6xl tracking-tight text-balance", dir === "rtl" ? "text-right" : "text-left")}>
                  {t("diff_quote")}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className="relative py-20 md:py-28">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 360px at 50% 15%, rgba(166,130,74,0.22), transparent 60%), linear-gradient(to bottom, rgba(7,15,5,0.2), rgba(7,15,5,0.92))",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4">
            <Reveal>
              <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-8 md:p-12 overflow-hidden">
                <div className={cn("max-w-3xl", dir === "rtl" ? "ml-auto" : "mr-auto")}>
                  <h2 className={cn("font-heading text-4xl md:text-5xl tracking-tight", dir === "rtl" ? "text-right" : "text-left")}>
                    {t("final_title")}
                  </h2>
                  <p className={cn("mt-4 text-muted-foreground leading-relaxed", dir === "rtl" ? "text-right" : "text-left")}>
                    {dir === "rtl"
                      ? "احجز مكالمة قصيرة — بدون كلام زائد. نحدد الرسالة، المسار، والـ KPI ثم نطلق." 
                      : "Book a short call—no fluff. We align message, funnel, and KPIs, then launch."}
                  </p>

                  <div className={cn("mt-8 flex flex-wrap items-center gap-3", dir === "rtl" ? "justify-end" : "justify-start")}>
                    <Button
                      data-cursor="cta"
                      className="h-11 rounded-xl bg-[color:var(--lux-gold)] text-black hover:bg-[color:var(--lux-gold-2)]"
                      onClick={() => {
                        // lightweight demo CTA
                        const subject = encodeURIComponent("NEXORA Project Inquiry");
                        const body = encodeURIComponent("Hi NEXORA,\n\nI want to start a project.\n\nBudget: ____\nTimeline: ____\nWebsite / Brand / Both: ____\n\nThanks");
                        window.location.href = `mailto:mohamedsadekx007@gmail.com?subject=${subject}&body=${body}`;
                      }}
                    >
                      {t("final_cta")}
                    </Button>
                    <div className="text-sm text-foreground/70">mohamedsadekx007@gmail.com</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <footer className="mt-10 pb-10 text-xs text-muted-foreground">{t("footer_note")}</footer>
          </div>
        </section>
      </main>

      {/* CASE STUDY MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-popover/95 backdrop-blur-xl border-border/50">
          {active && (
            <div>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{active.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 grid gap-5">
                <img src={active.image} alt={active.title} loading="lazy" className="w-full h-64 md:h-80 object-cover rounded-2xl border border-border/50" />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
                    <div className="text-xs tracking-[0.22em] uppercase text-foreground/70">{t("modal_problem")}</div>
                    <div className="mt-2 text-sm text-foreground/90 leading-relaxed">{active.problem}</div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
                    <div className="text-xs tracking-[0.22em] uppercase text-foreground/70">{t("modal_solution")}</div>
                    <div className="mt-2 text-sm text-foreground/90 leading-relaxed">{active.solution}</div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
                    <div className="text-xs tracking-[0.22em] uppercase text-foreground/70">{t("modal_results")}</div>
                    <ul className="mt-2 text-sm text-foreground/90 leading-relaxed space-y-1">
                      {active.results.map((r) => (
                        <li key={r} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--lux-gold)]" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ParallaxDriver() {
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        // move watermark opposite scroll (subtle)
        document.documentElement.style.setProperty("--nexora-parallax", `${Math.max(-140, -y * 0.06)}px`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
