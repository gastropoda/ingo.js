describe("GoGameTree", function() {
  var GoGameTree;
  beforeEach(module("goGameTree"));
  beforeEach(inject(function(_GoGameTree_) {
    GoGameTree = _GoGameTree_;
  }));

  var emptyTree, thisTree, child, otherChild;
  var initialState, derivedState;
  beforeEach(function() {
    emptyTree = new GoGameTree();
    derivedState = {};
    initialState = { deriveState: sinon.stub().returns(derivedState) };
  });

  it("is a constructor", function() {
    expect(emptyTree).to.be.instanceOf(GoGameTree);
  });

  describe("#parent()", function() {
    it("defaults to falsey", function() {
      expect(emptyTree.parent()).to.not.exist;
    });

    it("is initialized with constructor option", function() {
      var parent = { turnNumber: sinon.stub() };
      var tree = new GoGameTree({parent: parent});
      expect(tree.parent()).to.eq(parent);
    });
  });

  describe("#state()", function() {
    it("defaults to falsey", function() {
      expect(emptyTree.state()).to.not.exist;
    });

    it("is initialized with constructor option", function() {
      var tree = new GoGameTree({state: "_state_"});
      expect(tree.state()).to.eq("_state_");
    });
  });

  describe("#turnNumber()", function() {
    context("without parent", function() {
      it("defaults to falsey", function() {
        expect(emptyTree.turnNumber()).to.not.exist;
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
      expect(emptyTree.children()).to.be.empty;
    });

    it("is initialized with constructor option", function() {
      var tree = new GoGameTree({children: "_children_"});
      expect(tree.children()).to.eq("_children_");
    });
  });

  describe("#move()", function() {
    it("defaults to falsey", function() {
      expect(emptyTree.move()).to.not.exist;
    });

    it("is initialized with constructor option", function() {
      var tree = new GoGameTree({move: "_move_"});
      expect(tree.move()).to.eq("_move_");
    });
  });

  describe("#addChild()", function() {
    it("add child to tree's children", function() {
      thisTree = new GoGameTree();
      child = thisTree.addChild();
      expect(thisTree.children()).to.contain(child);
    });

    it("sets child's parent to this tree", function() {
      thisTree = new GoGameTree();
      child = thisTree.addChild();
      expect(child.parent()).to.eq(thisTree);
    });

    it("sets child's turnNumber to one more than this tree's", function() {
      thisTree = new GoGameTree({turnNumber: 41});
      child = thisTree.addChild();
      expect(child.turnNumber()).to.eq(42);
    });

    context("given 'move' option", function() {
      beforeEach(function() {
        thisTree = new GoGameTree({state: initialState});
        child = thisTree.addChild({move: "_move_"});
      });

      it( "sets child's move to it" , function() {
        expect(child.move()).to.eq("_move_");
      });

      it( "derives new state using move" , function() {
        expect(child.state()).to.eq(derivedState);
      });
    });
  });

  describe("#findChild()", function() {
    beforeEach(function() {
      thisTree = new GoGameTree({state: initialState});
      child = thisTree.addChild({move: "_move_"});
      otherChild = thisTree.addChild({move: "_other_move_"});
    });

    context("a child with given move exists", function() {
      it("returns the child", function() {
        expect(thisTree.findChild("_move_")).to.eq(child);
        expect(thisTree.findChild("_other_move_")).to.eq(otherChild);
      });
    });

    context("no child with given move exists", function() {
      it("returns falsey", function() {
        expect(thisTree.findChild("_no_such_move_")).to.not.exist;
      });
    });
  });

  describe("#findOrAddChild()", function() {
    beforeEach(function() {
      thisTree = new GoGameTree({state: initialState});
      child = thisTree.addChild({move: "_move_"});
      otherChild = thisTree.addChild({move: "_other_move_"});
    });

    context("a child with given move exists", function() {
      it("returns the child", function() {
        expect(thisTree.findOrAddChild("_move_")).to.eq(child);
        expect(thisTree.findOrAddChild("_other_move_")).to.eq(otherChild);
      });
    });

    context("no child with given move exists", function() {
      it("adds a new child", function() {
        var result = thisTree.findOrAddChild("_no_such_move_");
        expect(result).to.be.instanceof(GoGameTree);
      });
    });
  });
});
