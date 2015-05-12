$(document).ready(function($) {

  var theCanvas;
  var c;
  var cxt;
  var squaresFilled = 0;
  var canvasClicked = function(canvasNumber) {
    theCanvas = "canvas"+canvasNumber;
    c = document.getElementById(theCanvas);
    cxt = c.getContext("2d");

    if(X[canvasNumber-1] ===false){
        if(turn%2===0){
            cxt.beginPath();
            cxt.moveTo(10,10);
            cxt.lineTo(40,40);
            cxt.moveTo(40,10);
            cxt.lineTo(10,40);
            cxt.stroke();
            cxt.closePath();
            O[canvasNumber-1] = 'X';
        }

        else{
            cxt.beginPath();
            cxt.arc(25,25,20,0,Math.PI*2,true);
            cxt.stroke();
            cxt.closePath();
            O[canvasNumber-1] = 'O';
        }

        turn++;
        X[canvasNumber-1] = true;
        squaresFilled++;
        checkForWinners(O[canvasNumber-1]);

        if(squaresFilled===9){
            alert("THE GAME IS OVER!");
            location.reload(true);
        }

    }
    else{
        alert("THAT SPACE IS ALREADY OCCUPIED WITH YOUR HEART!");
    }

}
  $( ".canvas" ).click(function() {
  $(this).canvasClicked(canvasNumber);
});

});
