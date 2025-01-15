import React from 'react'

const Quest = () => {
    return(
        <div>
            <div className='w-full flex flex-row text-gray-900 items-center justify-center'>
                <div className='flex flex-col w-full'>
                    <h2 className='text-2xl font-semibold p-2'>QuestName</h2>
                    <div className="w-full h-4 bg-gray-200 rounded-full">
                        <div className="h-4 bg-blue-600 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                </div>
                <div>Prize</div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent my-5"></div>
        </div>
    )
}

export default Quest