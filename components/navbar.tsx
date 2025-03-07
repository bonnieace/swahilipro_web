"use client";

import { useState } from "react";

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { name: "About", href: "#About" },
    { name: "Features", href: "#features" },
    { name: "Reviews", href: "#Reviews" },
    { name: "Documentation", href: "/lms" },
  ];

  return (
    <div className="w-full flex justify-between items-center">
      {/* Logo/Brand - Left side */}
      <div className="flex-shrink-0">
        {/* Your logo or brand name would go here */}
        <span className="text-gray-800 font-bold text-xl"></span>
      </div>

      {/* Desktop Navigation - Middle/Right */}
      <nav aria-label="Global" className="hidden md:block ml-auto">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                className="text-gray-600 font-medium transition-colors hover:text-gray-900"
                href={link.href}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button - Right side */}
      <button
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        className="ml-auto md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        )}
      </button>

      {/* Mobile Navigation - Full width dropdown */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 md:hidden">
          <nav className="bg-white shadow-lg border-t">
            <ul className="py-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    className="block px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors hover:text-gray-900"
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
