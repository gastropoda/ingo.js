(function() {
  angular
  .module("goGameTree", [])
  .factory("GoGameTree", function() {
    return function GoGameTree(options) {
      options = options || {};
      this._parent = options.parent;
      this._state = options.state;
      this._children = options.children || [];
      this.parent = function() { return this._parent; }
      this.state = function() { return this._state; }
      this.children = function() { return this._children; }
    };
  });
})();

