"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import LoginModal from "./components/LoginModal"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Problems from "./pages/Problems"
import StudyPlans from "./pages/StudyPlans"
import StudyPlanDetails from "./pages/StudyPlanDetails"
import ModulePage from "./pages/ModulePage"
import ReviewPage from "./pages/ReviewPage"
import Contest from "./pages/Contest"
import "./App.css"
import { useState } from "react"

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return !user ? children : <Navigate to="/" />
}

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar setShowLoginModal = {setShowLoginModal} />
          {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <Navigate to="/" />
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems"
                element={
                  <ProtectedRoute>
                    <Problems />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-plans"
                element={
                  <ProtectedRoute>
                    <StudyPlans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-plans/:id"
                element={
                  <ProtectedRoute>
                    <StudyPlanDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/modules/:moduleId"
                element={
                  <ProtectedRoute>
                    <ModulePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/modules/:moduleId/review"
                element={
                  <ProtectedRoute>
                    <ReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contest"
                element={
                  <ProtectedRoute>
                    <Contest />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
