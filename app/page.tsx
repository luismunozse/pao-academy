// @ts-nocheck
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function CursosLanding() {
  const brandName = "Pao Academy"; // ← cambia por el nombre del cliente
  const phoneAR = "5493517601441"; // ← WhatsApp del cliente (sin "+")

  const [modalOpen, setModalOpen] = useState(false);
  const [interes, setInteres] = useState("");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("Todos");

  const whatsappUrl = useMemo(() => {
    const msg = encodeURIComponent(
      `Hola, me interesa recibir más info sobre: ${interes || "programas"}.
Vengo desde la web de ${brandName}.`
    );
    return `https://wa.me/${phoneAR}?text=${msg}`;
  }, [interes]);

  const testimonios = [
    {
      frase:
        "Duplicamos la tasa de cierre en 90 días aplicando el método de Ventas Consultivas.",
      autor: "Mariana Pérez",
      rol: "Líder Comercial, Grupo Andino",
    },
    {
      frase:
        "La ruta de Power BI nos permitió estandarizar reportes y tomar decisiones en tiempo real.",
      autor: "Julián Coria",
      rol: "Gerente de Operaciones, LogiSur",
    },
    {
      frase:
        "El programa de Marca Personal nos dio posicionamiento y clientes inbound en semanas.",
      autor: "Belén Díaz",
      rol: "Consultora Independiente",
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

  const features = [
    { icon: <TrendingUp className="size-6" />, title: "Ventas Consultivas", desc: "Prospección, discovery y cierres con playbooks accionables.", tag: "Comercial" },
    { icon: <Megaphone className="size-6" />, title: "Marca Personal", desc: "Narrativa, contenido y visibilidad para generar demanda.", tag: "Branding" },
    { icon: <Sparkles className="size-6" />, title: "Motivación y Hábitos", desc: "Productividad, mentalidad y sistemas que sostienen resultados.", tag: "Mindset" },
    { icon: <Users className="size-6" />, title: "Liderazgo Ágil", desc: "Equipos de alto rendimiento, feedback y rituales efectivos.", tag: "Liderazgo" },
    { icon: <BarChart4 className="size-6" />, title: "Power BI desde Cero", desc: "Modelado, DAX y dashboards que impulsan decisiones.", tag: "Datos" },
    { icon: <Database className="size-6" />, title: "Data Analytics Bootcamp", desc: "SQL, ETL, métricas y analítica de negocio end-to-end.", tag: "Datos" },
    { icon: <Brain className="size-6" />, title: "Intro a Data Science", desc: "Python, notebooks y modelos básicos para casos reales.", tag: "Datos" },
  ];

  const cursos = [
    { titulo: "Ventas Consultivas 360°", tag: "Comercial", duracion: "6 semanas", modalidad: "En vivo + mentoría", inicio: "Octubre 2025" },
    { titulo: "Marca Personal Pro", tag: "Branding", duracion: "4 semanas", modalidad: "En vivo + proyecto", inicio: "Octubre 2025" },
    { titulo: "Motivación, Hábitos y Enfoque", tag: "Mindset", duracion: "3 semanas", modalidad: "On-demand + sesiones", inicio: "Continuo" },
    { titulo: "Liderazgo Ágil para Managers", tag: "Liderazgo", duracion: "5 semanas", modalidad: "En vivo", inicio: "Noviembre 2025" },
    { titulo: "Power BI desde Cero", tag: "Datos", duracion: "6 semanas", modalidad: "En vivo + práctica", inicio: "Octubre 2025" },
    { titulo: "Data Analytics Bootcamp", tag: "Datos", duracion: "8 semanas", modalidad: "Intensivo", inicio: "Enero 2026" },
    { titulo: "Introducción a Data Science", tag: "Datos", duracion: "6 semanas", modalidad: "On-demand + mentoría", inicio: "Continuo" },
  ];

  const tags = ["Todos", ...Array.from(new Set([...features.map(f => f.tag), ...cursos.map(c => c.tag)]))];

  const cursosFiltrados = cursos.filter((c) => {
    const matchTag = tag === "Todos" || c.tag === tag;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || c.titulo.toLowerCase().includes(q) || c.modalidad.toLowerCase().includes(q);
    return matchTag && matchQuery;
  });

  return (
    <div className="min-h-screen text-white bg-[#0a0b10] [--glass:rgba(255,255,255,0.06)]">
      <Header brandName={brandName} onClickCTA={() => { setInteres("programas"); setModalOpen(true); }} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <Hero brandName={brandName} onSaberMas={() => { setInteres("programas"); setModalOpen(true); }} />
        <Decorations />
      </section>

      {/* BENEFICIOS */}
      <section id="catalogo" className="relative mx-auto max-w-7xl px-6 py-16">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-semibold tracking-tight">
          Programas que transforman equipos y carreras
        </motion.h2>
        <p className="mt-3 max-w-2xl text-white/70">Formación práctica, mentores expertos y proyectos reales. Sin teorías vacías.</p>

        {/* Barra de búsqueda + filtros */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cursos (ej.: liderazgo, power bi)"
              className="w-full rounded-xl border border-white/20 bg-transparent pl-10 pr-3 py-2 outline-none focus:border-white/40"
              aria-label="Buscar cursos"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-white/60"><Filter className="size-4" /> Filtrar:</span>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full px-3 py-1.5 text-sm border ${tag === t ? "bg-white text-black border-white" : "border-white/20 hover:bg-white/10"}`}
                aria-pressed={tag === t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-white/10 bg-[--glass] p-5 backdrop-blur-md hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-2">{f.icon}</div>
                <div className="text-sm uppercase tracking-wider text-white/60">{f.tag}</div>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-white/70">{f.desc}</p>
              <button
                onClick={() => { setInteres(f.title); setModalOpen(true); }}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
                aria-label={`Saber más sobre ${f.title}`}
              >
                Saber más <ChevronRight className="size-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CURSOS DESTACADOS */}
      <section className="relative mx-auto max-w-7xl px-6 py-6 md:py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Cursos destacados</h2>
            <p className="mt-2 text-white/70">Sin precios — pedí el programa que mejor se adapte a tus objetivos.</p>
          </div>
          <a href="#contacto" className="hidden md:inline-flex rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Ver todos</a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursosFiltrados.map((c, i) => (
            <motion.article
              key={c.titulo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-2xl border border-white/10 bg-[--glass] p-5 backdrop-blur-md hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide">{c.tag}</span>
                <PlayCircle className="size-5 text-white/50" />
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:underline decoration-white/30">{c.titulo}</h3>
              <ul className="mt-3 space-y-1 text-sm text-white/75">
                <li className="flex items-center gap-2"><Clock className="size-4" /> {c.duracion}</li>
                <li className="flex items-center gap-2"><Users className="size-4" /> {c.modalidad}</li>
                <li className="flex items-center gap-2"><MapPin className="size-4" /> Próx. cohorte: {c.inicio}</li>
              </ul>
              <button
                onClick={() => { setInteres(c.titulo); setModalOpen(true); }}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                Saber más <ChevronRight className="size-4" />
              </button>
            </motion.article>
          ))}
        </div>
        {cursosFiltrados.length === 0 && (
          <p className="mt-6 text-white/60">No encontramos cursos para esa búsqueda. Probá con otro término o quitá el filtro.</p>
        )}
      </section>

      {/* RUTAS DE APRENDIZAJE */}
      <section id="rutas" className="relative mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Rutas de aprendizaje (Formación continua)</h2>
        <p className="mt-2 max-w-2xl text-white/70">Diseñadas para avanzar por etapas y asegurar adopción real en el día a día.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { nombre: "Ruta Datos: Power BI", items: ["Fundamentos de Datos", "Power BI desde Cero", "DAX Avanzado", "Dashboarding y Storytelling"] },
            { nombre: "Ruta Data Analytics", items: ["SQL para Analítica", "ETL y Calidad", "Métricas y KPIs", "Analítica de Negocio"] },
            { nombre: "Ruta Data Science", items: ["Python Básico", "EDA y Visualización", "Modelos Clásicos", "Proyecto Integrador"] },
          ].map((r) => (
            <div key={r.nombre} className="rounded-2xl border border-white/10 bg-[--glass] p-5">
              <h3 className="text-lg font-semibold">{r.nombre}</h3>
              <ol className="mt-3 space-y-2">
                {r.items.map((it, i) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-white/70" />
                    <span><b className="text-white">{i + 1}.</b> {it}</span>
                  </li>
                ))}
              </ol>
              <button onClick={() => { setInteres(r.nombre); setModalOpen(true); }} className="mt-4 inline-flex items-center gap-1 rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
                Quiero esta ruta
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF + MÉTRICAS */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Quote className="size-4" /> Lo que dicen nuestros alumnos
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-[--glass] p-6">
              <p className="text-lg leading-relaxed">“{testimonios[idxTestimonio].frase}”</p>
              <p className="mt-3 text-white/70">{testimonios[idxTestimonio].autor} — {testimonios[idxTestimonio].rol}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { k: "+4.9/5", v: "Satisfacción" },
                { k: "+3.000", v: "Alumnos" },
                { k: "120+", v: "Empresas" },
              ].map((m) => (
                <div key={m.v} className="rounded-2xl border border-white/10 bg-[--glass] p-5 text-center">
                  <div className="text-2xl font-bold">{m.k}</div>
                  <div className="text-sm text-white/60">{m.v}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/60">Empresas que confían</p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/1] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/50">
                  LOGO
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[--glass]">
          {[
            { q: "¿Las clases son en vivo o grabadas?", a: "Trabajamos con modalidad mixta: encuentros en vivo + contenido on‑demand para reforzar y practicar." },
            { q: "¿Entregan certificación?", a: "Sí, al completar los requisitos de cada programa emitimos un certificado digital verificable." },
            { q: "¿Ofrecen planes para empresas?", a: "Sí, armamos cohortes in‑company con objetivos y contenidos personalizados por área." },
          ].map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none text-lg font-medium flex items-center justify-between">
                {f.q}
                <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACTO / CTA FINAL */}
      <section id="contacto" className="relative mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-10 backdrop-blur-md">
          <h2 className="text-2xl md:text-3xl font-semibold">Conversemos tu objetivo</h2>
          <p className="mt-2 text-white/70">Contanos qué querés lograr y te proponemos el programa ideal para vos o tu equipo.</p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-white/70">Nombre</label>
              <input className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40" placeholder="Nombre y apellido" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/70">Email</label>
              <input type="email" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40" placeholder="tu@email.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-white/70">Interés</label>
              <input value={interes} onChange={(e) => setInteres(e.target.value)} className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40" placeholder="Ej.: Ventas Consultivas, Ruta Power BI, etc." />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-white/70">Mensaje</label>
              <textarea rows={4} className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40" placeholder="Contanos tu contexto" />
            </div>
            <div className="mt-2 flex flex-wrap gap-3 sm:col-span-2">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-black hover:opacity-90">
                Escribir por WhatsApp
              </a>
              <button onClick={() => { setInteres(""); setModalOpen(true); }} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-semibold hover:bg-white/10">
                Quiero que me llamen
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer brandName={brandName} />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3 className="text-xl font-semibold">¡Hablemos!</h3>
          <p className="mt-1 text-white/70">Dejanos tus datos y te contactamos con más info sobre <span className="text-white">{interes || "nuestros programas"}</span>.</p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <input className="rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40" placeholder="Nombre" />
            <input className="rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40" placeholder="Email" />
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold text-black hover:opacity-90">
              Enviar por WhatsApp
            </a>
          </div>
        </Modal>
      )}

      {/* CTA flotante WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
        className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-black shadow-xl hover:opacity-90"
      >
        <MessageCircle className="size-4" /> WhatsApp
      </a>
    </div>
  );
}

function Header({ brandName, onClickCTA }: { brandName: string; onClickCTA: () => void }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-white">
          <div className="size-6 rounded-md bg-gradient-to-br from-white to-white/50" />
          <span className="text-sm font-bold tracking-wider uppercase">{brandName}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#catalogo" className="hover:text-white">Catálogo</a>
          <a href="#rutas" className="hover:text-white">Rutas</a>
          <a href="#contacto" className="hover:text-white">Contacto</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <button onClick={onClickCTA} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90">
          Saber más
        </button>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </header>
  );
}

function Hero({ brandName, onSaberMas }: { brandName: string; onSaberMas: () => void }) {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
        Formación práctica para <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">líderes y equipos</span>
      </motion.h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        {brandName} combina experiencia real en negocios y datos para acelerar resultados en ventas, marca personal,
        motivación, liderazgo y carreras en analítica.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button onClick={onSaberMas} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black hover:opacity-90">
          Quiero saber más <ChevronRight className="size-4" />
        </button>
        <a href="#catalogo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/10">
          Ver catálogo
        </a>
      </div>
      <ul className="mt-8 flex flex-wrap gap-4 text-sm text-white/60">
        <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Mentores con experiencia real</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Proyectos y playbooks aplicables</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> En vivo + on‑demand</li>
      </ul>
    </div>
  );
}

function Decorations() {
  return (
    <>
      {/* fondo con gradientes y formas sutiles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_60%)] blur-2xl" />
        <div className="absolute left-1/2 top-96 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_60%)] blur-2xl" />
      </div>
    </>
  );
}

function Footer({ brandName }: { brandName: string }) {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded-md bg-gradient-to-br from-white to-white/50" />
          <span>{brandName}</span>
        </div>
        <div className="flex gap-4">
          <a href="#catalogo" className="hover:text-white">Catálogo</a>
          <a href="#rutas" className="hover:text-white">Rutas</a>
          <a href="#contacto" className="hover:text-white">Contacto</a>
        </div>
        <div>© 2025 — Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c0d12] p-6 text-white shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full p-1 text-white/60 hover:bg-white/10" aria-label="Cerrar">
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
