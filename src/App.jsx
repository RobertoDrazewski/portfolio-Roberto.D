import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Experience from './components/Experience';
import ProjectCard from './components/ProjectCard';
import LiveProjects from './components/LiveProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reveal from './components/Reveal';

const GITHUB_USER = 'RobertoDrazewski';

/**
 * Nombres EXACTOS de los repos que quieres mostrar (tus pinned),
 * en el orden en el que aparecerán las tarjetas.
 *
 * Si quieres usar una imagen local en lugar de la de GitHub (por ejemplo
 * si el repo es privado y su Social Preview no carga), pon el archivo en
 * la carpeta /public y añade aquí "preview": "/mi-imagen.png".
 */
const PINNED_REPOS = [
  { name: 'AGROTECH-MENDOZA-PUMA-CODE' },
  { name: 'Good-trip-car-rentals-final-produccion' },
  { name: 'PUMA-CODE' },
  { name: 'f1-telemetry-system' },
  { name: 'simulador' },
  { name: 'iot-scada-bridge-cpp' },
];

// Construye un objeto mínimo para que la tarjeta se muestre aunque la API
// falle o el repo sea privado.
const buildFallbackRepo = ({ name, preview, homepage, description, language }) => ({
  id: name,
  name,
  full_name: `${GITHUB_USER}/${name}`,
  html_url: homepage || `https://github.com/${GITHUB_USER}/${name}`,
  description: description || null,
  language: language || null,
  homepage: homepage || null,
  previewImage: preview || null,
});

function App() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPinned() {
      setLoading(true);
      try {
        // Una sola llamada a la API: traemos todos los repos públicos del usuario
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
          {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }
        );

        const allRepos = res.ok ? await res.json() : [];
        const byName = new Map(
          Array.isArray(allRepos)
            ? allRepos.map((r) => [r.name.toLowerCase(), r])
            : []
        );

        // Mantenemos EXACTAMENTE el orden de PINNED_REPOS y solo esos repos
        const selected = PINNED_REPOS.map((pinned) => {
          const repo = byName.get(pinned.name.toLowerCase());
          if (repo) {
            return {
              ...repo,
              previewImage: pinned.preview || null,
              homepage: pinned.homepage || repo.homepage,
              description: pinned.description || repo.description,
              language: pinned.language || repo.language,
            };
          }
          // Repo privado, no encontrado, o sitio en vivo: la tarjeta igual se muestra
          return buildFallbackRepo(pinned);
        });

        setProjects(selected);
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Aun con error de red mostramos las 6 tarjetas con datos mínimos
          setProjects(PINNED_REPOS.map(buildFallbackRepo));
        }
      } finally {
        setLoading(false);
      }
    }

    loadPinned();
    return () => controller.abort();
  }, []);

  return (
    <div className="bg-black min-h-screen font-sans text-gray-200 selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      <span id="top" />

      <main>
        <Hero />
        <Stats />
        <Services />
        <Experience />

        {/* PROYECTOS EN PRODUCCIÓN / LIVE */}
        <LiveProjects />

        {/* PROYECTOS */}
        <section
          id="projects"
          className="border-t border-white/10 max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-28"
        >
          <Reveal className="mb-14">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-blue-400 flex items-center gap-2.5">
              <span className="w-6 h-px bg-blue-500 inline-block" /> {t('projects.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mt-4 leading-none">
              {t('projects.title_1')}{' '}
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                {t('projects.title_2')}
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mt-4">{t('projects.subtitle')}</p>
          </Reveal>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500" />
              <p className="text-gray-500 font-mono text-[10px] animate-pulse tracking-[0.3em] uppercase">
                {t('projects.sync')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects && projects.length > 0 ? (
                projects.map((repo) => (
                  <ProjectCard key={repo.id} project={repo} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                  <p className="text-gray-600 text-sm tracking-widest uppercase">
                    {t('projects.no_repos')}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
