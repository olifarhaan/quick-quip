import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaLock } from "react-icons/fa6"
import { IoMdDownload } from "react-icons/io"
import { MdContentCopy } from "react-icons/md"
import { toast } from "react-toastify"
import { isValidUrl } from "../../../api/utils/validUrl"
import { useNavigate } from "react-router-dom"
import { TfiClose } from "react-icons/tfi"
import { downloadImage } from "../utils/downloadImage"

const CreateQRCode = ({ setLinksList = null }) => {
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const [shortUrl, setShortUrl] = useState(null)
  const [qrCode, setQrCode] = useState(null)
  const [downloadingQR, setDownloadingQR] = useState(false)
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_BASE_URL

  const [formData, setFormData] = useState({
    longUrl: "",
  })

  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.id]:
          e.target.id === "title" ? e.target.value : e.target.value.trim(),
      }
    })
  }

  const handleDownload = () => {
    setDownloadingQR(true)
    if (downloadImage(qrCode, "QR Code")) setDownloadingQR(false)
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
        const res = await fetch("/api/v1/url/generateQR", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const responseJSON = await res.json()
        if (res.ok && responseJSON.success) {
          const short = `${baseUrl}/l/${responseJSON.data.shortcode}`
          setFormData({
            longUrl: "",
          })
          if (setLinksList) {
            setLinksList((prevLinkList) => [responseJSON.data, ...prevLinkList])
          }
          setShortUrl(short)
          setQrCode(responseJSON.data.qrCode)
        } else {
          toast.error(responseJSON.message)
        }
      } else {
        localStorage.setItem("qr", JSON.stringify(formData))
        navigate("/sign-in")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }


  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    toast.success("Short link copied!")
  }

  useEffect(() => {
    if (localStorage.getItem("qr")) {
      const data = JSON.parse(localStorage.getItem("qr"))
      setFormData({
        longUrl: data.longUrl,
      })
      localStorage.removeItem("qr")
    }
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-center">Generate a QRCode🪄</h2>
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

        <button
          type="button"
          className={`bg-accentRed border border-black text-white h-12 hover:bg-accentDarkRed transition duration-500 ease-in-out ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {currentUser
            ? `${loading ? "Generating ..." : "Generate QR"}`
            : "Sign In & Generate"}
        </button>
      </form>
      {shortUrl && qrCode && (
        <div className="relative border p-4">
          <TfiClose
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              setQrCode(null)
              setShortUrl(null)
            }}
          />
          <h2 className="text-center">Your QR Code is ready 🎉</h2>
          <p className="text-gray-500 text-center">
            Scan the image below to preview your QR Code
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <img
              src={qrCode}
              alt="QR Code Image"
              className="w-40 self-center border"
            />
            <div className="flex flex-col gap-2">
              <button
                className={` flex justify-center items-center gap-2 bg-accentRed border border-black text-white h-12 px-4 hover:bg-accentDarkRed transition duration-500 ease-in-out ${
                  downloadingQR ? "opacity-50" : "opacity-100"
                }`}
                disabled={downloadingQR}
                onClick={handleDownload}
              >
                <IoMdDownload />
                {downloadingQR ? "Downloading..." : "Download QR Code"}
              </button>
              <div
                className="w-full flex justify-between items-center bg-green-200 px-2 py-1 h-12 border border-green-600 text-black cursor-pointer mt-2"
                onClick={handleCopy}
              >
                <span className="text-black">{shortUrl}</span>
                <MdContentCopy className="text-2xl text-green-900 hover:text-green-950 " />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateQRCode
