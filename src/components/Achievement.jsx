import React from 'react'
import {
    BookOpenIcon,
    BoltIcon
} from '@heroicons/react/24/outline'

const Achievement = () => {
    return(
        <div className='flex flex-row items-center p-2 w-96 shadow-lg bg-white rounded-lg text-sky-600'>
            <BookOpenIcon className='w-28 h-28 text-gray-700'/>
            <div className='flex flex-row ml-2'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-3xl'>3019</h2>
                    <h2 className='text-2xl'>Total Scores</h2>
                </div>
            </div>
        </div>
    )
}

export default Achievement