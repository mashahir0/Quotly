

// import type React from "react"
// import { useState } from "react"
// import { Search, Home, User, ChevronDown } from "lucide-react"
// import { useDispatch } from "react-redux"
// import { clearUser } from "../../../domain/redux/slilce/userSlice"
// import { useNavigate } from "react-router-dom"



// const Navbar: React.FC = () => {
//   const [isDropdown1Open, setIsDropdown1Open] = useState(false)
//   const [isDropdown2Open, setIsDropdown2Open] = useState(false)
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  
//   const dispatch =  useDispatch()
//   const navigate = useNavigate()
//   const handleLogout = () => {
//     localStorage.removeItem('userToken')
//     dispatch(clearUser())
//     window.location.reload();
//     navigate('/login')
//   }

//   return (
//     <nav className="bg-[#1a0c75] shadow-lg">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="flex items-center justify-between h-16">
//       <div className="flex items-center">
//         {/* Logo */}
//         <div className="flex-shrink-0">
//           <span className="text-2xl ml-6 font-bold text-[#ece6ff]">Quotly</span>
//         </div>

//         {/* Search Bar */}
//         <div className="ml-6">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-[#c4b8ff]" />
//             </div>
//             <input
//               className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-[#2e1e9c] text-[#ece6ff] placeholder-[#b09fff] focus:outline-none focus:ring-1 focus:ring-[#b09fff] focus:border-[#b09fff] sm:text-sm transition duration-300 ease-in-out"
//               placeholder="Search"
//               type="search"
//             />
//           </div>
//         </div>

//         {/* Menu Links */}
//         <div className="hidden md:flex ml-10 space-x-4">
//           <a
//             href="#"
//             className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
//           >
//             <Home className="w-4 h-4 mr-2" />
//             Home
//           </a>

//           <div className="relative group">
//             <button
//               onClick={() => setIsDropdown1Open(!isDropdown1Open)}
//               className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
//             >
//               Dropdown 1
//               <ChevronDown className="w-4 h-4 ml-2" />
//             </button>
//             {isDropdown1Open && (
//               <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-[#2e1e9c]">
//                 <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
//                     role="menuitem"
//                   >
//                     Option 1
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
//                     role="menuitem"
//                   >
//                     Option 2
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="relative group">
//             <button
//               onClick={() => setIsDropdown2Open(!isDropdown2Open)}
//               className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
//             >
//               Dropdown 2
//               <ChevronDown className="w-4 h-4 ml-2" />
//             </button>
//             {isDropdown2Open && (
//               <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-[#2e1e9c]">
//                 <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
//                     role="menuitem"
//                   >
//                     Option A
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
//                     role="menuitem"
//                   >
//                     Option B
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Profile and Logout */}
//       <div className="hidden md:flex items-center space-x-4">
//         <div className="relative group">
//           <button
//             onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//             className="text-[#c4b8ff] hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
//           >
//             <User className="w-4 h-4 mr-2" />
//             Profile
//             <ChevronDown className="w-4 h-4 ml-2" />
//           </button>
//           {isProfileDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#2e1e9c]">
//               <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="profile-menu">
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
//                   role="menuitem"
//                 >
//                   Settings
//                 </a>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-[#ece6ff] hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
//                   role="menuitem"
//                 >
//                   Help
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>

//         <button
//           className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:from-red-700 hover:to-red-800"
        
//         onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   </div>
// </nav>

//   )
// }

// export default Navbar

import React, { useState } from "react";
import { Home, PlusCircle, User, LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../domain/redux/slilce/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(clearUser());
    window.location.reload();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-[#1a0c75] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#ece6ff]">Quotly</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-[#c4b8ff] md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <button
                className="text-[#c4b8ff] hover:text-white transition flex items-center"
                onClick={() => navigate("/")}
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </button>

              <button
                className="text-[#c4b8ff] hover:text-white transition flex items-center"
                onClick={() => navigate("/new-post")}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                New Post
              </button>

              <button
                className="text-[#c4b8ff] hover:text-white transition flex items-center"
                onClick={() => navigate("/my-posts")}
              >
                <User className="w-5 h-5 mr-2" />
                My Posts
              </button>

              <button
                className="text-[#c4b8ff] hover:text-white transition flex items-center"
                onClick={() => navigate("/top-profiles")}
              >
                <User className="w-5 h-5 mr-2" />
                Top Profiles
              </button>
            </div>

            {/* Logout Button */}
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition hidden md:block"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <LogOut className="w-5 h-5 inline-block mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#2e1e9c] px-4 py-3">
            <button
              className="block text-[#ece6ff] hover:text-white py-2"
              onClick={() => navigate("/")}
            >
              Home
            </button>

            <button
              className="block text-[#ece6ff] hover:text-white py-2"
              onClick={() => navigate("/new-post")}
            >
              New Post
            </button>

            <button
              className="block text-[#ece6ff] hover:text-white py-2"
              onClick={() => navigate("/my-posts")}
            >
              My Posts
            </button>

            <button
              className="block text-[#ece6ff] hover:text-white py-2"
              onClick={() => navigate("/top-profiles")}
            >
              Top Profiles
            </button>

            <button
              className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-3 w-full"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>

            <div className="mt-4 flex justify-between">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

