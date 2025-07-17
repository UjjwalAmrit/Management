"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { api } from "../utils/api"
import { FiUser, FiMail, FiCalendar, FiTrendingUp, FiTarget, FiAward } from "react-icons/fi"
import { Tab } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Profile = () => {
  const { user, fetchProfile } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get("/user/stats")
      setStats(response.data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      await api.put("/user/update", formData)
      await fetchProfile()
      alert("Profile updated successfully!")
    } catch (error) {
      alert("Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account and view your progress</p>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-2 mb-6 border-b">
          {["Overview", "Settings", "History"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "px-4 py-2 text-sm font-medium border-b-2",
                  selected ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* OVERVIEW TAB */}
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Problems Solved */}
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Problems Solved</p>
                  <FiTarget className="text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold">{user?.solvedQuestions || 0}</h2>
                <p className="text-xs text-gray-500">+{stats?.recentSolved || 0} this week</p>
              </div>

              {/* Current Streak */}
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Current Streak</p>
                  <FiTrendingUp className="text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-orange-600">{user?.streak || 0}</h2>
                <p className="text-xs text-gray-500">days in a row</p>
              </div>

              {/* Study Plans */}
              <div className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Study Plans</p>
                  <FiAward className="text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold">{user?.enrolledPlans?.length || 0}</h2>
                <p className="text-xs text-gray-500">active plans</p>
              </div>
            </div>

            {/* Activity & Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-1">Recent Activity</h3>
                <p className="text-sm text-gray-500 mb-4">Your latest problem-solving sessions</p>
                <div className="space-y-4">
                  {stats?.recentActivity?.length > 0 ? (
                    stats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-gray-400">{activity.date}</p>
                        </div>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{activity.score}%</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No recent activity</p>
                  )}
                </div>
              </div>

              {/* Domain Progress */}
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-1">Domain Progress</h3>
                <p className="text-sm text-gray-500 mb-4">Your progress across different domains</p>
                <div className="space-y-4">
                  {stats?.domainProgress?.length > 0 ? (
                    stats.domainProgress.map((domain, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm">
                          <span>{domain.name}</span>
                          <span>
                            {domain.solved}/{domain.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(domain.solved / domain.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No progress yet</p>
                  )}
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* SETTINGS TAB */}
          <Tab.Panel>
            <div className="p-6 border rounded-lg shadow-sm space-y-6">
              <h3 className="text-xl font-semibold">Update Profile</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-sm font-medium mb-1">Member Since</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      disabled
                      value={new Date(user?.createdAt).toLocaleDateString()}
                      className="pl-10 w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {updating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </Tab.Panel>

          {/* HISTORY TAB */}
          <Tab.Panel>
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Problem History</h3>
              <p className="text-sm text-gray-500 mb-4">All your attempted problems</p>
              <div className="space-y-4">
                {stats?.problemHistory?.length > 0 ? (
                  stats.problemHistory.map((problem, index) => (
                    <div key={index} className="flex justify-between items-center border p-4 rounded-lg">
                      <div>
                        <h4 className="font-medium">{problem.title}</h4>
                        <p className="text-sm text-gray-500">{problem.domain}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={classNames(
                            "text-xs px-2 py-1 rounded",
                            problem.status === "solved" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-600"
                          )}
                        >
                          {problem.status}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{problem.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-8">No problems attempted yet</p>
                )}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Profile
