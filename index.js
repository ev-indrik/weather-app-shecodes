// Current time and date

let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let timeNow = "Time: " + hours + ":" + minutes;
let date = now.getDate();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayNow = weekDays[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let monthNow = months[now.getMonth()];

let timeSpan = document.querySelector("#timeSpan");
timeSpan.innerHTML = timeNow;

let dayWeekSpan = document.querySelector("#daySpan");
dayWeekSpan.innerHTML = dayNow;

let monthSpan = document.querySelector("#monthSpan");
monthSpan.innerHTML = monthNow;

let dateSpan = document.querySelector("#dateSpan");
dateSpan.innerHTML = date;

// City change and temp change according to location and city

function showTemp(locationInfo) {
  let h2 = document.querySelector("h2");
  let tempicon = document.querySelector("#mainTemp");
  let cityChosen = locationInfo.data.name;
  let tempChosen = Math.round(locationInfo.data.main.temp);

  h2.innerHTML = cityChosen;
  tempicon.innerHTML = tempChosen;
}

function showMyData(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition((currentLocation) => {
    let latitude = currentLocation.coords.latitude;
    let longitude = currentLocation.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemp);
  });
}

let apiKey = "e198a574d16b9223ea11e9b7c93f17a0";
let locationButton = document.querySelector("#button-currentPosition");
locationButton.addEventListener("click", showMyData);

// Weather by City name

function showMycityTemp(dataAboutMyCity) {
  let tempicon = document.querySelector("#mainTemp");
  h2.innerHTML = dataAboutMyCity.data.name;
  tempicon.innerHTML = Math.round(dataAboutMyCity.data.main.temp);
}

function getMyCityWeather(event) {
  event.preventDefault();

  let myCity = inputButton.value;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlCity).then(showMycityTemp);
}

let submitButton = document.querySelector("#button-addon1");
let inputButton = document.querySelector("#inputCity");
let h2 = document.querySelector("h2");

submitButton.addEventListener("click", getMyCityWeather);

// C and F links
let h1 = document.querySelector("#mainTemp");
let celsiusMark = document.querySelector("#celsius");
let fahrenheitMark = document.querySelector("#fahrenheit");
let celsiusValue = document.querySelector("#mainTemp");

function celsiusEvent() {
  fahrenheitMark.classList.remove("special");
  celsiusMark.classList.add("special");
}

function fahrenheitEvent() {
  celsiusMark.classList.remove("special");
  fahrenheitMark.classList.add("special");
  let fahrenheitFinal = Math.round(Number(celsiusValue.textContent) * 1.8 + 32);
  h1.innerHTML = fahrenheitFinal;
}

celsiusMark.addEventListener("click", celsiusEvent);
fahrenheitMark.addEventListener("click", fahrenheitEvent);
