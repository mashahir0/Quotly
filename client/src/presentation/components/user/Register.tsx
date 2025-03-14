import { useState } from "react"
import { useRegisterMutation } from "../../../data/api/userApi"
import { Link, useNavigate } from "react-router-dom"
import { LockOpenIcon as LockClosedIcon, UserIcon, InboxIcon as EnvelopeIcon } from "lucide-react"

const RegisterForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [register, { isLoading, error }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({ name, email, password }).unwrap()
      alert("Registration Successful!")
      navigate("/login")
    } catch (err) {
      alert("Error registering user!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0c75] py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full bg-[#2e1e9c] rounded-2xl shadow-xl p-8 space-y-8">
    <div>
      <h2 className="text-center text-3xl font-extrabold text-[#ece6ff]">Create your account</h2>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-purple-300" aria-hidden="true" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-4 py-3 pl-10 border border-transparent placeholder-[#c4b8ff] text-[#ece6ff] bg-[#3a2aaf] focus:outline-none focus:ring-[#b09fff] focus:border-[#b09fff] transition duration-200 ease-in-out"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-purple-300" aria-hidden="true" />
          </div>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-4 py-3 pl-10 border border-transparent placeholder-[#c4b8ff] text-[#ece6ff] bg-[#3a2aaf] focus:outline-none focus:ring-[#b09fff] focus:border-[#b09fff] transition duration-200 ease-in-out"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-purple-300" aria-hidden="true" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-md relative block w-full px-4 py-3 pl-10 border border-transparent placeholder-[#c4b8ff] text-[#ece6ff] bg-[#3a2aaf] focus:outline-none focus:ring-[#b09fff] focus:border-[#b09fff] transition duration-200 ease-in-out"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-[#ece6ff] bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-purple-300 group-hover:text-purple-200" aria-hidden="true" />
          </span>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </div>

      <Link to='/login'>
        <p className="text-center text-sm text-[#b09fff] hover:text-[#d0c2ff] transition duration-200 ease-in-out">
          Already have an account? Login
        </p>
      </Link>
    </form>
    {error && <div className="mt-2 text-center text-sm text-red-600">{error.toString()}</div>}
  </div>
</div>


  )
}

export default RegisterForm




