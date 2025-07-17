// "use client"

// import { createContext, useContext, useState, useEffect } from "react"
// import { api } from "../utils/api"

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       fetchProfile()
//     } else {
//       setLoading(false)
//     }
//   }, [])

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get("/auth/profile")
//       setUser(response.data.user)
//     } catch (error) {
//       localStorage.removeItem("token")
//       console.error("Failed to fetch profile:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const login = async (email, password) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const fakeUser = { name: "Mock User", email }
//       localStorage.setItem("token", "fake-jwt-token")
//       setUser(fakeUser)
//       resolve({ success: true })
//     }, 1000)
//   })
// }

//   // const login = async (email, password) => {
//   //   try {
//   //     const response = await api.post("/auth/login", { email, password })
//   //     const { token, user } = response.data
//   //     localStorage.setItem("token", token)
//   //     setUser(user)
//   //     return { success: true }
//   //   } catch (error) {
//   //     return {
//   //       success: false,
//   //       error: error.response?.data?.message || "Login failed",
//   //     }
//   //   }
//   // }


//   const register = async (name, email, password) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const fakeUser = { name, email }
//       localStorage.setItem("token", "fake-jwt-token")
//       setUser(fakeUser)
//       resolve({ success: true }) 
//     }, 1000) 
//   })
// }


//   // const register = async (name, email, password) => {
//   //   try {
//   //     const response = await api.post("/auth/register", { name, email, password })
//   //     const { token, user } = response.data
//   //     localStorage.setItem("token", token)
//   //     setUser(user)
//   //     return { success: true }
//   //   } catch (error) {
//   //     return {
//   //       success: false,
//   //       error: error.response?.data?.message || "Registration failed",
//   //     }
//   //   }
//   // }

//   const logout = () => {
//     localStorage.removeItem("token")
//     setUser(null)
//   }

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     fetchProfile,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }





"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const mockUser = { name: "Mock User", email: "mock@example.com" }
      setUser(mockUser)
    }
    setLoading(false)
  }, [])

  const fetchProfile = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      const mockUser = { name: "Mock User", email: "mock@example.com" }
      setUser(mockUser)
    }
  }

  const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUser = { name: "Mock User", email }
        localStorage.setItem("token", "fake-jwt-token")
        setUser(fakeUser)
        resolve({ success: true })
      }, 1000)
    })
  }

  const register = async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUser = { name, email }
        localStorage.setItem("token", "fake-jwt-token")
        setUser(fakeUser)
        resolve({ success: true })
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    fetchProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
