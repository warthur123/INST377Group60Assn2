const { result } = require("cypress/types/lodash");

const api = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];

// fetch data from api. api -> json -> array
fetch(api).then(fromApi => fromApi.json()).then(data => restaurants.push(...data))


// find restaurants that match the inputted word. 
// return: list of matching restaurants
function findMatches(match, restaurants) {
    result = restaurants.filter(restaurant => {
        const regex = new RegExp(match, 'gi');
        return restaurant./*whatever category to match*/.match(regex)
    });
    return result;
}

function showMatches() {

}