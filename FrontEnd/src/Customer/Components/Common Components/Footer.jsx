import React from 'react'
import { faFacebook, faTwitter, faGoogle, faInstagram, faWindows, faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-100 to-green-300 text-gray-300 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Contact Us */}
                    <div className="space-y-4">
                        <h4 className="text-black text-xl font-bold uppercase tracking-wide">
                            Contact Us
                        </h4>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faPhone} className="text-blue-400 w-4" />
                                <span>9159147469 / 8248191147</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="text-blue-400 w-4"
                                />
                                <span>customercare@Lifeneedz.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faBell} className="text-blue-400 w-4" />
                                <span>Feel Free to Contact Us</span>
                            </li>
                        </ul>
                    </div>

                    {/* Our Information */}
                    <div className="space-y-4">
                        <h4 className="text-black text-xl font-bold tracking-wide">
                            Our Information
                        </h4>
                        <ul className="space-y-3 text-gray-700">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors duration-300"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors duration-300"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors duration-300"
                                >
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div className="space-y-4">
                        <h4 className="text-black text-xl font-bold tracking-wide">
                            Follow Us
                        </h4>
                        <div className="flex space-x-6 text-3xl">
                            <a
                                href="#"
                                className="transform hover:scale-110 transition-all duration-300"
                            >
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    style={{ color: "#1877F2" }}
                                />
                            </a>
                            <a
                                href="#"
                                className="transform hover:scale-110 transition-all duration-300"
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    style={{ color: "#1DA1F2" }}
                                />
                            </a>
                            <a
                                href="#"
                                className="transform hover:scale-110 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faGoogle} style={{ color: "#DB4437" }} />
                            </a>
                            <a
                                href="#"
                                className="transform hover:scale-110 transition-all duration-300"
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    style={{ color: "#E4405F" }}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Download Apps */}
                    <div className="space-y-4">
                        <h4 className="text-black text-xl font-bold tracking-wide">
                            Download Apps
                        </h4>
                        <div className="space-y-4">
                            <a href="#" className="flex items-center space-x-3 group">
                                <FontAwesomeIcon
                                    icon={faWindows}
                                    className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:scale-105 group-hover:text-blue-300"
                                />
                                <span className="text-gray-700 group-hover:text-blue-400 transition-colors duration-300">
                                    Windows Store
                                </span>
                            </a>
                            <a href="#" className="flex items-center space-x-3 group">
                                <FontAwesomeIcon
                                    icon={faGooglePlay}
                                    className="w-8 h-8 text-red-500 transition-transform duration-300 group-hover:scale-105 group-hover:text-green-300"
                                />
                                <span className="text-gray-700 group-hover:text-blue-400 transition-colors duration-300">
                                    Play Store
                                </span>
                            </a>
                            <a href="#" className="flex items-center space-x-3 group">
                                <FontAwesomeIcon
                                    icon={faApple}
                                    className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:scale-105 group-hover:text-gray-300"
                                />
                                <span className="text-gray-700 group-hover:text-blue-400 transition-colors duration-300">
                                    App Store
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-700 text-sm">
                    <p>© {new Date().getFullYear()} Lifeneedz. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
