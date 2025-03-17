import React from 'react'
import Navbar from '../../components/user/Navbar'
import Scoreboard from '../../components/user/Scoreboard'
import Footer from '../../components/user/Footer'

const TopProfilesPage: React.FC = () => {
    return (
      <>
        <Navbar />
  
        {/* Main Content */}
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0c75] p-6">
          <Scoreboard />
        </div>
  
        <Footer />
      </>
    );
  };
  
  export default TopProfilesPage;
  