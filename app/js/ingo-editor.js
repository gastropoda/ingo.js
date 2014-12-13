(function() {
  angular
  .module("ingoEditor", ["goBoard", "goGameTree"])
  .controller("BoardController", ["$scope", "GoGameState", function($scope, GoGameState) {
    $scope.currentState = GoGameState.fromStrings(
      "..B",
      "..B",
      "...WW"
    );
  }]);
})();
