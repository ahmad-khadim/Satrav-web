"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { League_Spartan, Jost } from "next/font/google";

const titres = League_Spartan({ subsets: ["latin"], weight: ["600", "700"] });
const corps = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

// Quand on aura les vraies photos, mets leur chemin dans "image",
// par exemple : image: "/manutention.jpg" (fichier placé dans le dossier public)
const services = [
  {
    id: "manutention",
    titre: "Manutention",
    image: "",
    ton: "from-blue-900 to-blue-700",
    accroche: "Vos marchandises manipulées avec soin et en sécurité.",
    description:
      "Chargement, déchargement et mise à quai de vos marchandises dans les ports, avec des équipes et des moyens adaptés à chaque type de cargaison.",
    points: [
      "Chargement et déchargement de navires",
      "Manutention de conteneurs et de marchandises diverses",
      "Suivi et sécurité des opérations",
    ],
  },
  {
    id: "courtage-maritime",
    titre: "Courtage maritime",
    image: "",
    ton: "from-sky-900 to-sky-700",
    accroche: "Le bon navire, aux bonnes conditions.",
    description:
      "Nous mettons en relation armateurs et chargeurs et négocions pour vous les meilleures conditions de transport.",
    points: [
      "Recherche de navires et de fret",
      "Négociation des conditions commerciales",
      "Accompagnement jusqu'à la conclusion de l'affaire",
    ],
  },
  {
    id: "affretement",
    titre: "Affrètement",
    image: "",
    ton: "from-indigo-900 to-indigo-700",
    accroche: "Un navire adapté à chacune de vos cargaisons.",
    description:
      "Nous vous aidons à affréter le navire qui correspond à la nature, au volume et au calendrier de vos marchandises.",
    points: [
      "Affrètement au voyage",
      "Affrètement à temps",
      "Conseil sur le choix du navire",
    ],
  },
  {
    id: "consignation",
    titre: "Consignation",
    image: "",
    ton: "from-cyan-900 to-cyan-700",
    accroche: "Votre représentant au port, de l'arrivée au départ du navire.",
    description:
      "Nous représentons l'armateur au port : gestion de l'escale, formalités administratives et douanières, coordination avec tous les intervenants.",
    points: [
      "Gestion complète de l'escale du navire",
      "Formalités portuaires et douanières",
      "Coordination avec les autorités et opérateurs du port",
    ],
  },
  {
    id: "transport-maritime",
    titre: "Transport maritime",
    image: "",
    ton: "from-slate-800 to-slate-600",
    accroche: "Vos marchandises acheminées par voie maritime, de bout en bout.",
    description:
      "Nous organisons l'acheminement de vos marchandises par mer, de l'enlèvement à la livraison, avec un suivi clair à chaque étape.",
    points: [
      "Organisation du transport de port à port",
      "Suivi de vos expéditions",
      "Solutions adaptées à vos volumes et délais",
    ],
  },
];

