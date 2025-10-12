/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},   // ✅ v4 plugin
    autoprefixer: {},             // optional
  },
};
