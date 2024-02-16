import React from "react"
import { MdBarChart } from "react-icons/md"
import { MdContentCopy, MdDateRange } from "react-icons/md"
import { IoMdDownload } from "react-icons/io"

import { FaTrashAlt } from "react-icons/fa"

import { GrEdit } from "react-icons/gr"
import { toast } from "react-toastify"
import { truncateText } from "../utils/truncate"
import { Link } from "react-router-dom"
import { downloadImage } from "../utils/downloadImage"

const QRCard = ({ link, onEdit }) => {
  const shorturl = `${import.meta.env.VITE_BASE_URL}/l/${link.shortcode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shorturl)
    toast.success("Short link copied!")
  }

  return (
    <div className="w-full p-4 shadow-sm border my-2 bg-white relative hover:shadow-md">
      <div className="flex flex-col sm:flex-row gap-2 items-center ">
        <div className="w-32">
          <img
            src={link.qrCode}
            alt=""
            className="border w-full"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex gap-2 items-center">
            <img
              src={link.favicon}
              alt={link.title}
              className="h-10 p-2 border rounded-full"
            />
            <h2 className="truncate">{link.title}</h2>
          </div>

          <a
            href={shorturl}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-accentRed font-bold">
              {shorturl}
            </p>
          </a>
          <a
            href={link.longUrl}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="truncate text-[#5c575c]">
              {truncateText(link.longUrl, 35)}
            </p>
          </a>

          <div className="flex gap-3">
            <div
              className={`flex gap-2 ${
                link.noOfVisits === 0 ? "text-[#5c575c]" : "text-green-600"
              } items-center font-semibold`}
            >
              <MdBarChart className="text-xl " />
              {link.noOfVisits}
              {" engagements"}
            </div>

            <div className="flex gap-2 text-[#5c575c] items-center">
              <MdDateRange className="text-lg" />
              {new Date(link.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="flex gap-2 sm:absolute bottom-4 right-4 mt-3 sm:mt-0">
            <MdContentCopy
              className="text-4xl bg-white border border-[#DAE1EB] p-[6px] text-[#5c575c] hover:bg-gray-100 cursor-pointer"
              onClick={handleCopy}
            />
            <GrEdit
              className="text-4xl bg-white border border-[#DAE1EB] p-[6px] text-[#5c575c] cursor-pointer hover:bg-gray-100 "
              onClick={onEdit}
            />
            <IoMdDownload
              className="text-4xl bg-white border border-[#DAE1EB] p-[6px] text-[#5c575c] cursor-pointer hover:bg-gray-100 "
              onClick={() => downloadImage(link.qrCode)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCard
