module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
const path = require('path');

module.exports = {
  // Other configuration settings
  output: {
    path: path.resolve(__dirname, 'dist'), // Path to your output directory
    filename: '[name].bundle.js', // Output filename pattern
    publicPath: '/', // This ensures assets are served from the root URL
  },
  // Additional configurations like loaders and plugins
};
