import React, {Component} from "react";
import Autocomplete from "react-google-autocomplete";
import "./App.scss";

const api = {
	key: "e8ad1adef88349968665b0d70b156a49",
	base: "https://api.openweathermap.org/data/2.5/"
};

class App extends Component {
	state = {
		isLoaded: false,
		currentLocation: {},
		currentTime: null,
		currentWeather: {},
		searchCity: ""
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
						currentWeather: result
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

	getDate = d => {
		let months = [
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
			"December"
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	getTime = t => {
		if (t.getHours() < 6 || t.getHours() > 18) {
			return "night";
		} else {
			return "day";
		}
	};

	handleSearchInput = e => {
		this.setState({searchCity: e});
	};

	handleErrors = response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	};

	fetchWithName() {
		const query = this.state.searchCity;
		fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
			.then(this.handleErrors)
			.then(res => res.json())
			.then(result => {
				this.setState({
					currentWeather: result
				});
			})
			.catch(error => {
				alert("City not found!");
			});
	}

	fetchWithCoordinates() {
		const query = this.state.searchCity;
		fetch(
			`${api.base}weather?lat=${query[0]}&lon=${query[1]}&units=metric&APPID=${api.key}`
		)
			.then(this.handleErrors)
			.then(res => res.json())
			.then(result => {
				this.setState({
					currentWeather: result
				});
			})
			.catch(error => {
				alert("City not found!");
			});
	}

	handleSearchSubmit = e => {
		this.fetchWithName();
		e.preventDefault();
	};

	render() {
		let weatherValue = null;
		let currentWeather = this.state.currentWeather;

		if (this.state.isLoaded) {
			weatherValue = (
				<div className="App">
					<div className={`${this.getTime(new Date())} wrapper`}>
						<div className="weather">
							<div className="weather-search">
								<form
									action=""
									onSubmit={this.handleSearchSubmit}
								>
									<Autocomplete
										placeholder="Search by city or postal code"
										onPlaceSelected={place => {
											if (place.name === undefined) {
												this.handleSearchInput([
													place.geometry.location.lat(),
													place.geometry.location.lng()
												]);
												this.fetchWithCoordinates();
											} else {
												this.handleSearchInput(
													place.name
												);
											}
										}}
										types={["(regions)"]}
									/>
									<button type="submit">Search</button>
								</form>
							</div>
							<div className="weather-info">
								<p className="weather-title">
									{currentWeather.name},&nbsp;
									{currentWeather.sys.country}
								</p>
								<p>{this.getDate(new Date())}</p>
								<div className="weather-info-left">
									<p className="weather-description">
										{currentWeather.weather[0].description}
									</p>
									<p className="weather-image">
										<img
											src={
												process.env.PUBLIC_URL +
												`/images/animated-icons/${currentWeather.weather[0].icon}.svg`
											}
											alt={
												currentWeather.weather[0]
													.description
											}
										/>
										{Math.round(
											currentWeather.main.temp,
											0
										)}{" "}
										&deg;C
									</p>
								</div>

								<div className="weather-info-right"></div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return <div>{weatherValue}</div>;
	}
}
export default App;
