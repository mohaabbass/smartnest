"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { SiKasasmart } from "react-icons/si";

const Header = () => {
  return (
    <header className="flex px-6 py-6">
      <Link href="/" className="flex tracking-wide">
        <SiKasasmart className="w-5 h-5 text-white" />
        <p className="text-white ml-2">nestaide</p>
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
