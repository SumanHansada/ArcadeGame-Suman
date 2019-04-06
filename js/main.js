/*jshint esversion: 6 */ 

// This JavaScript File is used for character select page

let tableData;

let charactersModal = document.getElementById("playerCharacters");
function openCharactersModal() {
    charactersModal.style.display = "block";
}

function closeCharacterModal() {
    charactersModal.style.display = "none";
}

window.onload = function() {
    openCharactersModal();
    let table = document.getElementById("gameCharacters");     
    let tableRow = table.getElementsByTagName("tr");
    tableData = tableRow[0].getElementsByTagName("td");
    document.getElementById("playButton").disabled = true;

    // Add Click Event Handler To Select Character
    for (let n=0; n<tableData.length; n++)
    {
        let item = tableData[n];
        item.addEventListener("click", function() {
            for(let j=0; j< tableData.length; j++)
            {             
                let checkAttribute = tableData[j].hasAttribute("style");
                if(checkAttribute && j !== n)
                {
                    tableData[j].removeAttribute("style");}
                else
                { 
                item.setAttribute("style", "background-image:url(../images/grass-block.png)");                
                document.getElementById("playButton").disabled = false;            
                }    
            }  
        });
    }

    // Add Click Event Handler To Play Button
    let playButton = document.getElementById("playButton");
    playButton.addEventListener("click", function() {        
        for(let j=0; j< tableData.length; j++)
        {             
            let checkAttribute = tableData[j].hasAttribute("style");
            if(checkAttribute)
            {
                let pathArr = tableData[j].firstChild.src.split('/');
                player = new Player(200, 405, 'images/' + pathArr[pathArr.length-1]);
            }
        } 
        closeCharacterModal();
    });
};

