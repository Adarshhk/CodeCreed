import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import Login from './components/Pages/Login.jsx'
import Signup from './components/Pages/Signup.jsx'
import Profile from './components/Pages/Profile.jsx'
import Navbar from './components/Navbar.jsx'
import AddProblem from './components/AddProblem/AddProblem.jsx'
import { useDispatch , useSelector } from 'react-redux'
import { setAuth } from './features/authSlice.js'
import { useCookies } from 'react-cookie'
import toast, { Toaster } from 'react-hot-toast';
import SolveProblem from './components/Problem/SolveProblem.jsx'

const App = () => {
  const dispatch = useDispatch();
  const [cookie , setCookie] = useCookies(['authToken'])
  useEffect(() => {
    if (localStorage.getItem("authToken") !== undefined) {
      const authToken = localStorage.getItem("authToken")
      setCookie("authToken" , authToken);
      dispatch(setAuth({loading : false , authToken}))
    }
    
  }, []);


  return (
    <div>
      <Toaster/>
      <Navbar />
      <div className='w-full min-h-24'></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add-problem' element={<AddProblem />} />
        <Route path='/problem/:problemId' element={<SolveProblem />} />
      </Routes>
    </div>
  )
}

export default App