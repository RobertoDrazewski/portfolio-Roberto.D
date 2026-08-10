import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import Reveal from './Reveal';

/**
 * Proyectos en producción (sitios reales y en vivo).
 * Cada card muestra una vista del sitio: intenta un iframe en vivo y,
 * si el sitio bloquea el embed (X-Frame-Options), cae a un screenshot
 * generado por URL (sin mantenimiento). Si también falla, usa la imagen local.
 */

const FACTORY_URL = 'https://www.puma-code.com/';

const LIVE_PROJECTS = [
  {
    id: 'goodtrip',
    name: 'Good Trip Car Rentals',
    url: 'https://goodtrip.com.ar/',
    tags: ['React', 'Node/Express', 'MySQL', 'OpenAI'],
    accent: '#3b82f6',
    descKey: 'live.goodtrip_desc',
    localImage: '/assets/images/goodtrip-preview.png',
  },
  {
    id: 'agrotech',
    name: 'Puma Agrotech',
    url: 'https://agrotech-pumacode.com.ar/',
    tags: ['IoT', 'LoRaWAN', 'ML', 'React'],
    accent: '#22c55e',
    descKey: 'live.agrotech_desc',
    localImage: '/assets/images/agrotech-preview.png',
  },
  {
    id: 'kalyber',
    name: 'Kalyber',
    url: 'https://kalyber.com.ar/',
    tags: ['React', 'Node/Express', 'Tailwind'],
    accent: '#f97316',
    descKey: 'live.kalyber_desc',
    localImage: '/assets/images/kalyber-preview.png',
  },
  {
    id: 'mendozapp',
    name: 'Mendozapp',
    url: 'https://mendozapp.com.ar/',
    tags: ['React', 'Node/Express', 'Tailwind'],
    accent: '#a855f7',
    descKey: 'live.mendozapp_desc',
    localImage: '/assets/images/mendozapp-preview.png',
  }
];

// Screenshot por URL (fallback sin servidor propio).
const shotFor = (url) =>
  `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}`;

const LiveCard = ({ project, index }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  // 0 = iframe en vivo, 1 = screenshot por URL, 2 = imagen local
  const [stage, setStage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleTilt = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(px * 100 + 50).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100 + 50).toFixed(1)}%`);
  };

  const resetTilt = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <Reveal delay={index * 120}>
      <article
        ref={cardRef}
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        style={{
          '--accent': project.accent,
          transform:
            'perspective(1200px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))',
        }}
        className="live-card group relative flex flex-col h-full rounded-2xl overflow-hidden
                   bg-[#0b0b0c] border border-white/10 transition-[transform,border-color,box-shadow]
                   duration-300 ease-out will-change-transform
                   hover:border-[color:var(--accent)]/60"
      >
        {/* Glow que sigue al cursor */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%)',
          }}
        />

        {/* Marco de navegador */}
        <div className="relative z-10 m-3 mb-0 rounded-xl overflow-hidden border border-white/10 bg-[#111]">
          {/* Barra superior tipo browser */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#161618] border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-2 flex-1 truncate text-[10px] font-mono text-gray-500 bg-black/40 rounded px-2 py-0.5">
              {project.url.replace('https://', '')}
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase text-[color:var(--accent)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--accent)] opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" />
              </span>
              LIVE
            </span>
          </div>

          {/* Viewport del sitio */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d0d]">
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-[color:var(--accent)] animate-spin" />
              </div>
            )}

            {stage === 0 ? (
              <iframe
                title={project.name}
                src={project.url}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setStage(1)}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin"
                className="absolute top-0 left-0 origin-top-left border-0
                           w-[200%] h-[200%] scale-50
                           transition-transform duration-700 group-hover:scale-[0.52]"
              />
            ) : (
              <img
                src={stage === 1 ? shotFor(project.url) : project.localImage}
                alt={project.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
                onError={() => stage === 1 && setStage(2)}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            )}

            {/* Click capture: el iframe no debe robar el scroll/click */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${project.name}`}
              className="absolute inset-0 z-20"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent opacity-70" />
          </div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 p-5 pt-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[color:var(--accent)] transition-colors">
              {project.name}
            </h3>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-gray-500 hover:text-[color:var(--accent)] transition-all hover:scale-110"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed mt-2 mb-4">
            {t(project.descKey)}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded
                           text-gray-300 bg-white/[0.04] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest
                       text-white/90 hover:gap-3 transition-all w-fit"
          >
            <span
              className="border-b-2 pb-0.5"
              style={{ borderColor: project.accent }}
            >
              {t('live.visit')}
            </span>
            <FaArrowRight size={11} className="text-[color:var(--accent)]" />
          </a>
        </div>
      </article>
    </Reveal>
  );
};

const LiveProjects = () => {
  const { t } = useTranslation();

  return (
    <section
      id="live"
      className="relative border-t border-white/10 max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-28"
    >
      {/* Glow ambiental de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[36rem] h-[36rem] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <Reveal className="mb-14 relative z-10">
        <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-emerald-400 flex items-center gap-2.5">
          <span className="w-6 h-px bg-emerald-500 inline-block" /> {t('live.eyebrow')}
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mt-4 leading-none">
          {t('live.title_1')}{' '}
          <span className="bg-gradient-to-r from-emerald-300 via-white to-blue-400 bg-clip-text text-transparent">
            {t('live.title_2')}
          </span>
        </h2>
        <p className="text-gray-500 max-w-xl mt-4">
          {t('live.subtitle')}{' '}
          <a
            href={FACTORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold underline decoration-blue-500/60 underline-offset-4 hover:decoration-blue-400 transition"
          >
            Puma Code
          </a>
          .
        </p>
      </Reveal>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-7">
        {LIVE_PROJECTS.map((p, i) => (
          <LiveCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default LiveProjects;