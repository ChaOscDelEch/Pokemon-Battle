"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  playerPokemon: string;
  opponentPokemon: string;
  timestamp: Date;
  battleResult: "win" | "lose";
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [filter, setFilter] = useState<"all" | "wins" | "recent">("all");

  // Load leaderboard on mount
  useEffect(() => {
    loadLeaderboard();

    // Check for highlight parameter (when redirected from battle)
    const urlParams = new URLSearchParams(window.location.search);
    const highlightId = urlParams.get("highlight");
    const rank = urlParams.get("rank");

    if (highlightId && rank) {
      setFeedback({
        type: "success",
        message: `Score submitted successfully! You're ranked #${rank} on the leaderboard!`,
      });

      // Clear URL parameters
      window.history.replaceState({}, "", "/leaderboard");

      // Clear feedback after 5 seconds
      setTimeout(() => setFeedback(null), 5000);
    }
  }, []);

  // Load leaderboard from localStorage
  const loadLeaderboard = () => {
    try {
      const saved = localStorage.getItem("pokemonLeaderboard");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        const withDates = parsed.map((entry: LeaderboardEntry) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
        setLeaderboard(withDates);
      }
    } catch (error) {
      console.error("Error loading leaderboard:", error);
      setFeedback({
        type: "error",
        message: "Failed to load leaderboard data",
      });
    }
  };

  // Get filtered leaderboard
  const getFilteredLeaderboard = () => {
    let filtered = [...leaderboard];

    switch (filter) {
      case "wins":
        filtered = filtered.filter((entry) => entry.battleResult === "win");
        break;
      case "recent":
        filtered = filtered
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, 20);
        break;
      default:
        filtered = filtered.sort((a, b) => b.score - a.score);
    }

    return filtered;
  };

  // Get rank for a specific entry
  const getRank = (entryId: string) => {
    const sortedByScore = [...leaderboard].sort((a, b) => b.score - a.score);
    return sortedByScore.findIndex((entry) => entry.id === entryId) + 1;
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get medal emoji for ranking
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const filteredLeaderboard = getFilteredLeaderboard();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏆 Trainer Leaderboard 🏆
          </h1>
          <p className="text-lg text-gray-600">
            Top Pokemon trainers and their battle achievements
          </p>
        </div>

        {/* Feedback Messages */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-lg border-l-4 ${
              feedback.type === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3">
                {feedback.type === "success" ? "✅" : "❌"}
              </div>
              <p className="font-semibold">{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {leaderboard.length}
            </div>
            <div className="text-gray-600">Total Battles</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {
                leaderboard.filter((entry) => entry.battleResult === "win")
                  .length
              }
            </div>
            <div className="text-gray-600">Victories</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {leaderboard.length > 0
                ? Math.max(...leaderboard.map((entry) => entry.score))
                : 0}
            </div>
            <div className="text-gray-600">Highest Score</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Battles
              </button>
              <button
                onClick={() => setFilter("wins")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "wins"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Victories Only
              </button>
              <button
                onClick={() => setFilter("recent")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "recent"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Recent Battles
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredLeaderboard.length} results
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {filteredLeaderboard.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No battles yet!
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first trainer to appear on the leaderboard.
              </p>
              <Link
                href="/battle"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
              >
                Start Your First Battle
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trainer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Battle
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Result
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeaderboard.map((entry, index) => {
                    const rank =
                      filter === "all" ? getRank(entry.id) : index + 1;
                    return (
                      <tr
                        key={entry.id}
                        className={`hover:bg-gray-50 ${
                          rank <= 3
                            ? "bg-gradient-to-r from-yellow-50 to-yellow-100"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-gray-900">
                            {getMedalEmoji(rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">👤</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {entry.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-purple-600">
                            {entry.score.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium capitalize">
                              {entry.playerPokemon}
                            </div>
                            <div className="text-gray-500">
                              vs {entry.opponentPokemon}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              entry.battleResult === "win"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {entry.battleResult === "win" ? "Victory" : "Loss"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(entry.timestamp)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link
            href="/battle"
            className="inline-block bg-red-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-600 transition-colors transform hover:scale-105"
          >
            🔥 Start New Battle 🔥
          </Link>
          <div>
            <Link
              href="/roster"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mr-4"
            >
              Manage Team
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Catch Pokemon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
