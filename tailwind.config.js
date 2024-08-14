/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'header-gradient': 'linear-gradient(45deg, #007bff, #5563DE)',
        'auth-gradient': 'linear-gradient(135deg, #74ABE2 10%, #5563DE 100%)',
      },
    },
  },
  plugins: [],
};
