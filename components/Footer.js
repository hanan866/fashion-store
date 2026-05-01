import Link from "next/link"
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTelegram,
  FaTiktok,
  FaUser,
  FaShoppingCart
} from "react-icons/fa"

export default function Footer({ cartCount = 0, user = null }) {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">
            Fashion <span className="text-pink-400">Store</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Modern clothing for everyone. Style, comfort, and quality.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/shop" className="hover:text-white">Shop</Link></li>

            {/* Cart connected */}
            <li>
              <Link href="/cart" className="hover:text-white flex items-center gap-2">
                <FaShoppingCart />
                Cart
                {cartCount > 0 && (
                  <span className="bg-pink-500 text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* User account connected */}
            <li>
              {user ? (
                <Link href="/profile" className="hover:text-white flex items-center gap-2">
                  <FaUser />
                  {user.name || "My Account"}
                </Link>
              ) : (
                <Link href="/login" className="hover:text-white flex items-center gap-2">
                  <FaUser />
                  Login
                </Link>
              )}
            </li>

            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4 text-2xl flex-wrap">

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-pink-400 transition-transform hover:scale-110 duration-200"
              aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform hover:scale-110 duration-200"
              aria-label="Facebook">
              <FaFacebook />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-sky-400 transition-transform hover:scale-110 duration-200"
              aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-red-500 transition-transform hover:scale-110 duration-200"
              aria-label="YouTube">
              <FaYoutube />
            </a>

            <a href="https://t.me/sarem55" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-400 transition-transform hover:scale-110 duration-200"
              aria-label="Telegram">
              <FaTelegram />
            </a>

            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-transform hover:scale-110 duration-200"
              aria-label="TikTok">
              <FaTiktok />
            </a>

            <a href="https://wa.me/251905331259" target="_blank" rel="noopener noreferrer"
              className="hover:text-green-400 transition-transform hover:scale-110 duration-200"
              aria-label="WhatsApp">
              <FaWhatsapp />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 border-t border-gray-800 py-4">
        © {new Date().getFullYear()} Fashion Store. All rights reserved.
      </div>
    </footer>
  )
}