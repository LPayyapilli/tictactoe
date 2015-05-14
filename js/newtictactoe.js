$(document).ready(function() {
  $("#board td").click(function(e) {
     if(!winner) {
    var move = "#" + e.target.id;
        if(!$(move).html()) {
    turn();
      $(move).html(player? $('#image2').html() : $('#image1').html());
        $(move).show();
      board[e.target.id] = players[player];
      console.log(board);
      turnCount +=1;
      checkForWin();

     }
   }
  });
  $("#reset").click(function() {
      reStartGame();
  });
});
