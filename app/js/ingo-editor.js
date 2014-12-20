(function() {
  angular
  .module("ingoEditor", ["goBoard", "goGameTree", "ui.bootstrap"])
  .controller("BoardController",
              ["$scope", "GoGameState", "GoGameTree",
                function($scope, GoGameState, GoGameTree) {
    function setCurrentNode(node) {
      if (node) {
        $scope.currentNode = node;
        $scope.currentState = $scope.currentNode.state();
      }
    }

    var rootNode = new GoGameTree({
      state: new GoGameState(),
      turnNumber: 0
    });

    var node = rootNode;
    node = node.addChild({move: {C2: "black"}});
    node = node.addChild({move: {D1: "white"}});
    node = node.addChild({move: {C3: "black"}});
    node = node.addChild({move: {E1: "white"}});
    setCurrentNode(node);

    $scope.nextGameState = function() {
      setCurrentNode($scope.currentNode.children()[0]);
    };
    $scope.prevGameState = function() {
      setCurrentNode($scope.currentNode.parent());
    };
  }]);
})();
