import { useState } from "react";
import Card from "./Card";

interface Pokemon {
  name: string;
  sprites: { front_default: string; back_default?: string };
  types: string[];
  // Add other properties if needed
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Card className="w-64 h-96 mx-auto cursor-pointer">
      {/* Front Side */}
      <div className="absolute w-full h-full backface-hidden rounded-lg shadow-lg bg-white p-4">
        {/* Pokémon Image with loading handler */}
        <div className="flex justify-center items-center h-48 mb-4 relative">
          {isImageLoading && (
            <div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-75 rounded-full">
              {/* Spinner */}
              <div className="loader border-4 border-gray-200 border-t-red-600 rounded-full w-8 h-8 animate-spin"></div>
            </div>
          )}
          <img
            src={pokemon.sprites.front_default || "/images/placeholder.png"}
            alt={pokemon.name}
            className={`mx-auto max-h-48 object-contain transition-opacity duration-500 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />
        </div>

        {/* Pokémon Name */}
        <h2 className="text-xl font-semibold text-center capitalize mb-2">
          {pokemon.name}
        </h2>

        {/* Type badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full text-sm font-semibold capitalize transition-colors duration-300"
              style={{
                backgroundColor: "#FFFF00", // Yellow background
                color: "#FF0000", // Red text
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Back Side */}
      <div
        className="absolute w-full h-full backface-hidden rounded-lg shadow-lg bg-white p-4"
        style={{ transform: "rotateY(180deg)" }}
      >
        {/* Optional back sprite */}
        <div className="flex justify-center items-center h-48 mb-4 relative">
          {pokemon.sprites.back_default ? (
            <img
              src={pokemon.sprites.back_default}
              alt={`${pokemon.name} back`}
              className="mx-auto max-h-48 object-contain"
            />
          ) : (
            <div className="text-gray-500">No Back Image</div>
          )}
        </div>

        {/* Text content with counter-rotation to stay upright */}
        <div className="transform" style={{ transform: "rotateY(180deg)" }}>
          {/* Pokémon Name */}
          <h2 className="text-xl font-semibold text-center capitalize mb-2">
            {pokemon.name}
          </h2>

          {/* Types */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-sm font-semibold capitalize transition-colors duration-300"
                style={{
                  backgroundColor: "#FFFF00",
                  color: "#FF0000",
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
