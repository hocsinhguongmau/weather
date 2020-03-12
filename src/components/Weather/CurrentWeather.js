import React from "react";

const CurrentWeather = props => {
	let currentWeatherValue = null;
	let currentWeather = props.currentWeather;

	if (props.isLoaded === true && props.searchStatus === true) {
		currentWeatherValue = (
			<div className="weather-info">
				<p className="weather-title">{props.currentLocation}</p>
				<p>{props.getDate(new Date())}</p>
				<div className="weather-info-left">
					<p className="weather-description">
						{currentWeather.summary}
					</p>
					<p className="weather-image">
						<img
							src={
								process.env.PUBLIC_URL +
								`/images/icons/${currentWeather.icon}.svg`
							}
							alt={currentWeather.summary}
						/>
						<span className="degF">
							{Math.round(currentWeather.temperature, 0)} &deg;F
						</span>
						<span className="degC">
							{Math.round(
								props.FtoC(currentWeather.temperature),
								2
							)}
							&deg;C
						</span>
					</p>
				</div>
			</div>
		);
	} else {
		currentWeatherValue = <p className="not-found">{props.searchStatus}</p>;
	}
	return <div>{currentWeatherValue}</div>;
};

export default CurrentWeather;
