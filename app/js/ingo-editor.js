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
    node = node.addChild({move: {black: "C2"}});
    node = node.addChild({move: {white: "D1"}});
    node = node.addChild({move: {black: "C3"}});
    node = node.addChild({move: {white: "E1"}});
    setCurrentNode(node);

    $scope.nextGameState = function() {
      setCurrentNode($scope.currentNode.children()[0]);
    };
    $scope.prevGameState = function() {
      setCurrentNode($scope.currentNode.parent());
    };
  }]);
})();
