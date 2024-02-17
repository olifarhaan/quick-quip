import { Link, useNavigate } from "react-router-dom"
import { FaStaylinked } from "react-icons/fa"
import { useSelector } from "react-redux"
import { FaQrcode } from "react-icons/fa"
import { FaLink } from "react-icons/fa"
import { TfiMenuAlt } from "react-icons/tfi"

import { FaRegUser } from "react-icons/fa6"
import { useEffect, useRef, useState } from "react"
import useBodyScrollLock from "../hooks/useBodyScrollLock"

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const mobileMenuRef = useRef()
  const [showMobileMainDropdown, setShowMobileMainDropdown] = useState(false)
  const [toggle] = useBodyScrollLock()

  const navigate = useNavigate()
  useEffect(() => {
    const handler = (e) => {
      if (!mobileMenuRef.current.contains(e.target)) {
        setShowMobileMainDropdown(false)
        toggle()
      }
    }

    if (showMobileMainDropdown) {
      document.addEventListener("mousedown", handler)
    } else {
      document.removeEventListener("mousedown", handler)
    }
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [showMobileMainDropdown])

  return (
    <header className="sticky top-0 z-50 bg-white border-b-gray-300 shadow-sm">
      <div className="px-2 max-w-6xl mx-auto">
        <div className="flex mx-auto justify-between px-2 py-3">
          {/* Primary */}
          <div className="flex items-center gap-0 sm:gap-16">
            {/* Logo */}
            <Link
              className="flex justify-center items-center gap-2 text-3xl"
              to="/"
            >
              <FaStaylinked className="text-accentRed" />
              <span className="font-bold text-darkBlack">Quick Quip</span>
            </Link>

            {/* Primary Menu */}
            <div></div>
          </div>

          {/* Secondary Menu */}
          <div className="flex gap-3 items-center md:order-2 justify-end">
            {currentUser ? (
              <>
                <div className="hidden sm:flex sm:gap-2">
                  <button
                    className="bg-accentLightPink px-4 py-3 text-xl text-darkBlack border border-darkBlack hover:bg-accentLightPinkDark transition duration-500 ease-in-out"
                    onClick={() => navigate("/my-urls")}
                  >
                    <FaLink />
                  </button>

                  <button
                    className="bg-accentLightPink px-4 py-3 text-xl text-darkBlack border border-darkBlack hover:bg-accentLightPinkDark transition duration-500 ease-in-out"
                    onClick={() => navigate("/my-qrs")}
                  >
                    <FaQrcode />
                  </button>

                  <button
                    className="bg-accentRed px-4 py-3 text-xl text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
                    onClick={() => navigate("/profile")}
                  >
                    <FaRegUser />
                  </button>
                </div>
                <div
                  className="relative"
                  ref={mobileMenuRef}
                >
                  <button
                    className="sm:hidden bg-accentLightPink px-4 py-3 text-xl text-darkBlack border border-darkBlack hover:bg-accentLightPinkDark transition duration-500 ease-in-out"
                    onClick={() => {
                      toggle()
                      setShowMobileMainDropdown(!showMobileMainDropdown)
                    }}
                  >
                    <TfiMenuAlt />
                  </button>
                  {showMobileMainDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-darkBlack rounded-none shadow-lg w-40 overflow-hidden">
                      <ul className="flex flex-col gap-3 my-3 text-center">
                        <li>
                          <Link
                            to="/profile"
                            className="block text-sm font-semibold cursor-pointer px-4 text-paragraph hover:text-accentRed"
                          >
                            My Profile
                          </Link>
                        </li>
                        <hr />
                        <li>
                          <Link
                            to="/my-urls"
                            className="block text-sm font-semibold cursor-pointer px-4 text-paragraph hover:text-accentRed"
                          >
                            My Urls
                          </Link>
                        </li>
                        <hr />

                        <li>
                          <Link
                            to="/my-qrs"
                            className="block text-sm font-semibold cursor-pointer px-4 text-paragraph hover:text-accentRed"
                          >
                            My QRs
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                className="bg-accentRed px-4 py-3 text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    </header>
  )
}

export default Header
