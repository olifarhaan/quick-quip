import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { isValidEmail } from "../../../api/utils/validEmail"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  console.log(formData)

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]:
        e.target.id === "name" ? e.target.value : e.target.value.trim(),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log("form data-----------", formData)

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("All fields are required")
      setLoading(false)
      return
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Enter a valid email")
      setLoading(false)
      return
    }

    if (formData.password.includes(" ")) {
      toast.error("Whitespaces are not allowed in passwords")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const responseJSON = await res.json()
      if (res.ok && responseJSON.success) {
        navigate("/sign-in")
      } else {
        toast.error(responseJSON.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="max-w-sm mx-auto p-3 my-16 flex flex-col gap-3">
        <h1 className="text-center">Sign Up</h1>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="name"
            placeholder="Full name"
            autoComplete="name"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            id="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <button
            className={`bg-accentRed border border-black text-white h-12 hover:bg-accentDarkRed transition duration-500 ease-in-out ${
              loading ? "opacity-50" : "opacity-100"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="ml-2">Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="text-center">
          Have an account?{" "}
          <Link
            to="/sign-in"
            className="text-accentRed hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
