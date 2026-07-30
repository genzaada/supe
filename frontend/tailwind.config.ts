import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b0f19',
        card: '#13192b',
        primary: {
          DEFAULT: '#06b6d4',
          dark: '#0284c7',
          purple: '#4c1d95',
          deep: '#1e1b4b',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        orange: {
          500: '#f97316',
        },
        gold: {
          500: '#eab308',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-supernova': 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 40%, #06b6d4 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
