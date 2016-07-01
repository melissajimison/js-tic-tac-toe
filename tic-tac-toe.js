function TicTacToe() {
  this._moves_counter = 0
  this._emoji_counter = 0
  this._o = "👩🏽"
  this._o_moves = []
  this._x = "👱🏼"
  this._x_moves = []
  this._winner_combinations = [
    ['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],
    ['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']
  ]
};

TicTacToe.prototype.reset = function() {
  this._o_moves = []
  this._x_moves = []
  this._moves_counter = 0
  this._emoji_counter = 0
  //remove the css classes
  $("#tic-tac-toe button").text("+");
  $("#tic-tac-toe button").removeClass('disable')
  $("#tic-tac-toe button").removeClass('o')
  $("#tic-tac-toe button").removeClass('x')
};

TicTacToe.prototype.draws = function() {
  if (this._moves_counter === 9) {
    alert("You both are too good!! Draws!!")
    return true
  }
};

TicTacToe.prototype.win = function(celt_info) {
  this.draws()
  var winner_comb = this._winner_combinations
  if (celt_info.hasClass('o')) {
    var moves = this._o_moves
  } else if (celt_info.hasClass('x')) {
    var moves = this._x_moves
  }
  for (var one_comb of winner_comb ) {
    if ( moves.includes(one_comb[0])&& moves.includes(one_comb[1]) && moves.includes(one_comb[2])) {
      alert(celt_info.text() + " has won!!")
      return true
    }
  }
};

TicTacToe.prototype.play = function(celt) {
  if (celt.hasClass('disable')) {
    alert("Don't you see it has been played?!!")
  } else {
    this._moves_counter++
    this._emoji_counter = 10

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

  console.log("mobes", this._moves_counter);
  console.log("emoji", this._emoji_counter);

  if (this.win(celt)) {
    this.reset()
  }
};

$(document).ready(function() {
  var main = $('#tic-tac-toe')
  var celts = main.children('.celt')
  var reset = $('#reset')
  var emoj = $('.animal')
  var ticTacToe = new TicTacToe()
  emoj.on('click', function(event) {
    event.preventDefault()
    if (ticTacToe._emoji_counter === 0) {
      ticTacToe._x = event.toElement.id;
      ticTacToe._emoji_counter++
    } else if (ticTacToe._emoji_counter === 1) {
      ticTacToe._o = event.toElement.id;
      ticTacToe._emoji_counter++
      }
  })

  celts.on('click', function(event) {
    event.preventDefault()
    var celt = $(this)
    ticTacToe.play(celt)
  })

  reset.on('click', function(event) {
    event.preventDefault()
    ticTacToe.reset()
  })

})
