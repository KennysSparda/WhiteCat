/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#00A3E0',
      },
      textShadow: {

        blue: '3px 2px 3px rgba(255,0,0,1)',
      },
      boxShadow: {
        'inline': '0 0 55px #04a',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}