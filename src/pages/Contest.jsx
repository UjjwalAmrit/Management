"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import {
  FiClock,
  FiUsers,
  FiCalendar,
  FiPlay,
  FiAward
} from "react-icons/fi"
import { FaTrophy } from "react-icons/fa" // ✅ Replaced FiTrophy with FaTrophy

const Contest = () => {
  const [contests, setContests] = useState([])
  const [leaderboard, setLeaderboard] = useState([])

  const demoContests = [
    {
      _id: "contest-1",
      title: "Business Analytics Challenge",
      description: "Test your skills in data analysis, visualization, and business intelligence.",
      domain: "Business Analytics",
      difficulty: "Intermediate",
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      duration: 120,
      participants: 234,
      prize: "$500",
      status: "upcoming",
    },
    {
      _id: "contest-2",
      title: "Marketing Strategy Sprint",
      description: "Solve real-world marketing scenarios and campaign optimization problems.",
      domain: "Marketing",
      difficulty: "Advanced",
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      duration: 180,
      participants: 156,
      prize: "$750",
      status: "upcoming",
    },
    {
      _id: "contest-3",
      title: "Finance Fundamentals Quiz",
      description: "Quick-fire questions on financial analysis and investment principles.",
      domain: "Finance",
      difficulty: "Beginner",
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: 60,
      participants: 445,
      prize: "$300",
      status: "completed",
    },
  ]

  const demoLeaderboard = [
    { rank: 1, name: "Alex Johnson", score: 2450, domain: "Business Analytics", avatar: "AJ" },
    { rank: 2, name: "Sarah Chen", score: 2380, domain: "Marketing", avatar: "SC" },
    { rank: 3, name: "Mike Rodriguez", score: 2340, domain: "Finance", avatar: "MR" },
    { rank: 4, name: "Emily Davis", score: 2290, domain: "HRM", avatar: "ED" },
  ]

  useEffect(() => {
    setContests(demoContests)
    setLeaderboard(demoLeaderboard)
  }, [])

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    }).format(date)
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Contest Arena</h1>
        <p className="mb-6 text-gray-600">Compete with peers and showcase your skills</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <FaTrophy className="text-yellow-500 w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">{contests.length}</p>
              <p className="text-sm text-gray-500">Total Contests</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <FiUsers className="text-blue-500 w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">835</p>
              <p className="text-sm text-gray-500">Total Participants</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <FiPlay className="text-green-500 w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <FiAward className="text-purple-500 w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">$1.5k</p>
              <p className="text-sm text-gray-500">Total Prizes</p>
            </div>
          </div>
        </div>

        {/* Contest Cards */}
        <div className="space-y-4 mb-12">
          {contests.map(contest => (
            <div key={contest._id} className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{contest.title}</h2>
                  <p className="text-sm text-gray-600 mt-1 mb-3">{contest.description}</p>

                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{contest.status}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{contest.difficulty}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">{contest.domain}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm text-gray-500">
                    <div className="flex items-center"><FiCalendar className="mr-1" /> {formatDate(contest.startTime)}</div>
                    <div className="flex items-center"><FiClock className="mr-1" /> {contest.duration} mins</div>
                    <div className="flex items-center"><FiUsers className="mr-1" /> {contest.participants}</div>
                    <div className="flex items-center"><FaTrophy className="mr-1" /> {contest.prize}</div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    disabled={contest.status === "completed"}
                    className={`px-4 py-2 rounded-md text-white font-semibold ${
                      contest.status === "upcoming"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : contest.status === "live"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {contest.status === "upcoming"
                      ? "Register"
                      : contest.status === "live"
                      ? "Join Now"
                      : "View Results"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-4">
          {leaderboard.map((user) => (
            <div key={user.rank} className="flex items-center justify-between border-b pb-2 last:border-0">
              <div className="flex items-center gap-4">
                <div className="text-xl w-10">{getRankIcon(user.rank)}</div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.domain}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg text-blue-600 font-bold">{user.score}</p>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contest
