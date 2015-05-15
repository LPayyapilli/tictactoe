//Setting global variables
var gameRef, gameAuth;
var player = 0;
var players = ["X", "O"];
var board = ["", "", "", "", "", "", "", "", ""];
var winner = false;
var wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
var turnCount = 0;
var Xcount = 0;
var Ocount = 0;

// turn function
var turn = function() {
  player = 1 - player;

  return player;
};

// Check for whether someone won the game/
var checkForWin = function() {

// Loop through all possible winning combinations
for(var foo = 0; foo<8; foo++) {
  var p = board[wins[foo][0]] + board[wins[foo][1]] + board[wins[foo][2]];
//if you find 3 X's
  if (p === "XXX") {
    winner = true;
    Xcount += 1;
    winRef.set({xCount: Xcount, oCount: Ocount});
    $('#rocket').text('Rocket: ' + Xcount);


    //alert("Rocket won" + " with " + Xcount + " wins");
// X Won!
return true;
// if you find 3 O's
} else if (p === "OOO") {
  winner = true;
  Ocount +=1;
  $('#road').text('Road: ' + Ocount);
  winRef.set({oCount: Ocount, xCount: Xcount});

  //alert("Road won" + " with " + Ocount + " wins");
// O Won!
return true;

//if its a tie
} else if(turnCount === 9 && p !== "OOO" && p !== "XXX"){
  winner = true;

  alert("Tie game folks, Game on");
  reStartGame();
  return true;

}
}
};

//reset the board to default
var reStartGame = function() {
  player = 0;
  winner = false;
  turnCount = 0;
  board = ["", "", "", "", "", "", "", "", ""];
  for (var i = 0; i<board.length; i++) {

    $('#' + [i]).html('');

  }
};
// create new firebase object called gameRef and winRef
var gameRef = new Firebase('https://tictactoeyo.firebaseio.com/tictactoeyo/');
var winRef = new Firebase('https://tictactoeyo.firebaseio.com/wins/');

//function to decide who is "otherPlayer"
var otherPlayer = function(player) {
  return player === 0 ? 1 : 0;
};

//setting the values for firebase publisher gameRef
gameRef.on('value', function(snapshot) {
  var message = snapshot.val();
  var disable = false;

  if (message) {

    if (message.board) {
      message.board.forEach(function(player, index){
        if (player !== board[index]) {
          var move = "#" + index;
          $(move).html(player === "O" ? $('#image2').html() : $('#image1').html());
          $(move).show();
        };
      });
      board = message.board;

    }

    if (gameAuth.uid === message.waitingPlayer) {
      player = otherPlayer(message.player);
      disable = true;
    } else {
      player = message.player;
    }
  }
  if (disable) {
    $('#board td').unbind();
  } else {
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
  }
});
//setting the value of the firebase publisher win count
winRef.on('value', function(snapshot) {
  var message = snapshot.val();
  if (message){
    var message = snapshot.val();
    Xcount = message.xCount || 0;
    Ocount = message.oCount || 0;
    $('#rocket').text('Rocket: ' + Xcount);
    $('#road').text('Road: ' + Ocount);
  };
});
