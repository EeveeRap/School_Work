import React from 'react';
import './WeatherDetails.css';

export default function WeatherDetails(props) {
  if (props.weather) {
    const { location, icon, temperature, description } = props.weather;

    return (
      <div className="row justify-content-center">
        <div>
          The weather in {location}
        </div>
        <img id="icon" src={icon} />
        <div>
          is {temperature} and {description}
        </div>
      </div>
    );
  }
  else {
    return (<div className="row">
      <div>
        Please enter a US zip to see the weather
      </div>
      <div className="error">{props.error}</div>
    </div>);
  }
}