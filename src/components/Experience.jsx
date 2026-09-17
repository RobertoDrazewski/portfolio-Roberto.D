import React from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';

const Experience = () => {
  const { t } = useTranslation();

  const jobs = [
    {
      when: t('experience.e1_when'),
      role: t('experience.e1_role'),
      org: t('experience.e1_org'),
      desc: t('experience.e1_desc'),
      now: true,
    },
    {
      when: t('experience.e2_when'),
      role: t('experience.e2_role'),
      org: t('experience.e2_org'),
      desc: t('experience.e2_desc'),
    },
    {
      when: t('experience.e3_when'),
      role: t('experience.e3_role'),
      org: t('experience.e3_org'),
      desc: t('experience.e3_desc'),
    },
    {
      when: t('experience.e4_when'),
      role: t('experience.e4_role'),
      org: t('experience.e4_org'),
      desc: t('experience.e4_desc'),
    },
    {
      when: t('experience.e5_when'),
      role: t('experience.e5_role'),
      org: t('experience.e5_org'),
      desc: t('experience.e5_desc'),
    },
  ];

  return (
    <section
      id="experience"
      className="border-t border-white/10 max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-28"
    >
      <Reveal className="mb-14">
        <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-blue-400 flex items-center gap-2.5">
          <span className="w-6 h-px bg-blue-500 inline-block" /> {t('experience.eyebrow')}
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mt-4 leading-none">
          {t('experience.title')}
        </h2>
        <p className="text-gray-500 max-w-xl mt-4">{t('experience.subtitle')}</p>
      </Reveal>

      <div className="relative pl-8">
        {/* línea vertical */}
        <div
          className="absolute left-[7px] top-1.5 bottom-1.5 w-px"
          style={{ background: 'linear-gradient(180deg, #3b82f6, transparent)' }}
        />
        {jobs.map((job, i) => (
          <Reveal key={i} delay={i * 60} className="relative pb-10 last:pb-0">
            {/* nodo */}
            <span
              className={`absolute -left-8 top-1 w-[15px] h-[15px] rounded-full border-2 border-blue-500 ${
                job.now ? 'bg-blue-500 shadow-[0_0_0_5px_rgba(59,130,246,0.18)]' : 'bg-black'
              }`}
            />
            <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-blue-400">
              {job.when}
            </div>
            <h4 className="text-lg md:text-xl font-extrabold mt-1.5 flex items-center flex-wrap gap-x-3 gap-y-1">
              {job.role}
              {job.now && (
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-green-400 border border-green-500/40 px-2 py-0.5 rounded-full">
                  {t('experience.now')}
                </span>
              )}
            </h4>
            <div className="font-mono text-xs text-gray-500 mt-0.5">{job.org}</div>
            <p className="text-gray-400 text-sm mt-3 max-w-2xl leading-relaxed">{job.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
