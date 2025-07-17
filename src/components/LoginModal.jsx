import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FiMail, FiLock, FiEye, FiEyeOff, FiX } from "react-icons/fi"

const Login = ({onClose}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit =  (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = login(formData.email, formData.password)

    if (result.success) {
      navigate("/")
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <>
    <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
    />

    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="max-w-md w-full space-y-8 px-4 sm:px-6 relative">

      <button
        onClick={onClose}
        className="absolute top-0 right-0 mt-4 mr-4 text-white hover:text-red-400 z-10"
        aria-label="Close login modal"
      >
        <FiX className="h-6 w-6" />
      </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-gray-200">Sign in to your account</p>
        </div>

        <div className="backdrop-blur-md bg-[rgba(17,25,40,0.26)] border-[rgba(255,255,255,0.125)] rounded-xl shadow-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white">Sign In</h3>
        <p className="text-sm text-gray-300">Enter your credentials to access your account</p>
      </div>

          <div className="px-6 py-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 py-2 border rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-10 py-2 border rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md transition duration-200 shadow-md"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-amber-400 hover:text-amber-600">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
