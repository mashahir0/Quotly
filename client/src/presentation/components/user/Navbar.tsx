

import type React from "react"
import { useState } from "react"
import { Search, Home, User, ChevronDown } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "../../../domain/redux/slilce/userSlice"
import { useNavigate } from "react-router-dom"

import { RootState } from "../../../domain/redux/store"

const Navbar: React.FC = () => {
  const [isDropdown1Open, setIsDropdown1Open] = useState(false)
  const [isDropdown2Open, setIsDropdown2Open] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const {user} = useSelector((state : RootState ) => state.user)
  
  const dispatch =  useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userToken')
    dispatch(clearUser())
    window.location.reload();
    navigate('/login')
  }

  return (
    <nav className="bg-[#1a0c75] shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-[#ece6ff]">{user?.name || 'name'}</span>
        </div>

        {/* Search Bar */}
        <div className="ml-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#c4b8ff]" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-[#2e1e9c] text-[#ece6ff] placeholder-[#b09fff] focus:outline-none focus:ring-1 focus:ring-[#b09fff] focus:border-[#b09fff] sm:text-sm transition duration-300 ease-in-out"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex ml-10 space-x-4">
          <a
            href="#"
            className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </a>

          <div className="relative group">
            <button
              onClick={() => setIsDropdown1Open(!isDropdown1Open)}
              className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
            >
              Dropdown 1
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isDropdown1Open && (
              <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-[#2e1e9c]">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
                    role="menuitem"
                  >
                    Option 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
                    role="menuitem"
                  >
                    Option 2
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="relative group">
            <button
              onClick={() => setIsDropdown2Open(!isDropdown2Open)}
              className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
            >
              Dropdown 2
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isDropdown2Open && (
              <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-[#2e1e9c]">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
                    role="menuitem"
                  >
                    Option A
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
                    role="menuitem"
                  >
                    Option B
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile and Logout */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative group">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#2e1e9c]">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="profile-menu">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
                  role="menuitem"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
                  role="menuitem"
                >
                  Help
                </a>
              </div>
            </div>
          )}
        </div>

        <button
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:from-red-700 hover:to-red-800"
        
        onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</nav>

  )
}

export default Navbar

