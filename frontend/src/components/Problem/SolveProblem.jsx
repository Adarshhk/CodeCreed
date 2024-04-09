import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProblemDetails from './ProblemDetails';
import CodeEditor from '../AddProblem/CodeEditor.jsx'
import Spinner from '../spinner/Spinner.jsx'
import toast from 'react-hot-toast'
const SolveProblem = () => {

  const { problemId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSpinner, setSubmitSpinner] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [result, setResult] = useState({ "success": "UmVzdWx0IHdpbGwgYmUgc2hvd24gaGVyZS4=" })


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSpinner(true)
    const code = btoa(details.driverCode);
    
    try {
      const res = await fetch(`/api/problem/question/${problemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      }).then((res) => res.json())
      setResult(res);
      setShowConsole(true)
      setSubmitSpinner(false)
      if(res.error)
      {
        toast.error("Wrong Solution");
      }
      else toast.success("Problem Submitted Successfully")
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true)
      const res = await fetch(`/api/problem/question/${problemId}`, {
      }).then((res) => res.json());
      const code = { ...res, driverCode: atob(res.driverCode) }
      setDetails(code);
      setLoading(false)
    }
    fetchProblem();
  }, []);

  const setDriverCode = (value) => {
    setDetails({ ...details, driverCode: value })
  }

  const handleConsoleClick = () => {
    if (showConsole === false) setShowConsole(true);

    else setShowConsole(false);
  }
  return (

    loading ? <Spinner /> : <div className='flex flex-row justify-center'>
      <div className=' inline-block w-1/2 ml-2'>
        <ProblemDetails details={details.sample ? details : ""} />
      </div>
      <div className='flex-col max-w-1/2 w-1/2 mr-2 p-5 bg-gray-800 '>
        <div className={`${showConsole ? "h-[30vh]" : ""} z-10 overflow-hidden`}>
          <CodeEditor driverCode={details.driverCode ? details.driverCode : ""} setDriverCode={setDriverCode} />
        </div>

        <div className='overflow-auto'>
          <p className='hover:bg-gray-600 text-white text-xl pl-10 ml-0 font-mono' onClick={handleConsoleClick}>Console</p>
          <div className={`${showConsole ? "" : "hidden"} border-gray-700 rounded bg-gray-700 h-56 border-2 h- px-7 mt-5`}>

            {result.error ? <p className='text-red-400 mt-3 text-lg'>{atob(result.error)}</p> : <p className='text-green-400 mt-3 text-lg'>{atob(result.success)}</p>}

          </div>

        </div>
      </div>
      <button
        type="button"
        className={`${submitSpinner ? "disabled" : ""} fixed mt-[79vh] z-30 py-2.5 px-7 me-2 mb-2 text-lg font-bold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`} onClick={handleSubmit}>
        {submitSpinner ? <Spinner/> : "Submit"}
      </button>
    </div>
  )
}

export default SolveProblem