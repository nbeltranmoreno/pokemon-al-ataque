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
        fill: 'fill 2.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
