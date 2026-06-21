import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import Reveal from './Reveal';

const Contact = () => {
  const { t } = useTranslation();
  const email = 'drazewski@gmail.com';

  return (
    <section
      id="contact"
      className="border-t border-white/10 text-center py-28 md:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-blue-400 flex items-center justify-center gap-2.5">
            <span className="w-6 h-px bg-blue-500 inline-block" /> {t('contact.eyebrow')}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mt-5">
            {t('contact.title_1')} {t('contact.title_2')}{' '}
            <span className="text-blue-600 drop-shadow-[0_0_30px_rgba(37,99,235,0.35)]">
              {t('contact.title_3')}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-gray-500 max-w-lg mx-auto mt-5 text-base">
            {t('contact.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <a
            href={`mailto:${email}`}
            className="inline-block mt-8 font-mono text-base md:text-xl tracking-wide text-white border-b border-blue-500 pb-1.5 hover:text-blue-400 transition-colors"
          >
            {email}
          </a>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex items-center justify-center gap-3.5 mt-10">
            <a
              href="https://github.com/RobertoDrazewski"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:-translate-y-1 transition-all"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/robert-drazewski"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:-translate-y-1 transition-all"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:-translate-y-1 transition-all"
            >
              <LuMail size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
