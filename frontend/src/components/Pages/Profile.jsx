import React, { useEffect, useState } from 'react'
import { MdAddTask } from "react-icons/md";
import { MdOutlineAddchart } from "react-icons/md";
import Spinner from '../spinner/Spinner.jsx'
import { useNavigate } from 'react-router-dom';
import Question from './Question.Profile.jsx';
import Submission from './Submission.Profile.jsx';
import { useSelector } from 'react-redux'

const Profile = () => {
    const authToken = localStorage.getItem("authToken");
    const submission = useSelector(state => state.submission)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({});
    const [questions, setQuestions] = useState([]);
    const [toggleList, setToggleList] = useState("question")

    useEffect(() => {
        if (authToken === "") navigate("/login")

        const fetchUser = async () => {
            await fetch('/api/user/')
                .then((res) => res.json())
                .then((res) => { setUser(res.success) });

            await fetch('/api/user/questions')
                .then((res) => res.json()).then((res) => { setQuestions(res) })
            console.log(questions)
            setLoading(false)
        }
        fetchUser();
    }, []);

    return (
        loading ? <Spinner /> : <div className=' mt-5 flex justify-end'>
            {/* Questions list */}
            <div className="ml-5 h-[80vh] overflow-auto w-[45vw]">
                <div className='w-full h-full border-1 bg-gray-700 overflow-auto rounded-md mx-auto'>

                    {toggleList === "question" ? <Question user = {user}/> : <Submission submission = {submission}/>}
                </div>
            </div>

            {/* profile */}
            <div>
                <div
                    className="w-[60vw] mr-5 ml-5 bg-white shadow-xl rounded-lg text-gray-900">
                    <div className="bg-green-300 rounded-t-lg h-32 overflow-hidden">

                    </div>
                    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                        <img className="object-cover object-center h-32" src='/pp.png' alt='Profile Picture' />
                        <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 text-center text-sm text-black font-light bg-gray-500 flex justify-center items-center ">Changing profile picture isn't available yet.</div>
                    </div>
                    <div className='text-sm text-gray-600 text-right mr-3'>
                        {`Created at : ${user.createdAt?.slice(0, 10)}`}
                    </div>
                    <div className="text-center mt-2">
                        <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                        <p className="text-xl text-gray-500">{user.username}</p>
                    </div>
                    <ul className="py-4 mt-8 text-gray-700 flex items-center justify-center">
                        <li className="flex flex-col items-center justify-evenly mr-7 " >
                            <div className='text-md font-medium opacity-55 cursor-default p-0.5 rounded-md'>Questions</div>
                            <div className='text-4xl hover:cursor-pointer' onClick={() => setToggleList('question')}><MdOutlineAddchart /></div>
                            <div className='text-xl'>{`${questions.length}`}</div>
                        </li>
                        <li className="flex flex-col items-center justify-around ml-7">
                            <div className='text-md font-medium opacity-55 cursor-default p-0.5 rounded-md'>Submissions</div>
                            <div className='text-4xl hover:cursor-pointer' onClick={() => setToggleList('submission')}><MdAddTask /></div>
                            <div className='text-xl'>{`${submission.length}`}</div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Profile