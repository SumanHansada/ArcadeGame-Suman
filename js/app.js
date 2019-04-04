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
            console.log('collided');      
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
                //this.playerPositionY = this.playerPositionY;
                gameOver();
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




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
allEnemies.push(
    new Enemy(20, 63, Math.random() * 100 + 40),
    new Enemy(0, 146, Math.random() * 100 + 60),
    new Enemy(0, 229, Math.random() * 100 + 60)    
);
let player = new Player(200, 405, 'images/char-boy.png');
let canvasDiv = document.getElementsByTagName('canvas')[0];
let score = 0;
let table; // This have to be the ID of your table, not the tag
let tableRow;
let tableData;

function gameOver()
{
    player.reset();
    score += 1;
    scoreDiv.innerHTML = 'Score - ' + score;
}


let charactersModal = document.getElementById("playerCharacters");
function openCharactersModal() {
    charactersModal.style.display = "block";
}

function closeCharacterModal() {
    charactersModal.style.display = "none";
}

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

// Code for Creating a start page to select a character

window.onload = function() {
    openCharactersModal();
    table = document.getElementById("gameCharacters");     tableRow = table.getElementsByTagName("tr");
    tableData = tableRow[0].getElementsByTagName("td");
    document.getElementById("playButton").disabled = true;

    // Add Click Event Handler To Select Character
    for (let n=0; n<tableData.length; n++)
    {
        let item = tableData[n];
        item.addEventListener("click", function() {
            console.log(item);
            for(let j=0; j< tableData.length; j++)
            {             
                let checkAttribute = tableData[j].hasAttribute("style");
                if(checkAttribute && j !== n)
                {
                    tableData[j].removeAttribute("style");}
                else
                { 
                item.setAttribute("style", "background-image:url(/images/grass-block.png)");                
                document.getElementById("playButton").disabled = false;            
                }    
            }  
        });
    }

    let playButton = document.getElementById("playButton");
    playButton.addEventListener("click", function() {
        for(let j=0; j< tableData.length; j++)
        {             
            let checkAttribute = tableData[j].hasAttribute("style");
            if(checkAttribute)
            {
                let pathArr = tableData[j].firstChild.src.split('/'); 
                console.log(pathArr[pathArr.length-1]);
                player = new Player(200, 405, 'images/' + pathArr[pathArr.length-1]);
                console.log(typeof(player.playerCharacter));
            }
        } 
        closeCharacterModal();
        gameReset();
    });



};

gameReset = function()
{

    
};