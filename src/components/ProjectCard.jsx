import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  // Ruta del repositorio (owner/repo). Usamos full_name si viene de la API.
  const repoPath = project.full_name || `RobertoDrazewski/${project.name}`;

  // URL de la imagen "Media View" (Social Preview) de GitHub.
  // Solo funciona para repos PÚBLICOS.
  const githubSocialUrl = `https://opengraph.githubassets.com/1/${repoPath}`;

  // Orden de prioridad de la imagen:
  // 1. Imagen local definida en App.jsx (project.previewImage)
  // 2. Social Preview de GitHub
  // 3. Imagen de respaldo si todo falla
  const fallbackImage =
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop';

  const primarySrc = project.previewImage || githubSocialUrl;
  const displaySrc = imgError ? fallbackImage : primarySrc;

  return (
    <div className="group relative flex flex-col h-full bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.5)] card-appear">

      {/* Contenedor de Imagen */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#111]">
        <img
          src={displaySrc}
          alt={project.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ${
            imgError ? 'opacity-40 grayscale' : 'group-hover:scale-110'
          }`}
          onError={() => {
            console.error(`No se pudo cargar la imagen de: ${project.name}`);
            setImgError(true);
          }}
        />

        {/* Badge de Lenguaje */}
        {project.language && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 text-[9px] font-bold bg-blue-600/80 backdrop-blur-sm text-white rounded uppercase tracking-widest">
              {project.language}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tighter">
          {(project.name || '').replace(/-/g, ' ')}
        </h3>

        <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2 h-8 italic">
          {project.description || 'Industrial Software Engineering'}
        </p>

        {/* Botones de Acción */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-5">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 hover:text-white transition-colors tracking-widest"
            >
              <FaGithub size={14} /> GITHUB
            </a>

            <a
              href={`${project.html_url}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 hover:text-blue-400 transition-colors tracking-widest"
            >
              <FaInfoCircle size={14} /> INFO
            </a>
          </div>

          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-300 transition-all hover:scale-110"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
