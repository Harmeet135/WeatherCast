import React, { useState } from 'react';
import "../Styles/style.css";
import { FaMap } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'
import moment from 'moment';



const TempApp = () => {



    const [data, setData] = useState({})
    const [location, setLocation] = useState('')


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9d61cf2de05c8f73a73465f4edeb4f42`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }


    return (
        <>
            <div className="outer-box">
                <div className="box">

                    {/* << ---- left side ---- >> */}

                    <div className="form-container">


                        <div className="a">
                            <h3 className="forecast">Forecast</h3>
                            <div className="b">
                                <FaMap className="sign" />
                                <p className="cityy">{data.name}</p>
                            </div>
                        </div>


                        <div className="c">
                            <h1 className="info">The Only Weather Forecast You Need</h1>
                            <hr />
                            <div className="inputData">
                                {/* <input type="search" className='inputField' placeholder="Enter location" value={search} onChange={(event) => { setSearch(event.target.value) }} /> */}
                                <input
                                    value={location}
                                    onChange={event => setLocation(event.target.value)}
                                    onKeyPress={searchLocation}
                                    placeholder='Enter Location'
                                    type="text" />
                                <button type="submit" >
                                    <i className="sign1"
                                        aria-hidden="true" type="submit"><BiSearch /></i>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* info card section  */}
                    <div className="info-container">
                        <ul className='info-list'>
                            <li>Weather</li>
                            <li>Alerts</li>
                            <li>Map</li>
                            <li>Satellite</li>
                            <li>News</li>
                        </ul>
                        <div className="d">
                            {!data.name ? (
                                <div className="before-info">
                                <p className='errorMsg'>No Data Found</p>
                                </div>
                            ) : (<>


                                <h1 className="today">{data.name}</h1>
                                <div className="container">
                                    <div className="e">
                                        <p>{Math.round(data.main.temp)}&deg;C</p>
                                        <p>{data.weather[0].main}
                                            <img src={"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"} alt="" />
                                        </p>
                                        <p>{data.weather[0].description}</p>
                                        <p>{moment().format("dddd MMM YYYY")}</p>
                                    </div>


                                    <div className="f">
                                        <p className="">Real Feel: {Math.round(data.main.feels_like)}&deg;C</p>
                                        <p className="">Humidity: {data.main.humidity}%</p>
                                        <p className="">Cloud Cover: {data.clouds.all}%</p>
                                        <p className="">Min Temp: {Math.round(data.main.temp_min)}&deg;C</p>
                                        <p className="">Max Temp: {Math.round(data.main.temp_max)}&deg;C</p>
                                    </div>
                                </div>
                         

                            </>
                            )}

                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default TempApp;