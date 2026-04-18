import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import GlobalApi from '@/service/GlobalApi';
import { generateSummaryFromAI } from '@/service/AIModal';

const Summery = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || "");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setSummery(resumeInfo?.summery || "");
  }, [resumeInfo]);

  const GenerateSummaryFromAI = async () => {
    try {
      if (!resumeInfo?.jobtitle && !resumeInfo?.jobTitle) {
        toast("Please add job title first");
        return;
      }

      setAiLoading(true);

      const jobTitle = resumeInfo?.jobtitle || resumeInfo?.jobTitle;
      const result = await generateSummaryFromAI(jobTitle);

      setSummery(result);

      setResumeInfo((prev) => ({
        ...prev,
        summery: result,
      }));

      setAiLoading(false);
    } catch (error) {
      console.log("AI summary error:", error);
      setAiLoading(false);
      toast("Failed to generate summary");
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await GlobalApi.UpdateResumeDetail(params?.resumeId, {
        summery: summery,
      });

      setResumeInfo((prev) => ({
        ...prev,
        summery: summery,
      }));

      enabledNext?.(true);
      setLoading(false);
      toast("Summary updated");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast("Failed to save summary");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add a summary for your job target, or generate one with AI.</p>

      <div className="mt-4">
        <Button type="button" onClick={GenerateSummaryFromAI} disabled={aiLoading}>
          {aiLoading ? <LoaderCircle className="animate-spin" /> : "Generate from AI"}
        </Button>
      </div>

      <form className="mt-4" onSubmit={onSave}>
        <Textarea
          className="h-40"
          value={summery}
          onChange={(e) => setSummery(e.target.value)}
        />

        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Summery;