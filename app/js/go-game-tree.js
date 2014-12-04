(function() {
  angular
  .module("goGameTree", [])
  .factory("GoGameTree", function() {
    return function GoGameTree(options) {
      options = options || {};
      this._parent = options.parent;
      this._state = options.state;
      this._turnNumber = options.turnNumber;
      this._children = options.children || [];
      this._move = options.move;

      this.parent = function() { return this._parent; }
      this.state = function() { return this._state; }
      this.children = function() { return this._children; }
      this.turnNumber = function() { return this._turnNumber; }
      this.move = function() { return this._move; }
      this.addChild = function(options) {
        options = options || {};
        if (options.move) {
          var newState = this.state().deriveState(options.move);
        }
        var child = new GoGameTree({parent: this, state: newState, move: options.move});
        this._children.push(child);
        return child;
      }
      this.findChild = function(move) {
        var children = this.children();
        for(var i in children) {
          var child = children[i];
          if (child.move() === move) {
            return child;
          }
        }
      }

      if (isNaN(this._turnNumber) && this._parent && !isNaN(this.parent().turnNumber())) {
        this._turnNumber = this.parent().turnNumber() + 1;
      }
    };
  });
})();

