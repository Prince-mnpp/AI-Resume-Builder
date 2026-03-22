import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

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
        <SummeryPreview resumeInfo={resumeInfo}/>
      {/* professional experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>
      {/* education */}
        <EducationalPreview resumeInfo={resumeInfo}/>
      {/* skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
