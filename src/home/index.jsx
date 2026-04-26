import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-linear-to-b from-pink-100 via-purple-200 to-blue-200  text-black">
      

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Build Your Resume with <span className="text-blue-500">AI</span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-gray-600 text-lg md:text-xl mb-8">
          Create professional, ATS-friendly resumes in minutes using the power of AI. 
          Get smart suggestions, beautiful templates, and boost your chances of landing your dream job.
        </p>

        {/* CTA Line */}
        <p className="text-blue-400 text-lg mb-10 font-medium">
          👉 Click on <span className="font-bold text-black">Dashboard</span> to get started
        </p>

        {/* Button */}
        <Link to={'/dashboard'}>
          <Button variant='outline'>Dashboard</Button>
        </Link>

      </div>

      {/* FOOTER SMALL */}
      <div className="text-center text-gray-500 pb-6">
        © {new Date().getFullYear()} Prince Rajput | AI Resume Builder
      </div>

    </div>
    </div>
    
  )
}

export default Home