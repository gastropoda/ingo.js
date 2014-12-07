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

});
