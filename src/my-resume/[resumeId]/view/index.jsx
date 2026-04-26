import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/service/supabaseClient";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, [resumeId]);

  const GetResumeInfo = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("user_resumes")
        .select("*")
        .eq("id", Number(resumeId))
        .single();

      console.log("Resume data:", data);
      console.log("Supabase error:", error);

      if (error) {
        setResumeInfo(null);
        return;
      }

      const formattedData = {
        ...data,
        firstName: data.firstname,
        lastName: data.lastname,
        jobTitle: data.jobtitle,
        themeColor: data.themeColor || data.theme_color || "#7c3aed",
      };

      setResumeInfo(formattedData);
    } catch (error) {
      console.log("Catch error:", error);
      setResumeInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const HandleDownload = () => {
    window.print();
  };

  const HandleShare = async () => {
    const url = `${window.location.origin}/my-resume/${resumeId}/view`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${resumeInfo?.firstName || ""} ${
            resumeInfo?.lastName || ""
          } Resume`,
          text: "Please check my resume.",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Resume link copied!");
      }
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  if (loading) {
    return (
      <h2 className="text-center mt-20 text-xl font-semibold">
        Loading resume...
      </h2>
    );
  }

  if (!resumeInfo) {
    return (
      <h2 className="text-center mt-20 text-xl font-semibold text-red-500">
        Resume not found
      </h2>
    );
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your AI generated resume is ready!
          </h2>

          <p className="text-center text-gray-400">
            Now you can download your resume and share your unique resume URL.
          </p>

          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <Button onClick={HandleShare}>Share</Button>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36 print:mx-0 print:my-0">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;