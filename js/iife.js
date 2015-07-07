var Tictactoe = Tictactoe || {};

Tictactoe.new = (function(){

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















})
