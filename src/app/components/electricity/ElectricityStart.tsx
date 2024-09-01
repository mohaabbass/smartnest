"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import Loader from "../ui/loader/Loader";

export default function ElectricityStart() {
  const [electricityData, setElectricityData] = useState<any[]>([]);
  const [expandElectricity, setExpandElectricity] = useState(false);
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  useEffect(() => {
    fetchElectricityData();
  }, []);

  const handleExpandElectricity = () => {
    setExpandElectricity(!expandElectricity);
  };

  const fetchElectricityData = async () => {
    const apiUrl = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_SE3.json`;

    let data = await fetch(apiUrl);
    let posts = await data.json();

    setElectricityData(posts);
  };

  const currentPrice = electricityData.find((post: any) => {
    const timeStart = new Date(post.time_start);
    const timeEnd = new Date(post.time_end);
    return currentDate >= timeStart && currentDate < timeEnd;
  });

  const priceToShow = currentPrice ? (
    currentPrice.SEK_per_kWh.toFixed(2)
  ) : (
    <Loader />
  );

  function formatTimeRange(timeStart: Date, timeEnd: Date) {
    const startDate = new Date(timeStart);
    const endDate = new Date(timeEnd);

    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    const startTimeFormatted = startDate.toLocaleTimeString([], options as any);
    const endTimeFormatted = endDate.toLocaleTimeString([], options as any);

    return `${startTimeFormatted} - ${endTimeFormatted}`;
  }

  return (
    <div className="relative border rounded-md shadow-md bg-gradient-to-br from-[#2B88B9] via-[#19B3BE] to-[#53CBC9]">
      <span className="absolute text-xs bg-orange-400 text-white rounded-sm py-1 px-3 top-[-10px] left-[10px]">
        Electricity
      </span>
      <section className="flex items-center justify-center pt-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-white text-sm">Just nu</p>
          <span className="text-white font-bold text-5xl my-2">
            {priceToShow}
          </span>
          <p className="text-white text-sm">kr/kWh</p>
        </div>
      </section>

      <section
        className={`${
          expandElectricity ? "max-h-[1200px]" : "max-h-0"
        } overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white mx-5 mt-6 rounded-md`}
      >
        <ul className="relative mx-3 text-sm">
          <li className="flex p-3 border-b font-semibold">
            <div>Time</div>
            <div className="ml-auto">kr/kWh</div>
          </li>
          {electricityData.map((post: any) => {
            const currentTime = new Date();
            const startTime = new Date(post.time_start);
            const endTime = new Date(post.time_end);

            const isCurrentTime =
              currentTime >= startTime && currentTime <= endTime;
            return (
              <li
                key={post.time_start}
                className={`flex p-3 border-b ${
                  isCurrentTime ? "bg-slate-200 font-semibold" : ""
                }`}
              >
                <div>{formatTimeRange(post.time_start, post.time_end)}</div>
                <div className="ml-auto">{post.SEK_per_kWh.toFixed(2)}</div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex items-center justify-center mt-6">
        {!expandElectricity ? (
          <FaCircleChevronDown
            className="w-6 h-6 text-white mb-4 rounded-t-full cursor-pointer"
            onClick={handleExpandElectricity}
          />
        ) : (
          <FaCircleChevronUp
            className="w-6 h-6 text-white mb-4 rounded-t-full cursor-pointer"
            onClick={handleExpandElectricity}
          />
        )}
      </div>
    </div>
  );
}
