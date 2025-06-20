function searchWord()
{
    let userInput = document.getElementById("SearchWord").value;
    
    fetchWord(userInput);
    
}

function keydown(e)
{
    if(e.keyCode === 13) {
        searchWord();
      }
}

async function fetchWord(word)
{
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    url += word;
    let response = await fetch(url);

    if (!response.ok){
        console.log("No Word Found");
    }
        
    let data = await response.json();
}