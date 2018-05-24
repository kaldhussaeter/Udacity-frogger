let Enemy = function(y) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.y = y;

    this.speed = Math.floor(180 + (Math.random()*200));
  };

let level = 1; // counter for level

function levelUp() { // Adds another bug to the enemy-array when player reaches the water.
  if (level <= 4) {
    level++;
    document.getElementById('level').innerHTML = level;
    en -= 90;
    allEnemies.push(new Enemy(en));
    console.log(level)
  }
  if (level === 5) { // When player completes level 4, alert window appears, and game will restart
    //setTimeout(function() { resetGame() }, 3000)
    resetGame();
    window.alert("CONGRATS! YOU'VE COMPLETED THE GAME")
  }
}

// to keep track of remaining hearts.
let remainingHearts = 3;

function removeHeart() { // removes a heart from page.
  let lifes = document.getElementById("lifes");
  // removes hearts from the page when hit by a bug.
  if (lifes.childNodes.length >= 4) { // had to do this because it wouldnt remove a
    lifes.removeChild(lifes.childNodes[0]);     // heart the first time it got hit
    remainingHearts -= 1;
  }
  if (lifes.childNodes.length < 2) {
    remainingHearts -= 1;
    lifes.removeChild(lifes.childNodes[0])
    window.alert("GAME OVER!")
    resetGame();
  } else {
    // console.log("lifes.childNodes.length er " + lifes.childNodes.length)
    remainingHearts -= 1;
    lifes.removeChild(lifes.childNodes[0]);
  }
}

// function to reset the game completely. This is also used to start the game in the first place,
// because of a bug with the number of hearts etc.
function resetGame() {
  remainingHearts = 0;
  while (lifes.childNodes.length > 0) {
    // loops over how many hearts there is to remove the remaining, so when it adds new set it won't add up
    lifes.removeChild(lifes.childNodes[0]);
  }
  for (let h = 3; h > remainingHearts; h--) { // Creates the hearts for the page.
    let list = document.createElement("LI")
    let listImg = document.createElement("IMG")
    listImg.setAttribute('src', 'images/Heart.png')
    list.appendChild(listImg)
    document.getElementById("lifes").appendChild(listImg);
  }
  remainingHearts = 3; // resets counter
  level = 1; // resets level-counter
  document.getElementById('level').innerHTML = level;
  allEnemies = [];
  showEnemies();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x <= 600) {
      this.x = this.x + this.speed * dt;
    } else {
      this.x = -2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
  'use strict';
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

function showEnemies() { // adds enemies to the game, loops and adds different position for the bugs
  for (en = 50; en <= 230; en+=90)
    allEnemies.push(new Enemy(en));
};

let player = new Player;


Player.prototype.update = function(dt) { // functions for movement on the page.
  'use strict';
  let self = this;

  if (this.pressedKey === 'left' && this.x > 0) {
    this.x = this.x - 100;
  }
  if (this.pressedKey === 'right' && this.x < 400) {
    this.x = this.x + 100;
  }
  if (this.pressedKey === 'up' && this.y > 0) {
    this.y = this.y - 90;
  }
  if (this.pressedKey === 'down' && this.y < 400) {
    this.y = this.y + 90
  }
  if (this.y <= 0) {
    levelUp(); // adds another bug to the game when you level up.
    this.reset(); // resets the position of the player.
  }
  this.pressedKey = null;


  allEnemies.forEach(function(enemy) {
    if ((self.x >= enemy.x - 25 && self.x <= enemy.x + 25) && (self.y >= enemy.y - 25 && self.y <= enemy.y + 25)) {
      removeHeart(); // removes a heart when hit by enemy.
      self.reset(); // resets the position of the player.
    }
  });
};

// prevents window from scrolling when using arrow keys and space, code from stackOverflow
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method for player:
Player.prototype.handleInput = function(e) {
    'use strict';
    this.pressedKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function() {
    'use strict';
    this.x = 200;
    this.y = 400;
};




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

showEnemies();
resetGame();
