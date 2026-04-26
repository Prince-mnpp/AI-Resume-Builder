import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { supabase } from '@/service/supabaseClient';

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.Experience?.length > 0) {
      setExperienceList(resumeInfo.Experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummery: '',
      },
    ]);
  };

  const removeExperience = () => {
    setExperienceList((prev) => prev.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      Experience: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  const onSave = async () => {
    try {
      setLoading(true);

      const cleanExperience = experienceList.map(({ id, ...rest }) => rest);

      const { error } = await supabase
        .from('user_resumes')
        .update({
          Experience: cleanExperience,
        })
        .eq('id', params?.resumeId);

      if (error) {
        console.log('Save error:', error);
        toast('Failed to save');
        return;
      }

      toast('Details updated!');
    } catch (error) {
      console.log('Save error:', error);
      toast('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    value={item?.title || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    value={item?.companyName || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    value={item?.city || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    value={item?.state || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item?.startDate || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item?.endDate || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery || ''}
                    onRichTextEditorChange={(e) =>
                      handleRichTextEditor(e, 'workSummery', index)
                    }
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
              onClick={addNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>

            <Button
              variant="outline"
              onClick={removeExperience}
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
    </div>
  );
}

export default Experience;