import { Facebook, Twitter, Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a0c75] text-[#ece6ff] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* About the App */}
          <div>
            <h2 className="text-xl font-bold text-white">About Quotly</h2>
            <p className="mt-2 text-sm text-[#c4b8ff]">
              Quotly is a platform for sharing and discovering inspiring quotes. Users can post, like, and rank profiles based on the most liked quotes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold text-white">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/new-post" className="hover:text-white transition">New Post</a>
              </li>
              <li>
                <a href="/my-posts" className="hover:text-white transition">My Posts</a>
              </li>
              <li>
                <a href="/top-profiles" className="hover:text-white transition">Top Profiles</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-bold text-white">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="#" className="hover:text-white transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-[#2e1e9c] pt-4 text-center text-sm">
          <p>
            Made with <Heart className="inline-block text-red-500" size={16} /> by Quotly Team
          </p>
          <p>&copy; {new Date().getFullYear()} Quotly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
