/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      'lavender': '#37306B',
      'purple': '#66347F',
      'magenta': '#9E4784',
      'coral': '#D27685'
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

