// import AddPost from "../../components/user/AddPost"
// import Navbar from "../../components/user/Navbar"
// import UserProfile from "../../components/user/UserProfile"


// function HomePage() {
//   return (
//     <>
//     <Navbar/>
//     <UserProfile/>
//     <AddPost/>
//     </>
//   )
// }

// export default HomePage

import AddPost from "../../components/user/AddPost";
import Navbar from "../../components/user/Navbar";
import UserProfile from "../../components/user/UserProfile";
import PostsList from "../../components/user/PostsList";

function HomePage() {
  return (
    <>
      <Navbar />
      
      {/* Profile and Add Post section */}
      <div className="flex justify-center items-center p-6 bg-[#1a0c75] gap-10">
  {/* Left: Add Post */}
  <div className="w-1/3">
    <AddPost />
  </div>

  {/* Right: User Profile */}
  <div className="w-1/3">
    <UserProfile />
  </div>
</div>

      {/* Posts Section Below */}
      <div className="mt-6 flex justify-center p-6 bg-[#1a0c75]">
        <div className="w-2/3">
          <PostsList />
        </div>
      </div>
    </>
  );
}

export default HomePage;

