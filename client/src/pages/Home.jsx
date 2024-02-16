import { useEffect, useState } from "react"
import { FaQrcode } from "react-icons/fa"
import { FaLink } from "react-icons/fa";

import CreateLink from "../components/CreateLink"
import CreateQRCode from "../components/CreateQRCode"
import CallToAction from "../components/CallToAction"

const Home = () => {
  const [tab, setTab] = useState("url")

  useEffect(() => {
    if (localStorage.getItem("qr")) {
      setTab("qr")
    }
    if (localStorage.getItem("url")) {
      setTab("url")
    }
  }, [])

  return (
    <main>
      <section className="">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto justify-center text-center px-2 my-20">
          <span className=" mx-auto bg-[#FEE5E4] px-2 py-1  block border border-accentRed text-black">
            Cut short your long links in no time 🚀
          </span>
          <h1 className="text-3xl md:text-6xl">
            Long links sharing Made Easy with{" "}
            <span className="text-accentRed font-semibold home-heading">
              Quick Quip
            </span>
          </h1>
        </div>
      </section>
      <section className="p-2 my-16">
        <div className="max-w-2xl mx-auto border bg-white">
          <div className="flex items-center w-full justify-center">
            <div
              onClick={() => setTab("url")}
              className={`flex flex-1 gap-2 h-14 items-center justify-center cursor-pointer ${
                tab === "url"
                  ? "bg-accentLightPink text-darkBlack border-b-2 border-accentRed"
                  : "bg-gray-100 text-gray-600 border-b-[1px] border-gray-300"
              }`}
            >
              <FaLink />
              <p className="font-bold">Short Url</p>
            </div>
            <div
              onClick={() => setTab("qr")}
              className={`flex flex-1 gap-2 h-14 items-center justify-center cursor-pointer ${
                tab === "qr"
                  ? "bg-accentLightPink text-darkBlack border-b-2 border-accentRed"
                  : "bg-gray-100 text-gray-600 border-b-[1px] border-gray-300"
              }`}
            >
              <FaQrcode />
              <p className="font-bold">Generate QR</p>
            </div>
          </div>
          <div className="p-4">
            {tab === "url" && <CreateLink />}
            {tab === "qr" && <CreateQRCode />}
          </div>
        </div>
      </section>
      <CallToAction />
    </main>
  )
}

export default Home
