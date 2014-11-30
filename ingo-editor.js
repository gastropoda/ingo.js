(function() {
  angular
  .module("ingo-editor", ["go-board", "smartGame"])
  .controller("BoardController", ["$scope", "$http", "SGF", function($scope, $http, SGF) {
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

    var sgfPromise = $http.get("__go4go_20141129_Chen-Yiming_Chen-Si.sgf");
    sgfPromise.success(function(rawSgf) {
      var game = SGF.parse(rawSgf);
      console.log(game);
    });
  }]);
})();
