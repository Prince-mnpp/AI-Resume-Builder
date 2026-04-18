import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

const Summery = () => {
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [summery,setSummery] = useState();
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

  const onSave = (e) => {
      e.preventDefault();
        setLoading(true)
        const data={
            summery:summery
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details Updated")
            
        },(error)=>{
            setLoading(false);
        })
  }
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery Detail</h2>
        <p>Add summery for your job title</p>

        <form action="" className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label htmlFor="">Add Summery</label>
            <Button variant='outline' onClick={() =>GenerateSummeryFromAI()
            } type='button' size='sm' className='border-primary text-primary flex gap-2'><Brain /> Generater from AI</Button>
            </div>
            <Textarea className="mt-5" required value={summery} defaultValue={summery?summery:resumeInfo?.summery} onChange={() =>setSummery(e.target.value)}/>

            <div className='mt-2 flex justify-end'>
              <Button type="submit" disabled={loading}>{loading?<LoaderCircle className='animate-spin'/> : 'Save'}</Button>
            </div>
            
        </form>
      </div>
    </div>
    
  )
}

export default Summery
