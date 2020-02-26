import React, {Component} from "react";
import "./App.scss";

const api = {
	key: "e8ad1adef88349968665b0d70b156a49",
	base: "https://api.openweathermap.org/data/2.5/"
};
class App extends Component {
	state = {
		isLoaded: false,
		currentLocation: {},
		items: {}
	};

	fetchWeather() {
		fetch(
			`${api.base}weather?lat=${this.state.currentLocation.lat}&lon=${this.state.currentLocation.lon}&units=metric&APPID=${api.key}`
		)
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						isLoaded: true,
						items: result
					});
				},
				error => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	async componentDidMount() {
		await new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					this.setState({
						currentLocation: {
							lat: position.coords.latitude,
							lon: position.coords.longitude
						}
					});
					resolve();
				});
			}
		});

		this.fetchWeather();
	}

	render() {
		let weather = null;
		if (this.state.isLoaded) {
			weather = (
				<div>
					<p>
						{this.state.items.id} {this.state.items.name}
					</p>
					<p>{this.state.items.weather[0].main}</p>
					<p>{this.state.items.weather[0].description}</p>
					<p>
						<img
							src={`http://openweathermap.org/img/wn/${this.state.items.weather[0].icon}.png`}
							alt={this.state.items.weather[0].description}
						/>
					</p>
					<p>
						Temp {Math.round(this.state.items.main.temp, 0)}&deg;C
					</p>
					<p>
						Feels like{" "}
						{Math.round(this.state.items.main.feels_like, 0)}&deg;C
					</p>
					<p>Humidity {this.state.items.main.humidity}%</p>
				</div>
			);
		}
		return (
			<div>
				{weather}
				<div id="demo"></div>
			</div>
		);
	}
}
export default App;
