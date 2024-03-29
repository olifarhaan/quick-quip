import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaLock } from "react-icons/fa6"
import { MdContentCopy } from "react-icons/md"
import { toast } from "react-toastify"
import { isValidUrl } from "../../../api/utils/validUrl"
import { useNavigate } from "react-router-dom"

const CreateLink = ({ setLinksList = null }) => {
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const [shortUrl, setShortUrl] = useState(null)
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_BASE_URL
  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.id]:
          e.target.id === "title" ? e.target.value : e.target.value.trim(),
      }
    })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    if (!formData.longUrl) {
      toast.error("Enter long url first")
      setLoading(false)
      return
    }
    if (!isValidUrl(formData.longUrl)) {
      toast.error("Enter a valid url")
      setLoading(false)
      return
    }
    try {
      if (currentUser) {
        const res = await fetch("/api/v1/url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const responseJSON = await res.json()
        if (res.ok && responseJSON.success) {
          const short = `${baseUrl}/l/${responseJSON.data.shortcode}`
          setFormData({
            title: "",
            shortcode: "",
            longUrl: "",
          })
          if (setLinksList) {
            setLinksList((prevLinkList) => [responseJSON.data, ...prevLinkList])
          }
          setShortUrl(short)
        } else {
          toast.error(responseJSON.message)
        }
      } else {
        localStorage.setItem("url", JSON.stringify(formData))
        navigate("/sign-in")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const [formData, setFormData] = useState({
    title: "",
    shortcode: "",
    longUrl: "",
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    toast.success("Short link copied!")
  }

  useEffect(() => {
    if (localStorage.getItem("url")) {
      const data = JSON.parse(localStorage.getItem("url"))
      setFormData({
        longUrl: data.longUrl,
        shortcode: data.shortcode,
      })
      localStorage.removeItem("url")
    }
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-center">Shorten a long link🪄</h2>
      <form className="w-full flex flex-col gap-3">
        <input
          type="url"
          id="longUrl"
          placeholder="Long url (eg: 'http://your-long-url.com')"
          autoComplete="url"
          onChange={handleChange}
          value={formData.longUrl}
          required
        />
        {/* <input
          type="text"
          id="title"
          placeholder="Title (eg: 'My Title', Optional)"
          onChange={handleChange}
          value={formData.title}
        /> */}

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex items-center w-full">
            <input
              className="w-full bg-gray-200 text-gray-500"
              type="text"
              id="base-url"
              value={`Domain: ${baseUrl.slice(baseUrl.lastIndexOf("/") + 1)}`}
              disabled
            />
            <FaLock className="absolute right-2 text-darkBlack" />
          </div>

          <div className="flex items-center gap-3 w-full">
            <span className="text-3xl">/</span>
            <input
              className="w-full"
              type="text"
              id="shortcode"
              onChange={handleChange}
              placeholder="Back half (eg: 'short-link', Optional)"
              value={formData.shortcode}
            />
          </div>
        </div>

        <button
          type="button"
          className={`bg-accentRed border border-black text-white h-12 hover:bg-accentDarkRed transition duration-500 ease-in-out ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {currentUser ? "Create Link" : "Sign In & Create"}
        </button>
      </form>
      {shortUrl && (
        <div
          className="w-full flex justify-between items-center bg-green-200 px-2 py-1 h-12 border border-green-600 text-black cursor-pointer"
          onClick={handleCopy}
        >
          <span className="text-black">{shortUrl}</span>
          <MdContentCopy className="text-2xl text-green-900 hover:text-green-950 " />
        </div>
      )}
    </div>
  )
}

export default CreateLink
