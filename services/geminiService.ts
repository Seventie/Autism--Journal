
import { GoogleGenAI } from "@google/genai";

export const generateMagicStory = async (drawingDescription: string, currentStory: string) => {
  const ai = new GoogleGenAI({ apiKey: (window as any).process?.env?.API_KEY || (process as any).env.API_KEY });
  const prompt = `You are a magical storyteller for kids. 
  The child drew: "${drawingDescription}". 
  The current story is: "${currentStory}". 
  Enhance this story or finish it with 2-3 whimsical, kid-friendly sentences. 
  Keep it under 50 words. Focus on magic, kindness, and fun.Please make sure not to type the exact Story child has said just continue the story and make it fun and meaningful `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || "And they lived happily ever after in a world of sparkles!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The magic wand fizzled! Try again later.";
  }
};

export const describeDrawing = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: (window as any).process?.env?.API_KEY || (process as any).env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Image.split(',')[1],
            },
          },
          { text: "Briefly describe what a child drew in this picture in 5-10 words." }
        ]
      },
    });
    return response.text?.trim() || "a colorful masterpiece";
  } catch (error) {
    console.error("Describe error:", error);
    return "a wonderful drawing";
  }
};
