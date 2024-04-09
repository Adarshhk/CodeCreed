import React from 'react'
import Problem from '../Problem/Problem'
import { FaCheckCircle } from 'react-icons/fa'
import Spinner from '../spinner/Spinner'

const Submission = ({ submission }) => {

    return (
        <div>
            <section className="py-1 w-full bg-blueGray-50">
            <p className='text-2xl text-white text-center mt-4 p-1 font-bold'>All Submissions </p>
            {submission.length === 0 ? <p className='text-sm font-light text-center mt-5 text-red-400'>No data to display. (Refresh by going to homepage.)</p> : <div className="w-[95%] mb-12 xl:mb-0 mx-auto mt-2">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-lg rounded ">

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-3 text-white align-middle border border-solid border-blueGray-100 py-3 text-sm border-l-0 border-r-0 text-left tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-3 text-white align-middle border border-solid border-blueGray-100 py-3 text-sm border-l-0 border-r-0 text-left tracking-wider">
                                            Submitted
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submission.map((problem) => (
                                        <tr>
                                            <td className="border-t-0 font-bold p-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-green-400 ">
                                                
                                                    {problem.question.title}
                                                
                                            </td>
                                            <td className="border-t-0 px-6 align-middle text-center flex justify-center text-l whitespace-nowrap p-4 text-green-400">
                                                {<FaCheckCircle />}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}

            </section>
        </div>
    )
}

export default Submission