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

    GoGameTree.prototype.parent = function() { return this._parent; }
    GoGameTree.prototype.state = function() { return this._state; }
    GoGameTree.prototype.children = function() { return this._children; }
    GoGameTree.prototype.turnNumber = function() { return this._turnNumber; }
    GoGameTree.prototype.move = function() { return this._move; }
    GoGameTree.prototype.addChild = function(options) {
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
    }
    GoGameTree.prototype.findChild = function(move) {
      var children = this.children();
      for(var i in children) {
        var child = children[i];
        if (child.move() === move) {
          return child;
        }
      }
    }
    GoGameTree.prototype.findOrAddChild = function(move) {
      return this.findChild(move) ||
        this.addChild({move: move});
    }

    return GoGameTree;
  });
})();

