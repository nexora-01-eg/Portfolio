import p1 from "@/assets/image_w928_h1152_project-01-brand-system.jpeg";
import p2 from "@/assets/image_w928_h1152_project-02-ecommerce.jpeg";
import p3 from "@/assets/image_w928_h1152_project-03-saas.jpeg";
import p4 from "@/assets/image_w928_h1152_project-04-rebrand.jpeg";

export type Project = {
  id: string;
  title: string;
  type: string;
  image: string;
  problem: string;
  solution: string;
  results: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "aurum",
    title: "Aurum — نظام علامة فاخرة",
    type: "Brand System",
    image: p4,
    problem: "هوية أنيقة بلا وضوح في الرسالة ولا مسار تحويل.",
    solution: "إعادة تموضع + نظام بصري + صفحات هبوط قصيرة عالية التأثير.",
    results: ["+32% معدل تحويل", "+18% متوسط قيمة الطلب", "زمن إطلاق أسرع بـ 2×"],
  },
  {
    id: "noir",
    title: "Noir Commerce — تجربة متجر",
    type: "E-commerce",
    image: p2,
    problem: "زيارات قوية لكن سلة مهجورة وتجربة دفع معقدة.",
    solution: "تبسيط مسار الشراء + تحسين الأداء + تصميم صفحات منتج سينمائي.",
    results: ["-21% معدل التخلي", "+40% نمو شهري", "Core Web Vitals أخضر"],
  },
  {
    id: "atlas",
    title: "Atlas SaaS — واجهة تحويل",
    type: "SaaS",
    image: p3,
    problem: "منتج قوي لكن العرض غير مفهوم لغير التقنيين.",
    solution: "سرد بصري + تقسيم الرسالة + نظام تدرّج ثقة (Proof layers).",
    results: ["+28% طلبات ديمو", "+14% احتفاظ", "زيادة وقت التصفح"],
  },
  {
    id: "nex",
    title: "NEX Studio — لوحة منتجات",
    type: "Product UI",
    image: p1,
    problem: "مظهر جميل لكن بدون إيقاع بصري أو هرمية واضحة.",
    solution: "نظام Typography + وحدات UI زجاجية + حالات تفاعلية دقيقة.",
    results: ["تحسن وضوح القراءة", "تقليل أخطاء الاستخدام", "واجهة أسرع إحساساً"],
  },
];
