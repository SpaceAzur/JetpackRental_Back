module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    thresholds: {
      break: 20
      // ..
    },
    files: [
      'src/**/**.js',
      '!src/Db.js',
    ],
  });
};
