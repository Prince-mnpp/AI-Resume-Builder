import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import Summery from './forms/Summery';

const FormSection = () => {
  const [activeFormIndex,setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext] = useState(true);
  const {resumeId} = useParams();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'> 
          <Link to={"/dashboard"}>
            <Button><Home /></Button>
          </Link>

        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && 
          <Button size='sm'
          onClick={() =>setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft /> </Button>}

          <Button 
          disabled={!enableNext}
          className="flex gap-2" size='sm'
          onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
       {activeFormIndex==1? <PersonalDetail enabledNext={(v)=>setEnableNext(v)} /> 
       :activeFormIndex==2? <Summery enabledNext={(v)=>setEnableNext(v)}/> : null}
      {/* Summary */}

      {/* Experience */}

      {/* Educational Detail */}

      {/* Skills */}
    </div>
  )
}

export default FormSection
