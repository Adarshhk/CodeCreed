import React from 'react'
import {TailSpin} from 'react-loader-spinner'

const Spinner = () => {
    return (
        <div className='flex justify-center'>
            <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#ffff"
                ariaLabel="tail-spin-loading"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Spinner
