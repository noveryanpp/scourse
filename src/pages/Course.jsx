import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import CourseHead from '../components/course/Head'
import CourseDetails from '../components/course/Details'


const Course = () => {
    return(
        <div>
            <Sidebar />
            <div className="min-h-screen bg-gray-100 absolute top-0">
                <div className="w-screen pt-20">
                    <CourseHead />
                    <CourseDetails />
                </div>
            </div>
        </div>
        
    )
}

export default Course