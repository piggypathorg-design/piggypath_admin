/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wow: {
          navy: '#0D0D2B',
          violet: '#1A0D3D',
          teal: '#00D4C8',
          lime: '#B8F400',
          lavender: '#8B5CF6',
          text: '#E8E8F0',
          muted: '#A89CC8',
          inactive: '#4A4A6A',
        },
        px: {
          void:    '#0A0A1A',
          deep:    '#0D0D2B',
          panel:   '#12123A',
          raised:  '#1A1A4A',
          teal:    '#00D4C8',
          lime:    '#B8F400',
          violet:  '#8B5CF6',
          flame:   '#F97316',
          navy:    '#29366F',
          ink:     '#1A1C2C',
          cobalt:  '#3B5DC9',
          crimson: '#B13E53',
          sky:     '#41A6F6',
          peach:   '#EF7D57',
          cyan:    '#73EFF7',
          gold:    '#FFCD75',
          snow:    '#F4F4F4',
          sage:    '#A7F070',
          ash:     '#94B0C2',
          inactive: '#566C86',
          muted:   '#94B0C2',
          text:    '#F4F4F4',
        }
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      fontSize: {
        'xs': '11px',
        'sm': '13px',
        'base': '15px',
        'md': '18px',
        'lg': '24px',
        'xl': '36px',
      },
      letterSpacing: {
        'caps': '0.1em',
      },
      boxShadow: {
        'pixel-teal':    '4px 4px 0px #004A45',
        'pixel-lime':    '4px 4px 0px #3D5200',
        'pixel-violet':  '4px 4px 0px #2D1A60',
        'pixel-flame':   '4px 4px 0px #7A3800',
        'pixel-gold':    '4px 4px 0px #6B4F00',
        'pixel-dark':    '4px 4px 0px #0A0A1A',
        'pixel-sm-teal': '2px 2px 0px #004A45',
        'pixel-sm-dark': '2px 2px 0px #0A0A1A',
      },
      borderRadius: {
        DEFAULT: '0px',
        'sm':   '0px',
        'md':   '0px',
        'lg':   '4px',
        'xl':   '4px',
        '2xl':  '4px',
      },
      animation: {
        'pixel-blink': 'blink 1s steps(1) infinite',
        'pixel-float': 'float 2s steps(4) infinite',
        'mascot-bounce': 'mascot-bounce 2.5s ease-in-out infinite', // Gentle breathing
        'mascot-fast-bounce': 'mascot-fast-bounce 0.8s ease-in-out infinite', // Subtle giggle
        'mascot-float': 'mascot-float 4s ease-in-out infinite', // Very slow hover
        'mascot-wiggle': 'mascot-wiggle 3s ease-in-out infinite', // Soft head tilt
        'mascot-shake': 'mascot-shake 0.4s ease-in-out infinite', // Micro vibration
        'mascot-pulse': 'mascot-pulse 2s ease-in-out infinite', // Heartbeat
        'mascot-pop': 'mascot-pop 2.5s ease-in-out infinite', // Slight alert
        'mascot-surprise': 'mascot-surprise 3s ease-in-out infinite', // Quick intake of breath
        'mascot-droop': 'mascot-droop 4s ease-in-out infinite', // Slow sigh
        'mascot-sleep': 'mascot-sleep 5s ease-in-out infinite', // Deep slow breathing
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        'mascot-bounce': { '0%, 100%': { transform: 'scaleY(1)' }, '50%': { transform: 'scaleY(1.03) translateY(-1%)' } },
        'mascot-fast-bounce': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-2%)' } },
        'mascot-float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-3%)' } },
        'mascot-wiggle': { '0%, 100%': { transform: 'rotate(0deg)' }, '25%': { transform: 'rotate(-2deg)' }, '75%': { transform: 'rotate(2deg)' } },
        'mascot-shake': { '0%, 100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-2%)' }, '75%': { transform: 'translateX(2%)' } },
        'mascot-pulse': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.04)' } },
        'mascot-pop': { '0%, 100%': { transform: 'scale(1)' }, '20%': { transform: 'scale(1.05)' }, '40%': { transform: 'scale(1)' } },
        'mascot-surprise': { '0%, 100%': { transform: 'translateY(0)' }, '15%': { transform: 'translateY(-4%) scale(1.02)' }, '30%': { transform: 'translateY(0)' } },
        'mascot-droop': { '0%, 100%': { transform: 'translateY(0) scaleY(1)' }, '50%': { transform: 'translateY(3%) scaleY(0.97)' } },
        'mascot-sleep': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.03) scaleX(1.01)' } },
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
