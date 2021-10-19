
import { useEffect, useState } from 'react';
import TextInput from '../components/TextInput';
import Button from "../components/Button";
import ItemWeather from '../components/ItemWeather';
import moment from "moment";
import axios from "axios";

function App() {
	const weathersImg = [
		{ name:"sun", img:"./img/sun.jpg", icon:"./img/icon/sun.png" },
		{ name:"rain", img:"./img/rain.jpg", icon:"./img/icon/rainy.png" },
		{ name:"cloudy-sun", img:"./img/sky.jpg", icon:"./img/icon/cloudy-sun.png" },
		{ name:"cloudy", img:"./img/cloudy.jpg", icon:"./img/icon/cloudy.png" },
		{ name:"sun-rain", img:"./img/sun-rain.jpg", icon:"./img/icon/sun-rain.png" }
	];
	const [weathers, setWeathers] = useState([]);
	const [weather, setWeather] = useState({});
	const [cityTemp, setCityTemp] = useState("");
	const [city, setCity] = useState("Sorocaba");

	const backgroundImage = !!weather.type?weathersImg.filter(w=>(weather.type.includes(w.name))):[];

	useEffect(() => {
		loadWeathers();
	}, []);
	 
	useEffect(() => {
		loadWeathers();
	},[city])

	const onSearchCity = () => {
		if(cityTemp!=""){
			setCity(cityTemp);
			setCityTemp("");
		}
	}

	const loadWeathers = async () => {
		const getDate = (days) => {
			return moment().add(days, "day").format().substring(0,10);
		}
		// for(let i=0;i<5;i++){
			let url = `http://api.weatherapi.com/v1/history.json?key=a1aa0a98f9ad4abfafe03308211910&q=${city}&dt=${getDate(0)}&end_dt=${getDate(5)}`;
			let { status, data } = await axios.get(url);
			console.log(status, data);
			if(status == 200){
				let weathersTemp = [];
				weathersTemp = data.forecast.forecastday.map((item,i)=>{
					console.log(item.day.condition.text);
					return {
						id: i,
						date: item.date,
						day: moment(item.date).format("dddd"),
						celsius: Math.ceil(item.day.avgtemp_c),
						minCelsius: Math.ceil(item.day.mintemp_c),
						maxCelsius: Math.ceil(item.day.maxtemp_c),
						type: item.day.condition.text,
						info: item.day.condition.text,
						icon: item.day.condition.icon,
					}
				});
				setWeathers(weathersTemp);
				setWeather(weathersTemp[0]);
			}

		// }
		
	}

	return (
	<div className="app" style={{backgroundImage: `url(${backgroundImage.length>0?backgroundImage[0].img:weathersImg[2].img})`, backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
		<div style={{maxWidth:"960px",margin:"auto",width:"100%"}}>
			<div className="row mb-4">
				<TextInput value={cityTemp} onChangeText={(text)=>setCityTemp(text)} className="mr-2" placeholder="Enter a city..." />
				<Button icon="MdSearch" color="#EF6C00" width="50px" height="40px" onClick={()=>onSearchCity()}/>
			</div>
			<div className="row main-weather">
				<img src={weather.icon} className="icon"/>
				<div className="flex info">
					<div className="subtitle mb-2">{weather.day}</div>
					<div className="title mb-2 mt-2">{city}</div>
					<div className="body-1 font-weight-light mt-2">Temperature {weather.celsius}°C</div>
					<div className="body-1 font-weight-light mt-2">{weather.info}</div>
				</div>
			</div>
			<div className="row sub-weather-container">
				{weathers.map((item,i)=>(
					<ItemWeather key={`weather${i}`}
					day={item.day} celsius={item.celsius} onClick={()=>{setWeather(item)}} isSelected={weather.id==item.id}
					type={item.type} icon={item.icon} maxCelsius={item.maxCelsius} minCelsius={item.minCelsius}
					/>
				))}
			</div>
		</div>
	
	</div>
	);
}

export default App;
