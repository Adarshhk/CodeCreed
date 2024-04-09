import React from 'react'
import { useSelector } from 'react-redux'
import Problem from './Problem';

const Problems = () => {
  const { problems } = useSelector(state => state.problem)

  return (
    problems && <div>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-lg rounded ">

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 text-white align-middle border border-solid border-blueGray-100 py-3 text-l border-l-0 border-r-0 text-left tracking-wider">
                      Title
                    </th>
                    <th className="px-6 text-white align-middle border border-solid border-blueGray-100 py-3 text-l border-l-0 border-r-0 text-center tracking-wider">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem) => (
                    <Problem key={problem._id} problem={problem} />
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Problems