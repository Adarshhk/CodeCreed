import React from 'react'

const ProblemDetails = ({ details }) => {

  return (
    details !== "" && <div>
      <div className="w-full p-6 backdrop-blur-lg bg-opacity-80 shadow-lg bg-gray-800 text-white h-[87vh] overflow-auto">
        <h2 className="mt-5 text-left text-2xl font-bold pb-2">{details.title}</h2>
        <h6 className='font-extralight italic'>{details.description}</h6>
        <div>
          <h4 className='mt-4 text-l font-bold mb-1'>Example 1</h4>
          <p className='my-3 text-lg'>{`Input :  ${details.sample[0].input}`}</p>
          <p className='my-3 text-lg'>{`Output :  ${details.sample[0].output}`}</p>
          <p className='my-3 text-lg'>{`Explaination :  ${details.sample[0].explaination}`}</p>
        </div>
        <div>
          <h4 className='mt-4 text-l font-bold mb-1'>Example 2</h4>
          <p className='my-3 text-lg'>{`Input :  ${details.sample[1].input}`}</p>
          <p className='my-3 text-lg'>{`Output :  ${details.sample[1].output}`}</p>
          <p className='my-3 text-lg'>{`Explaination :  ${details.sample[1].explaination}`}</p>
        </div>
      </div>
    </div>
  )
}

export default ProblemDetails