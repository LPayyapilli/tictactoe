$(document).ready(function() {
//if the game Authorization isnt equal to the authorization id for gameRef firebase object
  if (!(gameAuth = gameRef.getAuth())) {
// set it anonymously unless its an error
    gameRef.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        gameAuth = authData;
      }
    });
  }

  $("#board td").click(function(e) {
    if(!winner) {
      var move = "#" + e.target.id;
      //if a move hasn't been made
      if(!$(move).html()) {
        //unbind the board to allow a player to move
        $("#board td").unbind();
        $(move).html(player===0 ? $('#image2').html() : $('#image1').html());
        $(move).show();
        turn();
        board[e.target.id] = players[player];
        //set game reference firebase object with player, waitingPlayer, and board properties with values
        gameRef.set({player: player, waitingPlayer: gameAuth.uid, board: board});
        turnCount +=1;
        checkForWin();

      }
    }
  });
  $("#reset").click(function() {
    reStartGame();
    gameRef.remove();
  });
});
