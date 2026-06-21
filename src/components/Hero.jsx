import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  SiCplusplus, SiPython, SiNodedotjs, SiExpress,
  SiReact, SiVite, SiPostman, SiSelenium, SiJira, SiMysql,
  SiTypescript, SiTailwindcss
} from 'react-icons/si';
import { FaLinkedin, FaGithub, FaWindows } from 'react-icons/fa';
import { LuCpu, LuChevronDown, LuArrowRight, LuDownload } from 'react-icons/lu';
import Reveal from './Reveal';

const Hero = () => {
  const { t } = useTranslation();

  const techCategories = [
    {
      label: t('hero.frontend'),
      icons: [
        { name: 'React', icon: <SiReact className="text-[#61DAFB]" /> },
        { name: 'Vite', icon: <SiVite className="text-[#646CFF]" /> },
        { name: 'TS', icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: 'Tailwind', icon: <SiTailwindcss className="text-[#06B6D4]" /> }
      ]
    },
    {
      label: t('hero.backend'),
      icons: [
        { name: 'C++', icon: <SiCplusplus className="text-[#00599C]" /> },
        { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: 'Express', icon: <SiExpress className="text-white" /> }
      ]
    },
    {
      label: t('hero.tools'),
      icons: [
        { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
        { name: 'Selenium', icon: <SiSelenium className="text-[#43B02A]" /> },
        { name: 'Postman', icon: <SiPostman className="text-[#FF6C37]" /> },
        { name: 'M365', icon: <FaWindows className="text-[#00A4EF]" /> },
        { name: 'Jira', icon: <SiJira className="text-[#0052CC]" /> }
      ]
    }
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black py-28">

      {/* Fondo de video ambiente */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-25">
          <source src="/assets/video-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
        {/* Glow azul superior */}
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] z-0 blur-3xl opacity-60"
             style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.18), transparent 60%)' }} />
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">

        {/* Badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.07] text-blue-400 font-mono text-[9px] font-bold tracking-[0.3em] uppercase mb-7">
            <LuCpu className="animate-pulse" />
            <span>{t('hero.badge')}</span>
          </div>
        </Reveal>

        {/* Nombre */}
        <Reveal delay={60}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.92]">
            ROBERTO{' '}
            <span className="text-blue-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.4)]">
              DRAZEWSKI
            </span>
          </h1>
        </Reveal>

        {/* Rol */}
        <Reveal delay={120}>
          <p className="font-mono text-xs md:text-base tracking-[0.18em] uppercase text-gray-400 mt-6">
            {t('hero.role')}
          </p>
        </Reveal>

        {/* Reseña */}
        <Reveal delay={180}>
          <div className="max-w-3xl mx-auto mt-7">
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
              <Trans i18nKey="hero.about_me">
                <span className="text-white font-medium" />
                <span className="text-white font-medium" />
              </Trans>
            </p>
          </div>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={240}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black font-mono font-medium rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 w-full sm:w-auto text-[11px] tracking-[0.18em] uppercase hover:-translate-y-0.5"
            >
              {t('hero.cta_projects')} <LuArrowRight className="group-hover:translate-x-1 transition-transform" size={15} />
            </a>
            <a
              href="/docs/Professional CV Resume (esp).pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white font-mono font-medium rounded-full hover:border-blue-500 hover:text-blue-400 transition-all duration-300 w-full sm:w-auto text-[11px] tracking-[0.18em] uppercase hover:-translate-y-0.5"
            >
              {t('hero.cta_cv')} <LuDownload size={15} />
            </a>
          </div>
        </Reveal>

        {/* Video resultado */}
        <Reveal delay={300}>
          <div className="relative z-30 max-w-4xl mx-auto mt-16 rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_80px_-30px_rgba(37,99,235,0.3)] bg-black/50">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.16em] uppercase text-gray-600">
                {t('hero.video_caption')}
              </span>
            </div>
            <video
              controls
              preload="metadata"
              playsInline
              className="w-full h-auto aspect-video object-cover block"
            >
              <source src="/assets/video/RESULTADO_FINAL_PORTFOLIO.mp4" type="video/mp4" />
              <p className="text-white p-4">Tu navegador no soporta el video.</p>
            </video>
          </div>
        </Reveal>

        {/* Redes */}
        <Reveal delay={360}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <a
              href="https://github.com/RobertoDrazewski"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-mono text-[10px] tracking-[0.2em] uppercase"
            >
              <FaGithub size={16} /> GitHub
            </a>
            <span className="w-[1px] h-3 bg-white/15" />
            <a
              href="https://www.linkedin.com/in/robert-drazewski"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-[#0077b5] transition-colors font-mono text-[10px] tracking-[0.2em] uppercase"
            >
              <FaLinkedin size={16} /> LinkedIn
            </a>
          </div>
        </Reveal>

        {/* Rejilla de tecnologías */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-14 mt-14 border-t border-white/5">
          {techCategories.map((cat, idx) => (
            <Reveal key={idx} delay={idx * 80} className="flex flex-col items-center">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-500/80 font-bold mb-6">
                {cat.label}
              </h3>
              <div className="flex flex-wrap justify-center gap-5">
                {cat.icons.map((tech, i) => (
                  <div key={i} className="group relative">
                    <div className="text-2xl transition-all duration-300 group-hover:scale-125 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100">
                      {tech.icon}
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[8px] text-white bg-blue-600 px-2 py-0.5 rounded transition-all whitespace-nowrap font-bold z-30 pointer-events-none">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Indicador scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gray-700">
        <LuChevronDown size={28} />
      </div>
    </section>
  );
};

export default Hero;
