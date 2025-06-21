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
        wordNotFound();
    }
    else{
        let data = await response.json();
        foundWordUpdateUI(data);
        let source = document.getElementById("link-Source");
        source.innerText = "https://en.wiktionary.org/wiki/" + word;
        source.setAttribute('href', source.innerText);
    }
}

//Word !F0UND
function wordNotFound()
{
    let dataNotFound = document.getElementById("dataNotFound");
    dataNotFound.style.display = "block";
    let main = document.getElementById("main");
    main.style.display = "none";
}

function foundWordUpdateUI(data)
{
    console.log(data);
    
    let dataNotFound = document.getElementById("dataNotFound");
    dataNotFound.style.display = "none";
    let main = document.getElementById("main");
    main.style.display = "block";

    let Word = document.getElementById("Word");     //Set the Word
    Word.innerText = data[0].word;

    let Phonetic = document.getElementById("Phonetics");        //Set the Phonetics
    Phonetic.innerText = data[0].phonetic;

    let audioSrc;       //Set the Audio
    for (let i = 0; i < data[0].phonetics.length; i++)
    {
        if (data[0].phonetics[i].audio != '')
        {
            audioSrc = data[0].phonetics[i].audio;
            break;
        }
    }
    let wordAudio = document.getElementById("wordAudio");
    wordAudio.setAttribute('src', audioSrc);
    
    let noun_meaning = document.querySelector(".noun-meaning");
    noun_meaning.innerHTML = "";

    let Sentence = document.getElementById("Sentence");
    Sentence.innerText = "";

    for (let i = 0; i < data[0].meanings[0].definitions.length; i++)
    {
        let ul = document.createElement('li');
        ul.innerText = data[0].meanings[0].definitions[i].definition;
        noun_meaning.appendChild(ul);

        if ('example' in data[0].meanings[0].definitions[i])
            Sentence.innerText = data[0].meanings[0].definitions[i].example;
    }    

    let boole = true;
    let synonym_container = document.querySelector(".synonym");
    for (let i = 0; i < data[0].meanings.length; i++)
    {
        if (data[0].meanings[i].synonyms.length != 0)
        {
            boole = false;
            displaySynonyms(data, i);
            break;
        }
    }
    if (boole)
        synonym_container.style.display = "none";

    let Aboole = true;
    let Antonym_container = document.querySelector(".Antonym");
    for (let i = 0; i < data[0].meanings.length; i++)
    {
        if (data[0].meanings[i].antonyms.length != 0)
        {
            Aboole = false;
            displayAntonym(data, i);
            break;
        }
    }
    if (Aboole)
        antonyms_container.style.display = "none";

    let verb_meaning_list_items = document.getElementById('verb-meaning-list-items');
    let verb = document.querySelector('.verb');
    if (data[0].meanings[1] && data[0].meanings[1].partOfSpeech === "verb")
    {
        verb_meaning_list_items.innerHTML = "";
        for (let i = 0; i < data[0].meanings[1].definitions.length; i++)
        {
            let ul = document.createElement('li');
            ul.innerText = data[0].meanings[1].definitions[i].definition;
            verb_meaning_list_items.appendChild(ul);
        }  
        verb.style.display = "block"; // Show it
    } else{
        verb.style.display = "none";
    }   
}

function playAudio()
{
    document.getElementById('wordAudio').play();
}

function displaySynonyms(data, i)
{
    let Synonyms = document.getElementById("Synoynms");
    let synonym_container = document.querySelector(".synonym");

    Synonyms.innerHTML = "";
    for (let j = 0; j < data[0].meanings[i].synonyms.length; j++)
    {
        let a = document.createElement('a');
        a.innerText = data[0].meanings[i].synonyms[j] + ", ";
        Synonyms.appendChild(a);
    }
    synonym_container.style.display = "block";
}

function displayAntonym(data, i)
{
    let Antonym = document.getElementById("Antonyms");
    let Antonym_container = document.querySelector(".Antonym");

    Antonym.innerHTML = "";
    for (let j = 0; j < data[0].meanings[i].antonyms.length; j++)
    {
        let a = document.createElement('a');
        a.innerText = data[0].meanings[i].antonyms[j] + ", ";
        Antonym.appendChild(a);
    }
    Antonym_container.style.display = "block";
}


// Dark-Mode On
let checkbox = document.getElementById("themeToggle");
checkbox.addEventListener('change', function() {
    document.body.classList.toggle('Dark-Theme');
});

// Drop Down
const activeFontUI = document.getElementById("activeFontUI");
const dropDownIcon = document.getElementById("DropDownIMG");
const dropdownMenu = document.getElementById("DropdownMenu");

[activeFontUI, dropDownIcon].forEach(el => {
    el.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
  });

  document.querySelectorAll('.FontsDropDown').forEach(item => {
    item.addEventListener('click', (e) => {
      activeFontUI.textContent = e.target.textContent;
      dropdownMenu.style.display = 'none';
    });
  });

