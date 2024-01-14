import { Component } from 'react'
import './App.css'
import WeatherDetails from './WeatherDetails';

export default class App extends Component {

   // Initializing the component state
  state = { };

   // Async function to fetch weather data based on the provided zip code
  async getWeather(zip) {
    const appid = '4d940566413cbb48ddbe156f2b502364';
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${appid}&units=imperial&lang=en`);

      const weatherData = await response.json();

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${weatherData.message}`);
      }

      console.log(weatherData);

      // Updating the component state with the retrieved weather data
      this.setState({
        weather: {
          location: weatherData.name,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        }
      });
    } catch (e) {
      console.error(e);

      // Updating the component state with the error message
      this.setState({
        error: e.message
      });
    }
  }

  // Event handler for the input field's onBlur event
  zipChanged = e => {

    // Triggering the getWeather function with the new zip code from the input field
    this.getWeather(e.target.value);
  }

// Rendering the component
  render() {

    // Destructuring state variables for easier use
    const { weather, error } = this.state;

    // JSX structure for the component UI
    return (
      <div className="container text-center">
        <div className="row justify-content-end">
          <div className="col-6 col-md-3">
            <input className="form-control" id="zip" placeholder="enter US zip code" onBlur={this.zipChanged}/>
          </div>
        </div>

        <WeatherDetails weather={weather} error={error}/>
      </div>
    );
  }
}