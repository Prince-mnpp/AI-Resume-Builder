import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';

const ResumePreview = () => {

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-20'
    style={{
      borderColor:resumeInfo?.themeColor
    }}>
      {/* personal detail */}
        <PersonalDetailPreview resumeInfo = {resumeInfo}/>
      {/* summary */}

      {/* professional experience */}

      {/* eduaction */}

      {/* skills */}
    </div>
  )
}

export default ResumePreview
