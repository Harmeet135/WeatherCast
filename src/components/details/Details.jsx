import moment from "moment";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Details = ({ days }) => {
  return (
    <>
      <h1 className="today">{days.name}</h1>
      <div className="container">
        <div className="e">
          <p>{Math.round(days.main.temp)}&deg;C</p>

          <p>
            {days.weather[0].main}
            <img
              src={
                "http://openweathermap.org/img/w/" +
                days.weather[0].icon +
                ".png"
              }
              alt=""
            />
          </p>

          <p>{days.weather[0].description}</p>
          <p>{moment(days.dt_txt).format("dddd hh:mm")}am</p>
        </div>

        <div className="f">
          <p className="">
            Real Feel: {Math.round(days.main.feels_like)}
            &deg;C
          </p>
          <p className="">Humidity: {days.main.humidity}%</p>
          <p className="">Cloud Cover: {days.clouds.all}%</p>
          <p className="">Min Temp: {Math.round(days.main.temp_min)}&deg;C</p>
          <p className="">Max Temp: {Math.round(days.main.temp_max)}&deg;C</p>
        </div>
      </div>
    </>
  );
};

export default Details;
