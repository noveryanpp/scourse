import React from 'react'
import Login from './auth/Login'
import Register from './auth/Register'
import Role from './auth/Role'
import Navbar from '../components/layout/Navbar'

const Auth = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex">
        <Navbar />
        <Role />
    </div>
  )
}

export default Auth