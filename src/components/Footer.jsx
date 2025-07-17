import { Link } from "react-router-dom"
import { FiTwitter, FiLinkedin, FiMail } from "react-icons/fi"
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 hover:text-amber-600">JobPrep Arena</h3>
            <p className="text-gray-300 mb-4">
              Master your job preparation across multiple domains with our comprehensive practice platform. From
              Business Analytics to IT, we've got you covered.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-white hover:text-amber-600 transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-amber-600 transition-colors">
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-amber-600 transition-colors">
                <FiMail className="h-5 w-5" />
              </a>
            </div>

            <form className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white/30 text-gray-900 placeholder-gray-900 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200"
              />
              <button
                type="submit"
                className="border-2 border-white text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-amber-600 hover:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-md backdrop-blur-md"
              >
                Subscribe
              </button>
            </form>

          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/problems" className="text-gray-300 hover:text-amber-600 transition-colors">
                  Problems
                </Link>
              </li>
              <li>
                <Link to="/study-plans" className="text-gray-300 hover:text-amber-600 transition-colors">
                  Study Plans
                </Link>
              </li>
              <li>
                <Link to="/contest" className="text-gray-300 hover:text-amber-600 transition-colors">
                  Contest
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center gap-2"><FaPhoneSquareAlt className="text-xl hover:text-amber-600 hover:text-3xl transition:all duration:900"  />+91 000-0000-000</li>
              <li className="text-gray-300 flex items-center gap-2"><MdEmail className="text-xl hover:text-amber-600 hover:text-3xl transition:all duration:900" />xyz@gmail.com</li>
              <li className="text-gray-300 flex items-center gap-2"><IoMdHome className="text-2xl mb-3 hover:text-amber-600 hover:text-3xl tansition:all duration:900" />D-487,Beta Plaza, Greater Noida,<br/> Uttar Pradesh-201306</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} JobPrep Arena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
