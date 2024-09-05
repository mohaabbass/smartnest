"use client";

import { useEffect, useState } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import Loader from "../ui/loader/Loader";
import { LiaCoinsSolid } from "react-icons/lia";

export default function Economy() {
  const [expandElectricity, setExpandElectricity] = useState(false);

  const fetchEconomy = async () => {
    const res = await fetch("/api/economy");
    const banks = await res.json();
    return banks;
  };

  const [bankData, setBankData] = useState([]);

  useEffect(() => {
    fetchEconomy().then((bank) => {
      setBankData(bank);
    });
  }, []);

  const handleExpandElectricity = () => {
    setExpandElectricity(!expandElectricity);
  };

  const totalLoanSum = bankData.reduce(
    (acc, bank) => acc + parseFloat(bank.totalLoan),
    0
  );
  const roundedTotalLoanSum = Math.round(totalLoanSum);

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
              <LiaCoinsSolid className="w-6 h-6 mr-2" />{" "}
              {new Intl.NumberFormat("sv-SE").format(roundedTotalLoanSum)} kr
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
          {bankData
            .sort((a, b) => Number(b.totalLoan) - Number(a.totalLoan)) // Sorting in descending order
            .map((bank, index) => {
              const roundedTotalSum = Math.round(Number(bank.totalLoan)); // Convert totalLoan to number
              const formattedLoan = new Intl.NumberFormat("sv-SE").format(
                roundedTotalSum
              );
              return (
                <li
                  key={index}
                  className="flex px-3 py-4 border-b font-semibold"
                >
                  <div>{bank.name}</div>
                  <div className="ml-auto">{formattedLoan} kr</div>
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
