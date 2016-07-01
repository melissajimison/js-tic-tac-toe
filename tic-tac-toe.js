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

TicTacToe.prototype.new_game = function() {
  this._o_moves = []
  this._x_moves = []
  this._moves_counter = 0
  this._emoji_counter = 0
  //remove the css classes
  $("#tic-tac-toe button").text("+");
  $("#tic-tac-toe button").removeClass('disable')
  $("#tic-tac-toe button").removeClass('o')
  $("#tic-tac-toe button").removeClass('x')
  $('.animal').show()
};

TicTacToe.prototype.draws = function() {
  if (this._moves_counter === 9) {
    alert("You both, " + this._x + " and " + this._o + " are too good!! Draws!!")
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

  if (this.win(celt)) {
    this.new_game()
  }
};

TicTacToe.prototype.setEmojis = function() {
  if (this._emoji_counter === 0) {
    this._x = event.toElement.id;
    this._emoji_counter++
  } else if (this._emoji_counter === 1) {
    this._o = event.toElement.id;
    this._emoji_counter++
  }
};

$(document).ready(function() {
  var main = $('#tic-tac-toe')
  var celts = main.children('.celt')
  var new_game = $('#new-game')
  var emoj = $('.animal')
  var ticTacToe = new TicTacToe()
  emoj.on('click', function(event) {
    event.preventDefault()
    ticTacToe.setEmojis()
  })

  celts.on('click', function(event) {
    event.preventDefault()
    var celt = $(this)
    ticTacToe.play(celt)
    emoj.hide()

  })

  new_game.on('click', function(event) {
    event.preventDefault()
    ticTacToe.new_game()
  })

})
