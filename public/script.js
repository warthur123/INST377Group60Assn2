const restaurants = [];

// fetch data from api. api -> json -> array
fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => restaurants.push(...jsonFromServer))
    .catch((err) => {
      console.log(err);
    });


// find restaurants that match the inputted word. 
// return: list of matching restaurants
function findMatches(wordMatch, restaurants) {
    if(wordMatch != ''){
        result = restaurants.filter(curr => {
            const regex = new RegExp(wordMatch, 'gi');
            return curr.name.match(regex) 
                || curr.category.match(regex) 
                || curr.address_line_1.match(regex)
                || curr.city.match(regex)
                || curr.zip.match(regex);
        });
        return result;
    }
    // if textbox is empty, dont return any suggestions
    else {
        return [];
    }
}

const query = document.querySelector('#search');

function showMatches() {
    $('#filteredCases').empty();
    $('#filteredCases').append(`<ul class="suggestions"></ul>`);


    const matchList = findMatches(this.value, restaurants);
    const html = matchList.map(restaurant => {
        return `
        <li>
            <span class="name">${restaurant.name}</span><br>
            <span class="category">${restaurant.category}</span><br>
            <span class="address_line_1">${restaurant.address_line_1}</span><br>
            <span class="address_line_1">${restaurant.city}</span><br>
            <span class="zip">${restaurant.zip}</span>
        </li><br>
        `;
    }).join('');
    $('.suggestions').append(html);
    
}

query.addEventListener('input', showMatches);