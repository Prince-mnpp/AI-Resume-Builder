import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/service/supabaseClient';

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: '',
      rating: 0,
    },
  ]);

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Load data only first time
  useEffect(() => {
    if (resumeInfo?.skills?.length > 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];

    newEntries[index] = {
      ...newEntries[index],
      [name]: name === 'rating' ? Number(value) : value,
    };

    setSkillsList(newEntries);

    // Live update preview immediately
    setResumeInfo((prev) => ({
      ...prev,
      skills: newEntries,
    }));
  };

  const AddNewSkills = () => {
    const newSkills = [
      ...skillsList,
      {
        name: '',
        rating: 0,
      },
    ];

    setSkillsList(newSkills);

    setResumeInfo((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const RemoveSkills = () => {
    const newSkills = skillsList.slice(0, -1);

    setSkillsList(newSkills);

    setResumeInfo((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const onSave = async () => {
    try {
      setLoading(true);

      const cleanSkills = skillsList.map(({ id, ...rest }) => rest);

      const { error } = await supabase
        .from('user_resumes')
        .update({
          skills: cleanSkills,
        })
        .eq('id', resumeId);

      if (error) {
        console.log(error);
        toast('Server Error, Try again!');
        return;
      }

      toast('Skills updated!');
    } catch (error) {
      console.log(error);
      toast('Server Error, Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between mb-2 border rounded-lg p-3"
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                value={item?.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>

            <Rating
              style={{ maxWidth: 120 }}
              value={Number(item?.rating) || 0}
              onChange={(v) => handleChange(index, 'rating', v)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            + Add More Skill
          </Button>

          <Button
            variant="outline"
            onClick={RemoveSkills}
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

export default Skills;