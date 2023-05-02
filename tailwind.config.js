/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './packages/apps/web-app/index.html',
    './packages/apps/web-app/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        hero: '21 / 9',
      },
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/line-clamp'),
  ],
};
