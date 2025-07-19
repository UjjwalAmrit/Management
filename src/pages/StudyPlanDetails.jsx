"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { api } from "../utils/api"
import Sidebar from "../components/Sidebar"
import { FiArrowLeft, FiBookOpen, FiClock, FiCheckCircle, FiCircle, FiPlay } from "react-icons/fi"

const StudyPlanDetails = () => {
  const { id } = useParams()
  const [studyPlan, setStudyPlan] = useState(null)
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudyPlanDetails()
  }, [id])

  const fetchStudyPlanDetails = async () => {
    try {
      const response = await api.get(`/study-plans/${id}`)
      setStudyPlan(response.data.studyPlan)
      setTopics(response.data.topics || [])
    } catch (error) {
      console.error("Failed to fetch study plan details:", error)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  const demoStudyPlan = {
    _id: id,
    title: "Business Analytics Fundamentals",
    domain: "Business Analytics",
    difficulty: "Beginner",
    description:
      "Master the basics of data analysis, visualization, and business intelligence. This comprehensive course covers statistical analysis, data visualization tools, and practical business applications.",
    estimatedTime: "6 weeks",
    progress: 25,
  }

  const demoTopics = [
    {
      _id: "topic-1",
      title: "Introduction to Business Analytics",
      description: "Overview of business analytics, its importance, and applications in modern business.",
      moduleCount: 4,
      completed: true,
      estimatedTime: "1 week",
    },
    {
      _id: "topic-2",
      title: "Data Collection and Preparation",
      description: "Learn how to collect, clean, and prepare data for analysis.",
      moduleCount: 5,
      completed: false,
      estimatedTime: "1.5 weeks",
    },
    {
      _id: "topic-3",
      title: "Statistical Analysis Fundamentals",
      description: "Basic statistical concepts and methods for business analysis.",
      moduleCount: 6,
      completed: false,
      estimatedTime: "2 weeks",
    },
    {
      _id: "topic-4",
      title: "Data Visualization",
      description: "Creating effective charts, graphs, and dashboards.",
      moduleCount: 4,
      completed: false,
      estimatedTime: "1 week",
    },
    {
      _id: "topic-5",
      title: "Business Intelligence Tools",
      description: "Introduction to popular BI tools and platforms.",
      moduleCount: 3,
      completed: false,
      estimatedTime: "0.5 weeks",
    },
  ]

  const currentStudyPlan = studyPlan || demoStudyPlan
  const currentTopics = topics.length > 0 ? topics : demoTopics

  return (
    <div className="flex min-h-screen bg-white pt-20">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/study-plans" className="inline-flex items-center text-gray-900 hover:text-amber-600 mb-4">
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Back to Study Plans
            </Link>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 ${getDomainColor(currentStudyPlan.domain)} rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-xl">{currentStudyPlan.domain.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{currentStudyPlan.title}</h2>
                    <div className="flex gap-2 mb-2">
                      <span className={`px-2 py-1 text-sm rounded ${getDifficultyColor(currentStudyPlan.difficulty)}`}>
                        {currentStudyPlan.difficulty}
                      </span>
                      <span className="px-2 py-1 text-sm border rounded text-gray-800">{currentStudyPlan.domain}</span>
                    </div>
                  </div>
                </div>

                <button className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 cursor-pointer">
                  <FiPlay className="h-4 w-4 mr-2"/>
                  {currentStudyPlan.progress > 0 ? "Continue Learning" : "Start Learning"}
                </button>
              </div>

              <p className="mt-4 text-gray-700">{currentStudyPlan.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex items-center">
                  <FiBookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="font-semibold">{currentTopics.length} Topics</p>
                    <p className="text-sm text-gray-600">Comprehensive curriculum</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FiClock className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="font-semibold">{currentStudyPlan.estimatedTime}</p>
                    <p className="text-sm text-gray-600">Estimated completion</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">Progress</span>
                    <span>{currentStudyPlan.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-amber-600 rounded"
                      style={{ width: `${currentStudyPlan.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topics List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Course Topics</h2>

            {currentTopics.map((topic, index) => (
              <div
                key={topic._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-semibold text-sm mt-1">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                        {topic.completed ? (
                          <FiCheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <FiCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>

                      <p className="text-gray-600 mb-3">{topic.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{topic.moduleCount} modules</span>
                        <span>•</span>
                        <span>{topic.estimatedTime}</span>
                        {topic.completed && (
                          <>
                            <span>•</span>
                            <span className="text-green-600 font-medium">Completed</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <Link to={`/modules/${topic._id}`}>
                      <button
                        className={`px-4 py-2 rounded ${
                          topic.completed
                            ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-300 cursor-pointer"
                            : "bg-amber-400 text-white hover:bg-amber-600 cursor-pointer"
                        }`}
                      >
                        {topic.completed ? "Review" : "Start Topic"}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyPlanDetails
