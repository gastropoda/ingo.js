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
});
