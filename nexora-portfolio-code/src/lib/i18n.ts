/*
  NEXORA — Language system
  Design philosophy (Old Money × Modern Tech):
  - Precision typography per locale
  - RTL for Arabic (primary)
  - Keep copy short, persuasive, premium
*/

export type Locale =
  | "ar"
  | "en"
  | "de"
  | "fr"
  | "ru"
  | "es"
  | "it"
  | "zh"
  | "ja"
  | "pt";

export const LOCALES: Array<{ code: Locale; label: string; dir: "rtl" | "ltr" }> = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "ru", label: "Русский", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "it", label: "Italiano", dir: "ltr" },
  { code: "zh", label: "中文", dir: "ltr" },
  { code: "ja", label: "日本語", dir: "ltr" },
  { code: "pt", label: "Português", dir: "ltr" },
];

export const LOCALE_FONTS: Record<Locale, { heading: string; body: string }> = {
  ar: { heading: '"Amiri Quran", "Noto Naskh Arabic", serif', body: '"Noto Naskh Arabic", "Amiri", serif' },
  en: { heading: '"Cormorant Garamond", serif', body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
  de: { heading: '"Cormorant Garamond", serif', body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
  fr: { heading: '"Cormorant Garamond", serif', body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
  ru: { heading: '"Cormorant Garamond", serif', body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
  es: { heading: '"Cormorant Garamond", serif', body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
  it: { heading: '"Cormorant Garamond", serif', body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
  zh: { heading: '"Noto Serif SC", serif', body: '"Noto Sans SC", system-ui, sans-serif' },
  ja: { heading: '"Noto Serif JP", serif', body: '"Noto Sans JP", system-ui, sans-serif' },
  pt: { heading: '"Cormorant Garamond", serif', body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' },
};

type Dictionary = Record<string, string>;

export const DICT: Record<Locale, Dictionary> = {
  ar: {
    nav_work: "الأعمال",
    nav_system: "المنهج",
    nav_proof: "الثقة",
    nav_contact: "ابدأ مشروعك",

    hero_headline_a: "نَبني",
    hero_headline_rotating_1: "علامات",
    hero_headline_rotating_2: "تجارب",
    hero_headline_rotating_3: "أنظمة",
    hero_headline_b: "تبيع.",
    hero_sub: "من الفكرة إلى تجربة رقمية قابلة للتوسع — مصممة للتحويل.",
    hero_cta: "ابدأ مشروعك",

    pain_title: "هل تشعر أن علامتك لا تُترجم إلى مبيعات؟",
    pain_1: "علامة جميلة… لكن التحويل ضعيف؟",
    pain_2: "زيارات كثيرة… بلا نتائج؟",
    pain_3: "موقعك لا يعكس قيمتك الحقيقية؟",

    process_title: "نظامنا — ليس مجرد خدمات",
    step_1: "بحث السوق",
    step_2: "استراتيجية العلامة",
    step_3: "تصميم UI/UX",
    step_4: "تطوير وإطلاق",

    work_title: "أعمال مختارة",
    work_open: "عرض الدراسة",

    modal_problem: "المشكلة",
    modal_solution: "الحل",
    modal_results: "النتائج",

    proof_title: "ثقة قابلة للقياس",
    metric_1_label: "مشروع",
    metric_2_label: "نمو",
    metric_3_label: "رضا",

    diff_quote: "نحن لا نصمم مرئيات. نحن نبني أنظمة تبيع.",

    final_title: "علامتك تستحق الأفضل.",
    final_cta: "لنَبني علامتك",

    footer_note: "© NEXORA — تجربة رقمية فاخرة.",
  },
  en: {
    nav_work: "Work",
    nav_system: "System",
    nav_proof: "Proof",
    nav_contact: "Start a Project",

    hero_headline_a: "We build",
    hero_headline_rotating_1: "Brands",
    hero_headline_rotating_2: "Experiences",
    hero_headline_rotating_3: "Systems",
    hero_headline_b: "that sell.",
    hero_sub: "From idea to a scalable digital experience—engineered to convert.",
    hero_cta: "Start Your Project",

    pain_title: "Looks premium, but doesn’t convert?",
    pain_1: "Beautiful brand… low conversions?",
    pain_2: "Traffic… no sales?",
    pain_3: "Your site doesn’t reflect real value?",

    process_title: "Our system—not just services",
    step_1: "Market Research",
    step_2: "Brand Strategy",
    step_3: "UI/UX Design",
    step_4: "Development & Launch",

    work_title: "Selected work",
    work_open: "View case study",

    modal_problem: "Problem",
    modal_solution: "Solution",
    modal_results: "Results",

    proof_title: "Trust you can measure",
    metric_1_label: "Projects",
    metric_2_label: "Growth",
    metric_3_label: "Satisfaction",

    diff_quote: "We don’t design visuals. We build systems that sell.",

    final_title: "Your brand deserves better.",
    final_cta: "Let’s Build Your Brand",

    footer_note: "© NEXORA — Luxury digital experience.",
  },
  de: {
    nav_work: "Projekte",
    nav_system: "System",
    nav_proof: "Beweise",
    nav_contact: "Projekt starten",

    hero_headline_a: "Wir bauen",
    hero_headline_rotating_1: "Marken",
    hero_headline_rotating_2: "Erlebnisse",
    hero_headline_rotating_3: "Systeme",
    hero_headline_b: "die verkaufen.",
    hero_sub: "Von der Idee zur skalierbaren digitalen Experience — gebaut für Conversion.",
    hero_cta: "Projekt starten",

    pain_title: "Sieht gut aus — aber konvertiert nicht?",
    pain_1: "Starke Optik… schwache Conversion?",
    pain_2: "Traffic… keine Abschlüsse?",
    pain_3: "Website spiegelt Ihren Wert nicht?",

    process_title: "Unser System — nicht nur Services",
    step_1: "Marktrecherche",
    step_2: "Markenstrategie",
    step_3: "UI/UX-Design",
    step_4: "Entwicklung & Launch",

    work_title: "Ausgewählte Arbeiten",
    work_open: "Case Study öffnen",

    modal_problem: "Problem",
    modal_solution: "Lösung",
    modal_results: "Ergebnisse",

    proof_title: "Vertrauen, das messbar ist",
    metric_1_label: "Projekte",
    metric_2_label: "Wachstum",
    metric_3_label: "Zufriedenheit",

    diff_quote: "Wir gestalten nicht nur Design. Wir bauen Systeme, die verkaufen.",

    final_title: "Ihre Marke verdient mehr.",
    final_cta: "Lassen Sie uns bauen",

    footer_note: "© NEXORA — Luxuriöse digitale Experience.",
  },
  fr: {
    nav_work: "Projets",
    nav_system: "Méthode",
    nav_proof: "Preuves",
    nav_contact: "Démarrer",

    hero_headline_a: "Nous créons",
    hero_headline_rotating_1: "des marques",
    hero_headline_rotating_2: "des expériences",
    hero_headline_rotating_3: "des systèmes",
    hero_headline_b: "qui vendent.",
    hero_sub: "De l’idée à une expérience digitale scalable — pensée pour convertir.",
    hero_cta: "Démarrer votre projet",

    pain_title: "Beau… mais ça ne convertit pas ?",
    pain_1: "Belle marque… faibles conversions ?",
    pain_2: "Du trafic… pas de ventes ?",
    pain_3: "Votre site ne reflète pas votre valeur ?",

    process_title: "Notre système — pas juste des services",
    step_1: "Étude de marché",
    step_2: "Stratégie de marque",
    step_3: "Design UI/UX",
    step_4: "Développement & lancement",

    work_title: "Sélection",
    work_open: "Voir le cas",

    modal_problem: "Problème",
    modal_solution: "Solution",
    modal_results: "Résultats",

    proof_title: "La confiance, mesurable",
    metric_1_label: "Projets",
    metric_2_label: "Croissance",
    metric_3_label: "Satisfaction",

    diff_quote: "Nous ne faisons pas que du visuel. Nous construisons des systèmes qui vendent.",

    final_title: "Votre marque mérite mieux.",
    final_cta: "Construisons votre marque",

    footer_note: "© NEXORA — Expérience digitale premium.",
  },
  ru: {
    nav_work: "Проекты",
    nav_system: "Система",
    nav_proof: "Доверие",
    nav_contact: "Начать проект",

    hero_headline_a: "Мы создаём",
    hero_headline_rotating_1: "бренды",
    hero_headline_rotating_2: "опыт",
    hero_headline_rotating_3: "системы",
    hero_headline_b: "которые продают.",
    hero_sub: "От идеи до масштабируемого цифрового опыта — спроектированного под конверсию.",
    hero_cta: "Начать проект",

    pain_title: "Выглядит премиально, но не конвертирует?",
    pain_1: "Красиво… но низкая конверсия?",
    pain_2: "Трафик… без продаж?",
    pain_3: "Сайт не отражает вашу ценность?",

    process_title: "Наша система — не просто услуги",
    step_1: "Исследование рынка",
    step_2: "Стратегия бренда",
    step_3: "UI/UX дизайн",
    step_4: "Разработка и запуск",

    work_title: "Избранные проекты",
    work_open: "Открыть кейс",

    modal_problem: "Проблема",
    modal_solution: "Решение",
    modal_results: "Результаты",

    proof_title: "Доверие, которое видно в цифрах",
    metric_1_label: "Проектов",
    metric_2_label: "Рост",
    metric_3_label: "Удовлетворённость",

    diff_quote: "Мы не делаем просто визуал. Мы строим системы, которые продают.",

    final_title: "Ваш бренд заслуживает большего.",
    final_cta: "Давайте строить",

    footer_note: "© NEXORA — Премиальный digital-опыт.",
  },
  es: {
    nav_work: "Proyectos",
    nav_system: "Sistema",
    nav_proof: "Pruebas",
    nav_contact: "Empezar",

    hero_headline_a: "Construimos",
    hero_headline_rotating_1: "marcas",
    hero_headline_rotating_2: "experiencias",
    hero_headline_rotating_3: "sistemas",
    hero_headline_b: "que venden.",
    hero_sub: "De la idea a una experiencia digital escalable — diseñada para convertir.",
    hero_cta: "Inicia tu proyecto",

    pain_title: "¿Se ve premium, pero no convierte?",
    pain_1: "Bonito… ¿baja conversión?",
    pain_2: "Tráfico… ¿sin ventas?",
    pain_3: "¿Tu web no refleja tu valor?",

    process_title: "Nuestro sistema — no solo servicios",
    step_1: "Investigación de mercado",
    step_2: "Estrategia de marca",
    step_3: "Diseño UI/UX",
    step_4: "Desarrollo y lanzamiento",

    work_title: "Trabajo seleccionado",
    work_open: "Ver caso",

    modal_problem: "Problema",
    modal_solution: "Solución",
    modal_results: "Resultados",

    proof_title: "Confianza medible",
    metric_1_label: "Proyectos",
    metric_2_label: "Crecimiento",
    metric_3_label: "Satisfacción",

    diff_quote: "No diseñamos solo visuales. Construimos sistemas que venden.",

    final_title: "Tu marca merece más.",
    final_cta: "Construyamos tu marca",

    footer_note: "© NEXORA — Experiencia digital premium.",
  },
  it: {
    nav_work: "Progetti",
    nav_system: "Sistema",
    nav_proof: "Prove",
    nav_contact: "Inizia",

    hero_headline_a: "Costruiamo",
    hero_headline_rotating_1: "brand",
    hero_headline_rotating_2: "esperienze",
    hero_headline_rotating_3: "sistemi",
    hero_headline_b: "che vendono.",
    hero_sub: "Dall’idea a un’esperienza digitale scalabile — pensata per convertire.",
    hero_cta: "Inizia il tuo progetto",

    pain_title: "Sembra premium, ma non converte?",
    pain_1: "Bella immagine… poca conversione?",
    pain_2: "Traffico… zero vendite?",
    pain_3: "Il sito non riflette il tuo valore?",

    process_title: "Il nostro sistema — non solo servizi",
    step_1: "Ricerca di mercato",
    step_2: "Strategia di brand",
    step_3: "Design UI/UX",
    step_4: "Sviluppo & lancio",

    work_title: "Selezione",
    work_open: "Apri case study",

    modal_problem: "Problema",
    modal_solution: "Soluzione",
    modal_results: "Risultati",

    proof_title: "Fiducia misurabile",
    metric_1_label: "Progetti",
    metric_2_label: "Crescita",
    metric_3_label: "Soddisfazione",

    diff_quote: "Non progettiamo solo il look. Costruiamo sistemi che vendono.",

    final_title: "Il tuo brand merita di più.",
    final_cta: "Costruiamo il tuo brand",

    footer_note: "© NEXORA — Esperienza digitale premium.",
  },
  zh: {
    nav_work: "作品",
    nav_system: "方法",
    nav_proof: "口碑",
    nav_contact: "开始合作",

    hero_headline_a: "我们打造",
    hero_headline_rotating_1: "品牌",
    hero_headline_rotating_2: "体验",
    hero_headline_rotating_3: "系统",
    hero_headline_b: "并带来转化。",
    hero_sub: "从想法到可扩展的数字体验——以转化为核心。",
    hero_cta: "开始你的项目",

    pain_title: "看起来很高级，但不转化？",
    pain_1: "好看…但转化低？",
    pain_2: "有流量…没成交？",
    pain_3: "网站没体现真实价值？",

    process_title: "我们的系统——不只是服务",
    step_1: "市场研究",
    step_2: "品牌策略",
    step_3: "UI/UX 设计",
    step_4: "开发与上线",

    work_title: "精选项目",
    work_open: "查看案例",

    modal_problem: "问题",
    modal_solution: "解决方案",
    modal_results: "结果",

    proof_title: "可量化的信任",
    metric_1_label: "项目",
    metric_2_label: "增长",
    metric_3_label: "满意度",

    diff_quote: "我们不只做视觉，我们构建会销售的系统。",

    final_title: "你的品牌值得更好。",
    final_cta: "一起打造品牌",

    footer_note: "© NEXORA — 高端数字体验。",
  },
  ja: {
    nav_work: "実績",
    nav_system: "プロセス",
    nav_proof: "信頼",
    nav_contact: "相談する",

    hero_headline_a: "私たちは",
    hero_headline_rotating_1: "ブランド",
    hero_headline_rotating_2: "体験",
    hero_headline_rotating_3: "仕組み",
    hero_headline_b: "を売れる形に。",
    hero_sub: "アイデアからスケーラブルなデジタル体験へ—コンバージョン設計。",
    hero_cta: "プロジェクトを始める",

    pain_title: "高級感はあるのに、成果が出ない？",
    pain_1: "見た目は良い…でもCVが低い？",
    pain_2: "流入はある…でも売れない？",
    pain_3: "サイトが価値を伝えきれていない？",

    process_title: "私たちのシステム—ただのサービスではない",
    step_1: "市場調査",
    step_2: "ブランド戦略",
    step_3: "UI/UXデザイン",
    step_4: "開発・ローンチ",

    work_title: "厳選プロジェクト",
    work_open: "ケースを見る",

    modal_problem: "課題",
    modal_solution: "解決",
    modal_results: "成果",

    proof_title: "数字で示す信頼",
    metric_1_label: "プロジェクト",
    metric_2_label: "成長",
    metric_3_label: "満足度",

    diff_quote: "私たちは見た目だけを作らない。売れる仕組みを作る。",

    final_title: "あなたのブランドは、もっと良くできる。",
    final_cta: "一緒に作りましょう",

    footer_note: "© NEXORA — プレミアムなデジタル体験。",
  },
  pt: {
    nav_work: "Projetos",
    nav_system: "Sistema",
    nav_proof: "Provas",
    nav_contact: "Começar",

    hero_headline_a: "Nós construímos",
    hero_headline_rotating_1: "marcas",
    hero_headline_rotating_2: "experiências",
    hero_headline_rotating_3: "sistemas",
    hero_headline_b: "que vendem.",
    hero_sub: "Da ideia a uma experiência digital escalável — feita para converter.",
    hero_cta: "Começar seu projeto",

    pain_title: "Parece premium, mas não converte?",
    pain_1: "Bonito… conversão baixa?",
    pain_2: "Tráfego… sem vendas?",
    pain_3: "Seu site não reflete seu valor?",

    process_title: "Nosso sistema — não só serviços",
    step_1: "Pesquisa de mercado",
    step_2: "Estratégia de marca",
    step_3: "Design UI/UX",
    step_4: "Desenvolvimento e lançamento",

    work_title: "Trabalhos selecionados",
    work_open: "Ver case",

    modal_problem: "Problema",
    modal_solution: "Solução",
    modal_results: "Resultados",

    proof_title: "Confiança mensurável",
    metric_1_label: "Projetos",
    metric_2_label: "Crescimento",
    metric_3_label: "Satisfação",

    diff_quote: "Não criamos apenas visual. Construímos sistemas que vendem.",

    final_title: "Sua marca merece mais.",
    final_cta: "Vamos construir",

    footer_note: "© NEXORA — Experiência digital premium.",
  },
};

export function getDir(locale: Locale): "rtl" | "ltr" {
  return LOCALES.find((l) => l.code === locale)?.dir ?? "ltr";
}
