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
    function GoGameState(options) {
      options = options || {};
      this._boardStones = {};
      this._captures = {};
      var captures = options.captures || {}
      this._captures.white = captures.white || 0;
      this._captures.black = captures.black || 0;
      placeStones(this._boardStones,
                  GoGameState.WhiteStone,
                  options.white || "");
      placeStones(this._boardStones,
                  GoGameState.BlackStone,
                  options.black || "");
    }

    GoGameState.WhiteStone = "white";
    GoGameState.BlackStone = "black";

    GoGameState.prototype = {
      at: function(position) {
        return this._boardStones[position];
      },

      captures: function(color) {
        return this._captures[color];
      },

      isLegalMove: function(move) {
        return true;
      },

      derive: function(move) {
        return this;
      },

      boardStones: function() {
        return [];
      },
    };

    return GoGameState;

    function scanBoardPositions(positions) {
      return positions.split(/\W+/);
    }

    function placeStones(board, color, positions) {
      positions = scanBoardPositions(positions);
      for(var i in positions) {
        var position = positions[i];
        board[position] = color;
      }
    }
  });
})();
