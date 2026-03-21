import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCardItem = ({resume}) => {
  if (!resume) return null;
  return (
    <Link to={`/dashboard/resume/${resume.resumeID}/edit`}>
      <div className=''>
        <div className='p-14 bg-secondary flex items-center justify-center h-70 border border-primary     rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary'>
          <Notebook />
        </div>
      <h2 className='text-center my-1'>{resume.Title}</h2>
    </div>
    </Link>
  )
}

export default ResumeCardItem
