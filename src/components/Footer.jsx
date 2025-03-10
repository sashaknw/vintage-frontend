import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Determine if the footer should use dark theme based on current page
  const isDarkTheme = ["/community"].includes(location.pathname);

  // Dynamic theme classes
  const themeClasses = {
    background: isDarkTheme ? "bg-black" : "bg-white",
    text: isDarkTheme ? "text-white" : "text-black",
    mutedText: isDarkTheme ? "text-gray-400" : "text-gray-500",
    linkHover: isDarkTheme ? "hover:text-gray-300" : "hover:text-amber-500",
  };

  return (
    <footer className={`${themeClasses.background} ${themeClasses.text} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Footer with Responsive Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg font-bold mb-2">vintage vault</h3>
            <p className={`text-xs ${themeClasses.mutedText} mb-4`}>
              Curated vintage fashion for the discerning collector.
            </p>

            {/* Social Media - Moved up in mobile view */}
            <div className="flex space-x-4">
              <a
                href="#"
                className={`${themeClasses.text} ${themeClasses.linkHover}`}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className={`${themeClasses.text} ${themeClasses.linkHover}`}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Condensed */}
          <div className="col-span-1">
            <h4 className="text-sm font-medium mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/" className={`text-xs ${themeClasses.linkHover}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={`text-xs ${themeClasses.linkHover}`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className={`text-xs ${themeClasses.linkHover}`}
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`text-xs ${themeClasses.linkHover}`}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service - Condensed */}
          <div className="col-span-1">
            <h4 className="text-sm font-medium mb-2">Support</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/contact"
                  className={`text-xs ${themeClasses.linkHover}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className={`text-xs ${themeClasses.linkHover}`}
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className={`text-xs ${themeClasses.linkHover}`}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter - Styled to match site design */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-sm font-medium mb-2">Newsletter</h4>
            <form>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`text-xs px-3 py-2 rounded-full bg-transparent border ${
                    isDarkTheme
                      ? "border-gray-700 text-white placeholder-gray-500 focus:border-white"
                      : "border-gray-300 text-black placeholder-gray-500 focus:border-amber-500"
                  } focus:outline-none focus:ring-1 ${
                    isDarkTheme
                      ? "focus:ring-white/30"
                      : "focus:ring-amber-500/30"
                  }`}
                />
                <button
                  type="submit"
                  className={`text-xs px-3 py-2 rounded-full transition-colors ${
                    isDarkTheme
                      ? "border border-white text-white hover:bg-white hover:text-black"
                      : "bg-black text-white hover:bg-amber-500"
                  }`}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section - Simplified */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className={`text-xs ${themeClasses.mutedText} text-center`}>
            &copy; {new Date().getFullYear()} Vintage Vault
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
