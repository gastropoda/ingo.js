describe("GoGameTree", function() {
  beforeEach(module("goGameTree"));

  var GoGameTree;
  beforeEach(inject(function(_GoGameTree_) {
    GoGameTree = _GoGameTree_;
  }));

  it("is a constructor", function() {
    var tree = new GoGameTree();
    expect(tree).to.be.instanceOf(GoGameTree);
  });

  describe("fresh instance", function() {
    beforeEach(function() {
      this.tree = new GoGameTree();
    });

    it("has no parent", function() {
      expect(this.tree.parent()).to.be.null;
    });

    it("has no state", function() {
      expect(this.tree.state()).to.be.null;
    });

    it("has no children", function() {
      expect(this.tree.children()).to.be.empty;
    });
  });
});
