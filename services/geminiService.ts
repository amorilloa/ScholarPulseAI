
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SectionId } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzePaper(fileBase64: string, mimeType: string, selectedSections: SectionId[]): Promise<AnalysisResult> {
  const model = 'gemini-3-pro-preview';
  
  const sectionsText = selectedSections.join(', ');
  const prompt = `You are an expert scientific communicator. Analyze the provided scientific paper. 
  ONLY generate the following sections as requested: ${sectionsText}.
  
  Instructions for sections:
  - keywords: 8-12 items.
  - nonExpert: Simple explanation for family/friends.
  - universityStudent: Academic undergraduate level.
  - professionalColleague: Technical peer summary.
  - potentialApplications: Real-world applications.
  - strengthsAndLimitations: Study strengths and limitations.
  - creativeExtensions: 2-3 future research directions.
  - summaries: Tweet-length (< 280 chars) and 5-7 bullet points.

  IMPORTANT: If a section is not in the list [${sectionsText}], return null or an empty structure for that specific field in the JSON. Output the results in strict JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            data: fileBase64.split(',')[1],
            mimeType,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          keywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          explanations: {
            type: Type.OBJECT,
            properties: {
              nonExpert: { type: Type.STRING },
              universityStudent: { type: Type.STRING },
              professionalColleague: { type: Type.STRING },
            },
          },
          potentialApplications: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          strengthsAndLimitations: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              limitations: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
          creativeExtensions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          summaries: {
            type: Type.OBJECT,
            properties: {
              tweet: { type: Type.STRING },
              bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate analysis");
  
  return JSON.parse(text) as AnalysisResult;
}
