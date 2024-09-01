"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

import { TfiAlignRight } from "react-icons/tfi";
import { ModeToggle } from "../darkmode/ModeToggle";

const Navbar = () => {
  return (
    <div className="flex ml-auto">
      <Sheet>
        <SheetTrigger>
          <span className="text-xl cursor-pointer text-white">
            <TfiAlignRight />
          </span>
        </SheetTrigger>
        <SheetContent>
          <div className="h-full font-default">
            <nav className="flex h-[90%] items-center justify-center text-2xl">
              <ul className="text-center tracking-wider">
                <Link href="/">
                  <li className="py-2">Home</li>
                </Link>
                <Link href="/electricity">
                  <li className="py-2">Electricity</li>
                </Link>
                <Link href="/food">
                  <li className="py-2">Food</li>
                </Link>
                <Link href="/economy">
                  <li className="py-2">Ecomomy</li>
                </Link>
                <Link href="/other">
                  <li className="py-2">Other</li>
                </Link>
              </ul>
            </nav>
            <div className="flex items-center justify-center mt-auto">
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
