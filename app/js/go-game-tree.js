(function() {
  angular
  .module("goGameTree", [])
  .factory("GoGameTree", function() {
    function GoGameTree(options) {
      options = options || {};
      this._parent = options.parent;
      this._state = options.state;
      this._turnNumber = options.turnNumber;
      this._children = options.children || [];
      this._move = options.move;
      if (isNaN(this._turnNumber)
          && this._parent
          && !isNaN(this.parent().turnNumber())) {
        this._turnNumber = this.parent().turnNumber() + 1;
      }
    };

    GoGameTree.prototype = {
      parent: function() { return this._parent; },
      state: function() { return this._state; },
      children: function() { return this._children; },
      turnNumber: function() { return this._turnNumber; },
      move: function() { return this._move; },

      addChild: function(options) {
        options = options || {};
        if (options.move) {
          var newState = this.state().deriveState(options.move);
        }
        var child = new GoGameTree({
          parent: this,
          state: newState,
          move: options.move
        });
        this._children.push(child);
        return child;
      },

      findChild: function(move) {
        var children = this.children();
        for(var i in children) {
          var child = children[i];
          if (child.move() === move) {
            return child;
          }
        }
      },

      findOrAddChild: function(move) {
        return this.findChild(move) ||
          this.addChild({move: move});
      }
    }

    return GoGameTree;
  })
  .factory("GoGameState", function() {
    function scanBoardPositions(positions) {
      return positions.split(/\W+/);
    }

    function GoGameState(options) {
      this.boardStones = {};
      options = options || {};

      var stones = options.white || "";
      stones = scanBoardPositions(stones);
      for(var i in stones) {
        var position = stones[i];
        this.boardStones[position] = GoGameState.WhiteStone;
      }

      stones = options.black || "";
      stones = scanBoardPositions(stones);
      for(var i in stones) {
        var position = stones[i];
        this.boardStones[position] = GoGameState.BlackStone;
      }
    }

    GoGameState.WhiteStone = "white";
    GoGameState.BlackStone = "black";

    GoGameState.prototype = {
      at: function(position) {
        return this.boardStones[position];
      }
    };

    return GoGameState;
  });
})();
