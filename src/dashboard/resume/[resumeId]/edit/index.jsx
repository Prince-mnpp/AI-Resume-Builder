import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import ResumePreview from '../../components/ResumePreview';

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    setResumeInfo(dummy);
  },[])

  useEffect(() => {
    console.log(params.resumeId)
  },[])
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10 '>
      {/* Form section */}
        <FormSection />
      {/* Preview Section */}
        <ResumePreview />
    </div>
    </ResumeInfoContext.Provider>
    
  )
}

export default EditResume
