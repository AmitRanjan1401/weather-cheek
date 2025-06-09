let weatherText = "";

async function getWeather() {
  if (!navigator.geolocation) {
    weatherText = "Geolocation is not supported by your browser.";
    document.getElementById("result").innerText = weatherText;
    return;
  }
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        const city = data.name;
        weatherText = `The temperature in ${city} is ${data.main.temp} °C with ${data.weather[0].description}.`;
        document.getElementById("result").innerHTML =
          `📍 ${city}<br>🌡️ Temp: ${data.main.temp} °C<br>☁️ Weather: ${data.weather[0].description}`;
      } else {
        weatherText = "Location not found.";
        document.getElementById("result").innerText = weatherText;
      }
    } catch (error) {
      weatherText = "Error fetching data.";
      document.getElementById("result").innerText = weatherText;
    }
  });
}

function speakWeather() {
  if (!weatherText) {
    weatherText = "Please fetch weather information first.";
  }
  const utterance = new SpeechSynthesisUtterance(weatherText);
  speechSynthesis.speak(utterance);
}