import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import UrlCard from "../components/UrlCard"
import useBodyScrollLock from "../hooks/useBodyScrollLock"
import ConfirmModal from "../components/ConfirmModal"
import { useNavigate } from "react-router-dom"

const MyUrls = () => {
  const { currentUser } = useSelector((state) => state.user)

  const navigate= useNavigate()
  const [links, setLinks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toggle] = useBodyScrollLock()

  const [showModal, setShowModal] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState(null)

  const onDelete = async (uid) => {
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
        console.log(links)

        const updatedLinks = links.filter((link) => {
          return link._id !== uid
        })
        setLinks(updatedLinks)
        toast.success("Link deleted successfully")
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
        } else {
          toast.error(responseJSON.message)
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

  if (loading) {
    return <>Loading...</>
  }

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto flex flex-col justify-center p-2">
        {links && links.length > 0 ? (
          <>
            {links.map((link) => (
              <UrlCard
                link={link}
                key={link._id}
                onDelete={() => onDelete(link._id)}
                onEdit={()=>onEdit(link._id)}
              />
            ))}
          </>
        ) : (
          <>You dont have any listing</>
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
