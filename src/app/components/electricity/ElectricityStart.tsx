"use client";

import { useEffect, useState } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import Loader from "../ui/loader/Loader";
import { VscCircleFilled } from "react-icons/vsc";
import { Switch } from "@/components/ui/switch";

export default function ElectricityStart() {
  const [electricityData, setElectricityData] = useState<any[]>([]);
  const [expandElectricity, setExpandElectricity] = useState(false);
  const [includeVAT, setIncludeVAT] = useState(false);

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

  const handleIncludeVAT = () => {
    setIncludeVAT(!includeVAT);
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
    includeVAT ? (
      (currentPrice.SEK_per_kWh * 1.25).toFixed(2)
    ) : (
      currentPrice.SEK_per_kWh.toFixed(2)
    )
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

  const currentTimeRange = currentPrice
    ? formatTimeRange(currentPrice.time_start, currentPrice.time_end)
    : "";

  return (
    <div className="relative border rounded-xl shadow-sm bg-white font-default">
      <span className="absolute text-xs bg-orange-400 text-white rounded-sm py-1 px-3 top-[-10px] left-[16px] tracking-wide">
        Electricity
      </span>
      <section className="flex items-center justify-center pt-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">{currentTimeRange || "Now"}</p>
          <span className=" font-bold text-5xl my-2 text-slate-600">
            {priceToShow}
          </span>
          <p className="text-sm">kr/kWh</p>
        </div>
      </section>

      <section
        className={`${
          expandElectricity ? "max-h-[1200px] mb-4" : "max-h-0"
        } overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white mx-5 mt-6 rounded-md`}
      >
        <div className="flex items-center justify-end px-6 p-4 bg-slate-100">
          <p className="mr-auto text-sm">
            {day}-{month}-{year}
          </p>
          <p className="text-sm mr-2">Ink moms</p>
          {includeVAT ? (
            <Switch onCheckedChange={handleIncludeVAT} />
          ) : (
            <Switch onCheckedChange={handleIncludeVAT} />
          )}
        </div>
        <ul className="relative mx-3 text-sm font-default">
          <li className="flex px-3 py-4 border-b font-semibold">
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
                  isCurrentTime ? "bg-slate-100 font-semibold" : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  {formatTimeRange(post.time_start, post.time_end)}
                </div>
                <div className="flex items-center justify-center ml-auto">
                  {!includeVAT
                    ? post.SEK_per_kWh.toFixed(2)
                    : (post.SEK_per_kWh * 1.25).toFixed(2)}
                  <span>
                    <VscCircleFilled
                      className={`
                        ${post.SEK_per_kWh <= 0.1 ? "text-green-400" : ""}
                        ${
                          post.SEK_per_kWh > 0.1 && post.SEK_per_kWh <= 0.3
                            ? "text-yellow-400"
                            : ""
                        }
                        ${post.SEK_per_kWh > 0.3 ? "text-red-400" : ""}
                        ml-2
                    `}
                    />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex items-center justify-center mt-2">
        {!expandElectricity ? (
          <FaCircleChevronDown
            className="w-6 h-6 text-[#19B3BE] mb-4 rounded-t-full cursor-pointer"
            onClick={handleExpandElectricity}
          />
        ) : (
          <FaCircleChevronUp
            className="w-6 h-6 text-[#19B3BE] mb-4 rounded-t-full cursor-pointer"
            onClick={handleExpandElectricity}
          />
        )}
      </div>
    </div>
  );
}
