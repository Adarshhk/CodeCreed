import React, { useEffect, useState } from 'react'
import CodeEditor from './CodeEditor.jsx'
import Form from './Form.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../AlertModal.jsx'

const AddProblem = () => {

  const [loading , setLoading] = useState(false)
  const authToken = localStorage.getItem("authToken")
  const navigate = useNavigate();
  useEffect(() => {
    if (authToken === "") navigate("/login")

  }, []);

  const [driverCode, setDriverCode] = useState(`#include <bits/stdc++.h>\nusing namespace std;\n\n//EXAMPLE CODE (PLEASE EDIT ACCORDING TO YOUR QUESTION)\n\nclass Solution{\npublic:\n\tint sum(int arr[] , int n) {\n\t\t//code here\n\t}\n};\n\nint main() {\n\tint t;\n\tcin >> t;\n\twhile (t--) {\n\t\tint n;\n\t\tcin >> n;\n\t\tint arr[n];\n\t\tfor(int i = 0; i < n; i++) {\n\t\t\tcin >> arr[i];\n\t\t}\n\t\tSolution ob;\n\t\tauto ans = ob.sum(arr , n);\n\t\tcout << ans << "\n";\n\t}\n\treturn 0;\n} //Driver code ends here\n
  `)

  const [problem, setProblem] = useState({
    title: "",
    description: "",
    sample: [],
    code: "",
    testCases: [],
  });

  const [showModal , setShowModal] = useState(false)
  useEffect(() => {
    setProblem({...problem , code : driverCode})
    
  }, [driverCode]);


  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setShowModal(false);
    const res = await fetch("/api/problem/add" , {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(problem)
    })
    
    const data = await res.json();
    setLoading(false);
    toast.success("Problem Added Successfully.")
    
  }
  return (
    
    <div className='flex flex-row justify-center'>
      <AlertModal showModal={showModal} setShowModal={setShowModal} handleSubmit={handleSubmit}/>
      <div className=' inline-block w-1/2 ml-2'>
        <Form setShowModal={setShowModal} problem={problem} loading = {loading} setProblem={setProblem} />
      </div>
      <div className='inline-block w-1/2 mr-2 p-5 bg-gray-800 '>
        <CodeEditor driverCode={driverCode} setDriverCode={setDriverCode} />
      </div>
    </div>
  )
}

export default AddProblem