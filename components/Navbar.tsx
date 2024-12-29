"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [isAuthButtonLoaded, setIsAuthButtonLoaded] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      setIsLoggedIn(false);
      document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      localStorage.setItem("isLoggedIn", "false");
      router.push("/login");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const newTheme = isDarkMode ? "light" : "dark";
    document.body.style.setProperty("--toggle-x", `${rect.left + rect.width / 2}px`);
    document.body.style.setProperty("--toggle-y", `${rect.top + rect.height / 2}px`);
    const nextBackground = newTheme === "dark" ? "#0d1117" : "#ffffff";
    document.body.style.setProperty("--reveal-bg", nextBackground);
    document.body.classList.add("theme-reveal");

    setTimeout(() => {
      document.documentElement.setAttribute("data-theme", newTheme);
      toggleTheme();
      document.body.classList.remove("theme-reveal");
      localStorage.setItem("theme", newTheme);
    }, 600);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    setIsThemeLoaded(true);
    setIsAuthButtonLoaded(true); 

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsLoggedIn]);

  return (
    <nav
      className={`p-4 flex justify-between items-center border-b border-gray-300 relative ${
        isScrolled
          ? "bg-opacity-70 backdrop-blur-md shadow-md sticky top-0 left-0 w-full z-50"
          : "bg-transparent"
      } transition-all duration-300 ease-in-out`}
    >
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          } hover:text-gray-500 focus:outline-none`}
          aria-label="Toggle menu"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex flex-row md:space-x-6 space-y-4 md:space-y-0 md:items-center w-full md:w-auto">
        <li
          className={`text-xl md:text-sm ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <Link href="/" className="hover:text-gray-500">
            Home
          </Link>
        </li>
        <li
          className={`text-xl md:text-sm ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <Link href="/halls" className="hover:text-gray-500">
            Halls
          </Link>
        </li>
        <li
          className={`text-xl md:text-sm ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <Link href="/maintenance" className="hover:text-gray-500">
            Maintenance
          </Link>
        </li>
        <li
          className={`text-xl md:text-sm ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <Link href="/volunteers" className="hover:text-gray-500">
            Volunteers
          </Link>
        </li>

        {/* Only show if logged in */}
        {isLoggedIn && (
          <>
            <li
              className={`text-xl md:text-sm ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              <Link href="/requests" className="hover:text-gray-500">
                Requests
              </Link>
            </li>
            <li
              className={`text-xl md:text-sm ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              <Link href="/bookings" className="hover:text-gray-500">
                Bookings
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Slide-In Menu */}
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden flex flex-col space-y-4 w-full h-screen p-4 absolute top-0 left-0 z-50 transition-transform transform`}
        style={{
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s ease-in-out",
          backgroundColor: isDarkMode ? "var(--card-bg)" : "#ffffff", // Ensure white background for light mode
        }}
      >
        <li
          className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"} mt-12`}
        >
          <Link
            href="/"
            className="hover:text-gray-900"
            onClick={() => {
              // Add a delay to close the menu
              setTimeout(() => setIsMenuOpen(false), 500); // 500ms delay
            }}
          >
            Home
          </Link>
        </li>
        <li
          className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <Link
            href="/halls"
            className="hover:text-gray-900"
            onClick={() => {
              // Add a delay to close the menu
              setTimeout(() => setIsMenuOpen(false), 500); // 500ms delay
            }}
          >
            Halls
          </Link>
        </li>
        <li
          className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <Link
            href="/maintenance"
            className="hover:text-gray-900"
            onClick={() => {
              // Add a delay to close the menu
              setTimeout(() => setIsMenuOpen(false), 500); // 500ms delay
            }}
          >
            Maintenance
          </Link>
        </li>
        <li
          className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <Link
            href="/volunteers"
            className="hover:text-gray-900"
            onClick={() => {
              // Add a delay to close the menu
              setTimeout(() => setIsMenuOpen(false), 500); // 500ms delay
            }}
          >
            Volunteers
          </Link>
        </li>

        {/* Only show if logged in */}
        {isLoggedIn && (
          <>
            <li
              className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              <Link
                href="/requests"
                className="hover:text-gray-900"
                onClick={() => {
                  setTimeout(() => setIsMenuOpen(false), 500);
                }}
              >
                Requests
              </Link>
            </li>
            <li
              className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              <Link
                href="/bookings"
                className="hover:text-gray-900"
                onClick={() => {
                  setTimeout(() => setIsMenuOpen(false), 500);
                }}
              >
                Bookings
              </Link>
            </li>
          </>
        )}

        {/* Close Button */}
        <li className="absolute top-4 right-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-900 text-3xl"
            aria-label="Close menu"
          >
            &times;
          </button>
        </li>
      </ul>

      {/* Buttons - Theme Toggle and Login/Logout */}
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        {/* Theme Toggle Button */}
        {isThemeLoaded && (
          <button
            id="theme-toggle-button"
            onClick={handleToggle}
            className="relative w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-full focus:outline-none overflow-hidden"
            aria-label="Toggle Theme"
          >
            {/* Sun/Moon Icons */}
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1.5M16.95 7.05l1.06 1.06M21 12h-1.5M16.95 16.95l-1.06 1.06M12 21v-1.5M7.05 16.95l-1.06-1.06M3 12h1.5M7.05 7.05L8.11 8.11"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"
                />
              </svg>
            )}
          </button>
        )}

        {/* Login/Logout Button */}
        {isAuthButtonLoaded && (
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
