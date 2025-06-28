export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-16 relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-96 h-96 bg-white rounded-full -top-40 -left-40" />
        <div className="absolute w-72 h-72 bg-blue-300 rounded-full bottom-[-100px] right-[-100px]" />
        <div className="absolute w-24 h-24 bg-white rounded-full top-1/2 left-1/3 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Branding Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-800 font-bold text-xl shadow-lg">
                🏀
              </div>
              <h2 className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text">PlayMate</h2>
            </div>
            <p className="text-blue-100 text-base leading-relaxed">
              Your ultimate sports companion. Connect, compete, and play together.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Features</h3>
              <ul className="space-y-3 text-blue-100">
                <li><a href="/players" className="hover:text-white">👥 Find Players</a></li>
                <li><a href="/dashboard" className="hover:text-white">🏟️ Book Venues</a></li>
                <li><a href="/progress" className="hover:text-white">📊 Track Progress</a></li>
                <li><a href="/live" className="hover:text-white">⚽ Live Matches</a></li>
                <li><a href="/tournaments" className="hover:text-white">🏆 Tournaments</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3 text-blue-100">
                <li><a href="/about" className="hover:text-white">❓ Help Center</a></li>
                <li><a href="/about" className="hover:text-white">📞 Contact Us @palymatez@gmail.com</a></li>
                <li><a href="/about" className="hover:text-white">🔒 Privacy Policy</a></li>
                <li><a href="/about" className="hover:text-white">📋 Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Social & App Links */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Get the App</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://apps.apple.com" className="bg-black p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition">
                  <span>🍎</span>
                  <span className="text-white">App Store</span>
                </a>
                <a href="https://play.google.com" className="bg-black p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition">
                  <span>🤖</span>
                  <span className="text-white">Google Play</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4 text-2xl">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">🐦</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">📸</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">📘</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-500 border-opacity-30 pt-6 flex flex-col sm:flex-row justify-between items-center text-blue-200 text-sm">
          <p>© 2025 PlayMate. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ for sports lovers</p>
        </div>
      </div>
    </footer>
  );
}
