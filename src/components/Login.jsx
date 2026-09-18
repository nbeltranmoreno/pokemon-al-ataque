import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '../i18n';
import LangButton from './LangButton';

const ERRORS = {
  'auth/invalid-credential': 'Email o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ese email ya tiene cuenta. Inicia sesión.',
  'auth/weak-password': 'La contraseña es muy corta: mínimo 6 caracteres.',
  'auth/invalid-email': 'Ese email no vale.',
  'auth/popup-closed-by-user': 'Cerraste la ventana de Google antes de tiempo.'
};

/**
 * Inicio de sesión con Google o con email, después de elegir el equipo
 */
export default function Login() {
  const { login, signup, loginWithGoogle } = useAuth();
  const { t } = useLang();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const run = async (action) => {
    setError('');
    setBusy(true);
    try {
      await action();
    } catch (err) {
      console.error('Error de sesión:', err);
      setError(ERRORS[err.code] || 'No se pudo entrar. Inténtalo otra vez.');
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    run(() => (isLogin ? login(email, password) : signup(email, password, name)));
  };

  const input = 'w-full bg-black/30 border-4 border-white/30 text-white placeholder-white/40 px-4 py-3 outline-none focus:border-yellow-300';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-rose-700 to-red-900 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <header className="text-center mb-6">
          <h1 className="text-xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)] leading-loose">
            {t('Entra a jugar')}
          </h1>
          <p className="text-white/80 text-[10px] leading-loose mt-2">
            {t('Tu cuenta guarda quién eres para los combates Online')}
          </p>
        </header>

        <div className="bg-white/10 border-4 border-white/40 shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-5">
          {error && (
            <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-3 text-[10px] leading-loose mb-4">
              {t(error)}
            </div>
          )}

          {/* Google */}
          <button
            onClick={() => run(loginWithGoogle)}
            disabled={busy}
            className="w-full bg-white text-gray-800 font-black py-4 border-4 border-gray-800 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition disabled:opacity-50 flex items-center justify-center gap-3 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t('Entrar con Google')}
          </button>

          <p className="text-white/50 text-[9px] text-center leading-loose mb-4">{t('o con tu email')}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('Tu nombre')}
                required
                className={input}
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={input}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('Contraseña')}
              required
              className={input}
            />

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-yellow-400 text-yellow-900 font-black py-4 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition disabled:opacity-50"
            >
              {busy ? t('Entrando...') : isLogin ? t('Iniciar sesión') : t('Crear cuenta')}
            </button>
          </form>

          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="w-full text-white/70 hover:text-white mt-4 text-[10px] leading-loose"
          >
            {isLogin ? t('¿No tienes cuenta? Créala aquí') : t('¿Ya tienes cuenta? Inicia sesión')}
          </button>
        </div>

        <div className="text-center mt-5">
          <LangButton />
        </div>
      </div>
    </div>
  );
}
