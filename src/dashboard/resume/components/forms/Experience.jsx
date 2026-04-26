import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/service/supabaseClient";
import RichTextEditor from "../RichTextEditor";

const emptyExperience = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  workSummery: "",
};

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const [experienceList, setExperienceList] = useState([emptyExperience]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo?.experience]);

  const updateExperience = (updatedList) => {
    setExperienceList(updatedList);

    setResumeInfo((prev) => ({
      ...prev,
      experience: updatedList,
    }));
  };

  const handleChange = (index, event) => {
    const { name, value, type, checked } = event.target;

    const updatedList = experienceList.map((item, i) =>
      i === index
        ? {
            ...item,
            [name]: type === "checkbox" ? checked : value,
          }
        : item
    );

    updateExperience(updatedList);
  };

  const handleRichTextEditor = (value, index) => {
    const updatedList = experienceList.map((item, i) =>
      i === index
        ? {
            ...item,
            workSummery: value,
          }
        : item
    );

    updateExperience(updatedList);
  };

  const addNewExperience = () => {
    updateExperience([...experienceList, { ...emptyExperience }]);
  };

  const removeExperience = () => {
    if (experienceList.length <= 1) return;

    updateExperience(experienceList.slice(0, -1));
  };

  const onSave = async () => {
    try {
      setLoading(true);

      const cleanExperience = experienceList
        .filter(
          (item) =>
            item.title ||
            item.companyName ||
            item.city ||
            item.state ||
            item.startDate ||
            item.endDate ||
            item.workSummery
        )
        .map(({ id, ...rest }) => rest);

      const { error } = await supabase
        .from("user_resumes")
        .update({
          experience: cleanExperience,
        })
        .eq("id", Number(resumeId));

      if (error) {
        console.log("Save error:", error);
        toast("Failed to save");
        return;
      }

      setResumeInfo((prev) => ({
        ...prev,
        experience: cleanExperience,
      }));

      toast("Experience updated!");
    } catch (error) {
      console.log("Catch error:", error);
      toast("Failed to save");
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
                    value={item?.title || ""}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    value={item?.companyName || ""}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    value={item?.city || ""}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    value={item?.state || ""}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item?.startDate || ""}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item?.endDate || ""}
                    disabled={item?.currentlyWorking}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="currentlyWorking"
                    checked={item?.currentlyWorking || false}
                    onChange={(event) => handleChange(index, event)}
                  />
                  <label className="text-xs">Currently Working</label>
                </div>

                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery || ""}
                    onRichTextEditorChange={(value) =>
                      handleRichTextEditor(value, index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={addNewExperience}>
              + Add More Experience
            </Button>

            <Button variant="outline" onClick={removeExperience}>
              - Remove
            </Button>
          </div>

          <Button disabled={loading} onClick={onSave}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;