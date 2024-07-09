// tailwind.config.js
module.exports = {
    mode: 'jit',
    purge: [
      './index.html',
      './src/**/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: false, // o 'media' o 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  