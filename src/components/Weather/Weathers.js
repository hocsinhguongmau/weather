import React, {Component} from "react";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";

const api = {
	key: "e985b57d27d16a6af5f72b816e5afe31",
	base: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast"
};

class Weathers extends Component {
	state = {
		isLoaded: false,
		currentCoordinates: {},
		currentLocation: "",
		currentTime: null,
		currentWeather: {},
		searchStatus: false,
		newCoordinates: {},
		hourlyWeather: {}
	};
	fetchLocation(lat, lon) {
		fetch(`${api.base}/${api.key}/${lat},${lon}`)
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						isLoaded: true,
						currentWeather: result.currently,
						hourlyWeather: result.hourly,
						searchStatus: true
					});
				},
				error => {
					this.setState({
						isLoaded: true,
						searchStatus: "Searching...",
						error
					});
				}
			)
			.then(this.getLocationName(lat, lon));
	}

	getLocationName(lat, lon) {
		Geocode.setApiKey("AIzaSyCO9x6JVamwo9b09PmJkpkUrYR3FI9mK6A");
		Geocode.setLanguage("en");
		Geocode.fromLatLng(lat, lon).then(
			response => {
				const address = response.results[0];
				const length = address.address_components.length;
				this.setState({
					currentLocation: `${address.address_components[length - 3].long_name} ${address.address_components[length - 1].long_name} ${address.address_components[length - 2].short_name}`
				});
			},
			error => {
				this.setState({currentLocation: "Location not found"});
			}
		);
	}

	getLocationCoordinates(name) {
		Geocode.fromAddress(name).then(
			response => {
				const coordinates = response.results[0].geometry.location;
				this.setState({newCoordinates: coordinates});
			},
			error => {
				this.setState({newCoordinates: "City not found"});
			}
		);
	}

	async componentDidMount() {
		await new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					this.setState({
						currentCoordinates: {
							lat: position.coords.latitude,
							lon: position.coords.longitude
						}
					});
					resolve();
				});
			}
		});

		this.fetchLocation(
			this.state.currentCoordinates.lat,
			this.state.currentCoordinates.lon
		);
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

	updateTime(time) {
		const date = new Date(time * 1000);
		const hours = date.getHours();
		const minutes = "0" + date.getMinutes();

		return hours + ":" + minutes.substr(-2);
	}

	getHourOnly(time) {
		const date = new Date(time * 1000);
		const hours = date.getHours();
		return hours;
	}

	async fetchWithName(name) {
		await new Promise((resolve, reject) => {
			Geocode.fromAddress(name).then(
				response => {
					const coordinates = response.results[0].geometry.location;
					this.setState({newCoordinates: coordinates});
					resolve();
				},
				error => {
					this.setState({searchStatus: "City not found"});
				}
			);
		});
		this.fetchLocation(
			this.state.newCoordinates.lat,
			this.state.newCoordinates.lng
		);
	}

	fetchWithCoordinates(lat, lon) {
		this.fetchLocation(lat, lon);
	}

	FtoC(temp) {
		return (((temp - 32) * 5) / 9).toFixed(3);
	}

	render() {
		return (
			<div>
				<div className="weather-search">
					<Autocomplete
						placeholder="Search by city"
						onPlaceSelected={place => {
							if (place.name === undefined) {
								this.fetchWithCoordinates(
									place.geometry.location.lat(),
									place.geometry.location.lng()
								);
							} else {
								this.fetchWithName(place.name);
							}
						}}
						types={["(regions)"]}
					/>
					<a
						className="current-location"
						href="#"
						onClick={() =>
							this.fetchLocation(
								this.state.currentCoordinates.lat,
								this.state.currentCoordinates.lon
							)
						}
					>
						Use your current location
					</a>
				</div>
				<CurrentWeather
					isLoaded={this.state.isLoaded}
					searchStatus={this.state.searchStatus}
					getDate={this.getDate}
					currentLocation={this.state.currentLocation}
					FtoC={this.FtoC}
					currentWeather={this.state.currentWeather}
				/>
				<HourlyWeather
					isLoaded={this.state.isLoaded}
					searchStatus={this.state.searchStatus}
					FtoC={this.FtoC}
					hourlyWeather={this.state.hourlyWeather}
					updateTime={this.updateTime}
					getHourOnly={this.getHourOnly}
				/>
			</div>
		);
	}
}

export default Weathers;
