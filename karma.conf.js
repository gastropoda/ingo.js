module.exports = function(config){
  config.set({
    basePath : "",
    frameworks: ["mocha", "sinon-chai"],
    files : [
      "app/bower_components/angular/angular.js",
      "app/bower_components/angular-mocks/angular-mocks.js",
      "app/js/**/*.js",
      "spec/**/*_spec.js",
    ],
    autoWatch : true,
    browsers : ["PhantomJS"],
    reporters: ["mocha"],
    plugins : [
      "karma-phantomjs-launcher",
      "karma-mocha",
      "karma-mocha-reporter",
      "karma-sinon-chai"
    ],
  });
};
