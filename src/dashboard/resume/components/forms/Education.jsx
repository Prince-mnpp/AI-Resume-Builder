import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/service/supabaseClient';

const formField = {
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: '',
};

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([formField]);

  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;

    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1));
  };

  const onSave = async () => {
    try {
      setLoading(true);

      const cleanEducation = educationalList.map(({ id, ...rest }) => rest);

      const { error } = await supabase
        .from('user_resumes')
        .update({
          education: cleanEducation,
        })
        .eq('id', params?.resumeId);

      if (error) {
        console.log(error);
        toast('Server Error, Please try again!');
        return;
      }

      toast('Education updated!');
    } catch (error) {
      console.log(error);
      toast('Server Error, Please try again!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      education: educationalList,
    }));
  }, [educationalList, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  value={item?.universityName || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  value={item?.degree || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Major</label>
                <Input
                  name="major"
                  value={item?.major || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item?.startDate || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item?.endDate || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  value={item?.description || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>

          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Education;