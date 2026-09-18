import { useState } from 'react';
import PokeSprite from './PokeSprite';
import { ArrowLeft, Swords, Play } from 'lucide-react';
import { STORY, MEDALS, medalsWon } from '../data/story';
import { STORY_EN } from '../data/story/en';
import { spriteUrl } from '../services/pokeapi';
import PixelScene from './PixelScene';
import PixelDialog from './PixelDialog';
import { canFloat } from '../data/floaters';
import { useLang } from '../i18n';
import { descansando, descansoTerminado, loQueFalta } from '../data/requisitos';

const BACKGROUNDS = {
  pueblo: 'from-sky-400 via-sky-600 to-green-700',
  ruta: 'from-amber-300 via-lime-600 to-green-800',
  bosque: 'from-green-500 via-green-800 to-emerald-950',
  cueva: 'from-slate-500 via-slate-700 to-slate-950',
  mar: 'from-cyan-300 via-blue-600 to-blue-950',
  volcan: 'from-orange-400 via-red-700 to-rose-950',
  torre: 'from-fuchsia-500 via-purple-800 to-indigo-950',
  liga: 'from-yellow-300 via-amber-600 to-orange-900'
};

/**
 * Historia en forma de cuento: escenas con dibujo y texto que se van pasando,
 * y de vez en cuando un combate con el Pokémon que presta la historia
 */
