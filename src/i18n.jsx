import { createContext, useContext, useMemo, useState } from 'react';
import { DICCIONARIO } from './data/textos';

const CLAVE = 'pokemonAlAtaque_idioma';

// Los textos están escritos en español dentro del código y aquí se cambian a inglés
const traducir = (lang, texto) => (lang === 'en' ? DICCIONARIO[texto] || texto : texto);

// Rellena los huecos: t('¡{0} usó {1}!', 'Pikachu', 'Impactrueno')
const rellenar = (texto, valores) =>
  valores.length === 0 ? texto : texto.replace(/\{(\d+)\}/g, (hueco, i) => (valores[Number(i)] ?? hueco));

const leerGuardado = () => {
  try {
    return localStorage.getItem(CLAVE) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
};

// Para el código que no es un componente (por ejemplo, pedir los datos a PokéAPI)
let idiomaActual = leerGuardado();
export const getLang = () => idiomaActual;

const LangContext = createContext({ lang: 'es', setLang: () => {}, t: (texto) => texto });

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(idiomaActual);

  const value = useMemo(
    () => ({
      lang,
      setLang: (nuevo) => {
        idiomaActual = nuevo;
        setLangState(nuevo);
        try {
          localStorage.setItem(CLAVE, nuevo);
        } catch {
          // Si el navegador no deja guardar, al menos vale para esta partida
        }
      },
      t: (texto, ...valores) => rellenar(traducir(lang, texto), valores)
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
