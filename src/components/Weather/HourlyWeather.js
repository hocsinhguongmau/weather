import React from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer
} from "recharts";

const HourlyWeather = props => {
	let data = [];
	let hourlyWeatherValue = null;

	if (props.isLoaded === true && props.searchStatus === true) {
		const hourlyWeather = props.hourlyWeather;
		for (let i = 0; i < hourlyWeather.data.length; i++) {
			data.push({
				name: props.updateTime(hourlyWeather.data[i].time),
				temp: props.FtoC(hourlyWeather.data[i].temperature)
			});
			if (i > 7) {
				break;
			}
		}
	}

	hourlyWeatherValue = (
		<div>
			<h2 className="small-title">Weather forecast hourly</h2>
			<ResponsiveContainer width="100%" height={200}>
				<LineChart data={data} fontSize="12">
					<Line type="monotone" dataKey="temp" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						label={{
							value: "Hour",
							position: "bottom",
							offset: -5,
							fontSize: 12,
							color: "#333"
						}}
						interval={0}
					/>
					<YAxis
						allowDecimals={false}
						label={{
							value: "Temperature",
							angle: -90,
							fontSize: 12,
							color: "#333"
						}}
					/>
					<Tooltip />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);

	return <div>{hourlyWeatherValue}</div>;
};

export default HourlyWeather;
