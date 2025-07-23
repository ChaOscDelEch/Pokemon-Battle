import "./globals.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import TestRoster from "@/components/TestRoster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-yellow-300 min-h-screen flex flex-col">
        {/* Header with logo and nav */}
        <header className="flex items-center justify-between p-4 mx-30 bg-yellow-300">
          {/* Logo and Site Name */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <Image
              src="/logo_pokemon.png"
              alt="Pokemon Battlefield Logo"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
            <h1 className="text-xl font-bold text-red-600">
              Pokémon Battlefield
            </h1>
          </Link>

          {/* Navigation bar on the right */}
          <nav className="flex space-x-6 font-semibold text-black">
            <Link
              href="/"
              className="hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded"
            >
              Home
            </Link>
            <Link
              href="/roster"
              className="hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded"
            >
              My Roster
            </Link>
            <Link
              href="/battle"
              className="hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded"
            >
              Battle
            </Link>
            <Link
              href="/leaderboard"
              className="hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded"
            >
              Leaderboard
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 mx-30 text-center p-4">{children}</main>

        {/* Test Controls (only in development) */}
        {process.env.NODE_ENV === "development" && <TestRoster />}
      </body>
    </html>
  );
}
