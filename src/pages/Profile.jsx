"use client"

import { useState } from "react"
import {
  FiTarget,
  FiTrendingUp,
  FiAward,
  FiUser,
  FiMail,
  FiCalendar,
  FiClock,
  FiCode,
  FiCheckCircle,
  FiBook,
} from "react-icons/fi"
import { FaTrophy, FaFire } from "react-icons/fa"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [updating, setUpdating] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  })

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    rating: 1847,
    rank: "Expert",
    solvedQuestions: 342,
    streak: 15,
    enrolledPlans: ["Top Interview 150", "LeetCode 75"],
    createdAt: "2023-01-15T00:00:00Z",
    badges: [
      { name: "Problem Solver", icon: "🏆", description: "Solved 100+ problems" },
      { name: "Streak Master", icon: "🔥", description: "15 day streak" },
      { name: "Contest Participant", icon: "⚡", description: "Participated in 5+ contests" },
      { name: "Daily Coder", icon: "💻", description: "Coded for 30 consecutive days" },
    ],
  }

  const stats = {
    recentSolved: 12,
    recentActivity: [
      { title: "•	Case studies (predictive modeling, A/B testing, etc.)", date: "2 hours ago"},
    ],
    domainProgress: [
      { name: "Excel, SQL, Tableau/Power BI", solved: 49, total: 73 },
    ],
    problemHistory: [
      { title: "Module 1", domain: "Excel, SQL, Tableau/Power BI", status: "solved", date: "2 hours ago" },
      
    ],
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    setUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setUpdating(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  const getRatingBadgeColor = (rating) => {
    if (rating >= 2100) return "bg-red-100 text-red-800"
    if (rating >= 1900) return "bg-orange-100 text-orange-800"
    if (rating >= 1600) return "bg-purple-100 text-purple-800"
    if (rating >= 1400) return "bg-blue-100 text-blue-800"
    return "bg-green-100 text-green-800"
  }

  const TabButton = ({ value, children, isActive, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        isActive ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  )

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>
  )

  const Badge = ({ children, className = "", variant = "default" }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    const variantClasses = {
      default: "bg-gray-100 text-gray-800",
      secondary: "bg-gray-100 text-gray-800",
      outline: "border border-current",
    }

    return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>
  }

  const ProgressBar = ({ value, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                <Badge className={`${getRatingBadgeColor(user.rating)} text-lg px-3 py-1 flex items-center gap-1`}>
                  <FaTrophy className="w-4 h-4" />
                  {user.rating} • {user.rank}
                </Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-600 flex items-center gap-1">
                  <FaFire className="w-4 h-4" />
                  {user.streak} day streak
                </Badge>
              </div>
              <p className="text-gray-600">Manage your account and view your progress</p>
            </div>
          </div>

          {/* Badges Section */}
          <Card className="mb-6 border-2 rounded-xl">
            <div className="p-6 ">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiAward className="w-5 h-5" />
                Achievements & Badges
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user.badges.map((badge, index) => (
                  <div key={index} className="text-center p-4 border-2 rounded-4xl hover:shadow-lg transition-shadow">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="flex space-x-2 mb-6 border-b">
            <TabButton value="overview" isActive={activeTab === "overview"} onClick={setActiveTab}>
              Overview
            </TabButton>
            <TabButton value="settings" isActive={activeTab === "settings"} onClick={setActiveTab}>
              Settings
            </TabButton>
            <TabButton value="history" isActive={activeTab === "history"} onClick={setActiveTab}>
              History
            </TabButton>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Problems Solved</p>
                      <FiTarget className="text-gray-500 w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-bold mb-1">{user.solvedQuestions}</h2>
                    <p className="text-sm text-green-600">+{stats.recentSolved} this week</p>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Current Streak</p>
                      <FiTrendingUp className="text-gray-500 w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-bold text-orange-600 mb-1">{user.streak}</h2>
                    <p className="text-sm text-gray-500">days in a row</p>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Study Plans</p>
                      <FiBook className="text-gray-500 w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-bold mb-1">{user.enrolledPlans.length}</h2>
                    <p className="text-sm text-gray-500">active plans</p>
                  </div>
                </Card>
              </div>

              {/* Activity & Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      <FiClock className="w-5 h-5" />
                      Recent Activity
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Your latest problem-solving sessions</p>
                    <div className="space-y-4">
                      {stats.recentActivity.length > 0 ? (
                        stats.recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-400 py-8">No recent activity</p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Domain Progress */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      <FiCode className="w-5 h-5" />
                      Domain Progress
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Your progress across different domains</p>
                    <div className="space-y-4">
                      {stats.domainProgress.length > 0 ? (
                        stats.domainProgress.map((domain, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{domain.name}</span>
                              <span className="text-gray-500">
                                {domain.solved}/{domain.total}
                              </span>
                            </div>
                            <ProgressBar value={(domain.solved / domain.total) * 100} />
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-400 py-8">No progress yet</p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Update Profile</h3>
                <p className="text-sm text-gray-500 mb-6">Manage your account settings and preferences</p>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Member Since</label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        disabled
                        value={new Date(user.createdAt).toLocaleDateString()}
                        className="pl-10 w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-amber-500 text-white py-2 px-4 rounded-3xl hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updating ? "Updating..." : "Update Profile"}
                  </button>
                </form>
              </div>
            </Card>
          )}

          {/* HISTORY TAB */}
          {activeTab === "history" && (
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Problem History</h3>
                <p className="text-sm text-gray-500 mb-6">All your attempted problems</p>
                <div className="space-y-4">
                  {stats.problemHistory.length > 0 ? (
                    stats.problemHistory.map((problem, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          {problem.status === "solved" ? (
                            <FiCheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <FiClock className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <h4 className="font-medium">{problem.title}</h4>
                            <p className="text-sm text-gray-500">{problem.domain}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={problem.status === "solved" ? "default" : "secondary"}
                            className={problem.status === "solved" ? "bg-green-100 text-green-800" : ""}
                          >
                            {problem.status}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">{problem.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-8">No problems attempted yet</p>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
