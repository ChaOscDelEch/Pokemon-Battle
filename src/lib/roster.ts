// Pokemon Roster Management with LocalStorage

const ROSTER_KEY = "pokemon-roster";
const MAX_ROSTER_SIZE = 6;

// Get current roster from localStorage
export function getRoster(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(ROSTER_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading roster from localStorage:", error);
    return [];
  }
}

// Save roster to localStorage
function saveRoster(roster: number[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
  } catch (error) {
    console.error("Error saving roster to localStorage:", error);
  }
}

// Add Pokemon to roster
export function addPokemonToRoster(pokemonId: number): boolean {
  const currentRoster = getRoster();

  // Check if roster is full
  if (currentRoster.length >= MAX_ROSTER_SIZE) {
    console.warn("Roster is full! Maximum 6 Pokemon allowed.");
    return false;
  }

  // Check if Pokemon already in roster
  if (currentRoster.includes(pokemonId)) {
    console.warn("Pokemon already in roster!");
    return false;
  }

  // Add Pokemon
  const newRoster = [...currentRoster, pokemonId];
  saveRoster(newRoster);
  console.log(`Pokemon ${pokemonId} added to roster!`);
  return true;
}

// Remove Pokemon from roster
export function removePokemonFromRoster(pokemonId: number): boolean {
  const currentRoster = getRoster();

  // Check if Pokemon is in roster
  if (!currentRoster.includes(pokemonId)) {
    console.warn("Pokemon not in roster!");
    return false;
  }

  // Remove Pokemon
  const newRoster = currentRoster.filter((id) => id !== pokemonId);
  saveRoster(newRoster);
  console.log(`Pokemon ${pokemonId} removed from roster!`);
  return true;
}

// Check if roster is full
export function isRosterFull(): boolean {
  return getRoster().length >= MAX_ROSTER_SIZE;
}

// Check if Pokemon is in roster
export function isPokemonInRoster(pokemonId: number): boolean {
  return getRoster().includes(pokemonId);
}

// Get roster size
export function getRosterSize(): number {
  return getRoster().length;
}

// Clear entire roster
export function clearRoster(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ROSTER_KEY);
  console.log("Roster cleared!");
}

// Get roster info
export function getRosterInfo() {
  const roster = getRoster();
  return {
    pokemon: roster,
    size: roster.length,
    isFull: roster.length >= MAX_ROSTER_SIZE,
    hasSpace: roster.length < MAX_ROSTER_SIZE,
    emptySlots: MAX_ROSTER_SIZE - roster.length,
  };
}
