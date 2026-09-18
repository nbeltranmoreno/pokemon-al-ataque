import { useEffect, useState } from 'react';
import { VERSION } from '../version';
import { useLang } from '../i18n';

// Para no dar vueltas: solo se recarga solo una vez por cada versión nueva
const CLAVE = 'pokemonAlAtaque_yaIntentado';

const leer = (clave) => {
  try {
    return sessionStorage.getItem(clave);
  } catch {
    return null;
  }
};

const guardar = (clave, valor) => {
  try {
    sessionStorage.setItem(clave, valor);
  } catch {
    // Si el navegador no deja guardar, da igual
  }
};

/**
 * Mira si hay una versión nueva publicada y la carga sola.
 * Así nadie se queda jugando con una versión vieja guardada en el navegador.
 */
export default function UpdateBanner() {
  const { t } = useLang();
  const [nueva, setNueva] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const mirar = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;

        const data = await res.json();
        if (cancelado || !data?.version || data.version === VERSION) return;

        setNueva(data.version);

        // Se abre la página con ?v=... para que el navegador la pida de nuevo
        if (leer(CLAVE) !== data.version) {
          guardar(CLAVE, data.version);
          window.location.replace(`${window.location.pathname}?v=${data.version}`);
        }
      } catch {
        // Sin internet se sigue jugando con lo que hay
      }
    };

    mirar();

    // Al volver a la pestaña se vuelve a mirar
    const alVolver = () => {
      if (document.visibilityState === 'visible') mirar();
    };

    document.addEventListener('visibilitychange', alVolver);
    return () => {
      cancelado = true;
      document.removeEventListener('visibilitychange', alVolver);
    };
  }, []);

  if (!nueva) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-yellow-400 border-b-4 border-yellow-900 p-2 flex items-center justify-center gap-3 flex-wrap">
      <p className="text-yellow-900 font-black text-[10px] leading-loose">
        {t('¡Hay una versión nueva! ({0})', nueva)}
      </p>
      <button
        onClick={() => window.location.replace(`${window.location.pathname}?v=${nueva}&r=${Date.now()}`)}
        className="bg-yellow-900 text-yellow-100 font-black px-3 py-1 text-[10px] border-2 border-yellow-700 active:translate-y-0.5 transition"
      >
        {t('Actualizar')}
      </button>
    </div>
  );
}
