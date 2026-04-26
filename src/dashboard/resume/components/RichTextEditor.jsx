import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { generateSummaryFromAI } from "@/service/AIModal";
import { toast } from "sonner";

const PROMPT =
  "Position title: {positionTitle}. Based on this position title, give me 5-7 professional resume experience bullet points. Do not add experience level. Do not return JSON. Return only clean HTML bullet list using <ul><li></li></ul> tags.";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || "");
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // 🔥 IMPORTANT: sync when value changes from parent
  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const GenerateSummeryFromAI = async () => {
    // ✅ FIXED lowercase "experience"
    if (!resumeInfo?.experience?.[index]?.title) {
      toast("Please Add Position Title");
      return;
    }

    try {
      setLoading(true);

      const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo.experience[index].title
      );

      const resp = await generateSummaryFromAI(prompt);

      const cleanResp = resp
        ?.replace("[", "")
        ?.replace("]", "")
        ?.trim();

      setValue(cleanResp);

      // ✅ FIX: send value directly (not event object)
      onRichTextEditorChange(cleanResp);
    } catch (error) {
      console.log(error);
      toast("Something went wrong while generating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>

        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            setValue(newValue);

            // ✅ FIX: pass clean value
            onRichTextEditorChange(newValue);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;