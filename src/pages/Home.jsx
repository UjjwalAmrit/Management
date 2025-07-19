"use client"

import{ useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FiArrowRight, FiTarget, FiTrendingUp, FiUsers, FiAward } from "react-icons/fi"
import LoginModal from "../components/LoginModal"

const Home = () => {
  const { user } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const navigate = useNavigate()

  const domains = [
    { name: "Business Analytics", color: "bg-blue-500", problems: 150 },
    { name: "Marketing", color: "bg-green-500", problems: 120 },
    { name: "Finance", color: "bg-purple-500", problems: 180 },
    { name: "HRM", color: "bg-orange-500", problems: 90 },
    { name: "Operations", color: "bg-red-500", problems: 110 },
    { name: "IT", color: "bg-indigo-500", problems: 200 },
  ]

  const features = [
    {
      icon: FiTarget,
      title: "Structured Study Plans",
      description: "Follow curated learning paths designed by industry experts",
    },
    {
      icon: FiTrendingUp,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics and streaks",
    },
    {
      icon: FiUsers,
      title: "Community Contests",
      description: "Compete with peers and climb the leaderboards",
    },
    {
      icon: FiAward,
      title: "Gamified Learning",
      description: "Earn badges and maintain streaks to stay motivated",
    },
  ]

  useEffect(() =>{
    if(user){
      navigate("/study-plans")
    }
  },[user, navigate])

  return (
    <>
     {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
     <div
    className={`min-h-screen transition-all duration-300 ${showLoginModal ? "blur-sm pointer-events-none" : ""}`}>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-800 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 ">
           <div className="text-center">
             <h1 className="text-5xl font-bold mb-6">Master Your Career Preparation</h1>
             <p className="text-xl mb-8 max-w-3xl mx-auto">
               Practice domain-specific questions, follow structured study plans, and compete with peers across Business
               Analytics, Marketing, Finance, HRM, Operations, and IT.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/register">
                 <button className="bg-gray-900 text-white font-medium px-6 py-3 rounded-2xl hover:bg-amber-600 hover:text-gray-900 flex items-center gap-2">
                   Get Started Free <FiArrowRight className="h-4 w-4" />
                 </button>
               </Link>
                 <button onClick={() => setShowLoginModal(true)} className="bg-gray-900 text-white font-medium px-6 py-3 rounded-2xl hover:bg-amber-600 hover:text-gray-900 flex items-center gap-2">
                   Sign In
                 </button>
             </div>
           </div>
         </div>
       </section> 

      {/* Features Section */}
      <section className="py-20 bg-gray-900 text-white hover:drop-shadow-[0_10px_15px_rgba(245,158,11,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Our platform combines the best of competitive programming with domain-specific knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white shadow rounded-2xl p-6 text-center hover:scale-105 transition-transform hover:drop-shadow-[0_10px_15px_rgba(245,158,11,0.3)]">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4 hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6 text-gray-900 hover:text-amber-600" />
                  </div>
                  <h3 className="text-lg text-gray-700 font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-900">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Domains Section
      <section className="py-20 bg-white text-gray-900 hover:drop-shadow-[0_10px_15px_rgba(245,158,11,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Multiple Domains, One Platform</h2>
            <p className="text-lg text-gray-600">Practice questions tailored to your career path</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {domains.map((domain) => (
              <div key={domain.name} className="bg-white p-6 rounded-lg text-center shadow hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${domain.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{domain.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold mb-2">{domain.name}</h3>
                <p className="text-sm text-gray-500">{domain.problems} problems</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}


      <section className="py-20 bg-[#f4f8ff] text-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="relative inline-block">
                <span className="z-10 relative">Features</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-400 z-0 transform -rotate-3"></span>
              </span>{" "}
              that drive your preparation
            </h2>
            <p className="text-lg text-gray-600">
              Try before you buy. Experience real features before committing.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                title: "Real-World Marketing Challenges",
                desc: "Solve brand strategy, campaign design, and customer insight problems modeled on actual industry scenarios.",
                tilt: "-rotate-2",
              },
              {
                title: "Weekly Contests & Leaderboards",
                desc: "Compete with peers in weekly marketing battles and climb the leaderboard to earn recognition.",
                tilt: "rotate-2",
              },
              {
                title: "Expert Evaluation and Feedback",
                desc: "Get your answers reviewed by experienced marketing professionals to understand what truly works in the real world.",
                tilt: "-rotate-3",
              },
              {
                title: "Badges & Progress Tracking",
                desc: "Earn skill-based badges and track your growth through personalized performance charts.",
                tilt: "rotate-3",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`w-64 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform ${feature.tilt} hover:rotate-0 transition-all duration-300`}
              >
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white hover:drop-shadow-[0_10px_15px_rgba(245,158,11,0.3)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8">
            Join thousands of job seekers who have improved their skills with JobPrep Arena
          </p>
          <Link to="/register">
            <button className="bg-white text-gray-900 font-medium px-6 py-3 rounded hover:bg-amber-600 flex items-center gap-2">
              Start Your Journey Today <FiArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home
