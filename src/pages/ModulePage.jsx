"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../utils/api"
import { FiArrowLeft, FiClock, FiCheckCircle } from "react-icons/fi"

const ModulePage = () => {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const [module, setModule] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchModuleData()
  }, [moduleId])

  const fetchModuleData = async () => {
    try {
      const response = await api.get(`/modules/${moduleId}`)
      setModule(response.data.module)
      setQuestions(response.data.questions || [])
    } catch (error) {
      console.error("Failed to fetch module data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      const response = await api.post(`/modules/${moduleId}/submit`, {
        answers: Object.entries(answers).map(([questionId, selectedOptionIndex]) => ({
          questionId,
          selectedOptionIndex: Number.parseInt(selectedOptionIndex),
        })),
      })

      navigate(`/modules/${moduleId}/review`, {
        state: {
          results: response.data,
          answers: answers,
        },
      })
    } catch (error) {
      console.error("Failed to submit answers:", error)
      alert("Failed to submit answers. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const demoModule = {
    _id: moduleId,
    title: "Data Analysis Fundamentals",
    description: "Test your understanding of basic data analysis concepts and techniques.",
    estimatedTime: "15 minutes",
  }

  const demoQuestions = [
    {
      _id: "q1",
      question: "What is the primary purpose of data analysis in business?",
      options: [
        "To collect as much data as possible",
        "To make informed business decisions based on data insights",
        "To create complex statistical models",
        "To replace human judgment entirely",
      ],
      correctOptionIndex: 1,
      explanation:
        "The primary purpose of data analysis is to extract meaningful insights from data to support informed business decision-making.",
    },
    {
      _id: "q2",
      question: "Which of the following is NOT a common data visualization type?",
      options: ["Bar chart", "Pie chart", "Scatter plot", "Database schema"],
      correctOptionIndex: 3,
      explanation: "A database schema is a structural representation of a database, not a data visualization type.",
    },
    {
      _id: "q3",
      question: "What does KPI stand for in business analytics?",
      options: [
        "Key Performance Indicator",
        "Knowledge Processing Interface",
        "Kinetic Process Integration",
        "Key Process Implementation",
      ],
      correctOptionIndex: 0,
      explanation:
        "KPI stands for Key Performance Indicator, which is a measurable value that demonstrates how effectively a company is achieving key business objectives.",
    },
  ]

  const currentModule = module || demoModule
  const currentQuestions = questions.length > 0 ? questions : demoQuestions
  const currentQuestion = currentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100
  const answeredQuestions = Object.keys(answers).length
  const allQuestionsAnswered = answeredQuestions === currentQuestions.length

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Back to Study Plan
        </button>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentModule.title}</h1>
              <p className="text-gray-600 mt-1">{currentModule.description}</p>
            </div>
            <div className="text-gray-500 flex items-center">
              <FiClock className="h-4 w-4 mr-1" />
              {currentModule.estimatedTime}
            </div>
          </div>

          <div className="mt-4 text-sm flex justify-between">
            <span>
              Progress: Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
            <span>
              {answeredQuestions}/{currentQuestions.length} answered
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Question {currentQuestionIndex + 1}
        </h2>
        <p className="text-gray-800 mb-4">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={currentQuestion._id}
                value={index}
                checked={answers[currentQuestion._id] == index}
                onChange={() => handleAnswerChange(currentQuestion._id, index)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          {currentQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? "bg-blue-600 text-white"
                  : answers[currentQuestions[index]._id]
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestionIndex === currentQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered || submitting}
            className="px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>

      {!allQuestionsAnswered && (
        <div className="bg-orange-50 border border-orange-200 mt-6 rounded-lg p-4">
          <div className="flex items-center">
            <FiCheckCircle className="h-5 w-5 text-orange-600 mr-2" />
            <p className="text-orange-800">
              Please answer all questions before submitting. You have {currentQuestions.length - answeredQuestions} questions remaining.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModulePage
