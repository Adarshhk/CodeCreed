import React, { useEffect } from 'react'
import Problems from '../Problem/Problems.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProblem } from '../../features/problemSlice.js'
import Spinner from '../spinner/Spinner.jsx'
import { setSubmission } from '../../features/submissionSlice.js'
const Home = () => {
  const authToken = localStorage.getItem("authToken")
  const { loading } = useSelector(state => state.problem)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect( () => {
    if(authToken === undefined || authToken === null) navigate("/login")
    else{
      try {
        const fetchProblems = async () => {
          dispatch(addProblem({loading : true , problems : []}))
          const res = await fetch("/api/problem/")
          const data = await res.json();
          dispatch(addProblem({loading : false , problems : data}))
        }

        const fetchSubmissions = async () => {
          const res = await fetch('/api/user/submissions');
          const data = await res.json();
          dispatch(setSubmission(data));
          
        }
        
        fetchProblems();
        fetchSubmissions();
      } catch (error) {
        console.log(error.message)
      }
      
    }
  }, []);

  return (
    
    <div>{loading ? <div className='flex justify-center mt-4'><Spinner/></div> : <Problems />}</div>
  )
}

export default Home