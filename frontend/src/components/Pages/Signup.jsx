import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from '../../features/authSlice';
import Spinner from '../spinner/Spinner.jsx'
import toast from 'react-hot-toast'

const Signup = () => {
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const handleClick = async (e) => {

    e.preventDefault();
    dispatch(setAuth({ authToken: null, loading: true }))

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetail)
      })
        .then((res) => res.json())
        .then((res) => res)

      if (res.authToken == undefined) {
        console.log(res)
        localStorage.setItem("authToken", "")
        dispatch(setAuth({ authToken: null, loading: false }))
        toast.error(res.error)
      }
      else {
        console.log(res)
        localStorage.setItem("authToken", res.authToken)
        dispatch(setAuth({ loading: false, authToken: res.authToken }))
        setUserDetail({ username: "", password: "" })
        navigate("/")
        toast.success("Signed up successfully.")
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }

  }

  return (
    <div className='p-20 justify-center flex'>
      <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-10 bg-gray-800 text-white">
        <h2 className="text-center text-2xl font-bold pb-5">Create Account</h2>
        <form onSubmit={handleClick}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              name='fullName'
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 w-full py-2.5 px-4"
              placeholder="Enter Full Name"
              required
              value={userDetail.fullName}
              onChange={(e) => { setUserDetail({ ...userDetail, [e.target.name]: e.target.value }) }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              id="text"
              name='username'
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 w-full py-2.5 px-4"
              placeholder="Enter Username"
              required
              value={userDetail.username}
              onChange={(e) => { setUserDetail({ ...userDetail, [e.target.name]: e.target.value }) }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name='password'
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 w-full py-2.5 px-4"
              placeholder="Enter Password"
              required
              value={userDetail.password}
              onChange={(e) => { setUserDetail({ ...userDetail, [e.target.name]: e.target.value }) }}
            />
          </div>
          <div>
            <p className="text-red-500 pb-5"></p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-400 focus:ring-2 focus:ring-white font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto" disabled={loading}
            >
              {loading ? <Spinner /> : "Register"}
            </button>
            <div className="flex items-center text-sm">
              <p>Already have an account?</p>
              <Link to="/login" className="hover:text-green-400 text-green-500 underline cursor-pointer ml-1">Log in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup