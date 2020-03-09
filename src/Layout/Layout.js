import React, {Component} from "react";
import Weathers from "../components/Weather/Weathers";
import HourlyWeather from "../components/Weather/HourlyWeather";

class Layout extends Component {
	getTime = t => {
		if (t.getHours() < 6 || t.getHours() > 18) {
			return "night";
		} else {
			return "day";
		}
	};
	render() {
		return (
			<div className={`${this.getTime(new Date())} wrapper`}>
				<div className="weather">
					<Weathers />
				</div>
			</div>
		);
	}
}

export default Layout;
