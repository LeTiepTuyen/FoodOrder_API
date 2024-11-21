/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./views/**/*.ejs",  // Quét tất cả các file EJS trong thư mục views và các thư mục con.
    "./public/**/*.js", 
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'], // Font cho title và navigation // Định nghĩa font Poppins
      },
      colors: {
        primary: '#ff6f61', // Modern primary color
        secondary: '#ffcc00', // Secondary color
        accent: '#4caf50', // Accent color
        background: '#f7f7f7', // Background color
        textPrimary: '#333333', // Primary text color
        textSecondary: '#666666', // Secondary text color
        footerBackground: '#2d3748', // Footer background color
        footerText: '#cbd5e0', // Lighter footer text color
      },
    },
  },
  plugins: [],
}

