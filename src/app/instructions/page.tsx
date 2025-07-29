"use client";

import Link from "next/link";

export default function InstructionsPage() {
  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8 pt-7">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            How to Play Pokemon Battle
          </h1>
          <p className="text-lg text-gray-600">
            Master the art of Pokemon battle and become a champion!
          </p>
        </header>

        {/* Quick Start Guide */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            🚀 Quick Start Guide
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none">
            <li className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                1. Catch Pokemon
              </h3>
              <p className="text-sm text-gray-600">
                Start by catching Pokemon from the wild to build your team
              </p>
            </li>
            <li className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                2. Build Team
              </h3>
              <p className="text-sm text-gray-600">
                Manage your roster and prepare your team for battle
              </p>
            </li>
            <li className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚔️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">3. Battle</h3>
              <p className="text-sm text-gray-600">
                Challenge rival trainers in epic 6v6 Pokemon battles
              </p>
            </li>
            <li className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                4. Leaderboard
              </h3>
              <p className="text-sm text-gray-600">
                Submit your victories and climb the trainer rankings
              </p>
            </li>
          </ol>
        </section>

        {/* Game Sections */}
        <div className="space-y-8">
          {/* Catching Pokemon */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-left">
              🎯 Catching Pokemon
            </h2>
            <ol className="space-y-6 counter-reset list-none">
              <li className="flex items-start space-x-4">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  1
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Find Wild Pokemon
                  </h3>
                  <p className="text-gray-600">
                    Visit the main page to encounter Pokemon in the wild.
                    <br />
                    Each Pokemon has unique stats and types.
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  2
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Catch Pokemon
                  </h3>
                  <p className="text-gray-600">
                    Click &apos;Add to Roaster&apos; to add the Pokemon to your
                    roaster.
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  3
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Build Your Collection
                  </h3>
                  <p className="text-gray-600">
                    You can have a maximum of 6 Pokemon in your roaster.
                  </p>
                </article>
              </li>
            </ol>
          </section>

          {/* Team Management */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              👥 Team Management
            </h2>
            <ol className="space-y-6 list-none">
              <li className="flex items-start space-x-4">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  1
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Roster Overview
                  </h3>
                  <p className="text-gray-600">
                    Visit your roster to see you Pokemon team with their stats,
                    types, and abilities.
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  2
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Team Strategy
                  </h3>
                  <p className="text-gray-600">
                    Your entire roster (up to 6 Pokemon) will be used in
                    battles. Balance types for optimal strategy.
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  3
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Pokemon Stats
                  </h3>
                  <p className="text-gray-600">
                    Each Pokemon has Attack, Defense, Speed, and HP stats that
                    determine battle performance.
                  </p>
                </article>
              </li>
            </ol>
          </section>

          {/* Battle System */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              ⚔️ Battle System
            </h2>
            <ol className="space-y-6 list-none">
              <li className="flex items-start space-x-4">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  1
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    6v6 Trainer Battles
                  </h3>
                  <p className="text-gray-600">
                    Engage in epic 6v6 battles against rival trainers. Your
                    entire roster faces their team!
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  2
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Pokemon Selection
                  </h3>
                  <p className="text-gray-600">
                    Choose your first Pokemon to lead the battle. Strategy
                    matters - consider type advantages!
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  3
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Turn-Based Combat
                  </h3>
                  <p className="text-gray-600">
                    Speed determines turn order. Choose type-based attacks and
                    watch the battle unfold!
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  4
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Pokemon Switching
                  </h3>
                  <p className="text-gray-600">
                    When a Pokemon faints, choose your next fighter. Adapt your
                    strategy mid-battle!
                  </p>
                </article>
              </li>
            </ol>
          </section>

          {/* Type Effectiveness */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🔥 Type Effectiveness Guide
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <article className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-4 text-lg">
                  💪 Strong Against (2x Damage)
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between items-center">
                    <dt className="text-red-600 font-medium">🔥 Fire</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🌿 🐛 🧊 ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-blue-600 font-medium">💧 Water</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 🌍 🪨
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-green-600 font-medium">🌿 Grass</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      💧 🌍 🪨
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-yellow-600 font-medium">⚡ Electric</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">💧 🪶</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-pink-600 font-medium">🔮 Psychic</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">👊 ☠️</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-cyan-600 font-medium">🧊 Ice</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🌿 🌍 🪶 🐉
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-purple-600 font-medium">🐉 Dragon</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🐉</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-800 font-medium">🌑 Dark</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🔮 👻</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-pink-400 font-medium">🧚 Fairy</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      👊 🐉 🌑
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-red-700 font-medium">👊 Fighting</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      ⚪ 🧊 🪨 🌑 ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-purple-500 font-medium">☠️ Poison</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🌿 🧚</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-amber-600 font-medium">🌍 Ground</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 ⚡ ☠️ 🪨 ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-sky-600 font-medium">🪶 Flying</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      ⚡ 🧊 🪨 🌿 👊 🐛
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-green-500 font-medium">🐛 Bug</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🌿 🔮 🌑
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-stone-600 font-medium">🪨 Rock</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 🧊 🪶 🐛
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-indigo-600 font-medium">👻 Ghost</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🔮 👻</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-slate-500 font-medium">⚙️ Steel</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🧊 🪨 🧚
                    </dd>
                  </div>
                </dl>
              </article>

              <article className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                <h3 className="font-semibold text-red-800 mb-4 text-lg">
                  🛡️ Weak Against (0.5x Damage)
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between items-center">
                    <dt className="text-red-600 font-medium">🔥 Fire</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      💧 🔥 🪨 🐉
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-blue-600 font-medium">💧 Water</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🌿 💧 🐉
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-green-600 font-medium">🌿 Grass</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 🌿 ☠️ 🪶 🐛 🐉 ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-yellow-600 font-medium">⚡ Electric</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🌿 ⚡ 🐉
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-pink-600 font-medium">🔮 Psychic</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🔮 ⚙️</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-cyan-600 font-medium">🧊 Ice</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 💧 🧊 ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-purple-600 font-medium">🐉 Dragon</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">⚙️</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-800 font-medium">🌑 Dark</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      👊 🌑 🧚
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-pink-400 font-medium">🧚 Fairy</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 ☠️ ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-red-700 font-medium">👊 Fighting</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      ☠️ 🪶 🔮 🐛 🧚
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-purple-500 font-medium">☠️ Poison</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      ☠️ 🌍 🪨 👻
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-amber-600 font-medium">🌍 Ground</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🌿 🐛</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-sky-600 font-medium">🪶 Flying</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🌿 👊 🐛 ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-green-500 font-medium">🐛 Bug</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 👊 ☠️ 🪶 👻 ⚙️ 🧚
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-stone-600 font-medium">🪨 Rock</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      👊 🌍 ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-indigo-600 font-medium">👻 Ghost</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🌑</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-slate-500 font-medium">⚙️ Steel</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">
                      🔥 💧 ⚡ ⚙️
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-500 font-medium">⚪ Normal</dt>
                    <dd className="text-gray-700 text-sm flex gap-1">🪨 ⚙️</dd>
                  </div>
                </dl>
              </article>
            </div>

            <aside className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-800">
                💡 <strong>Pro Tip:</strong> Use type advantages to deal more
                damage and resist enemy attacks. A well-balanced team with
                diverse types is key to victory!
              </p>
            </aside>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
              <h4 className="font-semibold text-gray-800 mb-2">
                Emoji Legend:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs text-left">
                <span>🔥 Fire</span>
                <span>💧 Water</span>
                <span>🌿 Grass</span>
                <span>⚡ Electric</span>
                <span>🔮 Psychic</span>
                <span>🧊 Ice</span>
                <span>🐉 Dragon</span>
                <span>🌑 Dark</span>
                <span>🧚 Fairy</span>
                <span>👊 Fighting</span>
                <span>☠️ Poison</span>
                <span>🌍 Ground</span>
                <span>🪶 Flying</span>
                <span>🐛 Bug</span>
                <span>🪨 Rock</span>
                <span>👻 Ghost</span>
                <span>⚙️ Steel</span>
                <span>⚪ Normal</span>
              </div>
            </div>
          </section>

          {/* Scoring & Leaderboard */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🏆 Scoring & Leaderboard
            </h2>
            <ol className="space-y-6 list-none">
              <li className="flex items-start space-x-4">
                <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  1
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Victory Points
                  </h3>
                  <p className="text-gray-600">
                    Win battles to earn victory points based on your performance
                    and the opponent&apos;s strength.
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  2
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Submit to Leaderboard
                  </h3>
                  <p className="text-gray-600">
                    After winning, enter your trainer name to submit your score
                    to the global leaderboard.
                  </p>
                </article>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  3
                </span>
                <article>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Climb the Rankings
                  </h3>
                  <p className="text-gray-600">
                    Compete with other trainers for the top spots. Track
                    victories, scores, and battle history.
                  </p>
                </article>
              </li>
            </ol>
          </section>

          {/* Tips & Strategy */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              💡 Pro Tips & Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article>
                <h3 className="font-semibold text-gray-800 mb-4">
                  Battle Tactics
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-600 text-xl flex-shrink-0">
                      🎯
                    </span>
                    <div>
                      <strong className="text-gray-800">Balanced Team:</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Catch Pokemon of different types to handle various
                        opponents effectively.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-600 text-xl flex-shrink-0">
                      ⚡
                    </span>
                    <div>
                      <strong className="text-gray-800">Speed Matters:</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Faster Pokemon attack first. Consider speed when
                        choosing your lead Pokemon.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-600 text-xl flex-shrink-0">
                      🛡️
                    </span>
                    <div>
                      <strong className="text-gray-800">
                        Defense Strategy:
                      </strong>
                      <p className="text-sm text-gray-600 mt-1">
                        High defense Pokemon can tank hits and turn the tide of
                        battle.
                      </p>
                    </div>
                  </li>
                </ul>
              </article>

              <article>
                <h3 className="font-semibold text-gray-800 mb-4">
                  Advanced Tips
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-pink-600 text-xl flex-shrink-0">
                      🔄
                    </span>
                    <div>
                      <strong className="text-gray-800">Switch Wisely:</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Strategic switching can give you type advantages
                        mid-battle.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-pink-600 text-xl flex-shrink-0">
                      📊
                    </span>
                    <div>
                      <strong className="text-gray-800">
                        Know Your Stats:
                      </strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Study your Pokemon&apos;s stats to make informed battle
                        decisions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-pink-600 text-xl flex-shrink-0">
                      🏃
                    </span>
                    <div>
                      <strong className="text-gray-800">
                        Practice Makes Perfect:
                      </strong>
                      <p className="text-sm text-gray-600 mt-1">
                        The more you battle, the better you&apos;ll understand
                        strategies and matchups.
                      </p>
                    </div>
                  </li>
                </ul>
              </article>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-400 to-purple-400 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Become a Pokemon Master?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Start your journey now and prove yourself as the ultimate trainer!
            </p>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors transform hover:scale-105"
              >
                🎯 Start Catching Pokemon
              </Link>
              <Link
                href="/battle"
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors transform hover:scale-105"
              >
                ⚔️ Battle Now
              </Link>
              <Link
                href="/leaderboard"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors transform hover:scale-105"
              >
                🏆 View Leaderboard
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
}
