import React from "react"

const QRCode = () => {
  return (
    <div className="relative border p-4">
      {/* <TfiClose
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => {
          setQrCode(null)
          setShortUrl(null)
        }}
      /> */}
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
  )
}

export default QRCode
