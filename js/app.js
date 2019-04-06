/*jshint esversion: 6 */ 

// Enemies our player must avoid
var Enemy = function(bugPositionX, bugPositionY, bugSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.bugPositionX = bugPositionX;
    this.bugPositionY = bugPositionY;
    this.bugSpeed = bugSpeed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    this.bugPositionX = this.bugPositionX + this.bugSpeed * dt;
    if(this.bugPositionX > 505)
        this.bugPositionX = -100;
    
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.bugPositionX, this.bugPositionY);
};

Enemy.prototype.checkCollision = function()
{
    if(
        player.playerPositionX <= this.bugPositionX + 75 &&
        player.playerPositionX + 75 > this.bugPositionX &&
        player.playerPositionY <= this.bugPositionY + 10 &&
        player.playerPositionY > this.bugPositionY)
        {            
            decreaseLife();      
            player.reset();      
        }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    
    constructor(playerPositionX, playerPositionY, playerCharacter) {
        this.playerPositionX = playerPositionX;
        this.playerPositionY = playerPositionY;
        this.playerCharacter = playerCharacter;
    }

    update() {

    }

    reset () {
        this.playerPositionX = 200;
        this.playerPositionY = 405;
    }

    render () {
        ctx.drawImage(Resources.get(this.playerCharacter), this.playerPositionX, this.playerPositionY);
    }

    changeCharacter(playerCharacter) {
        this.playerCharacter = playerCharacter;
    }

    // Hardcoded Pixel Positions for Perfect Collisions
    handleInput (key) {
        if(key == 'left')
        {
            if(this.playerPositionX == 0)
                this.playerPositionX = this.playerPositionX;
            else
                this.playerPositionX = this.playerPositionX - 100;
        }
        else if(key == 'right')
        {
            if(this.playerPositionX == 400)
                this.playerPositionX = this.playerPositionX;
            else
                this.playerPositionX = this.playerPositionX + 100;
        }
        else if(key == 'up')
        {
            if(this.playerPositionY <= 73)
            {
                scoreUp();
            }                
            else
                this.playerPositionY = this.playerPositionY - 83;
        }
        else
        {
            if(this.playerPositionY == 405)
                this.playerPositionY = this.playerPositionY;
            else
                this.playerPositionY = this.playerPositionY + 83;
        }

    }

}

// Function to Update the Score 
function scoreUp()
{
    let scoreDiv = document.getElementById("playerScore");
    player.reset();
    score += 1;
    scoreDiv.innerHTML = '<h1 style="margin:0px">Score - ' + score + '</h1>';
}


// Function to Reset the Score
function scoreReset()
{
    let scoreDiv = document.getElementById("playerScore");
    player.reset();
    score = 0;
    scoreDiv.innerHTML = '<h1 style="margin:0px">Score - ' + score + '</h1>';
}

// Function to Decrease the Life (Heart Icon)
function decreaseLife()
{
    let lifeDiv = document.getElementById("playerHealth");
    if(lifeDiv.children.length > 0)
    {
        lifeDiv.removeChild(lifeDiv.children[0]);
        life -= 1;        
    }
    if(life === 0)
    {
        gameOver();
    }
}

// Function to Reset the Life (Heart Icon)
function resetLife() {
    const playerHealth = document.getElementById("playerHealth");
    const lifeIcons = document.createElement('li');
    const heart = document.createElement('img');
    heart.src = "images/Heart.png";
    heart.style.width = "100%";
    lifeIcons.appendChild(heart);
    playerHealth.classList.add("life");
    while (playerHealth.hasChildNodes()) {
        playerHealth.removeChild(playerHealth.firstChild);
    }
    for(let i=0; i<5; i++)
    {
        playerHealth.appendChild(lifeIcons.cloneNode(true));
    }
    life = 5;
}


// Function to call when Life = 0 and Game is Over
function gameOver()
{
    let gameCanvas = document.getElementById("gameDiv");
    gameCanvas.style.display = "none";
    let gameOverModel = document.getElementById("gameOver");    
    gameOverModel.style.display = "block";
    let restartButton = document.getElementById("restartButton");
    restartButton.style.display = "inline-block";

    // Add Click Event Handler To Reset Button
    restartButton.addEventListener("click", function() {
        gameCanvas.style.display = "inline-block";
        gameOverModel.style.display = "none";
        restartButton.style.display = "none";
        openCharactersModal();             
        scoreReset();
        resetLife();
    });
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
allEnemies.push(
    new Enemy(20, 63, Math.random() * 100 + 60),
    new Enemy(0, 146, Math.random() * 100 + 70),
    new Enemy(0, 229, Math.random() * 100 + 80)    
);

let player = new Player(200, 405, 'images/char-boy.png');
let canvasDiv = document.getElementsByTagName('canvas')[0];
let score = 0;
let life = 5;

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
