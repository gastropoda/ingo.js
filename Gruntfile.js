module.exports = function(grunt) {
  grunt.initConfig({
    peg: {
      sgf: {
        src: "app/js/sgf.pegjs",
        dest: "app/js/sgf.js",
        options: {
          angular: {
            module: "sgf",
            factory: "sgfParser"
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-peg');
};
