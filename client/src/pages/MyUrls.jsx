import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import UrlCard from "../components/UrlCard"
import useBodyScrollLock from "../hooks/useBodyScrollLock"
import ConfirmModal from "../components/ConfirmModal"
import { useNavigate } from "react-router-dom"
import CreateLink from "../components/CreateLink"
import Loader from "../components/Loader"
import { FaWindowClose } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";


const MyUrls = () => {
  const { currentUser } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const [links, setLinks] = useState(null)
  const [filteredLinks, setFilteredLinks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toggle] = useBodyScrollLock()

  const [showModal, setShowModal] = useState(false)
  const [showCreateLink, setShowCreateLink] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [deleteItemId, setDeleteItemId] = useState(null)

  const onDelete = (uid) => {
    toggle()
    setDeleteItemId(uid)
    setShowModal(true)
  }

  const cancelDelete = () => {
    toggle()
    setShowModal(false)
    setDeleteItemId(null)
  }

  const onEdit = (uid) => {
    navigate(`/edit-url/${uid}`)
  }

  const confirmDelete = async (uid) => {
    try {
      const res = await fetch(`/api/v1/url/${uid}`, {
        method: "DELETE",
      })
      const responseJSON = await res.json()
      if (res.ok && responseJSON.success) {
        const updatedLinks = links.filter((link) => {
          return link._id !== uid
        })
        setLinks(updatedLinks)
        toast.success("Link deleted successfully")
      } else {
        if (responseJSON.statusCode === 404) {
          navigate("*")
        } else toast.error(responseJSON.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setShowModal(false)
      setDeleteItemId(null)
      toggle()
    }
  }

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`/api/v1/url/${currentUser._id}`, {
          method: "GET",
        })
        const responseJSON = await res.json()
        if (res.ok && responseJSON.success) {
          setLinks(responseJSON.data)
          setFilteredLinks(responseJSON.data)
        } else {
          if (responseJSON.statusCode === 404) {
            navigate("*")
          } else toast.error(responseJSON.message)
        }
      } catch (error) {
        toast.error("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) {
      fetchLinks()
    }
  }, [currentUser._id])

  useEffect(() => {}, [links])

  const handleSearchTextChange = async (e) => {
    setSearchText(e.target.value)
    filterResults()
  }

  const filterResults = () => {
    const filteredResults = links.filter((link) => {
      return (
        link.title.toLowerCase().includes(searchText.toLowerCase()) ||
        link.longUrl.toLowerCase().includes(searchText.toLowerCase()) ||
        link.shortcode.toLowerCase().includes(searchText.toLowerCase())
      )
    })

    setFilteredLinks(filteredResults)
  }

  useEffect(() => {
    if (searchText && searchText !== "") filterResults()
    else setFilteredLinks(links)
  }, [links])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto flex flex-col justify-center p-2 my-10">
        <div className="w-full flex flex-col gap-3">
          <button
            className="bg-[#FEE5E4] px-4 py-3 text-accentRed border border-accentRed hover:bg-[#FEE5E9] transition duration-500 ease-in-out"
            onClick={() =>
              showCreateLink
                ? setShowCreateLink(false)
                : setShowCreateLink(true)
            }
          >
            {showCreateLink ? <div className="flex gap-2 justify-center items-center"><span><FaWindowClose/></span>Close</div> : <div className="flex gap-2 justify-center items-center"><span><MdAddBox/></span> Create New</div>}
          </button>
          {showCreateLink && (
            <div className="p-3 mb-16 border bg-white">
              <CreateLink setLinksList={setLinks} />
            </div>
          )}
        </div>

        <h2 className="text-center my-4">Your Links</h2>
        <input
          className="mb-2"
          type="text"
          id="searchText"
          placeholder="Search your links"
          onChange={handleSearchTextChange}
          value={searchText}
        />
        {links && links.length > 0 ? (
          <>
            {filteredLinks && filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <UrlCard
                  link={link}
                  key={link._id}
                  onDelete={() => onDelete(link._id)}
                  onEdit={() => onEdit(link._id)}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center my-20 gap-4">
                <p>No links found matching your search</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center mt-20 gap-4">
            <p>You dont have any links</p>
            <button
              className="bg-accentRed px-4 py-3 text-white border border-black hover:bg-accentDarkRed transition duration-500 ease-in-out"
              onClick={() => navigate("/")}
            >
              {" "}
              Create Short Url
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          confirmDelete={() => confirmDelete(deleteItemId)}
          cancelDelete={cancelDelete}
        />
      )}
    </div>
  )
}

export default MyUrls
