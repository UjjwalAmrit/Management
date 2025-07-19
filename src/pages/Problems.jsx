"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { api } from "../utils/api"
import Sidebar from "../components/Sidebar"
import { FiSearch, FiFilter, FiBook, FiClock, FiCheckCircle } from "react-icons/fi"

const Problems = () => {
  const [problems, setProblems] = useState([])
  const [filteredProblems, setFilteredProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const domains = ["Business Analytics", "Marketing", "Finance", "HRM", "Operations", "IT"]
  const difficulties = ["Easy", "Medium", "Hard"]

  useEffect(() => {
    fetchProblems()
  }, [])

  useEffect(() => {
    filterProblems()
  }, [problems, searchTerm, selectedDomain, selectedDifficulty])

  const fetchProblems = async () => {
    try {
      const response = await api.get("/problems/library")
      setProblems(response.data.problems || [])
    } catch (error) {
      console.error("Failed to fetch problems:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProblems = () => {
    let filtered = problems

    if (searchTerm) {
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          problem.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedDomain !== "all") {
      filtered = filtered.filter((problem) => problem.domain === selectedDomain)
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((problem) => problem.difficulty === selectedDifficulty)
    }

    setFilteredProblems(filtered)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDomainColor = (domain) => {
    const colors = {
      "Business Analytics": "bg-blue-100 text-blue-800",
      Marketing: "bg-green-100 text-green-800",
      Finance: "bg-purple-100 text-purple-800",
      HRM: "bg-orange-100 text-orange-800",
      Operations: "bg-red-100 text-red-800",
      IT: "bg-indigo-100 text-indigo-800",
    }
    return colors[domain] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Problems Library</h1>
            <p className="text-gray-600">Practice with our collection of domain-specific problems</p>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded shadow mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
            {/* Search */}
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                className="w-full pl-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Domain Select */}
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="py-2 px-3 border rounded w-full md:w-48"
            >
              <option value="all">All Domains</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

            {/* Difficulty Select */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="py-2 px-3 border rounded w-full md:w-48"
            >
              <option value="all">All Difficulties</option>
              {difficulties.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Total */}
            <div className="bg-white p-4 rounded shadow flex items-center gap-3">
              <FiBook className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{problems.length}</p>
                <p className="text-sm text-gray-600">Total Problems</p>
              </div>
            </div>
            {/* Solved */}
            <div className="bg-white p-4 rounded shadow flex items-center gap-3">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-600">Solved</p>
              </div>
            </div>
            {/* Filtered */}
            <div className="bg-white p-4 rounded shadow flex items-center gap-3">
              <FiClock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{filteredProblems.length}</p>
                <p className="text-sm text-gray-600">Filtered</p>
              </div>
            </div>
            {/* Domains */}
            <div className="bg-white p-4 rounded shadow flex items-center gap-3">
              <FiFilter className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{domains.length}</p>
                <p className="text-sm text-gray-600">Domains</p>
              </div>
            </div>
          </div>

          {/* Problems */}
          <div className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, index) => (
                <div
                  key={problem._id || index}
                  className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDomainColor(problem.domain)}`}>
                          {problem.domain}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{problem.description}</p>
                      <div className="text-sm text-gray-500 flex gap-4">
                        <span>Questions: {problem.questionCount || "N/A"}</span>
                        <span>•</span>
                        <span>Estimated: {problem.estimatedTime || "15 min"}</span>
                      </div>
                    </div>
                    <Link to={`/problems/${problem._id}`}>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Start Problem
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 text-center rounded shadow">
                <FiBook className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedDomain !== "all" || selectedDifficulty !== "all"
                    ? "Try adjusting your filters to see more problems."
                    : "Problems will appear here once they are added to the platform."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problems
