// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: true, // o 'media' o 'class'
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
      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/Puerto San Antonio.jpg')",
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
