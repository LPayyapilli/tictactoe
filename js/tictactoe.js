// Main Game Handling class /
var TicTacToe = {
    // Keeps a record of who's turn it is
    turn: "O",
    // Keeps a record of the TicTacToe Board
    board: ["", "", "", "", "", "", "", "", "", ""],
    // records who won if the game is over
    win: false,

    // Clears and starts a new game with a new board /
    restartGame: function() {

      // Draw the board
      // var board_table = '<table cellpadding="0px" cellspacing="0px"align="center" border="0px" class="board"><tr><td id="ttt0"> </td><td id="ttt1"></td><td id="ttt2"> </td></tr><tr><td id="ttt3"> </td><td id="ttt4"> <div id="menu"></div></td><td id="ttt5"> </td></tr><tr><td id="ttt6"> </td><td id="ttt7"></td><td id="ttt8"> </td></tr></table>';
      // $("#board").html(board_table);
      // $("#menu").hide();

      $('#ttt0').html('');
      $('#ttt1').html('');
      $('#ttt2').html('');
      $('#ttt3').html('');
      $('#ttt4').html('');
      $('#ttt5').html('');
      $('#ttt6').html('');
      $('#ttt7').html('');
      $('#ttt8').html('');

      // clear the board
      this.board = ["", "", "", "", "", "", "", "", "", ""];

      // Add on-click events to each of the boxes of the board
      $("#board td").click(function(e) {
          TicTacToe.move(e.target.id);
         });

    },

    // Handles clicks spaces on the board /
    move: function(id) {

      // Board space table element
      var space = $("#" + id);

      // # representing the space on the board
      var num = id.replace("ttt", "");
        console.log("debug");
      // If no one's gone there, and the game isn't over, go there!
      if (!this.win) {
         console.log("debug2");
        space.html(this.turn);
        this.board[num] = this.turn;

        // End turn
        this.nextTurn();
      }
    },

    // Iterate turn and check if anyone one yet /
    nextTurn: function() {
      this.turn = (this.turn === "O") ? "X" : "O";
      this.win = this.checkForWin();
      if (!this.win) {
          this.endGame();
      }
    },

    // Display who won and options for new games /
    endGame: function() {

      $("#ttt4").html('<div id="menu"></div>');

      if (this.win === "Dog") {
          $("#menu").html("Dogs Won.");
      } else {
          $("#menu").html(this.win + " wins!");
      }
      $("#menu").append('<div id="play_again">Play Again</div>');

      // Button for playing again.
      $("#play_again").click(function () {

          this.win = false;

          TicTacToe.restartGame();

      });
    },

    // If any of these patterns of board spaces have all X's or all O's somebody won!
    wins: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]],

    // Check for whether someone won the game of it was a Dog's game. /
    checkForWin: function() {

      // Loop through all possible winning combinations
      for (k in this.wins){
        var pattern = this.wins[k];
            var p = this.board[pattern[0]] + this.board[pattern[1]] + this.board[pattern[2]];
            if (p === "XXX") {
              this.win = true;
              // X Won!
              return "X";
            } else if (p === "OOO") {
              this.win = true;
              // O Won!
              return "O";
            }
          }

          // Check if all spaces in the board are filled, then its a Dog's game
          var cnt = 0;
          for (s in this.board) {
            if (this.board[s]) { cnt+=1; }
          }
          if (cnt === 9) {
            // Dog's game!
            return "Dog";
          }
      }
    };

    $(document).ready(function() {
        // Start a game!
        TicTacToe.restartGame();


    });
