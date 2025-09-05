import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useNavigate , Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.orebiReducer); // Cart products
  const { wishlist } = useSelector((state) => state.orebiReducer); // Wishlist products

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${searchQuery.trim()}`);
      setIsSearchOpen(false); // Close search on mobile after search
    }
  };

  return (
    <header className="header py-2 lg:py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="col1 w-[40%] lg:w-[25%]">
          <a href="/" className="block">
            <img
              src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg"
              alt="Logo"
              className="max-w-[140px] lg:max-w-[200px] h-auto"
            />
          </a>
        </div>

        {/* Search Section - Desktop */}
        <div className={`col2 ${isSearchOpen ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-2 block' : 'hidden'} lg:block lg:w-[40%] lg:static lg:p-0 lg:bg-transparent`}>
          {/* Mobile close button */}
          {isSearchOpen && (
            <div className="lg:hidden flex justify-end mb-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          <form onSubmit={handleSearch} className="searchBox w-full h-[50px] bg-[#e5e5e5] rounded-full relative p-2 flex items-center">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute top-[8px] right-[5px] z-50 w-[37px] min-w-[37px] h-[37px] rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors">
              <Search className="text-[#4e4e4e] text-[22px] w-5 h-5" />
            </button>
          </form>
        </div>

        {/* User Actions Section */}
        <div className="col3 w-[60%] lg:w-[30%] flex items-center justify-end">
          <ul className="flex items-center justify-end gap-0 lg:gap-3 w-full">
            {/* Mobile Search Toggle */}
            <li className="lg:hidden">
              <button
                className="p-2"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </li>

            {/* Auth Links - Desktop */}
            <li className="hidden lg:block list-none">
              <a
                className="link transition text-[15px] font-[500] text-gray-700 hover:text-primeColor"
                href="/signin"
              >
                Login
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <a
                className="link transition text-[15px] font-[500] text-gray-700 hover:text-red-500"
                href="/signup"
              >
                Register
              </a>
            </li>

            {/* Wishlist */}
            <li>
              <a aria-label="Wishlist" href="/my-list">
                <button className="p-2 relative" type="button" aria-label="wishlist">
                  <div className="relative">
                    <Heart className="w-6 h-6 text-gray-600 hover:text-primeColor transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-primeColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {wishlist.length}
                    </span>
                  </div>
                </button>
              </a>
            </li>

            {/* Cart */}
            <li>
              <Link to="/cart">
                <button className="p-2 relative" type="button" aria-label="cart">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-primeColor transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-primeColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {products.length}
                    </span>
                  </div>
                </button>
              </Link>
            </li>

            {/* Mobile Menu Toggle */}
            <li className="lg:hidden">
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <a href="/signin" className="text-gray-700 font-medium hover:text-primeColor transition-colors p-2">
                Login
              </a>
              <a href="/signup" className="text-gray-700 font-medium hover:text-primeColor transition-colors p-2">
                Register
              </a>
              <hr className="border-gray-200" />
              <a href="/my-list" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Wishlist</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;