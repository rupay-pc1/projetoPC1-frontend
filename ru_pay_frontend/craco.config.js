const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib/components": path.resolve(__dirname, "src/lib/components"),
      "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
    },
  },
};
