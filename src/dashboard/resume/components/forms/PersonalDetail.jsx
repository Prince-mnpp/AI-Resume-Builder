import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/service/supabaseClient";

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enabledNext(false);

    const { name, value } = e.target;

    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase
        .from("user_resumes")
        .update({
          firstname: resumeInfo?.firstName || "",
          lastname: resumeInfo?.lastName || "",
          jobtitle: resumeInfo?.jobTitle || "",
          address: resumeInfo?.address || "",
          phone: resumeInfo?.phone || "",
          email: resumeInfo?.email || "",
        })
        .eq("id", Number(params?.resumeId));

      if (error) {
        console.log("Personal detail save error:", error);
        toast("Failed to save");
        return;
      }

      enabledNext(true);
      toast("Details Updated");
    } catch (error) {
      console.log(error);
      toast("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={resumeInfo?.firstName || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={resumeInfo?.lastName || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={resumeInfo?.jobTitle || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={resumeInfo?.address || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={resumeInfo?.phone || ""}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={resumeInfo?.email || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;