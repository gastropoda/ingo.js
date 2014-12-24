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
    function listNeighbours(position) {
      var ij = positionToIndex(position), i=ij[0], j=ij[1];
      var neighbours = [];
      if (i>0) neighbours.push( [i-1,j] );
      if (i<18) neighbours.push( [i+1,j] );
      if (j>0) neighbours.push( [i,j-1] );
      if (j<18) neighbours.push( [i,j+1] );
      return neighbours.map(indexToPosition);
    }
    function findChains(boardStones) {
      var chainsMap = {};
      var chainsList = [];
      for(var position in boardStones) {
        var color = boardStones[position];
        var chain = chainsMap[position] || newChain(position, color);
        listNeighbours(position).forEach(processNeighbour, {
          color: color,
          chain: chain
        });
      }
      return chainsList;

      function newChain(position, color) {
        var chain = {
          stones: [ position ],
          liberties: [],
          color: color,
        };
        chainsList.push(chain);
        chainsMap[position] = chain;
        return chain;
      }

      function processNeighbour(neighbour) {
        if (boardStones[neighbour] === this.color && !chainsMap[neighbour]) {
          chainsMap[neighbour] = this.chain;
          this.chain.stones.push(neighbour);
        } else if ( !boardStones[neighbour] && this.chain.liberties.indexOf(neighbour) < 0) {
          this.chain.liberties.push(neighbour);
        }
      }
    }

    function GoGameState(options) {
      options = options || {};
      this._boardStones = {};
      this._prisoners = {};
      var prisoners = options.prisoners || {}
      this._prisoners.white = prisoners.white || 0;
      this._prisoners.black = prisoners.black || 0;
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

      prisoners: function(color) {
        return this._prisoners[color];
      },

      isLegalMove: function(move) {
        var positions = Object.keys(move);
        var movePosition = positions[0];
        var moveColor = move[movePosition];
        var freePlace = movePosition && !this.at(movePosition);
        return !!(positions.length === 1 && this.nextTurnColor(moveColor) && freePlace);
      },

      deriveState: function(move) {
        if (!this.isLegalMove(move)) {
          throw GoGameState.IllegalMove;
        }
        var derivedState = new GoGameState({
          nextTurnColor: this.nextTurnColor()==="black"?"white":"black"
        });
        derivedState._boardStones = angular.extend({}, this._boardStones, move);
        return derivedState;
      },

      findChains: function() {
        return findChains(this._boardStones);
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
