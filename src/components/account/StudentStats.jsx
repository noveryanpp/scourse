import React from 'react'
import Achievement from '../Achievement'

const StudentStats = () => {
    return(
        <div className="flex py-4">
            <div className="max-w-7xl mx-auto pt-2 md:pl-20 md:pr-2 2xl:px-2">
                <div className='flex flex-col text-gray-900'>
                    <div>Graph</div>
                    <div className='flex flex-row justify-between gap-4'>
                        <Achievement />
                        <Achievement />
                        <Achievement />
                    </div>
                    <div>Achievemnt</div>
                </div>
            </div>
        </div>
    )
}

export default StudentStats