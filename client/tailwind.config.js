/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'Fira Mono',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
        display: [
          'Oswald',
          'system-ui',
          'sans-serif',
        ],
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        recruiter: {
          bg: '#F8FAFC',
          fg: '#0F172A',
          primary: '#3B82F6',
          accent: '#10B981',
          border: '#CBD5E1',
          subtle: '#E2E8F0',
          highlight: '#FACC15',
        },
        client: {
          bg: '#0F172A',
          fg: '#E2E8F0',
          primary: '#22D3EE',
          accent: '#F59E0B',
          border: '#334155',
          subtle: '#1E293B',
          highlight: '#84CC16',
        },
        developer: {
          bg: '#020617',
          fg: '#F8FAFC',
          primary: '#7C3AED',
          accent: '#0EA5E9',
          border: '#1E293B',
          subtle: '#111827',
          highlight: '#F472B6',
        },
        poet: {
          bg: '#1C0C2E',
          fg: '#F3E8FF',
          primary: '#C084FC',
          accent: '#FB7185',
          border: '#6B21A8',
          subtle: '#2E1065',
          highlight: '#FACC15',
        },
      },
    },
  },
  plugins: [],
}

