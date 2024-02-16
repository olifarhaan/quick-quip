import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaLock } from "react-icons/fa6"
import { MdContentCopy } from "react-icons/md"
import { toast } from "react-toastify"
import { isValidUrl } from "../../../api/utils/validUrl"
import { useNavigate, useParams } from "react-router-dom"
import { handleGoBack } from "../utils/handleGoBack"

const UpdateLink = () => {
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const urlId = params.urlId
  const { currentUser } = useSelector((state) => state.user)
  const [generatingQR, setGeneratingQR] = useState(false)
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

  const [formData, setFormData] = useState({
    title: "",
    shortcode: "",
    longUrl: "",
    qrCode: "",
  })

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch(`/api/v1/url/${currentUser._id}/${urlId}`, {
        method: "GET",
      })
      const responseJSON = await res.json()
      if (res.ok && responseJSON.success) {
        setFormData({
          title: responseJSON.data.title,
          shortcode: responseJSON.data.shortcode,
          longUrl: responseJSON.data.longUrl,
          qrCode: responseJSON.data.qrCode,
        })
      } else {
        if (responseJSON.statusCode === 404) {
          navigate("*")
        }
        toast.error(responseJSON.message)
        return
      }
    }
    try {
      if (currentUser) {
        fetchUrl()
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [urlId])

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
      const reqData = formData
      delete reqData.qrCode
      delete reqData.shortcode
      console.log(reqData)

      const res = await fetch(`/api/v1/url/${urlId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const responseJSON = await res.json()
      if (res.ok && responseJSON.success) {
        const short = `${baseUrl}/l/${responseJSON.data.shortcode}`
      } else {
        toast.error(responseJSON.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleQRGeneration = async () => {
    setGeneratingQR(true)
    try {
      const res = await fetch(`/api/v1/url/generateQR/${urlId}`, {
        method: "PUT",
      })
      const responseJSON = await res.json()
      if (res.ok && responseJSON.success) {
        setFormData({ ...formData, qrCode: responseJSON.data.qrCode })
      } else {
        toast.error(responseJSON.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setGeneratingQR(false)
    }
  }

  return (
    <section className="w-full">
      <div className="max-w-lg mx-auto p-3 my-16 flex flex-col gap-3 border bg-white">
        <h2 className="text-center">Update🪄</h2>
        {formData.qrCode ? (
          <img
            src={formData.qrCode}
            alt="QR Code Image"
            className="w-40 self-center border"
          />
        ) : (
          <button
            type="button"
            className={`bg-transparent border-2 border-gray-700 text-gray-700 font-semibold h-12 hover:bg-[#F4F7FB] transition duration-500 ease-in-out ${
              generatingQR ? "opacity-50" : "opacity-100"
            }`}
            disabled={generatingQR}
            onClick={() => handleQRGeneration()}
          >
            {generatingQR ? "Generating ..." : "Generate QR"}
          </button>
        )}
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
          <input
            type="text"
            id="title"
            placeholder="Title (eg: 'My Title', Optional)"
            onChange={handleChange}
            value={formData.title}
          />
          <div className="relative flex items-center">
            <input
              className="w-full bg-gray-200 text-gray-500"
              type="text"
              id="base-url"
              value={`Domain: ${baseUrl.slice(baseUrl.lastIndexOf("/") + 1)}`}
              disabled
            />
            <FaLock className="absolute right-2" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl">/</span>
            <input
              className="w-full bg-gray-200 text-gray-500"
              type="text"
              id="shortcode"
              placeholder="Back half (eg: 'short-link', Optional)"
              value={formData.shortcode}
              disabled
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="bg-accentLightPink px-4 py-3 h-12 text-darkBlack border border-darkBlack hover:bg-accentLightPinkDark transition duration-500 ease-in-out"
              onClick={()=>handleGoBack(navigate)}
            >
              Go Back
            </button>
            <button
              type="button"
              className={`bg-accentRed border flex-1 border-black text-white h-12 hover:bg-accentDarkRed transition duration-500 ease-in-out ${
                loading ? "opacity-50" : "opacity-100"
              }`}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Updating ..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UpdateLink
