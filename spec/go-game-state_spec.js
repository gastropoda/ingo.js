describe( "GoGameState" , function() {
  var GoGameState;
  beforeEach(module("goGameTree"));
  beforeEach(inject(function(_GoGameState_) {
    GoGameState = _GoGameState_;
  }));

  var emptyState, state;
  beforeEach(function() {
    emptyState = new GoGameState();
  });

  it("is a constructor", function() {
    expect(emptyState).to.be.instanceOf(GoGameState);
  });

  describe("constants", function() {
    it("are defined", function() {
      expect(GoGameState.WhiteStone).to.be.ok;
      expect(GoGameState.BlackStone).to.be.ok;
    });
  });

  describe("#at()", function() {
    beforeEach(function() {
      state = new GoGameState({
        white: "a1",
        black: "b2 c3",
      });
    });

    it("defaults to falsey", function() {
      expect(emptyState.at("a1")).to.not.exist;
    });

    it("is falsy for empty positions", function() {
      expect(state.at("z19")).to.not.exist;
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

    beforeEach(function() {
      state = new GoGameState({
        captures: {
          white: 5,
          black: 10,
        }
      });
    });

    it("defaults to 0", function() {
      expect(emptyState.captures("white")).to.eq(0);
      expect(emptyState.captures("black")).to.eq(0);
    });

    it("reports white captures", function() {
      expect(state.captures("white")).to.eq(5);
    });

    it("reports black captures", function() {
      expect(state.captures("black")).to.eq(10);
    });
  });

  describe("#nextTurnColor()", function() {
    it("defaults to black", function() {
      expect(emptyState.nextTurnColor()).to.eq("black");
    });

    it("is initialized with constructor option", function() {
      state = new GoGameState({nextTurnColor: "white"});
      expect(state.nextTurnColor()).to.eq("white");
    });

    context("given an argument", function() {
      it("compares it to the attribute", function() {
        state = new GoGameState({nextTurnColor: "white"});
        expect(state.nextTurnColor("white")).to.be.ok;
        expect(state.nextTurnColor("black")).to.not.be.ok;

        state = new GoGameState({nextTurnColor: "black"});
        expect(state.nextTurnColor("black")).to.be.ok;
        expect(state.nextTurnColor("white")).to.not.be.ok;
      });
    });
  });

  describe( "#isLegalMove()" , function() {
    it("isn't if position is occupied", function() {
      state = new GoGameState({white: "a1"});
      expect(state.isLegalMove({black: "a1"})).to.not.be.ok;
    });

    context("white's turn", function() {
      it("is false for black", function() {
        state = new GoGameState({nextTurnColor: "white"});
        expect(state.isLegalMove({black: "a1"})).to.not.be.ok;
      });
    });

    context("black's turn", function() {
      it("is false for white", function() {
        state = new GoGameState({nextTurnColor: "black"});
        expect(state.isLegalMove({white: "a1"})).to.not.be.ok;
      });
    });

    it("isn't if both colors are present", function() {
      expect(emptyState.isLegalMove({white: "a1", black: "b2"})).to.not.be.ok;
    });

    it("isn't if no color is present", function() {
      expect(emptyState.isLegalMove({})).to.not.be.ok;
    });

    it("isn't if move is a suicide");
    it("isn't if move is illegal ko");
  });

  describe( "#derivedState()" , function() {
    it("derives new position");
  });

  describe( "#boardStones()" , function() {
    it("lists board stones");
  });
});
