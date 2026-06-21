import React from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { n: <><span className="text-blue-500">10</span>+</>, k: t('stats.years') },
    { n: 'CTO', k: t('stats.cto') },
    { n: <span className="text-blue-500">3</span>, k: t('stats.langs') },
    { n: 'UE+LATAM', k: t('stats.intl') },
  ];

  return (
    <div className="border-y border-white/10 bg-white/[0.012]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={i}
            delay={i * 80}
            className={`px-6 py-10 text-center border-white/5 ${
              i < 3 ? 'md:border-r' : ''
            } ${i % 2 === 0 ? 'border-r md:border-r' : ''}`}
          >
            <div className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              {s.n}
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500 mt-2">
              {s.k}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Stats;
