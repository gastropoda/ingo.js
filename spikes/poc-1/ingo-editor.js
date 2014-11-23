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
  app.directive("goBoard", ["paper", "boardPainter", function(paper, painter) {
    return {
      link: function postLink(scope, iElement, iAttrs) {
        var canvas = iElement[0];
        paper.setup(canvas);
        painter.setup(paper.view.viewSize.width, paper.view.viewSize.height);
        painter.drawBoard();
        paper.view.draw();
      }
    };
  }]);
  app.factory("paper", function() { return window.paper; });
  app.factory("boardPainter", ["paper", function(paper) {
    var board = {};
    var letters = "ABCDEFGHJKLMNOPQRST";
    var points = [ "D4", "D10", "D16", "K4", "K10", "K16", "Q4", "Q10", "Q16" ];
    function drawLines() {
      for(x=board.left; x<board.width; x+=board.xStep) {
        var line = paper.Path.Line([x,board.top], [x,board.bottom]);
        line.strokeColor = "black";
      }
      for(y=board.top; y<board.height; y+=board.yStep) {
        var line = paper.Path.Line([board.left,y], [board.right,y]);
        line.strokeColor = "black";
      }
    }
    function drawPoints() {
      for(var i in points) {
        var pointPosition = points[i];
        var pointIndex = positionToIndex(pointPosition);
        var pointCoords = indexToCoords(pointIndex);
        var circle = paper.Path.Circle(pointCoords, board.pointRadius);
        circle.fillColor = "black";
        circle.strokeColor = "black";
      }
    }
    function positionToIndex(position) {
      var i = letters.indexOf(position[0]);
      var j = position.slice(1) - 1;
      return [i,j];
    }
    function indexToCoords(index) {
      return [board.left + index[0]*board.xStep, board.bottom - index[1]*board.yStep];
    }
    return {
      setup: function(_w,_h) {
        board.width = _w;
        board.height = _h;
        board.xStep = board.width/19;
        board.yStep = board.height/19;
        board.left = board.xStep/2;
        board.right = board.width-board.xStep/2;
        board.top = board.yStep/2;
        board.bottom = board.height-board.yStep/2;
        board.pointRadius = board.xStep * 0.12;
      },
      drawBoard: function() {
        drawLines();
        drawPoints();
      },
    };
  }]);
})();
