function TicTacToe() {
  this._moves_counter = 0
  this._o = "o"
  this._o_moves = []
  this._x = "x"
  this._x_moves = []
  this._winner_combinations = [
    ['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],
    ['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']
  ]
};

TicTacToe.prototype.reset = function() {
  this._o_moves = []
  this._x_moves = []
  //remove the css classes
  $("#tic-tac-toe button").text("+");
  $("#tic-tac-toe button").removeClass('disable')
  $("#tic-tac-toe button").removeClass('o')
  $("#tic-tac-toe button").removeClass('x')
};

TicTacToe.prototype.win = function(celt_info) {
  var winner_comb = this._winner_combinations

  if (celt_info.hasClass('o')) {
    var moves = this._o_moves
  } else if (celt_info.hasClass('x')) {
    var moves = this._x_moves
  }

  for (var one_comb of winner_comb ) {
    if ( moves.includes(one_comb[0])&& moves.includes(one_comb[1]) && moves.includes(one_comb[2])) {
      alert("You have won!!")
    }
  }
};

TicTacToe.prototype.play = function(celt) {
  if (celt.hasClass('disable')) {
    alert("Don't you see it has been played?!!")
  } else {
    this._moves_counter++
    if (this._moves_counter % 2 == 0) {
  	  celt.text(this._o)
      this._o_moves.push(celt[0].id)
      celt.addClass('disable o')
    } else {
      celt.text(this._x)
      this._x_moves.push(celt[0].id)
      celt.addClass('disable x')
    }
  }
};

$(document).ready(function() {
  var main = $('#tic-tac-toe')
  var celts = main.children('.celt')
  var reset = $('#reset')
  var ticTacToe = new TicTacToe()

  celts.on('click', function(event) {
    event.preventDefault()
    var celt = $(this)
    ticTacToe.play(celt)
    ticTacToe.win(celt)
  })

  reset.on('click', function(event) {
    event.preventDefault()
    var reseter = $(this)
    ticTacToe.reset(reseter)
  })
})
