import React from 'react'

import {
    CircleStackIcon,
    BanknotesIcon,
    BoltIcon
} from '@heroicons/react/16/solid'

const ItemCard = (props) => {
    return(
        <div className="group max-w-xs 2xl:max-w-72 xl:max-w-sm lg:max-w-md md:max-w-md sm:max-w-screen bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 ease-in-out">
            <a href="#">
                <img className="rounded-t-lg" src="images/16x10.png" alt="product image" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-color duration-300">Scores Booster 7d</h5>
                    <h3 className="text-sm text-gray-600">Get bonus Scores for 7d</h3>
                </a>
                
                <div className="flex items-center mt-5">
                    <a href="#" className="text-white w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:bg-blue-800 hover:text-blue-300 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">30</a>
                </div>
            </div>
        </div>
    )
}

export default ItemCard