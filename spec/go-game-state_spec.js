describe( "GoGameState" , function() {
  var GoGameState;
  beforeEach(module("goGameTree"));
  beforeEach(inject(function(_GoGameState_) {
    GoGameState = _GoGameState_;
  }));

  var emptyState, state, derivedState;
  beforeEach(function() {
    emptyState = new GoGameState();
    state = undefined;
    derivedState = undefined;
  });

  it("is a constructor", function() {
    expect(emptyState).to.be.instanceOf(GoGameState);
  });

  describe("::fromStrings()", function() {
    it("builds a game state from ascii-art", function() {
      state = GoGameState.fromStrings(
       //abcd
        "....", // 3
        ".B.W", // 2
        "...B"  // 1
      );
      expect(state.at("A0")).to.not.exist;
      expect(state.at("E4")).to.not.exist;
      expect(state.at("B2")).to.eq(GoGameState.BlackStone);
      expect(state.at("D1")).to.eq(GoGameState.BlackStone);
      expect(state.at("D2")).to.eq(GoGameState.WhiteStone);
    });

    it("passes the options to the state constructor", function() {
      state = GoGameState.fromStrings(
        "....",
        ".B.W",
        "...B", {
          nextTurnColor: "white",
          captures: {
            white: 1,
            black: 2,
          }
        });
      expect(state.nextTurnColor()).to.eq("white");
      expect(state.captures("white")).to.eq(1);
      expect(state.captures("black")).to.eq(2);
      expect(state.at("B2")).to.eq(GoGameState.BlackStone);
      expect(state.at("D1")).to.eq(GoGameState.BlackStone);
      expect(state.at("D2")).to.eq(GoGameState.WhiteStone);
    });

    it("offsets the shape given the 'offset' option", function() {
      state = GoGameState.fromStrings(
       //fgh
        "B.W", // 5
        "..B",{// 4
          offset: "F4"
        });
      expect(state.at("H4")).to.eq(GoGameState.BlackStone);
      expect(state.at("F5")).to.eq(GoGameState.BlackStone);
      expect(state.at("H5")).to.eq(GoGameState.WhiteStone);
    });
  });

  describe("constants", function() {
    it("are defined", function() {
      expect(GoGameState.WhiteStone).to.exist;
      expect(GoGameState.BlackStone).to.exist;
    });
  });

  describe("#at()", function() {
    function itReturnsPostionContent() {
      it("defaults to falsey", function() {
        expect(emptyState.at("A1")).to.not.exist;
      });

      it("is falsy for empty positions", function() {
        expect(state.at("Z19")).to.not.exist;
      });

      it("returns GoGameState.WhiteStone for white stone positions", function() {
        expect(state.at("A1")).to.eq(GoGameState.WhiteStone);
      });

      it("returns GoGameState.BlackStone for black stone positions", function() {
        expect(state.at("B2")).to.eq(GoGameState.BlackStone);
        expect(state.at("C3")).to.eq(GoGameState.BlackStone);
      });

      it("is case insensitive", function() {
        expect(state.at("a1")).to.eq(GoGameState.WhiteStone);
        expect(state.at("b2")).to.eq(GoGameState.BlackStone);
        expect(state.at("c3")).to.eq(GoGameState.BlackStone);
      });
    }

    context("constructed with upper case positions", function() {
      beforeEach(function() {
        state = new GoGameState({
          white: ["A1"],
          black: ["B2", "C3"],
        });
      });
      itReturnsPostionContent();
    });

    context("constructed with lower case positions", function() {
      beforeEach(function() {
        state = new GoGameState({
          white: ["a1"],
          black: ["b2", "c3"],
        });
      });
      itReturnsPostionContent();
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
      state = new GoGameState({white: ["A1"]});
      expect(state.isLegalMove({A1: "black"})).to.not.be.ok;
    });

    context("white's turn", function() {
      it("is false for black", function() {
        state = new GoGameState({nextTurnColor: "white"});
        expect(state.isLegalMove({A1: "black"})).to.not.be.ok;
      });
    });

    context("black's turn", function() {
      it("is false for white", function() {
        state = new GoGameState({nextTurnColor: "black"});
        expect(state.isLegalMove({A1: "white"})).to.not.be.ok;
      });
    });

    it("isn't if both colors are present", function() {
      expect(emptyState.isLegalMove({A1: "white", B2: "black"})).to.not.be.ok;
    });

    it("isn't if empty", function() {
      expect(emptyState.isLegalMove({})).to.not.be.ok;
    });

    it("isn't if move is a suicide");
    it("isn't if move is illegal ko");
  });

  describe( "#deriveState()" , function() {
    beforeEach(function() {
      state = new GoGameState.fromStrings(
        "B.W", {
        captures: {
          black: 1,
          white: 2,
        },
        nextTurnColor: "black"
      });
    });
    context("requested move is illegal", function() {
      beforeEach(function() {
        sinon.stub(state, "isLegalMove").returns(false);
      });
      it("throws an exception", function() {
        expect(function() {
          state.deriveState({B1: "black"});
        }).to.throw(GoGameState.IllegalMove);
      });
    });
    context("requested move is legal", function() {
      beforeEach(function() {
        sinon.stub(state, "isLegalMove").returns(true);
        derivedState = state.deriveState({B1: "black"});
      });
      it("adds a stone to the board", function() {
        expect(derivedState.at("B1")).to.eq(GoGameState.BlackStone);
      });
      it("changes next turn color", function() {
        expect(derivedState.nextTurnColor()).to.eq("white");
        derivedState = derivedState.deriveState({Z19: "white"});
        expect(derivedState.nextTurnColor()).to.eq("black");
      });
    });
  });

  describe( "#boardStones()" , function() {
    it("lists board stones", function() {
      state = GoGameState.fromStrings(
       //abcd
        "....", // 3
        ".B.W", // 2
        "...B"  // 1
      );
      var stones = state.boardStones();
      expect(stones).to.include({ position: "D1", color: "black", });
      expect(stones).to.include({ position: "B2", color: "black", });
      expect(stones).to.include({ position: "D2", color: "white", });
      expect(stones).to.have.length.of(3);
    });
  });
});
