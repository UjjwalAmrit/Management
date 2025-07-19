"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { api } from "../utils/api"
import Sidebar from "../components/Sidebar"
import { FiTarget, FiClock, FiUsers, FiTrendingUp, FiBookOpen } from "react-icons/fi"

const StudyPlans = () => {
  const [studyPlans, setStudyPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudyPlans()
  }, [])

  const fetchStudyPlans = async () => {
    try {
      const response = await api.get("/study-plans")
      setStudyPlans(response.data.studyPlans || [])
    } catch (error) {
      console.error("Failed to fetch study plans:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDomainColor = (domain) => {
    const colors = {
      "Business Analytics": "bg-blue-500",
      Marketing: "bg-green-500",
      Finance: "bg-purple-500",
      HRM: "bg-orange-500",
      Operations: "bg-red-500",
      IT: "bg-indigo-500",
    }
    return colors[domain] || "bg-gray-500"
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderProgressBar = (value) => (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div className="h-2 bg-blue-600 rounded" style={{ width: `${value}%` }}></div>
    </div>
  )

  const renderCard = (plan) => (
    <div key={plan._id} className="bg-white rounded-lg shadow p-5 hover:drop-shadow-[0_8px_10px_rgba(0,0,0,0.15)] transition-shadow duration-300">
      <div className="mb-4 flex items-center justify-between">
        <div className={`w-12 h-12 ${getDomainColor(plan.domain)} rounded-lg flex items-center justify-center`}>
          <span className="text-white font-bold text-lg">{plan.domain.charAt(0)}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(plan.difficulty)}`}>
          {plan.difficulty}
        </span>
      </div>

      <h2 className="text-lg font-semibold mb-1">{plan.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <div className="flex items-center">
          <FiBookOpen className="h-4 w-4 mr-1" />
          {plan.topicCount || 0} Topics
        </div>
        <div className="flex items-center">
          <FiClock className="h-4 w-4 mr-1" />
          {plan.estimatedTime || "4 weeks"}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{plan.progress || 0}%</span>
        </div>
        {renderProgressBar(plan.progress || 0)}
      </div>

      <Link to={`/study-plans/${plan._id}`} className="block">
        <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-700">
          {plan.progress > 0 ? "Continue" : "Start Plan"}
        </button>
      </Link>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      <div className="w-1/5 sticky top-20 self-start h-fit">
      <Sidebar />
      </div>

      <div className="w-4/5 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Plans</h1>
            <p className="text-gray-600">Structured learning paths to master your domain</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <FiTarget className="mr-2 h-8 w-8" />, label: "Available Plans", value: studyPlans.length, color: "text-gray-900" },
              { icon: <FiBookOpen className="mr-2 h-8 w-8" />, label: "Enrolled", value: 0, color: "text-green-600" },
              { icon: <FiTrendingUp className="mr-2 h-8 w-8" />, label: "Avg Progress", value: "0%", color: "text-purple-600" },
              { icon: <FiUsers className="mr-2 h-8 w-8" />, label: "Active Learners", value: "1.2k", color: "text-orange-600" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl flex items-center shadow hover:drop-shadow-[0_8px_10px_rgba(0,0,0,0.15)] transition-shadow duration-300">
                <div className={`h-8 w-8 mr-3 ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Study Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyPlans.length > 0 ? (
              studyPlans.map(renderCard)
            ) : (
              <div className="col-span-full text-center bg-white rounded-lg p-12 shadow">
                <FiTarget className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No study plans available</h3>
                <p className="text-gray-600">
                  Study plans will appear here once they are created. Check back soon!
                </p>
              </div>
            )}
          </div>

          {/* Demo Cards */}
          {studyPlans.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                {
                  _id: "demo-1",
                  title: "Business Analytics Fundamentals",
                  domain: "Business Analytics",
                  difficulty: "Beginner",
                  description: "Master the basics of data analysis, visualization, and business intelligence.",
                  topicCount: 8,
                  estimatedTime: "6 weeks",
                  progress: 0,
                },
                {
                  _id: "demo-2",
                  title: "Digital Marketing Mastery",
                  domain: "Marketing",
                  difficulty: "Intermediate",
                  description: "Learn SEO, social media marketing, content strategy, and campaign optimization.",
                  topicCount: 12,
                  estimatedTime: "8 weeks",
                  progress: 0,
                },
                {
                  _id: "demo-3",
                  title: "Financial Analysis & Modeling",
                  domain: "Finance",
                  difficulty: "Advanced",
                  description: "Advanced financial modeling, valuation techniques, and investment analysis.",
                  topicCount: 10,
                  estimatedTime: "10 weeks",
                  progress: 0,
                },
              ].map(renderCard)}
            </div>
          )}
      </div>
    </div>
  )
}

export default StudyPlans
