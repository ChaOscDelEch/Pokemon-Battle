"use client";

import "./globals.css";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ErrorBoundary from "../components/ErrorBoundary";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (href: string) =>
    pathname?.startsWith(href.replace("[id]", "")) ?? false;

  const getLinkClass = (href: string) =>
    isActive(href)
      ? "text-red-600 font-semibold"
      : "hover:text-red-600 transition";

  return (
    <html lang="en">
      <body className="bg-yellow-300 min-h-screen flex flex-col">
        <ErrorBoundary>
          {/* Header */}
          <header className="flex items-center justify-between p-4 mx-auto bg-yellow-300 relative">
            {/* Logo & Title */}
            <div className="flex items-center space-x-2">
              <img
                src="/logo_pokemon.png"
                alt="Logo"
                className="h-20 w-20 object-contain"
              />
              <h1 className="text-xl font-bold text-red-600">
                Pokémon Battlefield
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex space-x-6 font-semibold min-w-5xl mx-auto justify-end">
              {/* Your links */}
              <Link href="/" className={getLinkClass("/")}>
                Home
              </Link>
              <Link
                href="/instructions"
                className={getLinkClass("/instructions")}
              >
                Instructions
              </Link>
              <Link href="/pokemon/1" className={getLinkClass("/pokemon/1")}>
                Pokémon Details
              </Link>
              <Link href="/roster" className={getLinkClass("/roster")}>
                My Roster
              </Link>
              <Link href="/battle" className={getLinkClass("/battle")}>
                Battle
              </Link>
              <Link
                href="/leaderboard"
                className={getLinkClass("/leaderboard")}
              >
                Leaderboard
              </Link>
            </nav>

            {/* Hamburger */}
            <div className="xl:hidden">
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="focus:outline-none"
              >
                {/* Hamburger SVG */}
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu - visible when menuOpen is true */}
            {menuOpen && (
              <div className="absolute top-full left-0 w-full bg-yellow-200 shadow-md z-50 md:hidden">
                <nav className="flex flex-col space-y-2 p-4">
                  <Link
                    href="/"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={getLinkClass("/")}>Home</span>
                  </Link>
                  <Link
                    href="/instructions"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={getLinkClass("/instructions")}>
                      Instructions
                    </span>
                  </Link>
                  <Link
                    href="/pokemon/1"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={getLinkClass("/pokemon/1")}>
                      Pokémon Details
                    </span>
                  </Link>
                  <Link
                    href="/roster"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={getLinkClass("/roster")}>My Roster</span>
                  </Link>
                  <Link
                    href="/battle"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={getLinkClass("/battle")}>Battle</span>
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={getLinkClass("/leaderboard")}>
                      Leaderboard
                    </span>
                  </Link>
                </nav>
              </div>
            )}
          </header>

          {/* Wrap children with ErrorBoundary */}
          <main className="flex-1 text-center p-4">{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
