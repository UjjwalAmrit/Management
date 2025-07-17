"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FiMenu, FiX, FiUser, FiLogOut, FiTrendingUp } from "react-icons/fi"

const Navbar = ({setShowLoginModal}) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U"
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FiTrendingUp className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-amber-600">JobPrep Arena</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/problems"
                  className="px-4 py-1.5 text-white hover:text-amber-600 transition-all duration-300 font-medium"
                >
                  Problems
                </Link>
                <Link
                  to="/study-plans"
                  className="px-4 py-1.5 text-white hover:text-amber-600 transition-all duration-300 font-medium"
                >
                  Study Plans
                </Link>
                <Link
                  to="/contest"
                  className="px-4 py-1.5 text-white hover:text-amber-600 transition-all duration-300 font-medium"
                >
                  Contest
                </Link>

                {/* Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center hover:ring-2 ring-amber-600"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover hover:ring-3  transition-all duration-300"
                      />
                    ) : (
                      <span className="text-sm font-bold">{getInitials(user.name)}</span>
                    )}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-900 rounded-2xl shadow-lg z-50 overflow-hidden">
                      <div className="p-3 bg-amber-600">
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-200 truncate">{user.email}</p>
                      </div>
                      <hr className="border-gray-900" />
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-2 hover:border-gray-900 transition-colors duration-300"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FiUser className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <hr className="border-gray-900"/>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsDropdownOpen(false)
                        }}
                        className="w-full text-left flex items-center px-4 py-2 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-2 hover:border-gray-900 transition-colors duration-300 "
                      >
                        <FiLogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2 text-white font-medium hover:text-amber-600 transition-all duration-300"
              >
                Login
              </button>


              
              <Link
                to="/register"
                className="px-5 py-2 text-white font-medium hover:text-amber-600 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-3 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/problems"
                    className="block text-white hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Problems
                  </Link>
                  <Link
                    to="/study-plans"
                    className="block text-white hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Study Plans
                  </Link>
                  <Link
                    to="/contest"
                    className="block text-white hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contest
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-white hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left text-white hover:text-amber-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-white hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-white hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
