Skip to content
This repository
Search
Pull requests
Issues
Gist
 @melissajimison
 Unwatch 1
  Star 0
 Fork 48 melissajimison/js-tic-tac-toe
forked from Ada-C5/js-tic-tac-toe
 Code  Pull requests 0  Projects 0  Wiki  Pulse  Graphs  Settings
Tree: 287de2cb86 Find file Copy pathjs-tic-tac-toe/tic-tac-toe.js
287de2c  on Jul 1, 2016
@melissajimison melissajimison added the emojis to the scores table
2 contributors @melissajimison @jnf
RawBlameHistory     
167 lines (144 sloc)  3.91 KB
function TicTacToe() {
  this._mode = null
  this._moves_counter = 0
  this._emoji_counter = 0
  this._o = "👩🏽" //player 1
  this._o_moves = []
  this._o_victories = 0
  this._x = "👱🏼" //player 1
  this._x_moves = []
  this._x_victories = 0
  this._winner_combinations = [
    ['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],
    ['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']
  ]
};

TicTacToe.prototype.newGame = function() {
  this._o_moves = []
  this._x_moves = []
  this._moves_counter = 0
  //remove the css classes
  $("#tic-tac-toe button").text("+");
  $("#tic-tac-toe button").removeClass('disable')
  $("#tic-tac-toe button").removeClass('o')
  $("#tic-tac-toe button").removeClass('x')
};

TicTacToe.prototype.reset = function() {
  this.newGame()
  this._x_victories = 0
  this._o_victories = 0
  this._emoji_counter = 0
};

TicTacToe.prototype.draws = function() {
  if (this._moves_counter === 9) {
    alert("You both, " + this._x + " and " + this._o + " are too good!! Draws!!")
    return true
  }
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
      alert(celt_info.text() + " has won!!")
      return true
    }
  }
  this.draws()
};

TicTacToe.prototype.play = function(celt) {
  if (celt.hasClass('disable')) {
    alert("Don't you see it has been played?!!")
  } else {
    this._moves_counter++
    this._emoji_counter = 10

    if (this._moves_counter % 2 == 0) {
      var victories = this._o_victories
      celt.text(this._o)
      this._o_moves.push(celt[0].id)
      celt.addClass('disable o')
      if (this.win(celt)) {
        this._o_victories++
        $('#play-two').text(this._o_victories)
        this.newGame()
      }

    } else if (this._moves_counter % 2 == 1) {
      celt.text(this._x)
      this._x_moves.push(celt[0].id)
      celt.addClass('disable x')
      this.computerMove()
      if (this.win(celt)) {
        this._x_victories++
        $('#play-one').text(this._x_victories)
        this.newGame()
      }
    }

  }

};

TicTacToe.prototype.setEmojis = function() {
  if (this._emoji_counter === 0) {
    $("#two-emoji").text(event.toElement.id)
    this._o = event.toElement.id;
    this._emoji_counter++
  } else if (this._emoji_counter === 1) {
    $("#one-emoji").text(event.toElement.id)
    this._x = event.toElement.id;
    this._emoji_counter++
  }
}

TicTacToe.prototype.onePlayer = function(mode) {
    if (mode == "one-player"){
      this._emoji_counter = 1
      this._mode = "computer"
    }
};

TicTacToe.prototype.computerMove = function() {

  if (this._mode == 'computer') {
    var celts_op = (Math.floor(Math.random()*8) + 1).toString()
    var ran_celt = $('#'+celts_op)
    ran_celt.text("💻")
    ran_celt.addClass('disable o')
    this._o_moves.push(celts_op)
    this._moves_counter++
    this.play(ran_celt);
  } else {
    return false
  }

}

$(document).ready(function() {
  var main = $('#tic-tac-toe')
  var celts = main.children('.celt')
  var newGame = $('#new-game')
  var emoj = $('.animal')
  var modes = $('.mode')
  var reseter = $('#reset')

  var ticTacToe = new TicTacToe()

  modes.on('click', function(event) {
    event.preventDefault()
    var mode = $(this)[0].id
    ticTacToe.onePlayer(mode)
  })

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

  newGame.on('click', function(event) {
    event.preventDefault()
    ticTacToe.newGame()
  })

  reseter.on('click', function(event) {
    event.preventDefault()
    ticTacToe.reset()
    emoj.show()
  })

})