/* Fait apparaître son contenu en douceur quand il entre à l'écran */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVu(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out motion-reduce:transition-none ${
        vu ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Icone({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Home() {
  const [actif, setActif] = useState<string>(services[0].id);
  const [defile, setDefile] = useState(false);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () => () => {
      if (minuteur.current) clearTimeout(minuteur.current);
    },
    []
  );

  // Survol avec un très léger délai : évite les changements involontaires
  function survol(id: string) {
    if (minuteur.current) clearTimeout(minuteur.current);
    minuteur.current = setTimeout(() => setActif(id), 90);
  }
  function annuler() {
    if (minuteur.current) clearTimeout(minuteur.current);
  }
  function choisir(id: string) {
    annuler();
    setActif(id);
  }
  function ouvrir(id: string) {
    setActif(id);
    document.getElementById("metiers")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className={`${corps.className} bg-white text-slate-800`}>
      <style>{`
        @keyframes apparition{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes flotte{0%,100%{transform:translate(0,0)}50%{transform:translate(32px,-26px)}}
      `}</style>

      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
          defile ? "bg-blue-950/90 shadow-lg backdrop-blur" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <a href="#accueil" className={`${titres.className} text-xl tracking-wide`}>
            SATRAV
          </a>
          <a
            href="#contact"
            className="rounded-md bg-white px-5 py-2 text-sm font-medium text-blue-900 shadow-md transition duration-100 hover:bg-blue-50 active:translate-y-0.5 active:scale-95 active:shadow-none"
          >
            Nous contacter
          </a>
        </nav>
      </header>

      {/* Bandeau principal (raccourci) */}
      <section
        id="accueil"
        className="relative flex min-h-[60vh] items-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl motion-safe:animate-[flotte_14s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sky-300/10 blur-3xl motion-safe:animate-[flotte_18s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28">
          <div className="flex items-center gap-3 motion-safe:animate-[apparition_0.9s_ease-out_both]">
            <span className="h-px w-10 bg-blue-300" />
            <p className="text-sm uppercase tracking-[0.25em] text-blue-200">
              Société Africaine de Travaux
            </p>
          </div>

          <h1
            className={`${titres.className} mt-5 max-w-3xl text-4xl leading-[1.05] text-white md:text-6xl motion-safe:animate-[apparition_0.9s_ease-out_both]`}
            style={{ animationDelay: "120ms" }}
          >
            Le partenaire solide de vos projets.
          </h1>

          <div
            className="mt-8 flex flex-wrap gap-4 motion-safe:animate-[apparition_0.9s_ease-out_both]"
            style={{ animationDelay: "260ms" }}
          >
            <a
              href="#apropos"
              className="rounded-md bg-white px-8 py-3 font-medium text-blue-900 shadow-md transition duration-100 hover:bg-blue-50 active:translate-y-0.5 active:scale-95 active:shadow-none"
            >
              Découvrir
            </a>
            <a
              href="#metiers"
              className="rounded-md border border-white/40 px-8 py-3 font-medium text-white transition duration-100 hover:bg-white/10 active:translate-y-0.5 active:scale-95"
            >
              Explorer nos services
            </a>
          </div>
        </div>

        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-10 w-full text-white md:h-16"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,64 C240,112 480,16 720,56 C960,96 1200,120 1440,48 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* À propos */}
      <section id="apropos" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-14 text-center md:py-16">
        <Reveal>
          <span className="mx-auto block h-1 w-14 rounded-full bg-blue-700" />
          <h2 className={`${titres.className} mt-6 text-3xl text-blue-900 md:text-4xl`}>
            SATRAV, votre partenaire polyvalent pour des solutions maritimes intégrées.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
            Depuis sa création, <strong>SATRAV</strong> s’est imposée comme un acteur clé du
            secteur maritime et portuaire. Manutention, courtage maritime, affrètement,
            consignation ou transport maritime : nous mettons notre expertise à votre service.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => ouvrir(s.id)}
                className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-900 transition duration-150 hover:bg-blue-900 hover:text-white active:scale-95"
              >
                {s.titre}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Explorez nos services : l'étagère (agrandie) */}
      <section id="metiers" className="scroll-mt-16 bg-slate-50 pt-12 md:pt-14">
        <Reveal className="px-6 text-center">
          <h2 className={`${titres.className} text-3xl text-blue-900 md:text-5xl`}>
            Explorez nos services
          </h2>
          <p className="mt-3 text-slate-500">
            Survolez ou touchez un métier pour le découvrir.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col md:h-[min(90vh,860px)] md:min-h-[640px] md:flex-row">
          {/* Grand panneau : tous les métiers superposés, un seul visible */}
          <div className="grid flex-1 overflow-hidden bg-blue-950">
            {services.map((s, i) => {
              const estActif = s.id === actif;
              return (
                <div
                  key={s.id}
                  aria-hidden={!estActif}
                  className={`relative col-start-1 row-start-1 bg-gradient-to-br ${s.ton} text-white transition-all duration-500 ease-out motion-reduce:transition-none ${
                    estActif
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none -translate-x-6 opacity-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`${titres.className} pointer-events-none absolute -left-4 -top-10 select-none text-[16rem] leading-none text-white/5`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative grid h-full items-center gap-10 px-6 py-12 md:grid-cols-5 md:px-14">
                    <div className="md:col-span-3">
                      <p className="text-sm uppercase tracking-[0.25em] text-blue-200">
                        {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                      </p>
                      <h3 className={`${titres.className} mt-3 text-4xl md:text-6xl`}>
                        {s.titre}
                      </h3>
                      <p className="mt-4 text-xl text-blue-100">{s.accroche}</p>
                      <span className="mt-6 block h-px w-16 bg-white/40" />
                      <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-50/90">
                        {s.description}
                      </p>
                      <ul className="mt-6 space-y-3 text-lg">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <svg
                              viewBox="0 0 20 20"
                              className="mt-1.5 h-4 w-4 shrink-0 text-sky-300"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M8 13.4 4.6 10l-1.2 1.2L8 15.8 17 6.8l-1.2-1.2z" />
                            </svg>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Photo du métier */}
                    <div className="relative md:col-span-2">
                      <div
                        aria-hidden="true"
                        className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-white/20"
                      />
                      <div
                        className="relative flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/20 bg-white/10 bg-cover bg-center text-white/70 backdrop-blur md:aspect-[4/5]"
                        style={s.image ? { backgroundImage: `url(${s.image})` } : undefined}
                      >
                        {!s.image && "Photo à venir"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Étagère : les 5 bandes restent en place, la bande active est éclairée */}
          <div className="flex flex-col md:flex-none md:flex-row">
            {services.map((s, i) => {
              const estActif = s.id === actif;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Afficher ${s.titre}`}
                  aria-pressed={estActif}
                  onMouseEnter={() => survol(s.id)}
                  onMouseLeave={annuler}
                  onFocus={() => choisir(s.id)}
                  onClick={() => choisir(s.id)}
                  className={`group relative flex h-16 items-center gap-4 overflow-hidden border-t border-white/10 bg-gradient-to-b ${s.ton} bg-cover bg-center px-5 text-left text-white md:h-auto md:w-20 md:flex-col md:justify-between md:border-l md:border-t-0 md:px-0 md:py-7 md:text-center`}
                  style={s.image ? { backgroundImage: `url(${s.image})` } : undefined}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 bg-blue-950 transition-opacity duration-300 ${
                      estActif ? "opacity-0" : "opacity-50 group-hover:opacity-20"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-1 bg-white transition-opacity duration-300 ${
                      estActif ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span className={`${titres.className} relative text-xl text-white/70`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`${titres.className} relative flex-1 text-lg tracking-wide md:flex-none md:text-xl md:[writing-mode:vertical-rl] md:rotate-180`}
                  >
                    {s.titre}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      estActif ? "scale-125 bg-white" : "bg-white/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative scroll-mt-16 overflow-hidden bg-blue-950 py-24 text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <h2 className={`${titres.className} text-3xl md:text-5xl`}>Contactez-nous</h2>
            <p className="mx-auto mt-4 max-w-xl text-blue-200">
              Parlez-nous de votre projet, nous vous répondons rapidement.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <Reveal delay={0}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sky-300">
                  <Icone>
                    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </Icone>
                </div>
                <p className="mt-5 text-sm uppercase tracking-widest text-blue-300">Adresse</p>
                <p className="mt-2 text-lg">Cité ISRA, Immeuble CNART, 1er étage</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <a
                href="tel:+221338329334"
                className="block h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sky-300">
                  <Icone>
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </Icone>
                </div>
                <p className="mt-5 text-sm uppercase tracking-widest text-blue-300">Téléphone</p>
                <p className="mt-2 text-lg">+221 33 832 93 34</p>
              </a>
            </Reveal>

            <Reveal delay={200}>
              <a
                href="mailto:contact@satrav.com"
                className="block h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sky-300">
                  <Icone>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </Icone>
                </div>
                <p className="mt-5 text-sm uppercase tracking-widest text-blue-300">Email</p>
                <p className="mt-2 text-lg">contact@satrav.com</p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-slate-950 py-10 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
          <div>
            <p className={`${titres.className} text-xl tracking-wide text-white`}>SATRAV</p>
            <p className="mt-1 text-sm">Société Africaine de Travaux</p>
          </div>
          <ul className="flex gap-6 text-sm">
            <li><a href="#apropos" className="hover:text-white">À propos</a></li>
            <li><a href="#metiers" className="hover:text-white">Services</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
          <p className="text-sm">© 2026 SATRAV. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}