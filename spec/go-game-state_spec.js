describe( "GoGameState" , function() {
  beforeEach(module("goGameTree"));
  var GoGameState;
  beforeEach(inject(function(_GoGameState_) {
    GoGameState = _GoGameState_;
  }));

  function emptyState() {
    return new GoGameState();
  }

  it("is a constructor", function() {
    expect(emptyState()).to.be.instanceOf(GoGameState);
  });

  describe("constants", function() {
    it("are defined", function() {
      expect(GoGameState.WhiteStone).to.be.ok;
      expect(GoGameState.BlackStone).to.be.ok;
    });
  });

  describe("#at()", function() {
    var state;

    beforeEach(function() {
      state = new GoGameState({
        white: "a1",
        black: "b2 c3",
      });
    });

    it("defaults to falsey", function() {
      expect(emptyState().at("a1")).to.be.notOk;
    });

    it("is falsy for empty cells", function() {
      expect(state.at("z19")).to.be.notOk;
    });

    it("returns GoGameState.WhiteStone for white stone positions", function() {
      expect(state.at("a1")).to.eq(GoGameState.WhiteStone);
    });

    it("returns GoGameState.BlackStone for black stone positions", function() {
      expect(state.at("b2")).to.eq(GoGameState.BlackStone);
      expect(state.at("c3")).to.eq(GoGameState.BlackStone);
    });

  });

  describe( "#captures()" , function() {
    var state;

    beforeEach(function() {
      state = new GoGameState({
        captures: {
          white: 5,
          black: 10,
        }
      });
    });

    it("defaults to 0", function() {
      expect(emptyState().captures("white")).to.eq(0);
      expect(emptyState().captures("black")).to.eq(0);
    });

    it("reports white captures", function() {
      expect(state.captures("white")).to.eq(5);
    });

    it("reports white captures", function() {
      expect(state.captures("black")).to.eq(10);
    });
  });
});
