/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "main-color": "var(--main-color)",
        "text-color": "var(--text-color)",
        "second-color": "var(--second-color)",
        "third-color": "var(--third-color)",
        "fourth-color": "var(--fourth-color)",
        "fifth-color": "var(--fifth-color)",
        "sixth-color": "var(--sixth-color)",
        "border-color": "var(--border-color)",
        "hover-color": "var(--hover-color)"
      }
    },
  },
  plugins: [],
}

