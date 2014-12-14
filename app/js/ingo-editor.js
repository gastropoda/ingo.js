(function() {
  angular
  .module("ingoEditor", ["goBoard", "goGameTree", "ui.bootstrap"])
  .controller("BoardController", ["$scope", "GoGameState", function($scope, GoGameState) {
    $scope.currentState = GoGameState.fromStrings(
      "..B",
      "..B",
      "...WW"
    );
    $scope.nextGameState = function() {
      console.log("next state");
    };
    $scope.prevGameState = function() {
      console.log("previous state");
    };
  }]);
})();
