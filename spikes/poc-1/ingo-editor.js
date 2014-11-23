(function() {
  var app = angular.module("ingo-editor", []);
  app.controller("BoardController", function() {
    this.stones = [
      {color: "black", position: "C2"},
      {color: "black", position: "C3"},
      {color: "white", position: "D1"},
      {color: "white", position: "E1"},
    ];
    this.symbols = [
      {type: "triangle", position: "D1"},
      {type: "triangle", position: "E1"},
    ];
  });
  app.directive("goBoard", function() {
    return {
      link: function postLink(scope, iElement, iAttrs) {
        var canvas = iElement[0];
        paper.setup(canvas);
        paper.Path.Rectangle({
          point: [0,0],
          size: paper.view.viewSize,
          strokeColor: "black"
        });
        paper.view.draw();
      }
    };
  });
})();
