// Sidebar.jsx
"use client"

import { useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FiTarget } from "react-icons/fi"
import {
  FiClock,
  FiUsers,
  FiCalendar,
  FiPlay,
  FiAward
} from "react-icons/fi"
import { FaTrophy } from "react-icons/fa"

const Sidebar = ({leaderboard = [],getRankIcon}) => {
  const location = useLocation()
  const { user } = useAuth()

  const isStudyPlanPage = location.pathname === "/study-plans"

  

  return (
    <>
    {isStudyPlanPage && user && (
      <div className="w-full rounded-lg h-full ml-2 px-4 py-4 pt-10 bg-gray-900">
        {/* Welcome Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold text-white">
            Welcome, {user.name}! 👋
          </h1>
          <p className="text-sm text-gray-300">
            Keep up the great work!
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white shadow rounded-2xl p-4 mb-4">
          <div className="flex items-center mb-3">
            <FiTarget className="mr-2 h-8 w-8 text-amber-300" />
            <h3 className="text-md font-medium">Your Progress</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Problems Solved</span>
              <span className="font-semibold">{user.solvedQuestions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Streak</span>
              <span className="font-semibold text-amber-600">{user.streak || 0} days</span>
            </div>
            <div className="flex justify-between">
              <span>Study Plans</span>
              <span className="font-semibold">{user.enrolledPlans?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Daily Goal Card */}
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-md font-medium mb-2">Today's Goal</h3>
          <div className="text-2xl font-bold text-amber-400 mb-1">3</div>
          <p className="text-sm text-gray-600 mb-2">Problems to maintain streak</p>
          <button className="w-full bg-gray-900 text-white py-1 px-2 rounded-xl text-sm hover:bg-amber-600">
            Start Practicing
          </button>
        </div>
      </div>
    )};



    {location.pathname === "/contest" && leaderboard.length > 0 && (
      <div className="sticky top-24 bg-white shadow rounded-xl p-4 max-h-[calc(100vh-5rem)] overflow-y-auto mb-5 ml-5">
        <h2 className="text-lg font-semibold mb-3">Leaderboard</h2>
        {leaderboard.map((user) => (
          <div key={user.rank} className="flex items-center justify-between border-b pb-2 pt-2 last:border-0 mb-3">
            <div className="flex items-center gap-4">
              <div className="text-xl w-8">{getRankIcon(user.rank)}</div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.avatar}
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.domain}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 font-bold">{user.score}</p>
              <p className="text-xs text-gray-500">pts</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </>

  )
}

export default Sidebar
