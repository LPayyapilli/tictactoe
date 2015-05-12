$(document).ready(function() {
  $("#board td").click(function(e) {
     if(!winner) {
    var move = "#" + e.target.id;
        if(!$(move).html()) {
    turn();
      $(move).html(player? "O" : "X");

      board[e.target.id] = players[player];
      console.log(board);
      checkForWin();
     }
   }
});
  $("#reset").click(function() {
      reStartGame();
  });

});
