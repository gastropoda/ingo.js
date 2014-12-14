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
    var letters = "ABCDEFGHJKLMNOPQRST";
    function indexToPosition(index) {
      var i = index[0], j = index[1] + 1;
      return letters[i] + j.toString();
    }
    function positionToIndex(position) {
      var i = letters.indexOf(position[0]);
      var j = position.slice(1) - 1;
      return [i,j];
    }

    function GoGameState(options) {
      options = options || {};
      this._boardStones = {};
      this._captures = {};
      var captures = options.captures || {}
      this._captures.white = captures.white || 0;
      this._captures.black = captures.black || 0;
      this._nextTurnColor = options.nextTurnColor || "black";
      placeStones(this._boardStones, GoGameState.WhiteStone, options.white || []);
      placeStones(this._boardStones, GoGameState.BlackStone, options.black || []);
    }

    GoGameState.WhiteStone = "white";
    GoGameState.BlackStone = "black";
    GoGameState.IllegalMove = "Illegal move";

    GoGameState.fromStrings = function() {
      var strings = Array.prototype.slice.call(arguments)
      strings.reverse();
      var opts = strings[0] instanceof Object ? strings.shift() : {};
      opts.black = [];
      opts.white = [];
      var offset = positionToIndex(opts.offset || "A1");
      var i0 = offset[0];
      var j0 = offset[1];
      for(var j in strings) {
        j-=0;
        var string = strings[j].toUpperCase();
        for(var i in string) {
          i-=0;
          var symbol = string[i];
          var position = indexToPosition([i0 + i, j0 + j]);
          switch(symbol) {
            case "B":
              opts.black.push(position);
            break;
            case "W":
              opts.white.push(position);
            break;
          }
        }
      }
      return new GoGameState(opts);
    }

    GoGameState.prototype = {
      at: function(position) {
        return this._boardStones[position.toUpperCase()];
      },

      captures: function(color) {
        return this._captures[color];
      },

      isLegalMove: function(move) {
        var moveColor = move.white ? "white" : "black";
        var movePosition = move.white || move.black;
        var freePlace = movePosition && !this.at(movePosition);
        if (move.white && move.black || !movePosition) return false;
        return !!(this.nextTurnColor(moveColor) && freePlace);
      },

      deriveState: function(move) {
        if (!this.isLegalMove(move)) {
          throw GoGameState.IllegalMove;
        }
        var derivedState = new GoGameState({ });
        derivedState._boardStones = angular.extend({}, this._boardStones);
        placeStones(derivedState._boardStones, GoGameState.BlackStone, move.black && [move.black] || []);
        placeStones(derivedState._boardStones, GoGameState.WhiteStone, move.white && [move.white] || []);
        return derivedState;
      },

      boardStones: function() {
        var stones = [];
        for(var position in this._boardStones) {
          if (!this._boardStones.hasOwnProperty(position)) continue;
          stones.push({
            position: position,
            color: this._boardStones[position]
          });
        }
        return stones;
      },

      nextTurnColor: function(color) {
        if (color === undefined) {
          return this._nextTurnColor;
        } else {
          return this._nextTurnColor === color;
        }
      }
    };

    return GoGameState;

    function placeStones(board, color, positions) {
      for(var i in positions) {
        var position = positions[i].toUpperCase();
        board[position] = color;
      }
    }
  });
})();
