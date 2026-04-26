import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import GlobalApi from '@/service/GlobalApi';
import { generateSummaryFromAI } from '@/service/AIModal';

const Summery = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);
  const params = useParams();

  useEffect(() => {
    setSummery(resumeInfo?.summery || '');
  }, [resumeInfo]);

  const extractJSONArray = (text) => {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');

    if (start === -1 || end === -1) {
      throw new Error('No valid JSON array found');
    }

    return text.slice(start, end + 1);
  };

  const GenerateSummaryFromAI = async () => {
    try {
      if (!resumeInfo?.jobtitle && !resumeInfo?.jobTitle) {
        toast('Please add job title first');
        return;
      }

      setAiLoading(true);

      const jobTitle = resumeInfo?.jobtitle || resumeInfo?.jobTitle;
      const result = await generateSummaryFromAI(jobTitle);

      let rawText = '';

      if (typeof result === 'string') {
        rawText = result;
      } else if (result?.response?.text) {
        rawText = await result.response.text();
      } else if (typeof result?.text === 'function') {
        rawText = await result.text();
      } else if (typeof result?.text === 'string') {
        rawText = result.text;
      } else {
        throw new Error('Invalid AI response format');
      }

      console.log('AI raw response:', rawText);

      const jsonText = extractJSONArray(rawText);
      const parsedData = JSON.parse(jsonText);

      if (!Array.isArray(parsedData)) {
        throw new Error('AI response is not an array');
      }

      setAiGeneratedSummeryList(parsedData);

      // textarea empty rahega until user selects one option
      setSummery('');

      toast('AI summaries generated');
    } catch (error) {
      console.log('AI summary error:', error);
      toast('Failed to generate summary');
    } finally {
      setAiLoading(false);
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
      toast('Summary updated');
    } catch (error) {
      console.log('Save summary error:', error);
      toast('Failed to save summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add a summary for your job target, or generate one with AI.</p>

      <div className="mt-4">
        <Button
          type="button"
          onClick={GenerateSummaryFromAI}
          disabled={aiLoading}
          variant='outline'
          className='text-primary'
        >
          {aiLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
            <Brain className='h-4 w-4'/>
            Generate from AI
            </>
          )}
        </Button>
      </div>

      <form className="mt-4" onSubmit={onSave}>
        <Textarea
          className="mt-5"
          required
          value={summery}
          onChange={(e) => setSummery(e.target.value)}
          placeholder="Select one AI suggestion below or write your own summary"
        />

        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>

          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:border hover:border-primary"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;