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
            return curr.name.match(regex);
        });
        return result;
    }
    // if textbox is empty, dont return any suggestions
    else {
        return [];
    }
}

const query = document.querySelector('.search');

function showMatches() {
    $('.suggestions').empty();
    const matchList = findMatches(this.value, restaurants);
    const html = matchList.map(restaurant => {
        return `
        <li>
            <span class="name">${restaurant.name}</span>
            <span class="category">${restaurant.category}</span>
            <span class="address_line_1">${restaurant.address_line_1}</span>
            <span class="address_line_1">${restaurant.address_line_2}</span>
            <span class="zip">${restaurant.zip}</span>
        </li>
        `;
    }).join('');
    console.log(html);
    $('.suggestions').append(html);
    
}

query.addEventListener('input', showMatches);

