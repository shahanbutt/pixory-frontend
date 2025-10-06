/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-charcoal': '#1C1C1C',
        'brand-offwhite': '#F8F7F5',
        'brand-gray': '#6B6B6B',
        'charcoal': '#2D3436',
        'cream': '#F8F6F0',
        'sage': '#A8B5A0',
        'warm-gray': '#8B8680',
        'soft-brown': '#D4C4B0',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}



