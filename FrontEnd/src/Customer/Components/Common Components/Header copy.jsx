import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../../../redux/user/userSlice';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link } from 'react-router-dom';
import Logo from '../../../Images/life-logo.png'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for Menu anchor
  const menuOpen = Boolean(anchorEl); // State for Menu open/close

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(signoutSuccess());
    setDropdownOpen(false);
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle Menu open/close toggle
  const handleMenuOpen = (event) => {
    if (menuOpen) {
      handleMenuClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  // Handle Menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header className="fixed top-0 h-28 pt-5 w-full bg-gradient-to-r from-gray-100 to-blue-200 z-[9999]">
        <div className="pl-7 w-full px-2 py-2">
          <div className="flex items-center w-full flex-nowrap">
            <a
              href="/"
              className="flex mr-1 md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-blue-600"
            >
              <img src={Logo} alt="Lifeneedz" className="w-43 h-13" />
            </a>

            <div className="hidden lg:flex items-center min-w-0 relative z-10 ml-45">
              <div className="relative">
                <form>
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search products, categories..."
                    className="border-none rounded-full w-170 px-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
                  />
                </form>
              </div>

              <div className="relative ml-10">
                <button className="bg-white py-1.5 px-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50">
                  <LocationOnIcon className="text-blue-600" />
                  <p className="font-medium text-gray-700 whitespace-nowrap">Location</p>
                </button>
              </div>
              <div>
              </div>
              <div className="flex items-center lg:relative ml-73">
                <div className="relative">
                  <button className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-medium text-sm px-2 py-2">
                    {currentUser ? (
                      <div className="relative">
                        <div
                          className="w-15 h-8 rounded-full text-white flex items-center justify-center font-semibold cursor-pointer"
                          onClick={toggleDropdown}
                        >
                          <img src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-256.png" alt="" className='rounded-full w-10 h-10' />
                        </div>
                        {dropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50">
                            <div className='flex flex-col items-center justify-center mt-3 gap-2'>
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-5UywI4IbBf_enQUwx0jtZ5krHsWa5nNpw&s" alt="" className='rounded-full w-13 h-13' />
                              <h2 className='text-blue-500 uppercase'>{currentUser?.userName}</h2>
                            </div>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={() => setDropdownOpen(false)}
                            >
                              View Profile
                            </Link>
                            <button
                              className="block w-full px-4 py-2 mb-2 text-gray-700 hover:bg-red-500 hover:text-white"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link to="/login">
                        <PersonIcon className="text-2xl" />
                      </Link>
                    )}
                  </button>
                </div>
                <div>
                  <MenuIcon
                    aria-label="more"
                    id="long-button"
                    aria-controls={menuOpen ? "long-menu" : undefined}
                    aria-expanded={menuOpen ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    fontSize="large"
                  >
                    <MoreVertIcon />
                  </MenuIcon>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    sx={{
                      position: 'fixed',
                      left: '0px',
                      top: '10px', // Just below header
                      transform: 'none',
                      width: '220px',
                      zIndex: 100000,
                      maxHeight: 'calc(100vh - 120px)', // Prevent overflow
                    }}
                  >
                    <MenuItem onClick={handleMenuClose} component={Link} to="/"><HomeIcon className="mr-2" />Home</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/products"><ShoppingBagIcon className="mr-2" />Product</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/cart"><ShoppingCartIcon className='mr-2'/>Cart</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/order"><ReceiptLongIcon className="mr-2" />Orders</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/delivery-address"><LocalShippingIcon className="mr-2" />Delivery Address</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/contact"><ContactMailIcon className="mr-2" />Contact</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[112px] md:h-[112px] lg:h-[112px]"></div>

      <div className="bg-gradient-to-r from-gray-100 to-blue-200 z-40 w-full shadow-lg -mt-[1px] md:-mt-0">
        <div className="lg:hidden fixed left-0 right-0 z-30 bg-gradient-to-r from-gray-100 to-blue-200 top-[112px] md:top-[112px] w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 py-2">
            <div className="relative z-10 w-full flex items-center gap-2">
              <form className="flex-1">
                <div className="relative flex items-center w-full">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search products, categories..."
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm sm:w-[calc(100vw-100px)] md:w-[calc(100vw-120px)]"
                  />
                </div>
              </form>
              <button
                className="lg:hidden focus:outline-none p-2 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <MenuIcon className="text-2xl text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        <div className="lg:hidden h-[56px]"></div>

        {currentUser && mobileMenuOpen && (
          <div className="lg:hidden fixed top-[168px] md:top-[168px] right-0 z-[100000] w-full">
            <div className="bg-gradient-to-r from-gray-100 to-blue-200 w-full shadow-lg">
              <nav className="container mx-auto px-4">
                <div className="flex flex-col">
                  <a
                    href="/"
                    className="text-gray-800 font-semibold text-md flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600  shadow-md rounded-lg mt-2"
                  >
                    <HomeIcon className="mr-2" />
                    Home
                  </a>
                  <a
                    href="/products"
                    className="text-gray-800 font-semibold text-md flex items-center px-4 py-3 hover:bg-white/50 rounded-lg"
                  >
                    <ShoppingBagIcon className="mr-2" />
                    Products
                  </a>
                  <a
                    href="/order"
                    className="text-gray-800 font-semibold text-md flex items-center px-4 py-3 hover:bg-white/50 rounded-lg"
                  >
                    <ReceiptLongIcon className="mr-2" />
                    Orders
                  </a>
                  <a
                    href="/delivery-address"
                    className="text-gray-800 font-semibold text-md flex items-center px-4 py-3 hover:bg-white/50 rounded-lg"
                  >
                    <LocalShippingIcon className="mr-2" />
                    Delivery Address
                  </a>
                  <a
                    href="/contact"
                    className="text-gray-800 font-semibold text-md flex items-center px-4 py-3 hover:bg-white/50 rounded-lg"
                  >
                    <ContactMailIcon className="mr-2" />
                    Contact Us
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}

        {currentUser && (
          <div className="container mx-auto px-1 py-2 z-0">
            {/* <div className="flex items-center justify-end w-full flex-nowrap">
              <nav className="hidden lg:flex items-center space-x-4">
                <a
                  href="/"
                  className="text-sm font-medium px-4 py-2 flex items-center transition-all duration-100 border-b-2 border-blue-500 text-blue-600"
                >
                  <HomeIcon className="mr-2" />
                  Home
                </a>
                <a
                  href="/products"
                  className="text-sm font-medium px-4 py-2 flex items-center transition-all duration-100 text-gray-700 hover:text-blue-600"
                >
                  <ShoppingBagIcon className="mr-2" />
                  Product
                </a>
                <a
                  href="/order"
                  className="text-sm font-medium px-4 py-2 flex items-center transition-all duration-100 text-gray-700 hover:text-blue-600"
                >
                  <ReceiptLongIcon className="mr-2" />
                  Orders
                </a>
                <a
                  href="/delivery-address"
                  className="text-sm font-medium px-4 py-2 flex items-center transition-all duration-100 text-gray-700 hover:text-blue-600"
                >
                  <LocalShippingIcon className="mr-2" />
                  Delivery Address
                </a>
                <a
                  href="/contact"
                  className="text-sm font-medium px-4 py-2 flex items-center transition-all duration-100 text-gray-700 hover:text-blue-600"
                >
                  <ContactMailIcon className="mr-2" />
                  Contact
                </a>
              </nav>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
}