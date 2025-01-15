import React from 'react'

const CourseDetails = () => {
    return(
        <div>
            <div className="flex flex-col p-6 text-center bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 shadow-xl backdrop-blur-lg">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    Course Details
                    </h2>
            </div>
            <div className="flex flex-col max-w-7xl mx-auto p-4 pt-8 md:pl-20 xl:pl-4">
                <div className="mb-4">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-700 pb-4">
                        <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Sections</span> on this Course
                    </h3>
                    <ul className="list-disc text-gray-600 text-md md:text-xl ml-8">
                        <li>Python Object Classes</li>
                        <li>Python Object Attribute</li>
                        <li>Python Object Methods</li>
                    </ul>
                </div>
                {/* <div className="mb-4">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-700 pb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Objective</span> on this Course
                    </h3>
                    <ul className="list-disc text-gray-600 text-md md:text-xl ml-8">
                        <li>Create Python Console App with OOP</li>
                        <li>Understand Python Class, Attribute, and Method</li>
                        <li> </li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-700 pb-4">
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Requirements</span> on this Course
                    </h3>
                    <ul className="list-disc text-gray-600 text-md md:text-xl ml-8">
                        <li>Create Python Console App with OOP</li>
                        <li>Understand Python Class, Attribute, and Method</li>
                        <li> </li>
                    </ul>
                </div> */}
                
            </div>
        </div>
    )
}

export default CourseDetails