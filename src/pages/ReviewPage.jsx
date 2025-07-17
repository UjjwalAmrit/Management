"use client"

import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { api } from "../utils/api"
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiTrendingUp } from "react-icons/fi"

const ReviewPage = () => {
  const { moduleId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [reviewData, setReviewData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location.state?.results) {
      setReviewData(location.state.results)
      setLoading(false)
    } else {
      fetchReviewData()
    }
  }, [moduleId, location.state])

  const fetchReviewData = async () => {
    try {
      const response = await api.get(`/modules/${moduleId}/review`)
      setReviewData(response.data)
    } catch (error) {
      console.error("Failed to fetch review data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const demoReviewData = {
    module: {
      _id: moduleId,
      title: "Data Analysis Fundamentals",
      description: "Test your understanding of basic data analysis concepts and techniques."
    },
    score: 67,
    totalQuestions: 3,
    correctAnswers: 2,
    questions: [
      {
        _id: "q1",
        question: "What is the primary purpose of data analysis in business?",
        options: [
          "To collect as much data as possible",
          "To make informed business decisions based on data insights",
          "To create complex statistical models",
          "To replace human judgment entirely"
        ],
        correctOptionIndex: 1,
        userAnswer: 1,
        isCorrect: true,
        explanation: "The primary purpose of data analysis is to extract meaningful insights from data to support informed business decision-making."
      },
      {
        _id: "q2",
        question: "Which of the following is NOT a common data visualization type?",
        options: ["Bar chart", "Pie chart", "Scatter plot", "Database schema"],
        correctOptionIndex: 3,
        userAnswer: 2,
        isCorrect: false,
        explanation: "A database schema is a structural representation of a database, not a data visualization type."
      },
      {
        _id: "q3",
        question: "What does KPI stand for in business analytics?",
        options: [
          "Key Performance Indicator",
          "Knowledge Processing Interface",
          "Kinetic Process Integration",
          "Key Process Implementation"
        ],
        correctOptionIndex: 0,
        userAnswer: 0,
        isCorrect: true,
        explanation: "KPI stands for Key Performance Indicator, which is a measurable value that demonstrates how effectively a company is achieving key business objectives."
      }
    ]
  }

  const currentReviewData = reviewData || demoReviewData
  const { module, score, totalQuestions, correctAnswers, questions } = currentReviewData

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FiArrowLeft className="h-4 w-4 mr-2" /> Back to Study Plan
        </button>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">Module Review</h2>
          <p className="text-gray-600 mb-4">{module.title}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>{score}%</div>
              <p className="text-gray-600">Overall Score</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{correctAnswers}/{totalQuestions}</div>
              <p className="text-gray-600">Correct Answers</p>
            </div>
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(score)}`}>
                {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement"}
              </span>
              <p className="text-gray-600 mt-2">Performance</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold flex items-center mb-4">
            <FiTrendingUp className="mr-2" /> Performance Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Strengths</h4>
              <ul className="space-y-2">
                {questions.filter(q => q.isCorrect).map((q, i) => (
                  <li key={i} className="flex items-start text-sm text-green-700">
                    <FiCheckCircle className="h-4 w-4 mt-0.5 mr-2" />
                    Question {i + 1}: Correctly identified the concept
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Areas for Improvement</h4>
              <ul className="space-y-2">
                {questions.filter(q => !q.isCorrect).map((q, i) => (
                  <li key={i} className="flex items-start text-sm text-red-700">
                    <FiXCircle className="h-4 w-4 mt-0.5 mr-2" />
                    Question {i + 1}: Review the concept and explanation
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Question Review</h2>
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div
              key={q._id}
              className={`border-l-4 bg-white shadow rounded-lg p-6 ${q.isCorrect ? "border-green-500" : "border-red-500"}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Question {i + 1}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${q.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {q.isCorrect ? "Correct" : "Incorrect"}
                </div>
              </div>
              <p className="text-gray-800 font-medium mb-4">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`p-3 border rounded-md text-sm ${j === q.correctOptionIndex ? "bg-green-50 border-green-300" : j === q.userAnswer && !q.isCorrect ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{opt}</span>
                      <div className="text-xs space-x-1">
                        {j === q.correctOptionIndex && (
                          <span className="px-2 py-0.5 rounded-full bg-green-200 text-green-800">Correct</span>
                        )}
                        {j === q.userAnswer && (
                          <span className={`px-2 py-0.5 rounded-full ${q.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            Your Answer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-md">
                <h4 className="font-semibold text-blue-900 mb-1">Explanation</h4>
                <p className="text-blue-800 text-sm">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate("/study-plans")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >Back to Study Plans</button>
          <button onClick={() => navigate(`/modules/${moduleId}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >Retake Module</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Continue to Next Module
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
