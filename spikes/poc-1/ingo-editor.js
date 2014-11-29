(function() {
  var app = angular.module("ingo-editor", ["go-board"]);
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
})();
