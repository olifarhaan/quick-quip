import React from "react"
import { MdBarChart } from "react-icons/md"
import { MdContentCopy, MdDateRange } from "react-icons/md"
import { FaTrashAlt } from "react-icons/fa"

import { GrEdit } from "react-icons/gr"
import { toast } from "react-toastify"

const UrlCard = ({ link, onDelete, onEdit }) => {
  const shorturl = `${import.meta.env.VITE_BASE_URL}/l/${link.shortcode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shorturl)
    toast.success("Short link copied!")
  }


  return (
    <div className="w-full p-2 md:p-4 shadow-sm border my-2 bg-white relative hover:shadow-md">
      <h2 className="truncate">{link.title}</h2>
      <p className="text-accentRed font-bold">{shorturl}</p>
      <p className="truncate text-[#5c575c]"> {link.longUrl}</p>

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
          className="text-4xl border border-[#DAE1EB] p-[6px] text-[#5c575c] hover:bg-gray-100 cursor-pointer"
          onClick={handleCopy}
        />
        <GrEdit
          className="text-4xl border border-[#DAE1EB] p-[6px] text-[#5c575c] cursor-pointer hover:bg-gray-100 "
          onClick={onEdit}
        />
        <FaTrashAlt
          className="text-4xl border border-[#DAE1EB] p-[6px] text-[#5c575c] cursor-pointer hover:bg-gray-100"
          onClick={onDelete}
        />
      </div>
    </div>
  )
}

export default UrlCard
