
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import LogoutButton from "./LogoutButton";
import useCheckIsLoggedIn from "@/app/hooks/useCheckIsLoggedIn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 
  const { isLoggedIn } = useCheckIsLoggedIn();

  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-teal-500 hover:text-teal-600 transition-colors duration-300">
              FTA
            </Link>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-teal-500"
                    : "text-slate-300 hover:text-teal-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <Link href="/login" className="px-5 py-2 bg-sky-500 rounded-md font-semibold hover:bg-sky-600 transition-colors duration-300">
                Login
              </Link>
            )}
          </div>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="relative z-50 h-8 w-8 flex flex-col justify-between items-center"
            >
              <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-3.5" : ""}`} />
              <span className={`h-1 w-full bg-white rounded-lg transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-3.5" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-slate-900 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-y-20" : "-translate-y-full opacity-0"
        } px-2 pt-2 pb-3 space-y-1 sm:px-3`}
        style={{ top: isOpen ? 0 : '-100%' }}
      >
        <div className="pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)} 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? "bg-sky-500 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4">
            {isLoggedIn ? (
                <LogoutButton />
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full px-3 py-2 rounded-md text-base font-medium bg-sky-500 text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;