import React, { useState } from "react";
import "../Styles/style.css";
import { FaMap } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import moment from "moment";
import Details from "../details/Details";

const TempApp = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=9d61cf2de05c8f73a73465f4edeb4f42`;
  // https://api.openweathermap.org/data/2.5/weather?q=&units=metric&appid=9d61cf2de05c8f73a73465f4edeb4f42
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setCity(response.data.city);
        console.log(response.data.city.name);
      });
      setLocation("");
    }
  };

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
                <p className="cityy">{city.name}</p>
              </div>
            </div>

            <div className="c">
              <h1 className="info">The Only Weather Forecast You Need</h1>
              <hr />
              <div className="inputData">
                {/* <input type="search" className='inputField' placeholder="Enter location" value={search} onChange={(event) => { setSearch(event.target.value) }} /> */}
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyPress={searchLocation}
                  placeholder="Enter Location"
                  type="text"
                />
                <button type="submit">
                  <i className="sign1" aria-hidden="true" type="submit">
                    <BiSearch />
                  </i>
                </button>
              </div>
            </div>
          </div>

          {/* info card section  */}
          <div className="info-container">
            <ul className="info-list">
              <li>Weather</li>
              <li>Alerts</li>
              <li>Map</li>
              <li>Satellite</li>
              <li>News</li>
            </ul>
            <div className="d">
              {!data.city ? (
                <div className="before-info">
                  <p className="errorMsg">No Data Found</p>
                </div>
              ) : (
                <>
                  <h1 className="today">{data.city.name} </h1>
                  <div className="container">
                    <div className="e">
                      <p>{Math.round(data.list[0].main.temp)}&deg;C</p>
                      <p>
                        {data.list[0].weather[0].main}
                        <img
                          src={
                            "http://openweathermap.org/img/w/" +
                            data.list[0].weather[0].icon +
                            ".png"
                          }
                          alt=""
                        />
                      </p>
                      <p>{data.list[0].weather[0].description}</p>
                      <p>{moment().format("dddd MMM YYYY")}</p>
                    </div>

                    <div className="f">
                      <p className="">
                        Real Feel: {Math.round(data.list[0].main.feels_like)}
                        &deg;C
                      </p>
                      <p className="">
                        Humidity: {data.list[0].main.humidity}%
                      </p>
                      <p className="">
                        Cloud Cover: {data.list[0].clouds.all}%
                      </p>
                      <p className="">
                        Min Temp: {Math.round(data.list[0].main.temp_min)}&deg;C
                      </p>
                      <p className="">
                        Max Temp: {Math.round(data.list[0].main.temp_max)}&deg;C
                      </p>
                    </div>
                  </div>
                  {data.length === 0 ? (
                    <>
                      <h1>no data</h1>
                    </>
                  ) : (
                    <>
                      <div id="extra">
                        {data.list.map((days, index) => {
                          if (index % 8 === 1 && index > 1) {
                            return <Details key={index} days={days} />;
                          }
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempApp;
