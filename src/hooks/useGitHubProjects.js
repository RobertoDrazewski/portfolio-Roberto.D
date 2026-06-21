import { useState, useEffect } from 'react';

export const useGitHubProjects = (username) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username || username === 'TU_USUARIO_DE_GITHUB') return;

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
      .then((res) => {
        if (!res.ok) throw new Error('Error en la API');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // Quitamos el filtro de descripción para asegurar que cargue ALGO
          const filtered = data.filter(repo => !repo.fork);
          setProjects(filtered.slice(0, 6));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [username]);

  return { projects, loading };
};