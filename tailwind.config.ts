import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#f5efe0',
          dark: '#e8dcc8',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#3d3628',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e2c87a',
          dark: '#8b6914',
        },
        era: {
          pre: '#1a3a2a',
          meccan: '#1a1a2e',
          medinan: '#0d1b2a',
        },
        accent: {
          red: '#8b2020',
          green: '#2d5a27',
        },
      },
      fontFamily: {
        arabic: ['var(--font-amiri)', 'serif'],
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-source-serif)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
