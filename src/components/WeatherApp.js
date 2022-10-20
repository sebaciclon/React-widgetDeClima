import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";
import styles from './WeatherApp.module.css';
import Loading from "../Loading";

// Puede haber tantos useEffect como se necesiten

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadInfo();
    }, []); // cuando este arreglo esta vacio este useEffect se ejecuta solo una vez

    useEffect(() => {
        document.title = `Weather: ${weather?.location.name ?? ""}`;
    }, [weather]);  // Este useEffect se va a ejecutar solo cuando la variable weather cambie, sino no

    async function loadInfo(city = "Rauch") {
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);
            const json = await request.json();
            setWeather(json);
            console.log(json);
        } catch (error) {
            
        }
    }

    function handleChangeCity(city) {
        setWeather(null);
        loadInfo(city);
    }

    return (
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleChangeCity}/>
            {weather ? <WeatherMainInfo weather={weather}/> : <Loading/>} 
            
            
        </div>
    );
}