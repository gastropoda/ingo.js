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
        var w = paper.view.viewSize.width, h = paper.view.viewSize.height;
        painter.setup(w,h);
        painter.drawLines();
        paper.view.draw();
      }
    };
  }]);
  app.factory("paper", function() { return window.paper; });
  app.factory("boardPainter", ["paper", function(paper) {
    var w,h,dw,dh,l,r,b,t;
    return {
      setup: function(_w,_h) {
        w = _w;
        h = _h;
        dw = w/19;
        dh = h/19;
        l = dw/2;
        r = w-dw/2;
        b = dh/2;
        t = h-dh/2;
      },
      drawLines: function() {
        for(x=l; x<w; x+=dw) {
          var line = paper.Path.Line([x,b], [x,t]);
          line.strokeColor = "black";
        }
        for(y=b; y<h; y+=dh) {
          var line = paper.Path.Line([l,y], [r,y]);
          line.strokeColor = "black";
        }
      }
    };
  }]);
})();
