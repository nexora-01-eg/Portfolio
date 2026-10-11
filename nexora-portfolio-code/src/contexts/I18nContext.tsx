/*
  NEXORA — i18n provider
  - Sets <html lang/dir/data-locale>
  - Persists locale in localStorage
*/

import * as React from "react";
import { DICT, getDir, LOCALE_FONTS, LOCALES, type Locale } from "@/lib/i18n";

interface I18nContextType {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  fonts: { heading: string; body: string };
}

const I18nContext = React.createContext<I18nContextType | undefined>(undefined);

function safeLocale(input: string | null | undefined): Locale | null {
  if (!input) return null;
  const found = LOCALES.find((l) => l.code === input);
  return (found?.code as Locale) ?? null;
}

export function I18nProvider({ children, defaultLocale = "ar" }: { children: React.ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocaleState] = React.useState<Locale>(() => {
    const fromStorage = safeLocale(localStorage.getItem("nexora_locale"));
    return fromStorage ?? defaultLocale;
  });

  const dir = getDir(locale);
  const fonts = LOCALE_FONTS[locale];

  React.useEffect(() => {
    localStorage.setItem("nexora_locale", locale);

    const html = document.documentElement;
    html.setAttribute("lang", locale);
    html.setAttribute("dir", dir);
    html.setAttribute("data-locale", locale);

    // CSS variables to avoid rerendering style-heavy components
    html.style.setProperty("--font-heading", fonts.heading);
    html.style.setProperty("--font-body", fonts.body);
  }, [dir, fonts.body, fonts.heading, locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const t = React.useCallback(
    (key: string) => {
      const dict = DICT[locale];
      return dict?.[key] ?? DICT.en[key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, dir, setLocale, t, fonts }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
