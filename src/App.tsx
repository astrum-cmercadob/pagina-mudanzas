import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Truck,
  Package,
  Home,
  Building2,
  ShieldCheck,
  ClipboardCheck,
  CalendarDays,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  Boxes,
  Wrench,
  Warehouse,
  Sparkles,
  Clock,
  Users,
} from 'lucide-react';

// Hero showcase video (1080p, all-keyframe encoded for smooth scroll-scrubbing).
const VIDEO_SRC = '/videos/flow.mp4';

const CONTACT = {
  phoneFijo: '+56 2 3245 0772',
  phoneFijoTel: '+56232450772',
  phoneMovil: '+56 9 4011 5047',
  phoneMovilTel: '+56940115047',
  whatsapp: 'https://wa.me/56940115047',
  email: 'contacto@chilemudanzas.cl',
  address: 'Av. Nueva Providencia 1881, of. 1620, Providencia, Santiago',
  hours: 'Lun a Dom · 8:00 – 21:00 · 24/7 disponible',
  facebook: 'https://www.facebook.com/ChileMudanzas',
  linkedin: 'https://www.linkedin.com/company/chilemudanzas',
};

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cotizador', href: '#cotizador' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Empresas', href: '#empresas' },
  { label: 'Proceso', href: '#proceso' },
];

const moveTypes = ['Hogar', 'Oficina', 'Empresa', 'Interregional'];

const moveSizes = [
  'Estudio',
  '1 dormitorio',
  '2 dormitorios',
  '3+ dormitorios',
  'Oficina pequeña',
  'Oficina mediana',
];

const extraServices = [
  'Embalaje',
  'Desembalaje',
  'Carga y descarga',
  'Armado / desarmado',
  'Guardamuebles',
  'Materiales de embalaje',
];

type QuoteForm = {
  origen: string;
  destino: string;
  tipo: string;
  tamano: string;
  fecha: string;
  nombre: string;
  telefono: string;
  email: string;
  extras: string[];
};

const initialQuoteForm: QuoteForm = {
  origen: '',
  destino: '',
  tipo: 'Hogar',
  tamano: '2 dormitorios',
  fecha: '',
  nombre: '',
  telefono: '',
  email: '',
  extras: [],
};

/* ---------- Logo (inline SVG) ---------- */

function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-label="Chile Mudanzas"
    >
      <defs>
        <linearGradient id="lm-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D31735" />
          <stop offset="100%" stopColor="#9A0E26" />
        </linearGradient>
      </defs>
      <path
        d="M4 50 C 12 14, 28 12, 32 36 C 36 12, 52 14, 60 50 L 50 50 C 47 30, 38 30, 36 50 L 28 50 C 26 30, 17 30, 14 50 Z"
        fill="url(#lm-red)"
      />
      <path
        d="M44 8 L 46 14 L 52 14 L 47 18 L 49 24 L 44 20 L 39 24 L 41 18 L 36 14 L 42 14 Z"
        fill="#1863DC"
      />
      <circle cx="44" cy="14" r="1.5" fill="#FFAE02" />
    </svg>
  );
}

function FullLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={36} />
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-medium tracking-[0.22em] text-[#7A7A7A] uppercase">
          Chile
        </span>
        <span className="font-heading text-[20px] font-bold text-[#0A2E72] tracking-tight -mt-0.5">
          Mudanzas
        </span>
      </div>
    </div>
  );
}

/* ---------- Announcement bar ---------- */

