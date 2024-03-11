import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "recoleta": ['Recoleta Alt', 'sans']
      },
      boxShadow: {
        "custom": "4px 4px 0 0 black",
        "yellow-dark": "4px 4px 0 0 #945219"
      },
      colors: {
        "yellow": "#F7C396",
        "yellow-dark": "#945219",
        "blue": "#C1C8FB",
        "blue-dark": "#3C2B84",
        "red": "#F18C84",
        "red-dark": "#7C1D19",
        "pink": "#EE9BB1",
        "pink-dark": "#6C1A45",
        "green": "#D6F5D1",
        "green-dark": "#465B43",
      }
    },
  },
  plugins: [],
};
export default config;
