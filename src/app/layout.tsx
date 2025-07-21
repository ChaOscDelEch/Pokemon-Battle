import "./globals.css";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-yellow-300 min-h-screen flex flex-col">
        {/* Header with logo and nav */}
        <header className="flex items-center justify-between p-4 mx-30 bg-yellow-300">
          {/* Logo and Site Name */}
          <div className="flex items-center space-x-2">
          
            <img
              src="logo_pokemon.png"
              alt="Logo"
              className="h-20 w-20 object-contain"
            />
            <h1 className="text-xl font-bold text-red-600">
              Pokémon Battlefield
            </h1>
          </div>

          {/* Navigation bar on the right */}
          <nav className="flex space-x-6 font-semibold text-black">
            <a href="/" className="hover:text-red-600 transition">
              Home
            </a>
            <a href="/instructions" className="hover:text-red-600 transition">
              Instructions
            </a>
            <a href="/pokemon/[id]" className="hover:text-red-600 transition">
              Pokémon Details
            </a>
            <a href="/roster" className="hover:text-red-600 transition">
              My Roster
            </a>
            <a href="/battle" className="hover:text-red-600 transition">
              Battle
            </a>
            <a href="/leaderboard" className="hover:text-red-600 transition">
              Leaderboard
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 mx-30 text-center p-4">{children}</main>
      </body>
    </html>
  );
}
