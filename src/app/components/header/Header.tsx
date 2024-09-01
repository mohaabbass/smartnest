"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { SiKasasmart } from "react-icons/si";

const Header = () => {
  return (
    <header className="flex px-6 py-6 shadow-sm">
      <Link href="/" className="flex tracking-wide">
        <SiKasasmart className="w-6 h-6 text-white bg-gradient-to-br from-[#2B88B9] via-[#19B3BE] to-[#53CBC9] mr-2 p-1" />{" "}
        SmartNest
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
