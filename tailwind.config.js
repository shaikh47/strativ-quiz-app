/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sp: { min: "0px", max: "639px" },
        tablet: { min: "640px", max: "1279px" },
        laptop: { min: "1280px", max: "1919px" },
        desktop: { min: "1920px" },
      },
    },
  },
  plugins: [],
};
