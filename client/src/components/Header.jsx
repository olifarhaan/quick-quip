import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaStaylinked } from "react-icons/fa"
import { SiMicrodotblog } from "react-icons/si"
import { CiSearch, CiUser } from "react-icons/ci"
import { PiSignOut } from "react-icons/pi"

import { FaMoon, FaSun } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import useSignout from "../hooks/useSignout.js"

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const handleSignout = useSignout()

  const navigate = useNavigate()

  const navData = [
    {
      id: 1,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      text: "Projects",
      link: "/projects",
    },
    {
      id: 3,
      text: "About",
      link: "/about",
    },
    {
      id: 4,
      text: "Blogs",
      link: "/blogs",
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b-gray-300 shadow-sm">
      <div className="px-2 max-w-6xl mx-auto">
        <div className="flex mx-auto justify-between px-2 py-3">
          {/* Primary */}
          <div className="flex items-center gap-0 sm:gap-16">
            {/* Logo */}
            <Link
              className="flex justify-center items-center gap-2 text-xl sm:text-3xl"
              to="/"
            >
              <FaStaylinked className="text-accentRed" />
              <span className="font-bold">Quick Quip</span>
            </Link>

            {/* Primary Menu */}
            <div></div>
          </div>

          {/* Secondary Menu */}
          <div className="flex gap-3 items-center md:order-2 justify-end">
            {currentUser ? (
              <>
                <button
                  className="bg-accentRed px-4 py-3 text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
                  onClick={() => navigate("/my-urls")}
                >
                  My Urls
                </button>
                <button
                  className="bg-accentRed px-4 py-3 text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </button>
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