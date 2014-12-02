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

  describe("#parent()", function() {
    it("defaults to falsey", function() {
      expect(emptyTree().parent()).to.be.falsey;
    });

    it("is initialized with constructor option", function() {
      var parent = { turnNumber: sinon.stub() };
      var tree = new GoGameTree({parent: parent});
      expect(tree.parent()).to.eq(parent);
    });
  });

  describe("#state()", function() {
    it("defaults to falsey", function() {
      expect(emptyTree().state()).to.be.falsey;
    });

    it("is initialized with constructor option", function() {
      var tree = new GoGameTree({state: "_state_"});
      expect(tree.state()).to.eq("_state_");
    });
  });

  describe("#turnNumber()", function() {
    context("without parent", function() {
      it("defaults to falsey", function() {
        expect(emptyTree().turnNumber()).to.be.falsey;
      });
    });

    context("with parent", function() {
      it( "defaults to one more than parent's" , function() {
        var parent = { turnNumber: sinon.stub().returns(1) };
        var tree = new GoGameTree({parent: parent});
        expect(tree.turnNumber()).to.eq(2);
      });
    });

    it("is initialized with constructor option", function() {
      var tree = new GoGameTree({turnNumber: "_turnNumber_"});
      expect(tree.turnNumber()).to.eq("_turnNumber_");
    });
  });

  describe("#children()", function() {
    it("defaults to an empty array", function() {
      expect(emptyTree().children()).to.be.empty;
    });

    it("is initialized with constructor option", function() {
      var tree = new GoGameTree({children: "_children_"});
      expect(tree.children()).to.eq("_children_");
    });
  });

  describe("#move()", function() {
    it("defaults to falsey", function() {
      expect(emptyTree().move()).to.be.falsey;
    });

    it("is initialized with constructor option", function() {
      var tree = new GoGameTree({move: "_move_"});
      expect(tree.move()).to.eq("_move_");
    });
  });
});
