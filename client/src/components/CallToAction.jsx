import React from "react"
import { useNavigate } from "react-router-dom"
import CtaImage from "../assets/ctaImage.svg"
import { useSelector } from "react-redux"

const CallToAction = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  return (
    <section className="w-full bg-accentLightPink">
      <div className="max-w-xl mx-auto py-28 gap-4 flex flex-col justify-center items-center">
        <img
          src={CtaImage}
          alt=""
          className="h-40"
        />
        <h2 className="text-center text-2xl sm:text-4xl">
          Beyond mere link shortening,{" "}
          <span className="text-accentRed font-semibold">
            Unlocking possibilities
          </span>
        </h2>
        {currentUser ? (
          <div className="flex gap-2">
            <button
              className="bg-accentRed px-4 py-3 text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
              onClick={() => navigate("/my-urls")}
            >
              My URLs
            </button>
            <button
              className="bg-accentRed px-4 py-3 text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
              onClick={() => navigate("/my-qrs")}
            >
              My QRs
            </button>
          </div>
        ) : (
          <button
            className="bg-accentRed px-4 py-3 text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
            onClick={() => navigate("/sign-up")}
          >
            Get Started
          </button>
        )}

      </div>
    </section>
  )
}

export default CallToAction
