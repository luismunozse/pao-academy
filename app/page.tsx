'use client';
import React, { useMemo, useState, useEffect } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  TrendingUp,
  Megaphone,
  Sparkles,
  Users,
  BarChart4,
  Database,
  Brain,
  PlayCircle,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Quote,
  X,
  Search,
  Filter,
  MessageCircle,
  Globe,
  Palette,
  Menu,
} from "lucide-react";

// ==========================================
//  Landing optimizada (UX/UI + multiidioma + temas + performance)
//  - Paleta y layout inspirados en Euroinnova (hero magenta/rojo + UI clara)
//  - Multiidioma ES/EN 100%
//  - Accesibilidad + prefers-reduced-motion
//  - Sin precios, CTA "Saber más" / "Tell me more"
//  - Listo para Next.js (este componente puede ser /app/page.tsx)
// ==========================================

const THEMES = ["euro", "aurora", "saffron", "sapphire", "coral", "emerald", "amethyst"] as const;
type Theme = typeof THEMES[number];

type Lang = "es" | "en";
const copy: Record<Lang, Record<string, string>> = {
  es: {
    brandTagline: "Formación práctica para líderes y equipos",
    heroDesc:
      "combina experiencia real en negocios y datos para acelerar resultados en ventas, marca personal, motivación, liderazgo y analítica.",
    knowMore: "Quiero saber más",
    viewCatalog: "Ver catálogo",
    bullet1: "Mentores con experiencia real",
    bullet2: "Proyectos y playbooks aplicables",
    bullet3: "En vivo + on‑demand",
    sectionPrograms: "Programas que transforman equipos y carreras",
    sectionProgramsDesc:
      "Formación práctica, mentores expertos y proyectos reales. Sin teorías vacías.",
    filterLabel: "Filtrar:",
    searchPlaceholder: "Buscar cursos (ej.: liderazgo, Power BI)",
    featured: "Cursos destacados",
    featuredDesc:
      "Sin precios — pedí el programa que mejor se adapte a tus objetivos.",
    nextCohort: "Próx. cohorte",
    learningPaths: "Rutas de aprendizaje (Formación continua)",
    learningPathsDesc:
      "Diseñadas para avanzar por etapas y asegurar adopción real en el día a día.",
    wantThisPath: "Quiero esta ruta",
    whatTheySay: "Lo que dicen nuestros alumnos",
    companiesTrust: "Empresas que confían",
    satisfaction: "Satisfacción",
    students: "Alumnos",
    companies: "Empresas",
    faq: "Preguntas frecuentes",
    q1: "¿Las clases son en vivo o grabadas?",
    a1: "Trabajamos con modalidad mixta: encuentros en vivo + contenido on‑demand para reforzar y practicar.",
    q2: "¿Entregan certificación?",
    a2: "Sí, al completar los requisitos de cada programa emitimos un certificado digital verificable.",
    q3: "¿Ofrecen planes para empresas?",
    a3: "Sí, armamos cohortes in‑company con objetivos y contenidos personalizados por área.",
    contactTitle: "Conversemos tu objetivo",
    contactDesc:
      "Contanos qué querés lograr y te proponemos el programa ideal para vos o tu equipo.",
    name: "Nombre",
    email: "Email",
    interest: "Interés",
    interestPH: "Ej.: Ventas Consultivas, Ruta Power BI, etc.",
    message: "Mensaje",
    messagePH: "Contanos tu contexto",
    writeOnWhatsApp: "Escribir por WhatsApp",
    callMe: "Quiero que me llamen",
    speak: "¡Hablemos!",
    contactLead:
      "Dejanos tus datos y te contactamos con más info sobre",
    notFound: "No encontramos cursos para esa búsqueda. Probá con otro término o quitá el filtro.",
    catalog: "Catálogo",
    paths: "Rutas",
    contact: "Contacto",
    langLabel: "Idioma",
    themeLabel: "Tema",
    skip: "Saltar al contenido",
    openMenu: "Abrir menú",
    close: "Cerrar",
    rights: "Todos los derechos reservados.",
    all: "Todos",
    learnMoreAbout: "Saber más sobre",
  },
  en: {
    brandTagline: "Hands‑on training for leaders and teams",
    heroDesc:
      "combines real‑world experience in business and data to accelerate results in sales, personal brand, motivation, leadership and analytics.",
    knowMore: "Tell me more",
    viewCatalog: "View catalog",
    bullet1: "Mentors with real experience",
    bullet2: "Projects & actionable playbooks",
    bullet3: "Live + on‑demand",
    sectionPrograms: "Programs that transform teams and careers",
    sectionProgramsDesc:
      "Practical training, expert mentors and real projects. No fluff.",
    filterLabel: "Filter:",
    searchPlaceholder: "Search courses (e.g., leadership, Power BI)",
    featured: "Featured courses",
    featuredDesc:
      "No prices — request the program that fits your goals.",
    nextCohort: "Next cohort",
    learningPaths: "Learning paths (Continuous training)",
    learningPathsDesc:
      "Designed to progress by stages and ensure real adoption in day‑to‑day work.",
    wantThisPath: "I want this path",
    whatTheySay: "What our students say",
    companiesTrust: "Trusted by companies",
    satisfaction: "Satisfaction",
    students: "Students",
    companies: "Companies",
    faq: "FAQ",
    q1: "Are classes live or recorded?",
    a1: "We use a mixed format: live sessions + on‑demand content to reinforce and practice.",
    q2: "Do you provide certification?",
    a2: "Yes, upon completing the program requirements we issue a verifiable digital certificate.",
    q3: "Do you offer plans for companies?",
    a3: "Yes, we run in‑company cohorts with objectives and content tailored to each area.",
    contactTitle: "Let’s talk about your goal",
    contactDesc:
      "Tell us what you want to achieve and we’ll propose the ideal program for you or your team.",
    name: "Name",
    email: "Email",
    interest: "Interest",
    interestPH: "e.g., Consultative Sales, Power BI Path, etc.",
    message: "Message",
    messagePH: "Tell us your context",
    writeOnWhatsApp: "Write on WhatsApp",
    callMe: "Call me",
    speak: "Let’s talk!",
    contactLead: "Leave your details and we’ll reach out with more info about",
    notFound: "No courses match your search. Try another term or remove the filter.",
    catalog: "Catalog",
    paths: "Paths",
    contact: "Contact",
    langLabel: "Language",
    themeLabel: "Theme",
    skip: "Skip to content",
    openMenu: "Open menu",
    close: "Close",
    rights: "All rights reserved.",
    all: "All",
    learnMoreAbout: "Learn more about",
  },
};

