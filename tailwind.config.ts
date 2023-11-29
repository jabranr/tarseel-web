import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tarseel-black': '#333',
        'tarseel-primary': '#228be6',
        'tarseel-gray-dark': '#868e96',
        'tarseel-gray': '#e9ecef',
        'tarseel-gray-light': '#f8f9fa'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
} satisfies Config;
