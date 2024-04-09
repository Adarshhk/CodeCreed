import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from '../features/authSlice'
import toast from 'react-hot-toast'

const Navbar = () => {

  const {authToken} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      if(authToken !== null)
      {
        const res = await fetch("/api/auth/logout" , {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        const data = await res.json();
        console.log(data);
        localStorage.setItem("authToken" , "")
        dispatch(setAuth({authToken : null , loading : false}))
        toast.success(data.success);
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div
      className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center hover:shadow-lg" to="/">
              <img className="h-7 w-auto" src="/logo.png" />
              <p className="sr-only">CodeCreed</p>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:text-green-500"
              to="/">Home</Link>
            <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:text-green-500"
              to="/profile">Profile</Link>
            <Link className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:text-green-500"
              to="/add-problem">Add Problem</Link>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link className={`items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold hover:shadow-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex ${authToken !== null ? "invisible" : ""}`}
              to="/signup">Sign Up</Link>
            <Link className="inline-flex items-center justify-center rounded-xl bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={handleLogout}
              to="/login">{authToken === null ? "Login" : "Logout"}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar