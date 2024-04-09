import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

const Form = ({ setShowModal , problem, setProblem , loading}) => {
  const [example1 , setExample1] = useState({input: "", output:"" , explaination : ""})
  const [example2 , setExample2] = useState({input: "", output:"" , explaination : ""})
  const [testcase1 , setTestcase1] = useState({input: "", output:""})
  const [testcase2 , setTestcase2] = useState({input: "", output:""})

  const submit = (e) => {
    e.preventDefault();
    setProblem({...problem , sample : [example2 , example1] , testCases : [testcase1 , testcase2]})
    setShowModal(true)
  }
  
  return (
    <div>
      <div className="w-full p-6 backdrop-blur-lg bg-opacity-80 shadow-lg bg-gray-800 text-white h-[87vh] overflow-auto">
        <h2 className="mt-5 text-left text-2xl font-bold pb-5">Add Problem</h2>
        <form onSubmit={submit}>
          {/* title */}
          <div className="mb-8 mt-10">
            <label htmlFor="name" className="block mb-2 text-xl font-medium">Title</label>
            <input
              type="text"
              id="name"
              name='title'
              className="text-l bg-gray-100  text-gray-900 rounded-lg w-full py-2.5 px-4"
              placeholder="Enter Problem Title"
              required
              value={problem.title}
              onChange={(e) => { setProblem({ ...problem, [e.target.name]: e.target.value }) }}
            />
          </div>
          {/* description */}
          <div className="mb-8">
            <label htmlFor="desc" className="block mb-2 text-xl font-medium">Description</label>
            <textarea
              name='description'
              id="desc"
              className="text-l bg-gray-100  text-gray-900 resize-none rounded-lg w-full py-2.5 px-4"
              placeholder="Enter Problem Title"
              required
              value={problem.description}
              onChange={(e) => { setProblem({ ...problem, [e.target.name]: e.target.value }) }}
            ></textarea>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>

          <p className='mb- text-left text-2xl font-bold pb-5'>Example</p>

          {/* example 1 */}
          <div className="grid grid-cols-6 gap-6 mb-5">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="input" className="block mb-2 text-xl font-medium">Input 1</label>
              <input 
                type="text" 
                name="input" 
                id="input" 
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" 
                placeholder="[1 , 2 , 3]" 
                required 
                value={example1.input} 
                onChange={(e) => {setExample1({...example1 , [e.target.name] : e.target.value})}}/>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="output" className="block mb-2 text-xl font-medium">Output 1</label>
              <input type="text" name="output" id="output" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="[3 , 2 , 1]" required value={example1.output} 
                onChange={(e) => {setExample1({...example1 , [e.target.name] : e.target.value})}}/>
            </div>
            <div className='w-96'>
              <label htmlFor="explain" className="block mb-2 text-xl font-medium">Explaination</label>
              <textarea
                name='explaination'
                id="explain"
                className="text-l bg-gray-100  text-gray-900 resize-none rounded-lg w-full py-2.5 px-4"
                placeholder="Write Explaination"
                required
                value={example1.explaination} 
                onChange={(e) => {setExample1({...example1 , [e.target.name] : e.target.value})}}
                
              ></textarea>
            </div>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>
          {/* example 2 */}

          <div className="grid grid-cols-6 gap-6 mb-5">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="input" className="block mb-2 text-xl font-medium">Input 2</label>
              <input type="text" name="input" id="input" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="[1 , 2 , 3]" required value={example2.input} 
                onChange={(e) => {setExample2({...example2 , [e.target.name] : e.target.value})}}/>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="output" className="block mb-2 text-xl font-medium">Output 2</label>
              <input type="text" name="output" id="output" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="[3 , 2 , 1]" required value={example2.output} 
                onChange={(e) => {setExample2({...example2 , [e.target.name] : e.target.value})}}/>
            </div>
            <div className='w-96'>
              <label htmlFor="explain" className="block mb-2 text-xl font-medium">Explaination</label>
              <textarea
                name='explaination'
                id="explain"
                className="text-l bg-gray-100  text-gray-900 resize-none rounded-lg w-full py-2.5 px-4"
                placeholder="Write Explaination"
                required
                value={example2.explaination} 
                onChange={(e) => {setExample2({...example2 , [e.target.name] : e.target.value})}}
              ></textarea>
            </div>
          </div>

          
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>

          {/* testcase */}
          <p className='text-left text-2xl font-bold pb-1'>Testcases</p>
          <p className="text-red-500 pb-5">We only support two testcases per problem for now.</p>
          <div className="grid grid-cols-6 gap-6 mb-5">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="testcase1" className="block mb-2 text-xl font-medium">Input</label>
              <input type="text" name="input" id="testcase1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="[1 , 2 , 3]" required value={testcase1.input} onChange={(e) => setTestcase1({...testcase1 , [e.target.name] : e.target.value})}/>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="testcaseop1" className="block mb-2 text-xl font-medium">Expected Output</label>
              <input type="text" name="output" id="testcaseop1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="[3 , 2 , 1]" required value={testcase1.output} onChange={(e) => setTestcase1({...testcase1 , [e.target.name] : e.target.value})}/>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-6 mb-10">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="testcase1" className="block mb-2 text-xl font-medium">Input</label>
              <input type="text" name="input" id="testcase1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="[1 , 2 , 3]" required value={testcase2.input} onChange={(e) => setTestcase2({...testcase2 , [e.target.name] : e.target.value})}/>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="testcaseop1" className="block mb-2 text-xl font-medium">Expected Output</label>
              <input type="text" name="output" id="testcaseop1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="[3 , 2 , 1]" required value={testcase2.output} onChange={(e) => setTestcase2({...testcase2 , [e.target.name] : e.target.value})}/>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
       
            <button
              type="submit"

              className={` ${loading ? "disabled" : ""} text-white bg-green-500 hover:bg-green-400 focus:ring-2 focus:ring-white font-medium rounded-lg text-l py-2.5 px-5 w-full sm:w-auto`}
            >
              {loading ? <Spinner/> : "Add Problem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form