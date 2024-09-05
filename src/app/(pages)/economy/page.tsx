"use client";

import { useEffect, useState } from "react";

export default function Economy() {
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

  console.log("bankData", bankData);

  return (
    <div>
      <h1>Economy</h1>
    </div>
  );
}
