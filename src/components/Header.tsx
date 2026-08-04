'use client'

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlay, FaChevronDown, FaSearch, FaUser, FaBars, FaTimes, FaRegBell } from "react-icons/fa";
import AuthModal from "./Auth/AuthModal";
import { useSession } from "../services/auth";

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

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: "New Release",
    message: "Inception is now available to stream.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Watchlist Updated",
    message: "Interstellar was added to your watchlist.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: 3,
    title: "Welcome to ReelFlow",
    message: "Your subscription is now active. Enjoy streaming!",
    time: "1 day ago",
    read: false,
  },
  {
    id: 4,
    title: "New Season",
    message: "The Dark Knight trilogy is back in 4K.",
    time: "3 days ago",
    read: true,
  },
];

const Navbar= ({query,setQuery,onSubmit}:NavbarProps ) => {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: session } = useSession();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;
  const isLoggedIn = !!session?.user;

  const openAuth = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      openAuth("signin");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNotifOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  

  return (
    <>
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

          {/* notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-label="Notifications"
              aria-expanded={notifOpen}
              className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0"
            >
              <FaRegBell className="text-base" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center border-2 border-black">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotifOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.div
                    className="absolute right-0 top-full mt-3 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl bg-[#161616] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden origin-top-right"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <span className="text-sm font-bold text-white">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[11px] text-red-500 hover:text-red-400 font-semibold transition-colors cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <ul className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <li key={n.id}>
                        <button
                          onClick={() => markRead(n.id)}
                          className={`w-full text-left px-4 py-3 flex gap-3 transition-colors cursor-pointer ${
                            n.read
                              ? "bg-transparent hover:bg-white/5"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <span
                            className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                              n.read ? "bg-transparent" : "bg-red-500"
                            }`}
                          />
                          <span className="flex-1 min-w-0">
                            <span
                              className={`block text-sm truncate ${
                                n.read ? "text-gray-400" : "text-white font-semibold"
                              }`}
                            >
                              {n.title}
                            </span>
                            <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
                              {n.message}
                            </span>
                            <span className="block text-[11px] text-gray-600 mt-1">
                              {n.time}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-white/10 p-2">
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="w-full text-center text-xs font-bold text-white py-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      View all notifications
                    </button>
                  </div>
                </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleUserClick}
            aria-label="Profile"
            className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors shrink-0 cursor-pointer"
          >
            <FaUser className="text-sm" />
          </button>

          <Link
            to="/subscribe"
            className="hidden sm:inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider px-5 py-2.5 rounded-md no-underline transition-colors"
          >
            SUBSCRIBE
          </Link>
        </div>
      </div>
    </header>

    <AuthModal
      open={authOpen}
      onClose={() => setAuthOpen(false)}
      initialMode={authMode}
    />
    </>
  );
};

export default Navbar;