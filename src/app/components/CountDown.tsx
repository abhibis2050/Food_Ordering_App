"use client";
import React from "react";
import Countdown from "react-countdown";

const CountDown = () => {
  const endingDate = new Date("2023-11-25");
  return (
    <Countdown
      date={endingDate}
      className="font-bold text-5xl text-yellow-500"
    />
  );
};

export default CountDown;
