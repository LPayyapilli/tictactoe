$(document).ready(function() {

  if (!(gameAuth = gameRef.getAuth())) {

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
        if(!$(move).html()) {
          $("#board td").unbind();
          $(move).html(player===0 ? $('#image2').html() : $('#image1').html());
          $(move).show();
          turn();
          board[e.target.id] = players[player];
          gameRef.set({player: player, waitingPlayer: gameAuth.uid, board: board});


          console.log(board);
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
