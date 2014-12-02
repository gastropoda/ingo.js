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

  describe("constructor options", function() {
    function emptyTree() {
      return new GoGameTree();
    }

    describe("parent", function() {
      it("sets parent attribute", function() {
        var tree = new GoGameTree({parent: "_parent_"});
        expect(tree.parent()).to.eq("_parent_");
      });

      it("defaults to falsey", function() {
        expect(emptyTree().parent()).to.be.falsey;
      })
    });

    describe("state", function() {
      it("sets state attribute", function() {
        var tree = new GoGameTree({state: "_state_"});
        expect(tree.state()).to.eq("_state_");
      });

      it("defaults to falsey", function() {
        expect(emptyTree().state()).to.be.falsey;
      })
    });

    describe("children", function() {
      it("sets children attribute", function() {
        var tree = new GoGameTree({children: "_children_"});
        expect(tree.children()).to.eq("_children_");
      });

      it("defaults to empty array", function() {
        expect(emptyTree().children()).to.be.empty;
      })
    });
  });
});
