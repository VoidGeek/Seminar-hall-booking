"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position
  const router = useRouter();

  // Persist authentication state and theme state across refresh
  useEffect(() => {
    // Persist isLoggedIn state
    const authStatus = localStorage.getItem("isLoggedIn");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Persist theme state
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleTheme();  // Update internal theme state if needed
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [setIsLoggedIn, toggleTheme]);

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false"); // Update localStorage on logout
      router.push("/login");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    // Determine the new theme
    const newTheme = isDarkMode ? "light" : "dark";

    // Dynamically set the animation origin
    document.body.style.setProperty(
      "--toggle-x",
      `${rect.left + rect.width / 2}px`
    );
    document.body.style.setProperty(
      "--toggle-y",
      `${rect.top + rect.height / 2}px`
    );

    // Pre-set background color for the circular reveal to match the next theme
    const nextBackground = newTheme === "dark" ? "#0d1117" : "#ffffff"; // Update as per your theme colors
    document.body.style.setProperty("--reveal-bg", nextBackground);

    // Add animation class to trigger the circular reveal
    document.body.classList.add("theme-reveal");

    // Begin theme change after the animation completes
    setTimeout(() => {
      // Update the theme after animation ends
      document.documentElement.setAttribute("data-theme", newTheme);
      toggleTheme(); // Update internal theme state
      localStorage.setItem("theme", newTheme); // Save the theme to localStorage
      document.body.classList.remove("theme-reveal"); // Remove animation class
    }, 600); // Matches animation duration
  };

  // Handle closing the menu with a delay after a link is clicked
  const handleLinkClick = () => {
    setTimeout(() => {
      setIsMenuOpen(false); // Close menu after link is clicked
    }, 500); // Delay the closing to allow the page transition
  };

  // Effect to detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Set the state when scroll position is greater than 50px
      } else {
        setIsScrolled(false); // Reset state when scroll position is less than 50px
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <Link href="/" className="hover:text-gray-500" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li
          className={`text-xl md:text-sm ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <Link href="/halls" className="hover:text-gray-500" onClick={handleLinkClick}>
            Halls
          </Link>
        </li>
        <li
          className={`text-xl md:text-sm ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <Link href="/maintenance" className="hover:text-gray-500" onClick={handleLinkClick}>
            Maintenance
          </Link>
        </li>
        <li
          className={`text-xl md:text-sm ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <Link href="/volunteers" className="hover:text-gray-500" onClick={handleLinkClick}>
            Volunteers
          </Link>
        </li>
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
          <Link href="/" className="hover:text-gray-900" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li
          className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <Link href="/halls" className="hover:text-gray-900" onClick={handleLinkClick}>
            Halls
          </Link>
        </li>
        <li
          className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <Link href="/maintenance" className="hover:text-gray-900" onClick={handleLinkClick}>
            Maintenance
          </Link>
        </li>
        <li
          className={`text-xl ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <Link href="/volunteers" className="hover:text-gray-900" onClick={handleLinkClick}>
            Volunteers
          </Link>
        </li>

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

      {/* Theme Toggle Button */}
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <button
          onClick={handleToggle}
          className="relative w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full focus:outline-none overflow-hidden"
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
              className="w-6 h-6"
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

        {/* Login/Logout Button */}
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
    </nav>
  );
};

export default Navbar;