// Contenido base (traducible)
const featuresBase = [
  { id: "ventas", icon: <TrendingUp className="size-6" />, tag: "Comercial" },
  { id: "marca", icon: <Megaphone className="size-6" />, tag: "Branding" },
  { id: "habitos", icon: <Sparkles className="size-6" />, tag: "Mindset" },
  { id: "liderazgo", icon: <Users className="size-6" />, tag: "Liderazgo" },
  { id: "powerbi", icon: <BarChart4 className="size-6" />, tag: "Datos" },
  { id: "analytics", icon: <Database className="size-6" />, tag: "Datos" },
  { id: "datasci", icon: <Brain className="size-6" />, tag: "Datos" },
] as const;

const featureText: Record<Lang, Record<(typeof featuresBase)[number]["id"], { title: string; desc: string; tag?: string }>> = {
  es: {
    ventas: { title: "Ventas Consultivas", desc: "Prospección, discovery y cierres con playbooks accionables.", tag: "Comercial" },
    marca: { title: "Marca Personal", desc: "Narrativa, contenido y visibilidad para generar demanda.", tag: "Branding" },
    habitos: { title: "Motivación y Hábitos", desc: "Productividad, mentalidad y sistemas que sostienen resultados.", tag: "Mindset" },
    liderazgo: { title: "Liderazgo Ágil", desc: "Equipos de alto rendimiento, feedback y rituales efectivos.", tag: "Liderazgo" },
    powerbi: { title: "Power BI desde Cero", desc: "Modelado, DAX y dashboards que impulsan decisiones.", tag: "Datos" },
    analytics: { title: "Data Analytics Bootcamp", desc: "SQL, ETL, métricas y analítica de negocio end-to-end.", tag: "Datos" },
    datasci: { title: "Intro a Data Science", desc: "Python, notebooks y modelos básicos para casos reales.", tag: "Datos" },
  },
  en: {
    ventas: { title: "Consultative Sales", desc: "Prospecting, discovery and closing with actionable playbooks.", tag: "Commercial" },
    marca: { title: "Personal Branding", desc: "Narrative, content and visibility to generate demand.", tag: "Branding" },
    habitos: { title: "Motivation & Habits", desc: "Productivity, mindset and systems that sustain results.", tag: "Mindset" },
    liderazgo: { title: "Agile Leadership", desc: "High‑performance teams, feedback and effective rituals.", tag: "Leadership" },
    powerbi: { title: "Power BI from Zero", desc: "Modeling, DAX and dashboards that drive decisions.", tag: "Data" },
    analytics: { title: "Data Analytics Bootcamp", desc: "SQL, ETL, metrics and end‑to‑end business analytics.", tag: "Data" },
    datasci: { title: "Intro to Data Science", desc: "Python, notebooks and basic models for real cases.", tag: "Data" },
  },
};

