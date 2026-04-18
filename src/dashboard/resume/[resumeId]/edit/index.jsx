import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '../../components/ResumePreview';
import GlobalApi from "../../../../service/GlobalApi";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);

  useEffect(() => {
    if (params.resumeId) {
      GetResumeInfo();
    }
  }, [params.resumeId]);

  const GetResumeInfo = async () => {
    try {
      const data = await GlobalApi.GetResumeById(params.resumeId);
      setResumeInfo(data);
    } catch (error) {
      console.log("GetResumeById error:", error);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;