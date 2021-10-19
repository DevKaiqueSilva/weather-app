
const ItemWeather = (props) => {
    const { day, celsius, type, minCelsius, maxCelsius } = props;

    const className = "sub-weather " + (props.isSelected==true?" selected ":""); 

    return(
        <a onClick={props.onClick} className={className}>
            <div>{day}</div>
            <img src={props.icon} className="icon"/>
            <div>{minCelsius}°C ~ {maxCelsius}°C</div>
        </a>
    );
}

export default ItemWeather;