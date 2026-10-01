import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EMAIL = 'drazewski@gmail.com';

/**
 * Bloque final del Contact: un botón "Hire me!" que revela dos opciones.
 * El botón "No" esquiva el mouse y el dedo (mobile) para que sea
 * imposible de tocar — es un chiste, el "Sí" siempre está quieto y
 * manda un mail.
 */
const HireMe = () => {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const [dodges, setDodges] = useState(0);
  const [noPos, setNoPos] = useState(null); // {x, y} en px, relativo al arena
  const arenaRef = useRef(null);
  const noRef = useRef(null);

  const taunts = t('hire.taunts', { returnObjects: true });
  const tauntList = Array.isArray(taunts) ? taunts : [];
  const taunt = dodges > 0 ? tauntList[(dodges - 1) % tauntList.length] : null;

  const dodge = () => {
    const arena = arenaRef.current;
    const btn = noRef.current;
    if (!arena || !btn) return;
    const arenaRect = arena.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const maxX = Math.max(arenaRect.width - btnRect.width, 0);
    const maxY = Math.max(arenaRect.height - btnRect.height, 0);
    setNoPos({ x: Math.random() * maxX, y: Math.random() * maxY });
    setDodges((d) => d + 1);
  };

  // Centra el botón "No" apenas se muestra el bloque
  useEffect(() => {
    if (revealed && !noPos && arenaRef.current && noRef.current) {
      const arenaRect = arenaRef.current.getBoundingClientRect();
      const btnRect = noRef.current.getBoundingClientRect();
      setNoPos({
        x: (arenaRect.width - btnRect.width) / 2,
        y: (arenaRect.height - btnRect.height) / 2,
      });
    }
  }, [revealed, noPos]);

  const subject = encodeURIComponent(t('hire.mail_subject'));
  const body = encodeURIComponent(t('hire.mail_body'));
  const scale = Math.min(1 + dodges * 0.025, 1.25);

  return (
    <div className="mt-14">
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="inline-block font-mono text-sm md:text-base tracking-[0.15em] uppercase text-white bg-blue-600 hover:bg-blue-500 rounded-full px-8 py-4 transition-all hover:-translate-y-0.5"
        >
          {t('hire.cta')}
        </button>
      ) : (
        <div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-8">
            {t('hire.question')}
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}
              style={{ transform: `scale(${scale})` }}
              className="font-mono text-sm uppercase tracking-[0.15em] text-white bg-blue-600 hover:bg-blue-500 rounded-full px-7 py-3.5 transition-all"
            >
              {t('hire.yes')}
            </a>

            <div
              ref={arenaRef}
              className="relative w-full max-w-[220px] h-24 sm:w-56 sm:h-28"
            >
              <button
                ref={noRef}
                type="button"
                onMouseEnter={dodge}
                onFocus={dodge}
                onTouchStart={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                onClick={(e) => e.preventDefault()}
                style={
                  noPos
                    ? {
                        position: 'absolute',
                        left: noPos.x,
                        top: noPos.y,
                        transition: 'left 0.16s ease-out, top 0.16s ease-out',
                      }
                    : { position: 'absolute', left: '50%', top: '50%', opacity: 0 }
                }
                className="font-mono text-sm uppercase tracking-[0.15em] text-gray-400 border border-white/15 rounded-full px-7 py-3.5 bg-black/40"
              >
                {t('hire.no')}
              </button>
            </div>
          </div>

          <p
            aria-live="polite"
            className="mt-6 h-5 font-mono text-[11px] tracking-[0.25em] uppercase text-blue-400"
          >
            {taunt || ' '}
          </p>
        </div>
      )}
    </div>
  );
};

export default HireMe;
