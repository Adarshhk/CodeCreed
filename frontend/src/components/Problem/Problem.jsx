import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
const Problem = ({ problem }) => {

  const navigate = useNavigate();
  const submission = useSelector((state) => (state.submission));
  let submitted = [];
  if(submission?.length > 0)
  {
      submitted = submission.filter(obj => (
      obj.questionId === problem._id
    ))
  }
  

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/problem/${problem._id}`)
  }
  return (

    <tr>
      <td className="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left text-green-400 ">
        <button onClick={handleClick}>
          {problem.title}
          <p className='text-sm text-white font-extralight mt-1 text-left'>Created By : {problem.submittedBy.username}</p>
        </button>
      </td>
      <td className="border-t-0 px-6 align-middle text-center flex justify-center text-l whitespace-nowrap p-4 text-green-400">
        {submission?.length > 0 && submitted?.length > 0 ? <FaCheckCircle /> : <ImRadioUnchecked/>}
      </td>
    </tr>
  )
}

export default Problem