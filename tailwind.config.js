/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        hit: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        // Animaciones del tutorial
        attack: {
          '0%, 60%, 100%': { transform: 'translate(0, 0)' },
          '30%': { transform: 'translate(28px, -14px)' }
        },
        counter: {
          '0%, 60%, 100%': { transform: 'translate(0, 0)' },
          '30%': { transform: 'translate(-28px, 14px)' }
        },
        ball: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { transform: 'translate(110px, -30px) rotate(540deg)', opacity: '1' },
          '100%': { transform: 'translate(110px, -30px) rotate(540deg)', opacity: '0' }
        },
        // Animaciones de los escenarios
        drift: {
          '0%': { transform: 'translateX(-14px)' },
          '100%': { transform: 'translateX(70px)' }
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(3px)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' }
        },
        shimmer: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '1' }
        },
        smoke: {
          '0%': { transform: 'translateY(2px)', opacity: '0.7' },
          '100%': { transform: 'translateY(-7px)', opacity: '0' }
        },
        camera: {
          '0%, 100%': { transform: 'scale(1.06) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.12) translate(-6px, -3px)' }
        },
        fill: {
          '0%': { width: '15%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        hit: 'hit 0.4s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        attack: 'attack 2s ease-in-out infinite',
        counter: 'counter 2s ease-in-out infinite 1s',
        // Embestida de una sola vez, para el combate
        lunge: 'attack 0.6s ease-in-out',
        lungeBack: 'counter 0.6s ease-in-out',
        ball: 'ball 2.2s ease-in-out infinite',
        drift: 'drift 30s linear infinite',
        driftSlow: 'drift 48s linear infinite',
        wave: 'wave 3s ease-in-out infinite',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.2s ease-in-out infinite',
        smoke: 'smoke 4s ease-in-out infinite',
        camera: 'camera 24s ease-in-out infinite',
        fill: 'fill 2.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
