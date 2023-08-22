const RAPIDAPI_KEY = "enter your key";
const weatherUrlHost = "weatherapi-com.p.rapidapi.com";
const timeDateUrlHost = "world-time-by-api-ninjas.p.rapidapi.com";

const getData = async (url, host) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": host,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

const runApiQueries = async (city) => {
    const weatherUrl =
        "https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + city;
    const timeDateUrl =
        "https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=" + city;

    const timeDateData = await getData(timeDateUrl, timeDateUrlHost);
    console.log(timeDateData);

    const weatherData = await getData(weatherUrl, weatherUrlHost);
    console.log(weatherData);
    //Weather
    const { name } = weatherData.location;
    const { icon, text } = weatherData.current.condition;
    const { temp_c, humidity, feelslike_c, wind_kph } = weatherData.current;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = icon;
    document.querySelector(".description").innerText = text;
    document.querySelector(".temp").innerText = temp_c + "°C";
    document.querySelector(".feels-like").innerText =
        "Feels like " + feelslike_c + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + wind_kph + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    //time and date
    function formatTime() {
        const { hour, minute } = timeDateData;
        const hours12 = hour % 12 || 12;
        const minutes = minute;
        const isAm = hour < 12;

        return `${hours12.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
    }

    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const { day, month, year } = timeDateData;
    document.querySelector(".time").innerHTML = formatTime();
    document.querySelector(".date").innerHTML = `${day}-${MONTHS[month - 1]
        }-${year}`;
};

let search_bar = document.querySelector(".search-bar");
let search_button = document.querySelector(".search button");

search_button.addEventListener("click", function () {
    runApiQueries(search_bar.value);
});

search_bar.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        runApiQueries(search_bar.value);
    }
});

runApiQueries("Bhubaneswar");
