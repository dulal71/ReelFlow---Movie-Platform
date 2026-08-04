'use client'

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlay, FaChevronDown, FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}
const NAVBAR_BG =
  "bg-gradient-to-r from-red-900 via-black to-red-900 shadow-lg shadow-black/30 border-b border-white/10";
const SIDENAVBAR_BG =
  "bg-gradient-to-r from-red-900/50 via-black to-red-900/50 shadow-lg shadow-black/30 border-b border-white/10";

const NAV_LINKS: { label: string; to: string; hasDropdown?: boolean }[] = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movies", hasDropdown: true },
  { label: "Tv Shows", to: "/tv-shows", hasDropdown: true },
  { label: "Video", to: "/video", hasDropdown: true },
  { label: "Pages", to: "/pages", hasDropdown: true },
];

const Navbar= ({query,setQuery,onSubmit}:NavbarProps ) => {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? NAVBAR_BG : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-8 sm:px-14 py-4">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
          <span className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center">
            <FaPlay className="text-white text-xs translate-x-[1px]" />
          </span>
          <span className="text-xl font-extrabold tracking-wide text-white">
           REELFLOW
          </span>
        </Link>

        {/* nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center gap-1 text-md font-medium no-underline transition-colors ${
                link.label === "Home"
                  ? "text-red-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
              {link.hasDropdown && <FaChevronDown className="text-[10px] opacity-70" />}
            </Link>
          ))}
        </nav>

        {/* hamburger menu (md & mobile) */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="lg:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors shrink-0"
        >
          <FaBars />
        </button>

        {/* mobile / md sidebar */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] ${SIDENAVBAR_BG } flex flex-col transition-transform duration-500 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-xl font-extrabold tracking-wide text-white">
                REELFLOW
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-4 py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-1 text-md font-medium no-underline px-4 py-3 rounded-md transition-colors ${
                    pathname === link.to
                      ? "text-red-500 bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <FaChevronDown className="text-[10px] opacity-70 ml-auto" />}
                </Link>
              ))}
            </nav>
          </aside>
        </div>

        {/* search + profile + subscribe */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
            className="hidden md:flex items-center bg-white/10 border border-white/15 rounded-full pl-4 pr-1 py-1.5 focus-within:border-red-500/60 transition-colors"
          >
            <input
              type="text"
              placeholder="Search ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-32 lg:w-40"
            />
            <button
              type="submit"
              aria-label="Search"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs transition-colors"
            >
              <FaSearch />
            </button>
          </form>

          <Link
            to="/profile"
            aria-label="Profile"
            className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors shrink-0"
          >
            <FaUser className="text-sm" />
          </Link>

          <Link
            to="/subscribe"
            className="hidden sm:inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider px-5 py-2.5 rounded-md no-underline transition-colors"
          >
            SUBSCRIBE
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;