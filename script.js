const apiKey = 'dda019d72edee1983ad20afd4423ad57';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

// Getting elements as variables
const inputEle = document.querySelector('#input-area');
const searchBtn = document.querySelector('.js-search-icon');
const weatherIconEle = document.querySelector('.js-weather-icon');
const tempEle = document.querySelector('.js-temperature');
const cityNameEle = document.querySelector('.js-city-name');
const humidityValue = document.querySelector('.js-humidity-data');
const windValue = document.querySelector('.js-wind-speed');

// Functions for working
function completeURL(cityname) {
    return apiurl + `&q=${cityname}` + `&appid=${apiKey}`;
}

function updatePage(tempData, location, humidityData, windData, weatherIconCode, weatherDesciption) {
    weatherIconUpdate(weatherIconCode, weatherDesciption);

    // Mobile
    tempEle.innerText = tempData + '°C';
    cityNameEle.innerText = location;
    humidityValue.innerText = humidityData + '%';
    windValue.innerText = windData + ' km/h';
    inputEle.value = '';
}

function weatherIconUpdate(weatherIconCode, weatherDesciption) {
    let imageHTML = `
        <img src="https://openweathermap.org/img/wn/${weatherIconCode}@2x.png" alt="weather-Icon">
        <p>${weatherDesciption}</p>
    `;
    weatherIconEle.innerHTML = imageHTML;
}

function fetchAPI(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let temp = data.main.temp;
            let cityName = data.name;
            let humidity = data.main.humidity;
            let windSpeed = data.wind.speed;
            let weatherIconCode = data.weather[0].icon;
            let weatherDesciption = data.weather[0].description;

            updatePage(temp, cityName, humidity, windSpeed, weatherIconCode, weatherDesciption);
        })
        .catch((error) => alert('City Entered is not Found. Please Re-enter.'));
}

function searchBtnClickHandle() {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let citynameSearchField = inputEle.value;
        let url = completeURL(citynameSearchField);
        fetchAPI(url);
    });
}

searchBtnClickHandle();

inputEle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let citynameSearchField = inputEle.value;
        let url = completeURL(citynameSearchField);
        fetchAPI(url);
    }
});
