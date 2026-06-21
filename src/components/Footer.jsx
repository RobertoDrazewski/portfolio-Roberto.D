import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 py-8 text-center bg-black">
      <p className="font-mono text-[9.5px] tracking-[0.32em] uppercase text-gray-600">
        © {new Date().getFullYear()} Roberto Drazewski · {t('footer.tagline')}
      </p>
    </footer>
  );
};

export default Footer;