function AnnouncementBar() {
  return (
    <div className="relative z-40 bg-[#0A2E72] text-white">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 px-4 sm:px-6 py-2 text-[12px]">
        <div className="flex items-center gap-2 text-white/85">
          <Sparkles className="h-3.5 w-3.5 text-[#FFAE02]" />
          <span className="hidden sm:inline">
            +15 años de experiencia · Mudanzas en todo Chile · Lun a Dom 8:00 – 21:00
          </span>
          <span className="sm:hidden">+15 años · Mudanzas en todo Chile</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${CONTACT.phoneFijoTel}`}
            className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            {CONTACT.phoneFijo}
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#FFAE02] hover:text-white transition-colors"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* ---------- Navbar ---------- */

function Navbar() {
  return (
    <nav className="relative z-30 flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
      <div
        className="flex items-center justify-center rounded-full w-12 h-12 sm:w-14 sm:h-14 shrink-0 shadow-md backdrop-blur ring-1 ring-black/5"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.96)' }}
      >
        <LogoMark size={30} />
      </div>

      <div
        className="flex items-center gap-1 sm:gap-2 rounded-full pl-3 pr-1.5 sm:pl-6 sm:pr-2 py-1.5 sm:py-2 shadow-md backdrop-blur ring-1 ring-black/5"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.96)' }}
      >
        <div className="hidden md:flex items-center gap-5 lg:gap-7 px-2">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[13px] lg:text-[14px] font-medium text-[#181818]/80 hover:text-[#1863DC] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#cotizador"
          className="inline-flex items-center gap-1.5 text-[12px] sm:text-[14px] font-semibold text-white bg-gradient-to-b from-[#1863DC] to-[#0f4cb0] hover:from-[#0f4cb0] hover:to-[#0a3a8a] rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 group shadow-sm"
        >
          Cotizar
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </nav>
  );
}

/* ---------- Hero (no video, premium static composition) ---------- */

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]">
      {/* decorative shapes */}
      <div
        className="pointer-events-none absolute -top-32 -right-20 h-[480px] w-[480px] rounded-full bg-[#FFAE02]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-24 h-[420px] w-[420px] rounded-full bg-[#1863DC]/10 blur-3xl"
        aria-hidden
      />
      {/* faint dotted grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(#181818 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div className="relative z-20 flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 items-center px-6 py-14 sm:px-12 sm:py-20 md:px-20 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-14 w-full max-w-7xl mx-auto items-center">
            {/* Left: hero text */}
            <div className="hero-in">
              <a
                href="#cotizador"
                className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-[#BB122A] hover:text-[#1863DC] hover:bg-white transition-colors mb-5 group ring-1 ring-black/5 shadow-sm"
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#BB122A] animate-pulse" />
                +15 años de experiencia en mudanzas en Chile
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <h1 className="font-heading text-[2.6rem] sm:text-[3.6rem] lg:text-[4.7rem] leading-[1.0] font-bold text-[#0A2E72] tracking-tight mb-5">
                Tu mudanza,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">perfectamente</span>
                  <span className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-[#FFAE02]/60 -z-0 -skew-x-3" />
                </span>{' '}
                organizada de principio a fin.
              </h1>

              <p className="text-[15px] sm:text-[18px] leading-relaxed text-[#181818]/75 font-normal mb-7 max-w-xl">
                Embalamos, protegemos, trasladamos y coordinamos cada detalle
                para que tu cambio de hogar u oficina sea simple, seguro y sin
                estrés.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#cotizador"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#1863DC] to-[#0f4cb0] hover:from-[#0f4cb0] hover:to-[#0a3a8a] px-6 py-3.5 text-[14px] sm:text-[15px] font-semibold text-white shadow-lg shadow-[#1863DC]/25 transition-all duration-200 group"
                >
                  Cotizar mudanza
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] px-6 py-3.5 text-[14px] sm:text-[15px] font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-200"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] sm:text-[13px] text-[#181818]/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#1863DC]" />
                  Equipo capacitado
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1863DC]" />
                  Cobertura nacional
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#1863DC]" />
                  Respuesta en minutos
                </div>
              </div>
            </div>

            {/* Right: quote teaser card */}
            <div className="hero-in-delay">
              <div className="relative rounded-3xl border border-white/70 bg-white/95 p-6 sm:p-7 shadow-2xl backdrop-blur ring-1 ring-black/5">
                <div
                  className="absolute -top-3 -right-3 inline-flex items-center gap-1 rounded-full bg-[#FFAE02] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#181818] shadow"
                >
                  <Sparkles className="h-3 w-3" />
                  ~ 1 min
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1863DC] mb-2">
                  Cotizador rápido
                </div>
                <h3 className="font-heading text-[22px] font-bold text-[#0A2E72] mb-4 leading-tight">
                  Cotiza en menos de 1 minuto
                </h3>
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-3 text-[13px] text-[#181818]/60">
                    <MapPin className="h-4 w-4 text-[#1863DC]" />
                    Origen
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-3 text-[13px] text-[#181818]/60">
                    <MapPin className="h-4 w-4 text-[#BB122A]" />
                    Destino
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-3 text-[13px] text-[#181818]/60">
                    <Truck className="h-4 w-4 text-[#4281D9]" />
                    Tipo de mudanza
                  </div>
                </div>
                <a
                  href="#cotizador"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#FFAE02] to-[#e89c00] hover:from-[#e89c00] hover:to-[#cc8900] px-4 py-3.5 text-[13.5px] font-bold text-[#181818] transition-all duration-200 shadow-md shadow-[#FFAE02]/30"
                >
                  Empezar cotización
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-3 text-center text-[11px] text-[#181818]/55">
                  Sin compromiso · Respuesta rápida
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#181818]/55">
          <span className="h-px w-10 bg-[#181818]/30" />
          Mira cómo trabajamos
          <span className="h-px w-10 bg-[#181818]/30" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Truck Showcase (sticky, scroll-scrubbed, fully clear) ---------- */

function TruckShowcase({
  scrollContainerRef,
  progress,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  progress: number;
}) {
  const captionStages = [
    'Cargamos con cuidado',
    'Aseguramos cada pieza',
    'Trasladamos con precisión',
    'Entregamos listo en destino',
  ];

  // Pick caption based on progress
  const captionIndex = Math.min(
    captionStages.length - 1,
    Math.floor(progress * captionStages.length),
  );

  return (
    <section className="relative bg-white">
      {/* Section intro */}
      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-20 pt-20 sm:pt-24 pb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1863DC]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1863DC] mb-4">
          <Truck className="h-3 w-3" />
          Cómo trabajamos
        </span>
        <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-3">
          Cuidamos cada detalle de tu mudanza
        </h2>
        <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70 max-w-2xl mx-auto">
          Desliza para ver cómo organizamos, embalamos y trasladamos todo con
          precisión.
        </p>
      </div>

      {/* Sticky scroll-scrub container — slightly shorter on mobile so the
          section doesn't dominate the page on small viewports */}
      <div
        ref={scrollContainerRef}
        className="relative h-[220vh] md:h-[340vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
          {/* Crystal-clear video, no overlays.
              `object-cover` on mobile so the 16:9 truck fills the portrait
              viewport (otherwise it letterboxes into a thin strip).
              `object-contain` on md+ keeps the full van visible. */}
          <video
            id="hero-video"
            src={VIDEO_SRC}
            muted
            playsInline
            preload="metadata"
            poster="/videos/flow-poster.jpg"
            disableRemotePlayback
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover md:object-contain bg-white"
            {...({ 'webkit-playsinline': 'true', 'x5-playsinline': 'true' } as Record<string, string>)}
          />

          {/* Side label badge — does not cover the truck */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur ring-1 ring-black/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1863DC] shadow">
              <Sparkles className="h-3 w-3 text-[#FFAE02]" />
              Cada paso, en su lugar
            </div>
          </div>

          {/* Progress chip top-right */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0A2E72] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow">
              {String(Math.round(progress * 100)).padStart(2, '0')}%
            </div>
          </div>

          {/* Bottom caption + CTA — placed near the floor, leaves the truck centered and clear */}
          <div className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center px-6">
            <div
              key={captionIndex}
              className="caption-fade font-heading text-[18px] sm:text-[22px] font-bold text-[#0A2E72] mb-4 text-center"
            >
              {captionStages[captionIndex]}
            </div>
            <a
              href="#cotizador"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#1863DC] to-[#0f4cb0] hover:from-[#0f4cb0] hover:to-[#0a3a8a] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-[#1863DC]/25 transition-all duration-200"
            >
              Cotizar mudanza
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Progress bar at bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-[#181818]/8">
            <div
              className="h-full bg-gradient-to-r from-[#FFAE02] to-[#1863DC] transition-[width] duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust strip ---------- */

function TrustStrip() {
  const items = [
    { icon: Truck, label: 'Mudanzas en todo Chile' },
    { icon: ShieldCheck, label: 'Equipo profesional' },
    { icon: Package, label: 'Embalaje seguro' },
    { icon: Clock, label: 'Coordinación 24/7' },
    { icon: Users, label: 'Hogares y empresas' },
  ];

  return (
    <section className="relative bg-white border-y border-[#181818]/8 py-5 sm:py-6 px-6 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#181818]/65"
          >
            <Icon className="h-4 w-4 text-[#1863DC]" />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Quote / Cotizador ---------- */

function QuoteSection() {
  const [form, setForm] = useState<QuoteForm>(initialQuoteForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof QuoteForm>(
    key: K,
    value: QuoteForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleExtra = (extra: string) => {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full rounded-lg border border-[#DDDDDD] bg-white px-3 py-3 text-[14px] text-[#181818] outline-none transition focus:border-[#4281D9] focus:ring-2 focus:ring-[#4281D9]/15';

  const labelClass =
    'block text-[11px] font-semibold uppercase tracking-wider text-[#181818]/65 mb-1.5';

  return (
    <section
      id="cotizador"
      className="relative bg-[#F5F5F5] py-20 sm:py-28 px-6 sm:px-12 lg:px-20"
    >
      <div
        className="pointer-events-none absolute top-20 -left-20 h-72 w-72 rounded-full bg-[#1863DC]/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-20 -right-20 h-72 w-72 rounded-full bg-[#FFAE02]/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFAE02]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#BB122A] mb-4">
            <Sparkles className="h-3 w-3" />
            Cotizador
          </span>
          <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-4">
            Cotiza tu mudanza en minutos
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70">
            Cuéntanos origen, destino y tipo de mudanza. Nuestro equipo te
            contactará con una propuesta clara y personalizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#181818]/8 bg-white p-6 sm:p-8 shadow-xl shadow-[#0A2E72]/5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Origen</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1863DC]" />
                  <input
                    type="text"
                    value={form.origen}
                    onChange={(e) => updateField('origen', e.target.value)}
                    placeholder="Comuna o ciudad"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Destino</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BB122A]" />
                  <input
                    type="text"
                    value={form.destino}
                    onChange={(e) => updateField('destino', e.target.value)}
                    placeholder="Comuna o ciudad"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Tipo de mudanza</label>
                <select
                  value={form.tipo}
                  onChange={(e) => updateField('tipo', e.target.value)}
                  className={inputClass}
                >
                  {moveTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Tamaño aproximado</label>
                <select
                  value={form.tamano}
                  onChange={(e) => updateField('tamano', e.target.value)}
                  className={inputClass}
                >
                  {moveSizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Fecha estimada</label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4281D9]" />
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={(e) => updateField('fecha', e.target.value)}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => updateField('nombre', e.target.value)}
                  placeholder="Tu nombre completo"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1863DC]" />
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => updateField('telefono', e.target.value)}
                    placeholder="+56 9 ..."
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1863DC]" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="tu@correo.cl"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7">
              <label className={labelClass}>Servicios adicionales</label>
              <div className="flex flex-wrap gap-2">
                {extraServices.map((extra) => {
                  const selected = form.extras.includes(extra);
                  return (
                    <button
                      key={extra}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={[
                        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 border',
                        selected
                          ? 'bg-gradient-to-b from-[#1863DC] to-[#0f4cb0] text-white border-[#0f4cb0] shadow-sm'
                          : 'bg-white text-[#181818]/75 border-[#DDDDDD] hover:border-[#4281D9] hover:text-[#1863DC]',
                      ].join(' ')}
                    >
                      {selected ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <span className="h-3.5 w-3.5 rounded-full border border-current" />
                      )}
                      {extra}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-[12px] text-[#181818]/55">
              Al solicitar tu cotización aceptas que un asesor te contacte para
              confirmar detalles. No compartimos tu información.
            </p>
          </form>

          <aside className="rounded-2xl border border-[#181818]/8 bg-white p-6 sm:p-8 shadow-xl shadow-[#0A2E72]/5 h-fit lg:sticky lg:top-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading text-[18px] font-bold text-[#0A2E72]">
                Resumen de tu mudanza
              </h3>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1863DC]/10">
                <Truck className="h-4 w-4 text-[#1863DC]" />
              </div>
            </div>

            <div className="space-y-3 text-[14px]">
              {[
                ['Origen', form.origen || '—'],
                ['Destino', form.destino || '—'],
                ['Tipo', form.tipo],
                ['Tamaño', form.tamano],
                ['Fecha', form.fecha || '—'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-[#181818]/8 pb-3"
                >
                  <span className="text-[#181818]/55">{label}</span>
                  <span className="text-right font-medium text-[#181818]">
                    {value}
                  </span>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4">
                <span className="text-[#181818]/55">Extras</span>
                <span className="text-right font-medium text-[#181818] max-w-[60%]">
                  {form.extras.length === 0 ? '—' : form.extras.join(', ')}
                </span>
              </div>
            </div>

            <p className="mt-5 rounded-lg bg-[#FFAE02]/10 px-3 py-2.5 text-[12px] leading-relaxed text-[#181818]/75 border border-[#FFAE02]/20">
              La cotización final será confirmada por un asesor según volumen,
              distancia y servicios adicionales.
            </p>

            <button
              type="submit"
              onClick={handleSubmit}
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#1863DC] to-[#0f4cb0] hover:from-[#0f4cb0] hover:to-[#0a3a8a] px-5 py-3.5 text-[14px] font-semibold text-white transition-all duration-200 shadow-lg shadow-[#1863DC]/25"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  ¡Solicitud enviada!
                </>
              ) : (
                <>
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[12px] text-[#181818]/55">
              Respuesta rápida por teléfono o email
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: 'Mudanzas para hogar',
      desc: 'Casas y departamentos con planes Básico, Semi-Full y Full según el nivel de embalaje que necesites.',
    },
    {
      icon: Building2,
      title: 'Mudanzas para oficina',
      desc: 'Cambios de oficina diurnos, nocturnos o fuera de horario, minimizando el impacto en tu operación.',
    },
    {
      icon: Boxes,
      title: 'Mudanzas TI y servidores',
      desc: 'Traslado de computadores, servidores, impresoras, plotters y equipos multimedia con protocolos especiales.',
    },
    {
      icon: Truck,
      title: 'Mudanzas interregionales',
      desc: 'Cobertura de Arica a Punta Arenas, incluyendo Isla de Pascua, con flete exclusivo o consolidado.',
    },
    {
      icon: Package,
      title: 'Embalaje y materiales',
      desc: 'Cajas de cartón, film stretch, polietileno, papel kraft y arriendo de cajas plásticas reutilizables.',
    },
    {
      icon: Warehouse,
      title: 'Guardamuebles y bodegaje',
      desc: 'Espacios seguros y monitoreados para guardar tus pertenencias el tiempo que necesites.',
    },
  ];

  return (
    <section
      id="servicios"
      className="relative bg-white py-20 sm:py-28 px-6 sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1863DC]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1863DC] mb-4">
            <Boxes className="h-3 w-3" />
            Servicios
          </span>
          <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-4">
            Servicios pensados para una mudanza sin estrés
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70">
            Desde el embalaje hasta la instalación final, coordinamos cada
            detalle para proteger lo que más importa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-[#181818]/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A2E72]/8 hover:border-[#4281D9]/40"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1863DC] to-[#FFAE02] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1863DC]/10 to-[#4281D9]/5 text-[#1863DC] transition-all duration-300 group-hover:from-[#1863DC] group-hover:to-[#0f4cb0] group-hover:text-white group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-[18px] font-bold text-[#0A2E72] mb-2">
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#181818]/65">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Cuéntanos tu mudanza',
      desc: 'Completa el cotizador con origen, destino y servicios deseados.',
      icon: ClipboardCheck,
    },
    {
      num: '02',
      title: 'Revisamos volumen y servicios',
      desc: 'Analizamos los detalles y preparamos una propuesta clara y ajustada.',
      icon: Boxes,
    },
    {
      num: '03',
      title: 'Coordinamos fecha y equipo',
      desc: 'Definimos día, hora y el equipo profesional que ejecutará tu mudanza.',
      icon: CalendarDays,
    },
    {
      num: '04',
      title: 'Ejecutamos el traslado',
      desc: 'Embalamos, trasladamos e instalamos todo en el destino con cuidado.',
      icon: Truck,
    },
  ];

  return (
    <section
      id="proceso"
      className="relative bg-[#F5F5F5] py-20 sm:py-28 px-6 sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFAE02]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#BB122A] mb-4">
            <ClipboardCheck className="h-3 w-3" />
            Proceso
          </span>
          <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-4">
            Un proceso claro de principio a fin
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70">
            Sin sorpresas. Cada etapa está pensada para que tu cambio sea
            previsible, seguro y eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ num, title, desc, icon: Icon }, i) => (
            <div
              key={num}
              className="relative rounded-2xl border border-[#181818]/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A2E72]/8"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-heading text-[34px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#1863DC]/30 to-[#1863DC]/10 leading-none">
                  {num}
                </span>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFAE02]/20 to-[#FFAE02]/5 text-[#BB122A]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-heading text-[17px] font-bold text-[#0A2E72] mb-2">
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#181818]/65">
                {desc}
              </p>
              {i < steps.length - 1 && (
                <span
                  className="absolute right-0 top-1/2 hidden lg:block h-px w-5 -translate-y-1/2 translate-x-full bg-gradient-to-r from-[#181818]/20 to-transparent"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust / Why us ---------- */

function TrustSection() {
  const metrics = [
    { value: '+1.200', label: 'mudanzas coordinadas' },
    { value: '98%', label: 'clientes satisfechos' },
    { value: '24/7', label: 'soporte y planificación' },
    { value: '100%', label: 'foco en cuidado y protección' },
  ];

  const cards = [
    {
      icon: ShieldCheck,
      title: 'Personal capacitado',
      desc: 'Equipo entrenado en logística, embalaje y manipulación segura.',
    },
    {
      icon: Package,
      title: 'Protección de pertenencias',
      desc: 'Materiales y técnicas profesionales para cuidar cada objeto.',
    },
    {
      icon: CalendarDays,
      title: 'Puntualidad y planificación',
      desc: 'Coordinación clara de fechas, horarios y recursos.',
    },
    {
      icon: Building2,
      title: 'Hogares y empresas',
      desc: 'Soluciones a medida tanto para familias como para oficinas.',
    },
  ];

  return (
    <section
      id="empresas"
      className="relative bg-white py-20 sm:py-28 px-6 sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1863DC]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1863DC] mb-4">
            <ShieldCheck className="h-3 w-3" />
            Confianza
          </span>
          <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-4">
            Por qué elegir Chile Mudanzas
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70">
            Acompañamos cada mudanza con experiencia operativa y cuidado real
            por las personas y sus pertenencias.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="relative overflow-hidden rounded-2xl border border-[#181818]/8 bg-gradient-to-br from-[#F5F5F5] to-white p-5 sm:p-6"
            >
              <div className="font-heading text-[30px] sm:text-[36px] font-bold leading-none mb-2 bg-gradient-to-br from-[#1863DC] to-[#0A2E72] bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-[12px] sm:text-[13px] uppercase tracking-wider text-[#181818]/60">
                {m.label}
              </div>
              <div
                className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-[#FFAE02]/10 blur-xl"
                aria-hidden
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-[#181818]/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A2E72]/8"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFAE02]/20 to-[#FFAE02]/5 text-[#BB122A]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-[16px] font-bold text-[#0A2E72] mb-1.5">
                {title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#181818]/65">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Coordinaron todo el cambio de casa con muchísimo cuidado. Llegamos a la nueva casa con todo embalado y listo. Volvería a elegirlos sin dudar.',
      name: 'Carolina M.',
      context: 'Mudanza de hogar — Las Condes',
      initials: 'CM',
    },
    {
      quote:
        'Movimos toda la oficina un fin de semana sin frenar la operación. Equipo súper profesional y planificación impecable.',
      name: 'Felipe R.',
      context: 'Mudanza de oficina — Providencia',
      initials: 'FR',
    },
    {
      quote:
        'El embalaje fue espectacular. Tenemos cosas frágiles y antigüedades, todo llegó perfecto. Se nota la experiencia.',
      name: 'Paula G.',
      context: 'Embalaje y traslado — Ñuñoa',
      initials: 'PG',
    },
  ];

  return (
    <section
      id="ayuda"
      className="relative bg-[#F5F5F5] py-20 sm:py-28 px-6 sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1863DC]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1863DC] mb-4">
            <Star className="h-3 w-3" />
            Testimonios
          </span>
          <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-4">
            Clientes que se cambiaron sin estrés
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70">
            Cientos de familias y empresas confían en nosotros para coordinar
            su próximo cambio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[#181818]/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A2E72]/8 flex flex-col"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#FFAE02] text-[#FFAE02]"
                  />
                ))}
              </div>
              <p className="text-[14.5px] leading-relaxed text-[#181818]/80 mb-6 flex-1">
                "{t.quote}"
              </p>
              <div className="border-t border-[#181818]/8 pt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1863DC] to-[#0A2E72] text-white text-[12px] font-bold">
                  {t.initials}
                </div>
                <div>
                  <div className="font-heading text-[15px] font-bold text-[#0A2E72]">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-[#181818]/55">
                    {t.context}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Clients strip (notable companies) ---------- */

function ClientsStrip() {
  const clients = [
    'Microsoft Chile',
    'Volvo Chile',
    'Carozzi',
    'Universidad Católica',
    'La Red TV',
    'Carey y Cía',
    'Indumotora',
  ];

  // Duplicate so the loop is seamless (translate -50% returns to start)
  const loop = [...clients, ...clients];

  return (
    <section className="relative bg-white py-14 sm:py-16 border-b border-[#181818]/8 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-20 mb-9">
        <p className="text-center text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#181818]/55">
          Empresas que han confiado en nosotros
        </p>
      </div>

      <div
        className="marquee-container relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="marquee flex w-max">
          {loop.map((c, i) => (
            <span
              key={i}
              aria-hidden={i >= clients.length}
              className="font-heading text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-[#181818]/30 hover:text-[#0A2E72] transition-colors duration-200 tracking-tight whitespace-nowrap mx-8 sm:mx-12 lg:mx-14"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Home moves tiers (Básico / Semi-Full / Full) ---------- */

function HomeTiersSection() {
  const tiers = [
    {
      name: 'Básico',
      tag: 'Carga y descarga',
      desc: 'Personal capacitado para cargar, descargar y distribuir tus muebles y cajas en cada habitación.',
      features: [
        'Equipo profesional de carga',
        'Descarga y distribución por habitación',
        'Coordinación logística',
        'Camión equipado',
      ],
      featured: false,
      accent: '#4281D9',
    },
    {
      name: 'Semi-Full',
      tag: 'Embalaje de bienes grandes',
      desc: 'Carga, descarga y embalaje profesional de tus bienes voluminosos: living, comedor, dormitorios y TV.',
      features: [
        'Todo lo del plan Básico',
        'Embalaje de bienes grandes (living, comedor, camas, TV)',
        'Armado y desarmado de camas',
        'Desinstalación de TV de muro',
        'Desembalaje de bienes grandes',
      ],
      featured: true,
      accent: '#1863DC',
    },
    {
      name: 'Full',
      tag: 'Embalaje completo',
      desc: 'El servicio más completo: embalamos todo, desde tus muebles hasta cada objeto pequeño y frágil.',
      features: [
        'Todo lo del plan Semi-Full',
        'Embalaje de bienes pequeños (loza, ropa, libros, juguetes)',
        'Materiales profesionales incluidos',
        'Desembalaje opcional en destino',
      ],
      featured: false,
      accent: '#BB122A',
    },
  ];

  return (
    <section className="relative bg-white py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFAE02]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#BB122A] mb-4">
            <Home className="h-3 w-3" />
            Mudanzas para hogar
          </span>
          <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-4">
            Elige el nivel de servicio que necesitas
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70">
            Tres opciones flexibles para tu mudanza de hogar — desde solo carga
            y descarga, hasta un servicio completo que embala absolutamente
            todo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={[
                'relative rounded-2xl bg-white p-7 transition-all duration-300 flex flex-col',
                t.featured
                  ? 'border-2 border-[#1863DC] shadow-2xl shadow-[#1863DC]/15 lg:-translate-y-2'
                  : 'border border-[#181818]/8 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A2E72]/8',
              ].join(' ')}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FFAE02] to-[#e89c00] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#181818] shadow">
                  Más elegido
                </span>
              )}
              <div className="mb-4">
                <div
                  className="text-[11px] font-semibold uppercase tracking-wider mb-1"
                  style={{ color: t.accent }}
                >
                  {t.tag}
                </div>
                <h3 className="font-heading text-[28px] font-bold text-[#0A2E72] leading-none">
                  {t.name}
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-[#181818]/70 mb-5">
                {t.desc}
              </p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[13.5px] text-[#181818]/80"
                  >
                    <CheckCircle2
                      className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: t.accent }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cotizador"
                className={[
                  'group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-semibold transition-all duration-200',
                  t.featured
                    ? 'bg-gradient-to-b from-[#1863DC] to-[#0f4cb0] hover:from-[#0f4cb0] hover:to-[#0a3a8a] text-white shadow-lg shadow-[#1863DC]/25'
                    : 'bg-[#F5F5F5] hover:bg-[#181818] hover:text-white text-[#181818] border border-[#181818]/10',
                ].join(' ')}
              >
                Cotizar {t.name}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-[#181818]/55">
          ¿No estás seguro qué plan elegir? Llámanos al{' '}
          <a
            href={`tel:${CONTACT.phoneFijoTel}`}
            className="font-semibold text-[#1863DC] hover:underline"
          >
            {CONTACT.phoneFijo}
          </a>{' '}
          y un asesor te ayuda.
        </p>
      </div>
    </section>
  );
}

/* ---------- Coverage section (national reach) ---------- */

function CoverageSection() {
  const regions = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Metropolitana',
    'O’Higgins',
    'Maule',
    'Ñuble',
    'Biobío',
    'Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén',
    'Magallanes',
    'Isla de Pascua',
  ];

  const features = [
    {
      icon: Truck,
      title: 'Carga exclusiva o consolidada',
      desc: 'Camiones plataforma hidráulica, asegurados y con seguimiento.',
    },
    {
      icon: Package,
      title: 'Transporte de mascotas y vehículos',
      desc: 'Trasladamos autos, motos y mascotas con todos los protocolos.',
    },
    {
      icon: Building2,
      title: 'Relocalización corporativa',
      desc: 'Servicios para colaboradores con pago a 30 días para empresas.',
    },
    {
      icon: Warehouse,
      title: 'Guardamuebles en origen y destino',
      desc: 'Bodegas seguras y monitoreadas en cualquier punto del país.',
    },
  ];

  return (
    <section
      id="cobertura"
      className="relative bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[#1863DC]/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full bg-[#FFAE02]/12 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1863DC]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1863DC] mb-4">
            <MapPin className="h-3 w-3" />
            Cobertura nacional
          </span>
          <h2 className="font-heading text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] font-bold text-[#0A2E72] mb-4">
            De Arica a Punta Arenas, incluyendo Isla de Pascua
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#181818]/70">
            Mudanzas locales, interregionales y nacionales en todo Chile.
            Coordinamos cada traslado con flota propia, equipo capacitado y
            protocolos de cuidado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12">
          {/* Left: Chile regions list */}
          <div className="rounded-2xl border border-[#181818]/8 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#0A2E72]">
                <span className="font-heading text-[28px] font-bold leading-none bg-gradient-to-br from-[#BB122A] to-[#9A0E26] bg-clip-text text-transparent">
                  17
                </span>
                regiones cubiertas
              </div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1863DC]/10">
                <MapPin className="h-4 w-4 text-[#1863DC]" />
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-[13px] text-[#181818]/80">
              {regions.map((r) => (
                <li key={r} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#FFAE02]" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-[#181818]/8 flex items-center gap-2 text-[12px] text-[#181818]/60">
              <CheckCircle2 className="h-4 w-4 text-[#1863DC]" />
              Disponibilidad 24/7 para empresas
            </div>
          </div>

          {/* Right: features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#181818]/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A2E72]/8"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1863DC]/10 to-[#4281D9]/5 text-[#1863DC]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-[15px] font-bold text-[#0A2E72] mb-1.5">
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#181818]/65">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Floating WhatsApp button ---------- */

function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] px-4 py-3 sm:py-3.5 text-white font-semibold text-[13px] sm:text-[14px] shadow-2xl shadow-[#25D366]/40 transition-all duration-200 hover:scale-105 group"
    >
      <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

/* ---------- Final CTA ---------- */

function FinalCTA() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A2E72] via-[#1863DC] to-[#0A2E72] py-20 sm:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
      <div
        className="absolute -top-20 -right-10 h-80 w-80 rounded-full opacity-30"
        style={{ backgroundColor: '#FFAE02', filter: 'blur(90px)' }}
      />
      <div
        className="absolute -bottom-20 -left-10 h-80 w-80 rounded-full opacity-25"
        style={{ backgroundColor: '#4281D9', filter: 'blur(90px)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/90 mb-6 backdrop-blur">
          <Truck className="h-3.5 w-3.5 text-[#FFAE02]" />
          Listos para tu próxima mudanza
        </div>
        <h2 className="font-heading text-[2.2rem] sm:text-[2.8rem] lg:text-[3.6rem] leading-[1.05] font-bold text-white mb-5">
          ¿Listo para organizar tu{' '}
          <span className="text-[#FFAE02]">próxima mudanza?</span>
        </h2>
        <p className="text-[15px] sm:text-[17px] leading-relaxed text-white/80 max-w-2xl mx-auto mb-9">
          Completa tu cotización y deja que nuestro equipo coordine el traslado
          de principio a fin.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#cotizador"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FFAE02] to-[#e89c00] hover:from-[#e89c00] hover:to-[#cc8900] px-7 py-4 text-[15px] font-bold text-[#181818] shadow-xl shadow-black/20 transition-all duration-200"
          >
            Cotizar ahora
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebd5b] px-7 py-4 text-[15px] font-semibold text-white shadow-xl shadow-black/20 transition-colors duration-200"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${CONTACT.phoneFijoTel}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 hover:bg-white/15 px-7 py-4 text-[15px] font-medium text-white transition-colors duration-200 backdrop-blur"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phoneFijo}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white/80 pt-16 pb-10 px-6 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="bg-white inline-flex rounded-xl px-4 py-3 mb-5 shadow-sm">
              <FullLogo />
            </div>
            <p className="text-[14px] leading-relaxed text-white/65 max-w-sm">
              +15 años organizando mudanzas para hogares y empresas en todo
              Chile. Embalaje, traslado, armado, TI y guardamuebles con
              cuidado y planificación.
            </p>
            <div className="flex gap-2 mt-5 flex-wrap">
              {['Hogares', 'Oficinas', 'Empresas', 'Interregional'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/8 ring-1 ring-white/10 px-3 py-1 text-[11px] font-medium text-white/75"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1ebd5b] transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/8 hover:bg-[#1877F2] ring-1 ring-white/10 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-white"
                  aria-hidden
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/8 hover:bg-[#0A66C2] ring-1 ring-white/10 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-white"
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-[13px] font-bold text-white mb-4 uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/65">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Cotizador
                </a>
              </li>
              <li>
                <a href="#cobertura" className="hover:text-white transition-colors">
                  Cobertura nacional
                </a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-white transition-colors">
                  Proceso
                </a>
              </li>
              <li>
                <a href="#empresas" className="hover:text-white transition-colors">
                  Empresas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-[13px] font-bold text-white mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3 text-[14px] text-white/65">
              <li className="flex items-start gap-2.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFAE02]/15">
                  <Phone className="h-3.5 w-3.5 text-[#FFAE02]" />
                </span>
                <span className="flex flex-col">
                  <a
                    href={`tel:${CONTACT.phoneFijoTel}`}
                    className="hover:text-white transition-colors"
                  >
                    {CONTACT.phoneFijo}
                  </a>
                  <a
                    href={`tel:${CONTACT.phoneMovilTel}`}
                    className="hover:text-white transition-colors text-[13px] text-white/55"
                  >
                    {CONTACT.phoneMovil}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FFAE02]/15">
                  <Mail className="h-3.5 w-3.5 text-[#FFAE02]" />
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFAE02]/15">
                  <MapPin className="h-3.5 w-3.5 text-[#FFAE02]" />
                </span>
                <span className="leading-relaxed">{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFAE02]/15">
                  <Clock className="h-3.5 w-3.5 text-[#FFAE02]" />
                </span>
                <span className="leading-relaxed">{CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-white/50">
            © {new Date().getFullYear()} Chile Mudanzas. Todos los derechos
            reservados.
          </p>
          <p className="text-[12px] text-white/50">
            +15 años de experiencia · Mudanzas en todo Chile.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- App ---------- */

export default function App() {
  const truckSectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const displayedProgressRef = useRef(0);
  const metadataReadyRef = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement | null;
    if (!video) return;
    videoRef.current = video;

    const handleLoadedMetadata = () => {
      metadataReadyRef.current = true;
      video.pause();
      video.currentTime = 0;
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // iOS Safari often ignores preload="auto" on cellular and will not load
    // video data until a user gesture. Calling .load() explicitly nudges it,
    // and a one-shot touch listener forces the load on first interaction
    // (a no-op on browsers that already loaded the data).
    try {
      video.load();
    } catch {
      /* ignore */
    }
    const forceLoad = () => {
      try {
        video.load();
      } catch {
        /* ignore */
      }
      window.removeEventListener('touchstart', forceLoad);
      window.removeEventListener('click', forceLoad);
    };
    window.addEventListener('touchstart', forceLoad, { once: true, passive: true });
    window.addEventListener('click', forceLoad, { once: true });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('touchstart', forceLoad);
      window.removeEventListener('click', forceLoad);
    };
  }, []);

  useEffect(() => {
    // Lerp factor: how much of the gap to close per frame (0–1).
    // Lower = buttery, higher = snappier. 0.2 ≈ ~5 frames to converge from a flick scroll.
    const LERP = 0.2;
    let alive = true;

    const updateTarget = () => {
      const container = truckSectionRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      let next = 0;
      if (scrollableDistance > 0) {
        next = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      }
      targetProgressRef.current = next;
    };

    const tick = () => {
      if (!alive) return;

      const target = targetProgressRef.current;
      const displayed = displayedProgressRef.current;
      const next = displayed + (target - displayed) * LERP;

      displayedProgressRef.current = next;

      const video = videoRef.current;
      if (
        metadataReadyRef.current &&
        video &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const targetTime = next * video.duration;
        // Skip redundant currentTime writes (each one triggers a decode).
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
        }
      }

      // Only setProgress when it would actually change UI noticeably,
      // to avoid 60fps re-renders at rest.
      if (Math.abs(target - displayed) > 0.0005) {
        setProgress(next);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    updateTarget();
    rafRef.current = window.requestAnimationFrame(tick);

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);

    return () => {
      alive = false;
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Ubuntu:wght@500;700&display=swap');

        :root {
          font-family: 'Roboto', Arial, sans-serif;
        }

        .font-heading {
          font-family: 'Ubuntu', 'Roboto', Arial, sans-serif;
        }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroInDelay {
          0%, 30% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes captionFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .hero-in { animation: heroIn 700ms ease-out both; }
        .hero-in-delay { animation: heroInDelay 1100ms ease-out both; }
        .caption-fade { animation: captionFade 350ms ease-out both; }
        .marquee {
          animation: marquee 35s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee { animation: none; }
        }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F5F5F5; }
        ::-webkit-scrollbar-thumb { background: #c4c4c4; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #1863DC; }
      `}</style>

      <AnnouncementBar />

      <main className="relative min-h-screen overflow-x-clip bg-[#F5F5F5] text-[#181818]">
        <Hero />
        <TruckShowcase
          scrollContainerRef={truckSectionRef}
          progress={progress}
        />
        <TrustStrip />
        <ClientsStrip />
        <QuoteSection />
        <ServicesSection />
        <HomeTiersSection />
        <CoverageSection />
        <ProcessSection />
        <TrustSection />
        <TestimonialsSection />
        <FinalCTA />
        <Footer />
        <WhatsAppFloat />
      </main>
    </>
  );
}
