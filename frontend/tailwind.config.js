/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        "white": "0 2px 4px -1px rgba(255, 255, 255, 0.1), 0 1px 1px -1px rgba(255, 255, 255, 0.06)"
      },
      colors:{
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        "black": "#000112",
        "very-dark-grey": "#20212C", // Remove unnecessary descriptions in names
        "dark-grey": "#2B2C37",
        "lines-dark": "#3E3F4E",
        "medium-grey": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-grey": "#F4F7FD",
        "white": "#FFFFFF",
        "red": "#EA5555",
        "red-hover": "#FF9898",

        // Dark mode colors
        
        "dark-grey-border": "#3E3F4E", // grey border
        "dark-very-dark-grey": "#20212C", // for bg
        "dark-dark-grey": "#2B2C37", // for bg on sidebar and header

        "dark-main-purple": "#A8A4FF",  // Lighter purple for dark mode
        "dark-lines-dark": "#828FA3", // Greyish lines for dark mode
        "dark-medium-grey": "#E4EBFA", // Light grey for dark mode
        "dark-lines-light": "#3E3F4E", // Darker lines for dark mode
        "dark-light-grey": "#2B2C37", // Dark grey for light grey areas
        "dark-white": "#2B2C37", // Inverse white
        "dark-red": "#FF9898", // Lighter red for dark mode
      },
      fontFamily: {
        'jakarta': ["Plus Jakarta Sans", 'sans-serif'],
      },
      fontSize:{
        "Heading-XL": ["1.5rem", {
          lineHeight: "2rem",
          fontWeight: "bold"
        }],
        "Heading-L": ["1.2rem", {
          lineHeight: "1.5rem",
          fontWeight: "bold"
        }],
        "Heading-M": ["1rem", {
          lineHeight: "1.189rem",
          fontWeight: "bold"
        }],
        "Heading-S": ["0.75rem", {
          lineHeight: "1rem",
          fontWeight: "bold"
        }],
        "Body-L": ["1rem", {
          lineHeight: "1.44rem",
          fontWeight: "medium"
        }],
        "Body-M": ["0.75rem", {
          lineHeight: "1rem",
          fontWeight: "bold"
        }],

      }
    },
  },
  plugins: [],
}

