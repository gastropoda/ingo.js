(function() {
  var app = angular.module("ingo-editor", []);
  app.controller("BoardController", ["$scope", function($scope) {
    $scope.stones = [
      {color: "black", position: "C2"},
      {color: "black", position: "C3"},
      {color: "white", position: "D1"},
      {color: "white", position: "E1"},
    ];
    $scope.marks = [
      {type: "triangle", position: "D1"},
      {type: "triangle", position: "E1"},
    ];
  }]);
  app.directive("goBoard", ["paper", "boardPainter", function(paper, painter) {
    return {
      link: function postLink($scope, iElement, iAttrs) {
        var canvas = iElement[0];
        paper.setup(canvas);
        painter.setup(paper.view.viewSize.width, paper.view.viewSize.height);
        painter.drawBoard();
        painter.drawStones($scope.stones);
        painter.drawMarks($scope.marks);
        paper.view.draw();
      }
    };
  }]);
  app.factory("paper", function() { return window.paper; });
  app.factory("boardPainter", ["paper", function(paper) {
    var board = {};
    var letters = "ABCDEFGHJKLMNOPQRST";
    var points = [ "D4", "D10", "D16", "K4", "K10", "K16", "Q4", "Q10", "Q16" ];
    var symbols = {};
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
    function positionToCoords(position) {
      return indexToCoords(positionToIndex(position));
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
    function createSymbols() {
      var shape = new paper.Path.Circle([0,0],board.stoneRadius);
      shape.fillColor = "black";
      shape.strokeColor = "white";
      shape.strokeWidth = 2;
      symbols.blackStone = new paper.Symbol(shape);
      shape = new paper.Path.Circle([0,0],board.stoneRadius);
      shape.fillColor = "white";
      shape.strokeColor = "black";
      shape.strokeWidth = 2;
      symbols.whiteStone = new paper.Symbol(shape);
      shape = new paper.Path.RegularPolygon([0,0], 3, board.symbolRadius);
      shape.strokeColor = "black";
      shape.fillColor = "black";
      symbols.triangle = new paper.Symbol(shape);
    }
    function drawStone(stone) {
      var symbol = symbols[ stone.color + "Stone" ];
      var coords = positionToCoords(stone.position);
      symbol.place(coords);
    }
    function drawMark(mark) {
      var symbol = symbols[ mark.type ];
      var coords = positionToCoords(mark.position);
      symbol.place(coords);
      console.log(mark,symbol,coords);
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
        board.stoneRadius = board.xStep * 0.45;
        board.symbolRadius = board.xStep * 0.25;
        createSymbols();
      },
      drawBoard: function() {
        drawLines();
        drawPoints();
        drawCoordinates();
      },
      drawStones: function(stones) {
        stones.map(drawStone);
      },
      drawMarks: function(marks) {
        marks.map(drawMark);
      },
    };
  }]);
})();
