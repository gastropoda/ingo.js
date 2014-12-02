describe("GoGameTree", function() {
  beforeEach(module("goGameTree"));

  var GoGameTree;
  beforeEach(inject(function(_GoGameTree_) {
    GoGameTree = _GoGameTree_;
  }));

  function emptyTree() {
    return new GoGameTree();
  }

  it("is a constructor", function() {
    expect(emptyTree()).to.be.instanceOf(GoGameTree);
  });

  describe("constructor options", function() {
    describe("parent", function() {
      it("sets parent attribute", function() {
        var parent = { turnNumber: sinon.stub() };
        var tree = new GoGameTree({parent: parent});
        expect(tree.parent()).to.eq(parent);
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

    describe("turnNumber", function() {
      it("sets turnNumber attribute", function() {
        var tree = new GoGameTree({turnNumber: "_turnNumber_"});
        expect(tree.turnNumber()).to.eq("_turnNumber_");
      });

      it("defaults to falsey", function() {
        expect(emptyTree().turnNumber()).to.be.falsey;
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

  describe( "turnNumber" , function() {
    context( "with parent", function() {
      it( "is one more than parent's" , function() {
        var parent = { turnNumber: sinon.stub().returns(1) };
        var tree = new GoGameTree({parent: parent});
        expect(tree.turnNumber()).to.eq(2);
      });
    });
  });
});
