import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateSummaryFromAI = async (jobTitle) => {
  const prompt = `
You are an expert resume writer.
Write 3 professional resume summary options for the job title: "${jobTitle}".

Rules:
- Keep each summary between 2 and 4 lines
- Make them ATS-friendly
- Use strong professional language
- Return only plain text
- Number them as 1, 2, 3
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};