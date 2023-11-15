/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue': '#06b8bf',
      'orange': '#f6p31c',
    },
    screens: {
      "mobile": "400px",
      "large-mobile": "768px",
      "tablet": "992px",
      "laptop": "1024px",
      "desktop": "1280px",
      "large-desktop": "1536px",
    },
    extend: {
      gridTemplateColumns: {
        '1': 'repeat(1, minmax(0, 1fr))',
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
