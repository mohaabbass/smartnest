"use client";

import Economy from "./components/economy/Economy";
import ElectricityStart from "./components/electricity/ElectricityStart";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="px-5 py-6">
      <ElectricityStart />
      <Economy />
      <GoogleButton onClick={() => signIn("google")} />
    </div>
  );
}