const cursosBase = [
  { id: "ventas360", tag: "Comercial", es: { titulo: "Ventas Consultivas 360°", duracion: "6 semanas", modalidad: "En vivo + mentoría", inicio: "Octubre 2025" }, en: { titulo: "Consultative Sales 360°", duracion: "6 weeks", modalidad: "Live + mentorship", inicio: "October 2025" } },
  { id: "marcaPro", tag: "Branding", es: { titulo: "Marca Personal Pro", duracion: "4 semanas", modalidad: "En vivo + proyecto", inicio: "Octubre 2025" }, en: { titulo: "Personal Branding Pro", duracion: "4 weeks", modalidad: "Live + project", inicio: "October 2025" } },
  { id: "habitos", tag: "Mindset", es: { titulo: "Motivación, Hábitos y Enfoque", duracion: "3 semanas", modalidad: "On-demand + sesiones", inicio: "Continuo" }, en: { titulo: "Motivation, Habits & Focus", duracion: "3 weeks", modalidad: "On-demand + sessions", inicio: "Ongoing" } },
  { id: "liderazgo", tag: "Liderazgo", es: { titulo: "Liderazgo Ágil para Managers", duracion: "5 semanas", modalidad: "En vivo", inicio: "Noviembre 2025" }, en: { titulo: "Agile Leadership for Managers", duracion: "5 weeks", modalidad: "Live", inicio: "November 2025" } },
  { id: "powerbi", tag: "Datos", es: { titulo: "Power BI desde Cero", duracion: "6 semanas", modalidad: "En vivo + práctica", inicio: "Octubre 2025" }, en: { titulo: "Power BI from Zero", duracion: "6 weeks", modalidad: "Live + practice", inicio: "October 2025" } },
  { id: "analytics", tag: "Datos", es: { titulo: "Data Analytics Bootcamp", duracion: "8 semanas", modalidad: "Intensivo", inicio: "Enero 2026" }, en: { titulo: "Data Analytics Bootcamp", duracion: "8 weeks", modalidad: "Intensive", inicio: "January 2026" } },
  { id: "datasci", tag: "Datos", es: { titulo: "Introducción a Data Science", duracion: "6 semanas", modalidad: "On-demand + mentoría", inicio: "Continuo" }, en: { titulo: "Introduction to Data Science", duracion: "6 weeks", modalidad: "On-demand + mentorship", inicio: "Ongoing" } },
];

