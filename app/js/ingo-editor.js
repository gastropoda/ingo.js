(function() {
  angular
  .module("ingoEditor", ["goBoard", "goGameTree", "ui.bootstrap"])
  .controller("BoardController",
              ["$scope", "GoGameState", "GoGameTree",
                function($scope, GoGameState, GoGameTree) {
    $scope.nextGameState = function() {
      console.log("next state");
    };
    $scope.prevGameState = function() {
      console.log("previous state");
    };

    var rootNode = new GoGameTree({
      state: new GoGameState(),
      turnNumber: 0
    }), node = rootNode;
    node = node.addChild({move: {black: "C2"}});
    node = node.addChild({move: {white: "D1"}});
    node = node.addChild({move: {black: "C3"}});
    node = node.addChild({move: {white: "E1"}});

    $scope.currentState = node.state();
  }]);
})();
