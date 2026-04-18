import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'

const Dashboard = () => {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    if (user) {
      GetResumesList()
    }
  }, [user])

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        console.log('FULL API RESPONSE:', resp.data)
        console.log('RESUME ARRAY:', resp?.data?.data)

        // Strapi v5 style: fields are directly on item
        const formattedResumes = resp?.data?.data?.map((item) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title,
          themeColor: item.themeColor,
          ...item,
        })) || []

        console.log('FORMATTED RESUMES:', formattedResumes)
        setResumeList(formattedResumes)
      })
      .catch((error) => {
        console.log('GetUserResumes error:', error)
      })
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />

        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              key={resume.documentId || resume.id || index}
              resume={resume}
              refreshData={GetResumesList}
            />
          ))}
      </div>
    </div>
  )
}

export default Dashboard