export default function StoryScreen({ stage, save = {}, onAdvance, onRest, onFight, onRestart, onBack, creator = false }) {
  const { t, lang } = useLang();
  const [askRestart, setAskRestart] = useState(false);

  // En inglés se cuenta la misma escena con el texto traducido
  const escena = STORY[stage];
  const enIngles = lang === 'en' ? (escena?.textEn ? { speaker: escena.speakerEn ?? escena.speaker, text: escena.textEn, trainer: escena.trainerEn ?? escena.trainer } : STORY_EN[stage]) : null;
  const step = escena && enIngles
    ? { ...escena, speaker: enIngles.speaker, text: enIngles.text, trainer: enIngles.trainer || escena.trainer }
    : escena;
  const won = medalsWon(stage);

  // Descansos: hay escenas en las que hay que volver al día siguiente
  const esDescanso = step?.type === 'espera';
  const yaDescansado = descansoTerminado(save, stage);
  const hayQueEsperar = esDescanso && descansando(save, stage);
  const falta = loQueFalta(save, step);
  const puedeSeguir = falta.length === 0 && (!esDescanso || yaDescansado || creator);

  // Final de la historia
  if (!step) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-amber-600 to-orange-900 p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <p className="text-5xl mb-4 animate-float">👑</p>
          <h1 className="text-lg font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)] leading-loose mb-3">
            {t('¡Eres el Campeón!')}
          </h1>
          <p className="text-white/90 text-[10px] leading-loose mb-5">
            {t('Has terminado la historia con las {0} medallas.', MEDALS.length)}
          </p>
          <div className="flex justify-center gap-2 flex-wrap mb-6">
            {MEDALS.map(medal => (
              <span key={medal} className="w-10 h-10 bg-white/20 border-4 border-yellow-300 flex items-center justify-center text-lg">
                {medal}
              </span>
            ))}
          </div>
          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-amber-500 text-white font-black py-3 border-4 border-amber-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
            >
              {t('Jugar la historia otra vez')}
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white text-amber-800 font-black py-3 border-4 border-amber-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
            >
              {t('Volver al menú')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const background = BACKGROUNDS[step.bg] || BACKGROUNDS.ruta;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${background} p-4 flex flex-col`}>
      {/* Barra de arriba: volver y medallas */}
      <div className="max-w-2xl w-full mx-auto flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-black/30 flex items-center justify-center border-4 border-white/40 active:translate-y-1 transition flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-1 flex-wrap">
          {MEDALS.map((medal, index) => (
            <span
              key={medal}
              className={`w-7 h-7 flex items-center justify-center border-2 text-xs ${
                index < won ? 'bg-yellow-300/40 border-yellow-200' : 'bg-black/30 border-white/20 opacity-50'
              }`}
            >
              {medal}
            </span>
          ))}
        </div>

        {creator && (
          <span className="bg-fuchsia-500 text-white text-[8px] font-black px-2 py-1 flex-shrink-0">{t('CREADOR')}</span>
        )}

        <button
          onClick={() => setAskRestart(true)}
          className="ml-auto bg-black/30 text-white font-black px-3 py-2 border-4 border-white/40 active:translate-y-1 transition text-[9px] flex-shrink-0"
          title={t('Empezar la historia otra vez')}
        >
          🔄
        </button>
      </div>

      {askRestart && (
        <PixelDialog
          icon="📖"
          tone="info"
          title={t('¿Empezar de nuevo?')}
          confirmText={t('Sí, desde el principio')}
          onConfirm={() => {
            setAskRestart(false);
            onRestart();
          }}
          onCancel={() => setAskRestart(false)}
        >
          {t('La historia volverá a la primera escena y perderás las medallas conseguidas. Tu equipo, tus monedas y tus objetos se quedan como están.')}
        </PixelDialog>
      )}

      {/* Escena */}
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center py-6">
        {/* Viñeta del cuento: el dibujo del sitio con los Pokémon encima */}
        <div className="relative h-52 sm:h-72 border-4 border-white/50 shadow-[6px_6px_0_rgba(0,0,0,0.5)] overflow-hidden mb-4">
          <div className="absolute inset-0 animate-camera">
            <PixelScene name={step.bg} className="absolute inset-0 w-full h-full" />
          </div>
          {/* Los Pokémon pisan el suelo: los sprites traen hueco transparente abajo,
              así que se bajan un poco y la sombra se pone justo en los pies */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-4 pb-1">
            {(step.sprites || [step.pokemonId]).filter(Boolean).map((id, index, todos) => {
              const flota = canFloat(id);

              return (
                <div key={`${id}-${index}`} className="flex flex-col items-center">
                  <PokeSprite
                    src={spriteUrl(id)}
                    alt=""
                    className={`object-contain ${flota ? 'animate-float' : ''} ${
                      todos.length === 1 ? 'w-36 h-36 sm:w-48 sm:h-48' : 'w-24 h-24 sm:w-32 sm:h-32'
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      // Los que no vuelan se bajan hasta apoyar los pies
                      transform: flota ? undefined : 'translateY(11%)'
                    }}
                  />
                  <div className={`w-14 h-1.5 bg-black/55 ${flota ? '-mt-2' : '-mt-1'}`} />
                  <div className="w-9 h-1 bg-black/35" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Cuadro de texto, con el nombre de quien habla */}
        <div>
          {step.speaker && (
            <div className="inline-flex items-stretch">
              <div className="w-1.5 bg-yellow-300" />
              <p className="bg-black/85 border-t-4 border-r-4 border-white/50 px-3 py-1 text-yellow-300 font-black text-[10px] leading-loose">
                {step.speaker}
              </p>
            </div>
          )}
          <div className="bg-black/75 border-4 border-white/50 shadow-[6px_6px_0_rgba(0,0,0,0.5)] p-4">
            {step.type === 'battle' && (
              <p className="text-red-300 font-black text-[10px] leading-loose mb-2">⚔️ {step.trainer}</p>
            )}
            <p className="text-white text-[10px] leading-loose">{step.text}</p>
          </div>
        </div>

        {/* Lo que falta para poder seguir */}
        {falta.length > 0 && (
          <div className="bg-black/60 border-4 border-yellow-300/70 p-3 mt-4">
            <p className="text-yellow-300 font-black text-[10px] leading-loose mb-1">{t('Antes de seguir te falta:')}</p>
            {falta.map(cosa => (
              <p key={cosa.texto} className="text-white text-[9px] leading-loose">· {t(cosa.texto, ...cosa.datos)}</p>
            ))}
            <p className="text-white/60 text-[9px] leading-loose mt-1">{t('Entrena en Peleas y vuelve cuando lo tengas.')}</p>
          </div>
        )}

        {/* Botón para seguir o para pelear */}
        {esDescanso ? (
          <div className="mt-4">
            {hayQueEsperar ? (
              <div className="bg-black/60 border-4 border-cyan-300/60 p-4 text-center">
                <p className="text-4xl mb-2">🌙</p>
                <p className="text-cyan-200 font-black text-[10px] leading-loose">{t('Toca dormir. Vuelve mañana para seguir la Historia.')}</p>
                <p className="text-white/60 text-[9px] leading-loose mt-1">{t('Mientras tanto puedes pelear, entrenar y hacer misiones.')}</p>
              </div>
            ) : yaDescansado ? (
              <button
                onClick={onAdvance}
                className="w-full bg-yellow-400 text-yellow-900 font-black py-4 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                {t('¡Buenos días! Seguir')}
              </button>
            ) : (
              <button
                onClick={() => onRest(stage)}
                className="w-full bg-cyan-500 text-white font-black py-4 border-4 border-cyan-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-2"
              >
                🌙 {t('Descansar hasta mañana')}
              </button>
            )}

            {creator && !yaDescansado && (
              <button
                onClick={onAdvance}
                className="w-full mt-2 bg-fuchsia-600 text-white font-black py-3 border-4 border-fuchsia-200 shadow-[4px_4px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition text-[10px]"
                title={t('Solo lo ves tú')}
              >
                {t('⭐ Saltar el descanso')}
              </button>
            )}
          </div>
        ) : step.type === 'battle' ? (
          <div className="mt-4">
            <div className="bg-white/15 border-4 border-white/30 p-3 flex items-center gap-3 mb-3">
              <PokeSprite src={spriteUrl(step.myPokemonId)} alt="" className="w-14 h-14 object-contain flex-shrink-0" />
              <p className="text-white text-[9px] leading-loose">
                {t('Peleas con el Pokémon que te presta la historia, nivel {0}. Tu equipo se queda descansando.', step.myLevel)}
              </p>
            </div>
            <button
              onClick={() => onFight(step)}
              disabled={!puedeSeguir}
              className="w-full bg-red-500 text-white font-black py-4 border-4 border-red-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <Swords className="w-5 h-5" />
              {t('¡Luchar!')}
            </button>

            {/* Solo el creador puede saltarse el combate */}
            {creator && (
              <button
                onClick={onAdvance}
                className="w-full mt-2 bg-fuchsia-600 text-white font-black py-3 border-4 border-fuchsia-200 shadow-[4px_4px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition text-[10px]"
                title={t('Solo lo ves tú')}
              >
                {t('⭐ Saltar este combate')}
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={onAdvance}
            disabled={!puedeSeguir}
            className="w-full mt-4 bg-yellow-400 text-yellow-900 font-black py-4 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {t('Continuar')}
          </button>
        )}

        <p className="text-white/60 text-[9px] text-center mt-3">
          {t('Escena {0} de {1}', stage + 1, STORY.length)}
        </p>
      </div>
    </div>
  );
}
