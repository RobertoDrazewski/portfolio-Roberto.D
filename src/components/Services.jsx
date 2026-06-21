import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, Code2, RadioTower, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Cpu size={22} strokeWidth={1.6} />,
      title: t('services.s1_title'),
      desc: t('services.s1_desc'),
      tags: ['Python', 'ML Models', 'Predictive', 'AI Integration'],
    },
    {
      icon: <Code2 size={22} strokeWidth={1.6} />,
      title: t('services.s2_title'),
      desc: t('services.s2_desc'),
      tags: ['React', 'Next.js', 'Node.js', 'Cloud'],
    },
    {
      icon: <RadioTower size={22} strokeWidth={1.6} />,
      title: t('services.s3_title'),
      desc: t('services.s3_desc'),
      tags: ['Firmware', 'MQTT', 'CAN-Bus', 'GPS'],
    },
    {
      icon: <ShieldCheck size={22} strokeWidth={1.6} />,
      title: t('services.s4_title'),
      desc: t('services.s4_desc'),
      tags: ['Selenium', 'Postman', 'ISTQB', 'Secure-by-Design'],
    },
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-28">
      <Reveal className="mb-14">
        <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-blue-400 flex items-center gap-2.5">
          <span className="w-6 h-px bg-blue-500 inline-block" /> {t('services.eyebrow')}
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mt-4 leading-none">
          {t('services.title_1')}{' '}
          <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {t('services.title_2')}
          </span>
        </h2>
        <p className="text-gray-500 max-w-xl mt-4">{t('services.subtitle')}</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s, i) => (
          <Reveal key={i} delay={(i % 2) * 100}>
            <div className="group relative h-full p-8 border border-white/10 rounded-2xl bg-[#0e1116] overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(59,130,246,0.4)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: 'radial-gradient(circle at 0% 0%, rgba(59,130,246,0.10), transparent 55%)' }} />
              <div className="relative">
                <span className="font-mono text-[11px] text-blue-500 tracking-[0.2em]">
                  0{i + 1}
                </span>
                <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center my-5 text-blue-400 bg-blue-500/[0.06]">
                  {s.icon}
                </div>
                <h3 className="text-xl font-extrabold tracking-tight mb-2.5">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-gray-400 border border-white/10 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Services;
