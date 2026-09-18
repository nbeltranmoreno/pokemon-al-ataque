import { useState } from 'react';

// Los dibujos de los Pokémon viven en GitHub, pero algunas redes o antivirus lo bloquean.
// Si una copia falla, probamos con la otra (el CDN jsDelivr sirve el mismo repositorio).
const GITHUB = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/';
const JSDELIVR = 'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/';

const otraCopia = (url = '') => {
  if (url.startsWith(GITHUB)) return JSDELIVR + url.slice(GITHUB.length);
  if (url.startsWith(JSDELIVR)) return GITHUB + url.slice(JSDELIVR.length);
  return null;
};

/**
 * Dibujo de un Pokémon que se busca solo en otro sitio si el primero no carga
 */
export default function PokeSprite({ src, alt = '', className = '', ...props }) {
  // Se guarda de qué dibujo veníamos para volver a empezar cuando cambia
  const [estado, setEstado] = useState({ pedido: src, actual: src, falló: false });

  if (estado.pedido !== src) {
    setEstado({ pedido: src, actual: src, falló: false });
  }

  if (estado.falló || !estado.actual) {
    return (
      <span className={`${className} inline-flex items-center justify-center bg-black/30 text-white/50 font-black`}>
        ?
      </span>
    );
  }

  return (
    <img
      src={estado.actual}
      alt={alt}
      className={className}
      onError={() => {
        setEstado(prev => {
          const siguiente = otraCopia(prev.actual);
          return siguiente ? { ...prev, actual: siguiente } : { ...prev, falló: true };
        });
      }}
      {...props}
    />
  );
}
