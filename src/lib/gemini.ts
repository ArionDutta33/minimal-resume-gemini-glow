
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDhaF8KIfS0WgzIpKakulaEVfbrx6hOGvk';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateResumeContent = async (prompt: string, userInput?: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const fullPrompt = `
    You are a professional resume writer. Based on the following information, provide suggestions for improving resume content.
    
    Context: ${prompt}
    User Input: ${JSON.stringify(userInput)}
    
    Please provide concise, professional suggestions that are ATS-friendly and impactful. Format your response as actionable advice.
    `;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export const improveBulletPoint = async (bulletPoint: string, jobTitle: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
    Improve this bullet point for a ${jobTitle} position. Make it more impactful, quantified, and ATS-friendly:
    
    "${bulletPoint}"
    
    Return only the improved bullet point, nothing else.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error improving bullet point:', error);
    throw error;
  }
};
