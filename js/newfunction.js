// Alternating turns function
  var player = 0;
  var players = ["X", "O"];
  var board = ["", "", "", "", "", "", "", "", "", ""];
  var winner = false;
  var wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];

  var turn = function() {
   player = 1 - player;

      return player;
  };

    // Check for whether someone won the game of it was a Dog's game. /
    var checkForWin= function() {

      // Loop through all possible winning combinations
      for(var foo = 0; foo<8; foo++) {
            var p = board[wins[foo][0]] + board[wins[foo][1]] + board[wins[foo][2]];
            if (p === "XXX") {
              winner = true;
              alert("X Won");
              // X Won!
              return true;
            } else if (p === "OOO") {
              winner = true;
              alert("O Won");
              // O Won!
              return true;
            }
          };
        }





  var reStartGame = function() {
    player = 0;
    winner = false;
    board = ["", "", "", "", "", "", "", "", "", ""];
      $('#0').html('');
      $('#1').html('');
      $('#2').html('');
      $('#3').html('');
      $('#4').html('');
      $('#5').html('');
      $('#6').html('');
      $('#7').html('');
      $('#8').html('');

  }

