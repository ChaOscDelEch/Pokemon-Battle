// Quick test component to add Pokemon

"use client";

import {
  addPokemonToRoster,
  getRoster,
  clearRoster,
  getRosterInfo,
} from "@/lib/roster";

export default function TestRoster() {
  const addTestPokemon = () => {
    addPokemonToRoster(25); // Pikachu
    addPokemonToRoster(1); // Bulbasaur
    addPokemonToRoster(150); // Mewtwo
    addPokemonToRoster(6); // Charizard
    addPokemonToRoster(9); // Blastoise
    addPokemonToRoster(22); // Fearow

    alert("Test Pokemon added! Check your roster.");
    console.log("Current roster:", getRoster());
    console.log("Roster info:", getRosterInfo());
  };

  const clearTestRoster = () => {
    clearRoster();
    alert("Roster cleared!");
    console.log("Roster after clear:", getRoster());
  };

  const showRoster = () => {
    const roster = getRoster();
    const info = getRosterInfo();
    console.log("Current roster:", roster);
    console.log("Roster info:", info);
    alert(`Roster has ${info.size} Pokemon: [${roster.join(", ")}]`);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg space-y-2">
      <h3 className="font-bold">Test Controls</h3>
      <div className="space-y-2">
        <button
          onClick={addTestPokemon}
          className="block w-full bg-green-500 hover:bg-green-600 px-3 py-2 rounded text-sm"
        >
          Add Test Pokemon
        </button>
        <button
          onClick={showRoster}
          className="block w-full bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-sm"
        >
          Show Roster
        </button>
        <button
          onClick={clearTestRoster}
          className="block w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-sm"
        >
          Clear Roster
        </button>
      </div>
    </div>
  );
}
