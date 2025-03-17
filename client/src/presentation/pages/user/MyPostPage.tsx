import React from 'react'
import Navbar from '../../components/user/Navbar'
import MyPosts from '../../components/user/MyPosts'
import Footer from '../../components/user/Footer'

const MyPostPage: React.FC = () => {
  return (
    <>
     <Navbar />
      
      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0c75] p-6">
        <MyPosts />
      </div>

      <Footer />
    </>
  )
}

export default MyPostPage