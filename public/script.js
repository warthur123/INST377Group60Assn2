const { result } = require("cypress/types/lodash");

const api = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restaurants = [];

const query = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// fetch data from api. api -> json -> array
fetch(api).then(fromApi => fromApi.json()).then(data => restaurants.push(...data))


// find restaurants that match the inputted word. 
// return: list of matching restaurants
function findMatches(match, restaurants) {
    result = restaurants.filter(restaurant => {
        const regex = new RegExp(match, 'gi');
        return restaurant.name.match(regex) 
            || restaurant.category.match(regex)
            || restaurant.address_line_1.match(regex)
            || restaurant.address_line_2.match(regex)
            || restaurant.zip.match(regex)

    });
    return result;
}

function showMatches() {
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
    });

    suggestions.innerHtml = html;
}


query.addEventListener('change', showMatches());