import React from 'react'
import welcomeVideo from '../videos/Welcome.webm'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br bg-black flex flex-col items-center justify-center px-4 py-8">
      {/* Video */}
      <div className="mb-6">
        <video
          className="w-full max-w-2xl h-48 md:h-64 object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={welcomeVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text */}
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent text-center mb-8">
        Welcome To The Media Finder
      </h1>

      {/* Button */}
      <button
        onClick={() => navigate('/search')}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
      >
        Get Started
      </button>
    </div>
  )
}

export default Home