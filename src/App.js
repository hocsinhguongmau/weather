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
		currentTime: null,
		items: {},
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
		this.setState({searchCity: e.target.value});
	};

	handleErrors = response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	};

	handleSearchSubmit = e => {
		const query = this.state.searchCity;
		fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
			.then(this.handleErrors)
			.then(res => res.json())
			.then(result => {
				this.setState({
					items: result
				});
			})
			.catch(error => {
				alert("City not found!");
			});

		e.preventDefault();
	};

	render() {
		let weather = null;
		if (this.state.isLoaded) {
			weather = (
				<div className="App">
					<div className={`${this.getTime(new Date())} wrapper`}>
						<div className="weather">
							<div className="weather-search">
								<form
									action=""
									onSubmit={this.handleSearchSubmit}
								>
									<input
										placeholder="Search by city"
										type="text"
										onChange={this.handleSearchInput}
										value={this.state.searchCity}
									/>
									<button type="submit">Search</button>
								</form>
							</div>
							<div className="weather-info">
								<p className="weather-title">
									{this.state.items.name}{" "}
									{this.state.items.sys.country}
								</p>
								<p>{this.getDate(new Date())}</p>
								<div className="weather-info-left">
									<p className="weather-description">
										{
											this.state.items.weather[0]
												.description
										}
									</p>
									<p className="weather-image">
										<img
											src={process.env.PUBLIC_URL+`/images/animated-icons/${this.state.items.weather[0].icon}.svg`}
											alt={
												this.state.items.weather[0]
													.description
											}
										/>
										{Math.round(
											this.state.items.main.temp,
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
		return (
			<div>
				{weather}
			</div>
		);
	}
}
export default App;
