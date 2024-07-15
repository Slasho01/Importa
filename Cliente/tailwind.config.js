// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // o 'media' o 'class'
  theme: {
    extend: {
      colors: {
        'Theme-selected': {
          DEFAULT: '#3B82F6', // Base blue color
          50: '#FEFCE8',      // Light yellow
          100: '#FEF9C3',     // Very light yellow
          200: '#DBEAFE',     // Very light blue
          300: '#FDE68A',     // Light yellow
          400: '#93C5FD',     // Light blue
          500: '#3B82F6',     // Default blue
          600: '#2563EB',     // Slightly darker blue
          700: '#FBBF24',     // Base yellow color
          800: '#D97706',     // Darker yellow
          900: '#FFFFFF',     // White
          950: '#F3F4F6'      // Very light grey (near white)
        },
        'great-blue': {
          DEFAULT: '#2A669F',
          50: '#E4F7F8',
          100: '#CCEEF2',
          200: '#9CD7E5',
          300: '#6CB9D8',
          400: '#3B94CB',
          500: '#2A669F',
          600: '#234B83',
          700: '#1B3366',
          800: '#14204A',
          900: '#0C102E'
        },
        'golden-sand': { 
          DEFAULT: '#F0D775',
          50: '#FCF8E6', 
          100: '#FAF3D6', 
          200: '#F8E7A0', 
          300: '#F1DB83', 
          400: '#F0D775', 
          500: '#EBCB4C', 
          600: '#E7BF23', 
          700: '#937910', 
          800: '#604F0B', 
          900: '#735E0D', 
          950: '#5E4D0A' },
      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/Puerto San Antonio.jpg')",
        'logo': "url('./src/assets/pngegg.png')",
      },
      filter: { // Agregamos filtros personalizados
        'blur-3': 'blur(3px)',
        'sepia-50': 'sepia(50%)',
      },
    },
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'], // Activamos variantes de filtro para hover y focus
    },
  },
  plugins: [],
};
