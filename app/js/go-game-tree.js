(function() {
  angular
  .module("goGameTree", [])
  .factory("GoGameTree", function() {
    return function GoGameTree() {
      this._parent = null;
      this._state = null;
      this._children = [];
      this.parent = function() { return this._parent; }
      this.state = function() { return this._state; }
      this.children = function() { return this._children; }
    };
  });
})();

