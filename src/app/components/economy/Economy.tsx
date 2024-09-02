"use client";

import { useState } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import Loader from "../ui/loader/Loader";
import { LiaCoinsSolid } from "react-icons/lia";

export default function Economy() {
  const [expandElectricity, setExpandElectricity] = useState(false);

  const handleExpandElectricity = () => {
    setExpandElectricity(!expandElectricity);
  };

  return (
    <div className="relative border rounded-xl shadow-slate-200 shadow-sm bg-white font-default mb-6">
      <span className="absolute text-xs bg-orange-400 text-white rounded-sm py-1 px-3 top-[-10px] left-[16px] tracking-wide shadow-sm">
        Economy
      </span>
      <section className="flex items-center justify-center py-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Totalt lån kvar</p>
          <div className="flex flex-col justify-center items-center">
            <span className="flex items-center text-3xl mt-2 text-slate-600">
              <LiaCoinsSolid className="w-6 h-6 mr-2" /> 2 366 883 kr
            </span>
          </div>
        </div>
      </section>
      <section
        className={`${
          expandElectricity ? "max-h-[1200px] mb-4" : "max-h-0"
        } overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white mx-5 mt-2 rounded-md`}
      >
        <ul className="relative mx-3 text-sm font-default">
          <li className="flex px-3 py-4 border-b font-semibold">
            <div>Bank</div>
            <div className="ml-auto">Totalt</div>
          </li>
          <li className="flex p-3 border-b">
            <div>SBAB</div>
            <div className="ml-auto">2 236 243 kr</div>
          </li>
          <li className="flex p-3 border-b">
            <div>Nordea</div>
            <div className="ml-auto">89 243 kr</div>
          </li>
          <li className="flex p-3 border-b">
            <div>Santander</div>
            <div className="ml-auto">19 923 kr</div>
          </li>
          <li className="flex p-3 border-b">
            <div>Ecster</div>
            <div className="ml-auto">8 653 kr</div>
          </li>
          <li className="flex p-3 border-b">
            <div>Svea</div>
            <div className="ml-auto">8 114 kr</div>
          </li>
          <li className="flex p-3 border-b">
            <div>Ikano</div>
            <div className="ml-auto">4 707 kr</div>
          </li>
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