export default function CursosLanding() {
  const brandName = "Pao Academy"; // ← nombre del cliente
  const phoneAR = "5493517601441"; // ← WhatsApp (sin +)

  const [modalOpen, setModalOpen] = useState(false);
  const [interes, setInteres] = useState("");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("Todos");
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("euro");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", listener);
    return () => mq.removeEventListener?.("change", listener);
  }, []);

  useEffect(() => {
    setTag(copy[lang].all);
  }, [lang]);

  const t = (k: string) => copy[lang][k] || k;

  const whatsappUrl = useMemo(() => {
    const msg = encodeURIComponent(
      `${lang === "es" ? "Hola" : "Hi"}, ${lang === "es" ? "me interesa recibir más info sobre" : "I'm interested in more info about"}: ${
        interes || (lang === "es" ? "programas" : "programs")
      }.\n${lang === "es" ? "Vengo desde la web de" : "I come from the website of"} ${brandName}.`
    );
    return `https://wa.me/${phoneAR}?text=${msg}`;
  }, [interes, lang]);

  const testimonios = [
    {
      es: {
        frase:
          "Duplicamos la tasa de cierre en 90 días aplicando el método de Ventas Consultivas.",
        autor: "Mariana Pérez",
        rol: "Líder Comercial, Grupo Andino",
      },
      en: {
        frase:
          "We doubled the close rate in 90 days applying the Consultative Sales method.",
        autor: "Mariana Pérez",
        rol: "Head of Sales, Grupo Andino",
      },
    },
    {
      es: {
        frase:
          "La ruta de Power BI nos permitió estandarizar reportes y tomar decisiones en tiempo real.",
        autor: "Julián Coria",
        rol: "Gerente de Operaciones, LogiSur",
      },
      en: {
        frase:
          "The Power BI path helped us standardize reports and make real‑time decisions.",
        autor: "Julián Coria",
        rol: "Operations Manager, LogiSur",
      },
    },
    {
      es: {
        frase:
          "El programa de Marca Personal nos dio posicionamiento y clientes inbound en semanas.",
        autor: "Belén Díaz",
        rol: "Consultora Independiente",
      },
      en: {
        frase:
          "Personal Branding gave us positioning and inbound clients within weeks.",
        autor: "Belén Díaz",
        rol: "Independent Consultant",
      },
    },
  ];
  const [idxTestimonio, setIdxTestimonio] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdxTestimonio((i) => (i + 1) % testimonios.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  const features = featuresBase.map((f) => ({
    ...f,
    title: featureText[lang][f.id].title,
    desc: featureText[lang][f.id].desc,
    tagLabel: featureText[lang][f.id].tag || f.tag,
  }));

  const cursos = cursosBase.map((c) => ({ ...c[lang], tag: lang === "es" ? c.tag : translateTag(c.tag) }));

  const tags = [
    t("all"),
    ...Array.from(new Set([...features.map((f) => f.tagLabel), ...cursos.map((c) => c.tag)])),
  ];

  const cursosFiltrados = cursos.filter((c) => {
    const matchTag = tag === t("all") || c.tag === tag;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q || c.titulo.toLowerCase().includes(q) || c.modalidad.toLowerCase().includes(q);
    return matchTag && matchQuery;
  });

  // ============ Self-tests (solo para desarrollo) ============
  useEffect(() => {
    const tests: { name: string; pass: boolean; info?: string }[] = [];
    tests.push({ name: "cssThemes define .card y border-radius", pass: cssThemes.includes(".card") && cssThemes.includes("border-radius") });
    tests.push({ name: "Tag 'All/Todos' presente en filtros", pass: tags.includes(t("all")) });
    if (tests.some((t) => !t.pass)) {
      // eslint-disable-next-line no-console
      console.warn("Self-tests failing:", tests.filter((t) => !t.pass));
    }
  }, [lang, tags]);

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-[color:var(--bg)]"
      style={{ color: "var(--fg)" }}
    >
      {/* Temas (CSS variables) */}
      <style>{cssThemes}</style>

      <LazyMotion features={domAnimation} strict>
        <Header
          brandName={brandName}
          t={t}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          onClickCTA={() => {
            setInteres(lang === "es" ? "programas" : "programs");
            setModalOpen(true);
          }}
        />

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="hero-euro absolute inset-0 -z-10" />
          <Hero
            brandName={brandName}
            t={t}
            cta={() => {
              setInteres(lang === "es" ? "programas" : "programs");
              setModalOpen(true);
            }}
            reducedMotion={reducedMotion}
          />
        </section>

        {/* BENEFICIOS */}
        <section id="catalogo" className="relative mx-auto max-w-7xl px-6 py-16">
          <m.h2
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            {t("sectionPrograms")}
          </m.h2>
          <p className="mt-3 max-w-2xl opacity-80">{t("sectionProgramsDesc")}</p>

          {/* Barra de búsqueda + filtros */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-xl border border-black/10 bg-white pl-10 pr-3 py-2 outline-none focus:border-black/20"
                aria-label={t("searchPlaceholder")}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-sm opacity-70">
                <Filter className="size-4" /> {t("filterLabel")}
              </span>
              {tags.map((tLabel) => (
                <button
                  key={tLabel}
                  onClick={() => setTag(tLabel)}
                  className={`chip ${tag === tLabel ? "chip-active" : ""}`}
                  aria-pressed={tag === tLabel}
                >
                  {tLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <m.div
                key={f.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="card p-5 hover:border-black/15"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[color:var(--pill-bg)] p-2 shadow-highlight text-[color:var(--acc1)]">{f.icon}</div>
                  <div className="text-sm uppercase tracking-wider opacity-70">{f.tagLabel}</div>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 opacity-80">{f.desc}</p>
                <button
                  onClick={() => {
                    setInteres(f.title);
                    setModalOpen(true);
                  }}
                  className="btn-accent mt-4"
                  aria-label={`${t("learnMoreAbout")} ${f.title}`}
                >
                  {t("knowMore")} <ChevronRight className="size-4" />
                </button>
              </m.div>
            ))}
          </div>
        </section>

        {/* CURSOS DESTACADOS */}
        <section className="relative mx-auto max-w-7xl px-6 py-6 md:py-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">{t("featured")}</h2>
              <p className="mt-2 opacity-80">{t("featuredDesc")}</p>
            </div>
            <a
              href="#contacto"
              className="hidden md:inline-flex btn-ghost"
            >
              {t("contact")}
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosFiltrados.map((c, i) => (
              <m.article
                key={c.titulo}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card group p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="pill text-xs tracking-wide">{c.tag}</span>
                  <PlayCircle className="size-5 opacity-60" />
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:underline decoration-black/20">
                  {c.titulo}
                </h3>
                <ul className="mt-3 space-y-1 text-sm opacity-85">
                  <li className="flex items-center gap-2"><Clock className="size-4" /> {c.duracion}</li>
                  <li className="flex items-center gap-2"><Users className="size-4" /> {c.modalidad}</li>
                  <li className="flex items-center gap-2"><MapPin className="size-4" /> {t("nextCohort")}: {c.inicio}</li>
                </ul>
                <button
                  onClick={() => {
                    setInteres(c.titulo);
                    setModalOpen(true);
                  }}
                  className="btn-accent mt-4"
                >
                  {t("knowMore")} <ChevronRight className="size-4" />
                </button>
              </m.article>
            ))}
          </div>
          {cursosFiltrados.length === 0 && (
            <p className="mt-6 opacity-70">{t("notFound")}</p>
          )}
        </section>

        {/* RUTAS DE APRENDIZAJE */}
        <section id="rutas" className="relative mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("learningPaths")}</h2>
          <p className="mt-2 max-w-2xl opacity-80">{t("learningPathsDesc")}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nombre: lang === "es" ? "Ruta Datos: Power BI" : "Data Path: Power BI",
                items:
                  lang === "es"
                    ? ["Fundamentos de Datos", "Power BI desde Cero", "DAX Avanzado", "Dashboarding y Storytelling"]
                    : ["Data Fundamentals", "Power BI from Zero", "Advanced DAX", "Dashboarding & Storytelling"],
              },
              {
                nombre: lang === "es" ? "Ruta Data Analytics" : "Data Analytics Path",
                items:
                  lang === "es"
                    ? ["SQL para Analítica", "ETL y Calidad", "Métricas y KPIs", "Analítica de Negocio"]
                    : ["SQL for Analytics", "ETL & Quality", "Metrics & KPIs", "Business Analytics"],
              },
              {
                nombre: lang === "es" ? "Ruta Data Science" : "Data Science Path",
                items:
                  lang === "es"
                    ? ["Python Básico", "EDA y Visualización", "Modelos Clásicos", "Proyecto Integrador"]
                    : ["Python Basics", "EDA & Visualization", "Classic Models", "Capstone Project"],
              },
            ].map((r) => (
              <div key={r.nombre} className="card p-5">
                <h3 className="text-lg font-semibold">{r.nombre}</h3>
                <ol className="mt-3 space-y-2">
                  {r.items.map((it, i) => (
                    <li key={it} className="flex items-start gap-2 text-sm opacity-85">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 opacity-70" />
                      <span>
                        <b>{i + 1}.</b> {it}
                      </span>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={() => {
                    setInteres(r.nombre);
                    setModalOpen(true);
                  }}
                  className="btn-ghost mt-4"
                >
                  {t("wantThisPath")}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL PROOF + MÉTRICAS */}
        <section className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <m.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Quote className="size-4" /> {t("whatTheySay")}
              </div>
              <div className="card p-6">
                <p className="text-lg leading-relaxed">“{testimonios[idxTestimonio][lang].frase}”</p>
                <p className="mt-3 opacity-80">
                  {testimonios[idxTestimonio][lang].autor} — {testimonios[idxTestimonio][lang].rol}
                </p>
              </div>
            </m.div>

            <m.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { k: "+4.9/5", v: t("satisfaction") },
                  { k: "+3,000", v: t("students") },
                  { k: "120+", v: t("companies") },
                ].map((m) => (
                  <div
                    key={m.v}
                    className="card p-5 text-center"
                  >
                    <div className="text-2xl font-bold">{m.k}</div>
                    <div className="text-sm opacity-70">{m.v}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm opacity-70">{t("companiesTrust")}</p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/1] rounded-xl border border-black/10 bg-black/[.03] flex items-center justify-center opacity-70"
                  >
                    LOGO
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative mx-auto max-w-5xl px-6 py-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("faq")}</h2>
          <div className="mt-6 divide-y divide-black/10 card p-0">
            {[
              { q: t("q1"), a: t("a1") },
              { q: t("q2"), a: t("a2") },
              { q: t("q3"), a: t("a3") },
            ].map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none text-lg font-medium flex items-center justify-between">
                  {f.q}
                  <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-2 opacity-80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACTO / CTA FINAL */}
        <section id="contacto" className="relative mx-auto max-w-4xl px-6 py-16">
          <div className="card p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-black/[.02] to-black/[.01] p-8 md:p-10 backdrop-blur-[1px]">
              <h2 className="text-2xl md:text-3xl font-semibold">{t("contactTitle")}</h2>
              <p className="mt-2 opacity-80">{t("contactDesc")}</p>

              <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm opacity-80">{t("name")}</label>
                  <input className="input" placeholder={t("name")} />
                </div>
                <div>
                  <label className="mb-1 block text-sm opacity-80">{t("email")}</label>
                  <input type="email" className="input" placeholder="tu@email.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm opacity-80">{t("interest")}</label>
                  <input value={interes} onChange={(e) => setInteres(e.target.value)} className="input" placeholder={t("interestPH")} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm opacity-80">{t("message")}</label>
                  <textarea rows={4} className="input" placeholder={t("messagePH")} />
                </div>
                <div className="mt-2 flex flex-wrap gap-3 sm:col-span-2">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-accent">
                    {t("writeOnWhatsApp")}
                  </a>
                  <button onClick={() => { setInteres(""); setModalOpen(true); }} className="btn-ghost">
                    {t("callMe")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer brandName={brandName} t={t} lang={lang} />

        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)} t={t}>
            <h3 className="text-xl font-semibold">{t("speak")}</h3>
            <p className="mt-1 opacity-80">
              {t("contactLead")} <span className="font-semibold">{interes || (lang === "es" ? "nuestros programas" : "our programs")}</span>.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <input className="input" placeholder={t("name")} />
              <input className="input" placeholder={t("email")} />
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-accent w-full text-center">
                {t("writeOnWhatsApp")}
              </a>
            </div>
          </Modal>
        )}

        {/* CTA flotante WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full bg-[color:var(--acc1)] px-4 py-2 font-semibold text-white shadow-xl hover:opacity-95"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
      </LazyMotion>
    </div>
  );
}

function Header({
  brandName,
  onClickCTA,
  t,
  lang,
  setLang,
  theme,
  setTheme,
}: {
  brandName: string;
  onClickCTA: () => void;
  t: (k: string) => string;
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--header-bg)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[color:var(--acc1)] text-white px-3 py-1 rounded">{t("skip")}</a>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-[color:var(--acc1)]/90 shadow-highlight" />
          <span className="text-sm font-bold tracking-wider uppercase" style={{color:"var(--fg)"}}>{brandName}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm opacity-90" style={{color:"var(--fg)"}}>
          <a href="#catalogo" className="hover:opacity-100">{t("catalog")}</a>
          <a href="#rutas" className="hover:opacity-100">{t("paths")}</a>
          <a href="#contacto" className="hover:opacity-100">{t("contact")}</a>
          <a href="#faq" className="hover:opacity-100">{t("faq")}</a>
        </nav>

        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <div className="hidden sm:flex items-center gap-1 rounded-full border border-black/10 px-1 py-1 text-xs bg-white">
            <button onClick={() => setLang("es")} className={`px-2 py-1 rounded-full ${lang === "es" ? "bg-[color:var(--acc1)] text-white" : "hover:bg-black/5"}`} aria-label="Español"><Globe className="size-3.5"/> ES</button>
            <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full ${lang === "en" ? "bg-[color:var(--acc1)] text-white" : "hover:bg-black/5"}`} aria-label="English">EN</button>
          </div>
          {/* Theme toggle */}
          <div className="hidden sm:flex items-center gap-1 rounded-full border border-black/10 px-1 py-1 text-xs bg-white" aria-label="Theme selector">
            <Palette className="size-3.5 opacity-70 mx-1" />
            {THEMES.map((th) => (
              <button key={th} onClick={() => setTheme(th)} className={`px-2 py-1 rounded-full capitalize ${theme === th ? "bg-[color:var(--acc1)] text-white" : "hover:bg-black/5"}`}>{th}</button>
            ))}
          </div>

          <button onClick={onClickCTA} className="hidden sm:inline-flex btn-accent">
            {t("knowMore")}
          </button>

          <button className="md:hidden rounded-lg border border-black/10 bg-white p-2" onClick={() => setOpen((o) => !o)} aria-label={t("openMenu")}>
            <Menu className="size-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm" style={{color:"var(--fg)"}}>
          <div className="flex items-center gap-2">
            <span className="opacity-70 text-xs">{t("langLabel")}:</span>
            <button onClick={() => setLang("es")} className={`px-2 py-1 rounded-full border ${lang === "es" ? "bg-[color:var(--acc1)] text-white border-transparent" : "border-black/10"}`}>ES</button>
            <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full border ${lang === "en" ? "bg-[color:var(--acc1)] text-white border-transparent" : "border-black/10"}`}>EN</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-70 text-xs">{t("themeLabel")}:</span>
            {THEMES.map((th) => (
              <button key={th} onClick={() => setTheme(th)} className={`px-2 py-1 rounded-full border capitalize ${theme === th ? "bg-[color:var(--acc1)] text-white border-transparent" : "border-black/10"}`}>{th}</button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="#catalogo" className="hover:opacity-100">{t("catalog")}</a>
            <a href="#rutas" className="hover:opacity-100">{t("paths")}</a>
            <a href="#contacto" className="hover:opacity-100">{t("contact")}</a>
            <a href="#faq" className="hover:opacity-100">{t("faq")}</a>
          </div>
          <button onClick={onClickCTA} className="mt-2 inline-flex btn-accent w-max">
            {t("knowMore")}
          </button>
        </div>
      )}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </header>
  );
}

function Hero({ brandName, t, cta, reducedMotion }: { brandName: string; t: (k: string) => string; cta: () => void; reducedMotion: boolean; }) {
  const first = t("brandTagline").split(" ")[0];
  const rest = t("brandTagline").split(" ").slice(1).join(" ");
  return (
    <div id="main" className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 text-white">
      <m.h1
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
      >
        {first} <span className="bg-white/95 bg-clip-text text-transparent drop-shadow">{rest}</span>
      </m.h1>
      <p className="mt-4 max-w-2xl text-lg text-white/90">
        {brandName} {t("heroDesc")}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button onClick={cta} className="btn-accent">
          {t("knowMore")} <ChevronRight className="size-4" />
        </button>
        <a href="#catalogo" className="btn-ghost text-white border-white/70 hover:bg-white/10">
          {t("viewCatalog")}
        </a>
      </div>
      <ul className="mt-8 flex flex-wrap gap-4 text-sm text-white/85">
        <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> {t("bullet1")}</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> {t("bullet2")}</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> {t("bullet3")}</li>
      </ul>
    </div>
  );
}

function Footer({ brandName, t, lang }: { brandName: string; t: (k: string) => string; lang: Lang }) {
  return (
    <footer className="mt-16 border-t border-black/10" style={{color:"var(--fg)"}}>
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm opacity-80">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded-md bg-[color:var(--acc1)]/90 shadow-highlight" />
          <span>{brandName}</span>
        </div>
        <div className="flex gap-4">
          <a href="#catalogo" className="hover:opacity-100">{t("catalog")}</a>
          <a href="#rutas" className="hover:opacity-100">{t("paths")}</a>
          <a href="#contacto" className="hover:opacity-100">{t("contact")}</a>
        </div>
        <div>© 2025 — {t("rights")}</div>
      </div>
    </footer>
  );
}

function Modal({ children, onClose, t }: { children: React.ReactNode; onClose: () => void; t: (k: string) => string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 text-[color:var(--fg)] shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full p-1 opacity-70 hover:bg-black/5" aria-label={t("close")}>
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

function translateTag(tag: string) {
  switch (tag) {
    case "Comercial":
      return "Commercial";
    case "Liderazgo":
      return "Leadership";
    case "Datos":
      return "Data";
    default:
      return tag;
  }
}

const cssThemes = `
/* Base tokens para UI clara con acento magenta/rojo */
:root{--acc1:#D72C59;--acc2:#FF6B6B;--bg:#F7F8FB;--fg:#1B1D23;--glass:#FFFFFF;--card-bg:#FFFFFF;--card-border:#E6E9EF;--pill-bg:#F2F3F7;--ring:rgba(215,44,89,.35);--header-bg:rgba(255,255,255,.82)}

/* Modo Euro (default) */
[data-theme="euro"]{--acc1:#D72C59;--acc2:#FF6B6B;--bg:#F7F8FB;--fg:#1B1D23;--glass:#FFFFFF;--card-bg:#FFFFFF;--card-border:#E6E9EF;--pill-bg:#F2F3F7;--ring:rgba(215,44,89,.35);--header-bg:rgba(255,255,255,.82)}

/* Dark themes existentes (por si querés mostrar variantes) */
[data-theme="aurora"]{--bg:#0a0b10;--fg:#ffffff;--glass:rgba(255,255,255,.06);--card-bg:linear-gradient(var(--glass),var(--glass));--card-border:rgba(255,255,255,.12);--pill-bg:rgba(120,162,255,.16);--acc1:#7EA1FF;--acc2:#C49BFF;--header-bg:rgba(0,0,0,.4)}
[data-theme="saffron"]{--bg:#0c0a06;--fg:#fff;--glass:rgba(255,211,131,.08);--card-bg:linear-gradient(var(--glass),var(--glass));--card-border:rgba(255,255,255,.12);--pill-bg:rgba(255,211,131,.18);--acc1:#FFD073;--acc2:#FF9E66;--header-bg:rgba(0,0,0,.4)}
[data-theme="sapphire"]{--bg:#06101a;--fg:#eaf6ff;--glass:rgba(163,217,255,.08);--card-bg:linear-gradient(var(--glass),var(--glass));--card-border:rgba(255,255,255,.12);--pill-bg:rgba(163,217,255,.18);--acc1:#7FD4FF;--acc2:#5B8CFF;--header-bg:rgba(0,0,0,.4)}
[data-theme="coral"]{--bg:#14090b;--fg:#fff0f3;--glass:rgba(255,153,164,.10);--card-bg:linear-gradient(var(--glass),var(--glass));--card-border:rgba(255,255,255,.12);--pill-bg:rgba(255,153,164,.22);--acc1:#FF8896;--acc2:#FFB2A6;--header-bg:rgba(0,0,0,.4)}
[data-theme="emerald"]{--bg:#07120d;--fg:#eafff7;--glass:rgba(129,255,201,.08);--card-bg:linear-gradient(var(--glass),var(--glass));--card-border:rgba(255,255,255,.12);--pill-bg:rgba(129,255,201,.2);--acc1:#6DFFCA;--acc2:#74E39B;--header-bg:rgba(0,0,0,.4)}
[data-theme="amethyst"]{--bg:#0f0a15;--fg:#f6f0ff;--glass:rgba(197,163,255,.10);--card-bg:linear-gradient(var(--glass),var(--glass));--card-border:rgba(255,255,255,.12);--pill-bg:rgba(197,163,255,.22);--acc1:#C5A3FF;--acc2:#FFB7F5;--header-bg:rgba(0,0,0,.4)}

/* Hero estilo Euroinnova */
.hero-euro{background:linear-gradient(180deg, var(--acc1) 0%, var(--acc2) 100%)}

/* Componentes */
.card{border:1px solid var(--card-border);border-radius:1rem;background:var(--card-bg);box-shadow:0 6px 18px rgba(0,0,0,.06)}
.shadow-highlight{box-shadow:inset 0 1px 0 rgba(255,255,255,.6), 0 8px 24px rgba(0,0,0,.08)}
.pill{display:inline-flex;align-items:center;gap:.5rem;border-radius:9999px;padding:.25rem .75rem;background:var(--pill-bg);border:1px solid var(--card-border)}
.chip{border-radius:9999px;padding:.45rem .9rem;border:1px solid var(--card-border);background:var(--pill-bg)}
.chip-active{background:linear-gradient(140deg,var(--acc1),var(--acc2));color:#fff;border-color:transparent}
.btn-accent{display:inline-flex;align-items:center;gap:.5rem;border-radius:9999px;padding:.75rem 1.15rem;font-weight:700;background:linear-gradient(140deg,var(--acc1),var(--acc2));color:#fff}
.btn-accent:hover{filter:brightness(1.03)}
.btn-ghost{display:inline-flex;align-items:center;gap:.6rem;border-radius:9999px;padding:.65rem 1.1rem;border:1px solid var(--card-border);background:transparent;color:inherit}
.input{width:100%;border-radius:0.75rem;border:1px solid var(--card-border);background:#fff;padding:.6rem .8rem;outline:none;color:inherit}
.input:focus{border-color:var(--ring);box-shadow:0 0 0 3px color-mix(in oklab,var(--ring) 28%, transparent)}
`;
