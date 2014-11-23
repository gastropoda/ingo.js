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
      for(var i = 0; i<19; i++) {
        var x = board.left + i * board.xStep;
        var line = paper.Path.Line([x, board.top], [x, board.bottom]);
        line.strokeColor = "black";
      }
      for(var j = 0; j<19; j++) {
        var y = board.top + j * board.yStep;
        var line = paper.Path.Line([board.left, y], [board.right, y]);
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
    function drawCoordinates() {
      var fontSize = board.yStep * 0.4 + "px";
      for(var i in letters) {
        var letter = letters[i];
        var x = board.left + i * board.xStep, y = board.height;
        new paper.PointText({
          point: [x,y],
          content: letter,
          fillColor: "black",
          fontSize: fontSize,
          justification: "center",
        });
        y = board.top - 3;
        new paper.PointText({
          point: [x,y],
          content: letter,
          fillColor: "black",
          fontSize: fontSize,
          justification: "center",
        });
      }
      for(var j = 0; j < 19; j++) {
        var coord = j+1;
        var x = board.left - 3, y = board.bottom - j * board.yStep + 0.15 * board.yStep;
        new paper.PointText({
          point: [x,y],
          content: coord,
          fillColor: "black",
          fontSize: fontSize,
          justification: "right",
        });
        x = board.right + 3;
        new paper.PointText({
          point: [x,y],
          content: coord,
          fillColor: "black",
          fontSize: fontSize,
          justification: "left",
        });
      }
    }
    return {
      setup: function(_w,_h) {
        board.width = _w;
        board.height = _h;
        board.xStep = board.yStep = Math.min(board.width/19, board.height/19);
        board.left = (board.width - 18 * board.xStep) / 2;
        board.right = board.width - board.left;
        board.top =  (board.height - 18 * board.yStep) / 2;
        board.bottom = board.height - board.top;
        board.pointRadius = board.xStep * 0.12;
      },
      drawBoard: function() {
        drawLines();
        drawPoints();
        drawCoordinates();
      },
    };
  }]);
})();
