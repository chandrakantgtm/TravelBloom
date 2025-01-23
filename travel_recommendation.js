// btnSearch: The variable name of the button which displays the search results when clicked
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');


const resultDiv = document.getElementById('searchResult');

function inputClear() {
    document.getElementById('searchInput').value = "";
    resultDiv.innerHTML = '';
}

function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    resultDiv.innerHTML = '';
    // destcard.innerHTML = '';
    if (input.length >= 3) {
        fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const searchResult = [];
            const { countries, temples, beaches} = data;
            // Searching in countries
            if (countries.length) {
                for(i=0; i < countries.length; i++) {
                    const isMatched = countries[i].name.toLowerCase().search(input);
                    isMatched >= 0 && searchResult.push(countries[i]);
                }
            }

            // Searching in temples
            if (temples.length) {
                for(i=0; i < temples.length; i++) {
                    const isMatched = temples[i].name.toLowerCase().search(input);
                    isMatched >= 0 && searchResult.push(temples[i]);
                }
            }

            // Searching in beaches
            if (beaches.length) {
                for(i=0; i < beaches.length; i++) {
                    const isMatched = beaches[i].name.toLowerCase().search(input);
                    isMatched >= 0 && searchResult.push(beaches[i]);
                }
            }
            const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const newYorkTime = new Date().toLocaleTimeString('en-US', options);
        console.log("Current time in New York:", newYorkTime);
        

            if (searchResult.length) {
            resultDiv.innerHTML += `<h2 id="count">${searchResult.length} ${searchResult.length === 1 ? "Result" : "Results"} found for '${input}'.</h2>`;

            for(i=0; i < searchResult.length; i++) {
                if (searchResult[i].cities && searchResult[i].cities.length) {
                    document.getElementById('count').textContent = `${searchResult.length - 1 + searchResult[i].cities.length} ${searchResult.length + searchResult[i].cities.length === 1 ? "Result" : "Results"} found for '${input}'.`;

                    for(j=0; j < searchResult[i].cities.length; j++) {
                        resultDiv.innerHTML += `<div class="destination-card"></div>`;
                        resultDiv.lastChild.innerHTML += `<img src="./image/${searchResult[i].cities[j].imageUrl}" alt="${searchResult[i].name}">`;
                        resultDiv.lastChild.innerHTML += `<h3>${searchResult[i].cities[j].name}</h3>`;
                        resultDiv.lastChild.innerHTML += `<p>${searchResult[i].cities[j].description}</p>`;
                        resultDiv.lastChild.innerHTML += `<button>Visit</button>`;
                    }
                } else {
                    resultDiv.innerHTML += `<div class="destination-card"></div>`;
                    resultDiv.lastChild.innerHTML += `<img src="./image/${searchResult[i].imageUrl}" alt="${searchResult[i].name}">`;
                    resultDiv.lastChild.innerHTML += `<h3>${searchResult[i].name}</h3>`;
                    resultDiv.lastChild.innerHTML += `<p>${searchResult[i].description}</p>`;
                    resultDiv.lastChild.innerHTML += `<button>Visit</button>`;
                    
                }
            }
            } else {
            resultDiv.innerHTML = `<h2 class="search-error">'${input}' Destination not found.<h2>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = `<h2 class="search-error">Oops, something went wrong!</h2>`;
        });
    } else {
        resultDiv.innerHTML = `<h3 class="search-error">Please Enter at least 3 or more charaters</h3>`;
    }
  }

  btnSearch.addEventListener('click', searchDestination);
  btnClear.addEventListener('click', inputClear);