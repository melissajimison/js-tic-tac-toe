function TicTacToe() {
  this._o = "o"
  this._x = "x"
  this._moves_counter = 0
};


TicTacToe.prototype.win = function(player) {
};

TicTacToe.prototype.play = function(celt) {
  this._moves_counter++
  if (this._moves_counter % 2 == 0) {
	  celt.text(this._o)
    //keep track of the moves by this player
    celt.addClass('disable o')
	  // TicTacToe.win(this._o)
  }
};



$(document).ready(function() {
  var main = $('#tic-tac-toe')
  var celts = main.children('.celt')
  console.log('create and begin the game here!');

  var ticTacToe = new TicTacToe()

  celts.on('click', function(event) {
    event.preventDefault()
    var celt = $(this)
    console.log(celt);
    ticTacToe.play(celt)
  })


})
