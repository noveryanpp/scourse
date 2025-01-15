import React from 'react'

import {
    CircleStackIcon,
    BanknotesIcon,
    BoltIcon
} from '@heroicons/react/16/solid'

const Card = () => {
    return(
        <div className="group max-w-xs 2xl:max-w-72 xl:max-w-sm lg:max-w-md md:max-w-md sm:max-w-screen bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 ease-in-out">
            <a href="#">
                <img className="rounded-t-lg" src="images/16x10.png" alt="product image" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-color duration-300">Learn Python OOP</h5>
                    <h3 className="text-sm text-gray-600">Eka Nur Ahmad</h3>
                </a>
                <div className="flex mt-3 items-center">
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
                        3 Sections
                    </span>
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
                        <CircleStackIcon className="w-4 h-4 inline text-yellow-300"/>
                        +30
                    </span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
                        <BoltIcon className="w-4 h-4 inline text-yellow-300"/>
                        +50
                    </span>
                </div>

                <div className="flex items-center mt-2.5 justify-between">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">90</span>
                    </div>
                </div>
                
                <div className="flex items-center mt-5">
                    <a href="#" className="text-white w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:bg-blue-800 hover:text-blue-300 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Buy Course</a>
                </div>
            </div>
        </div>
    )
}

export default Card