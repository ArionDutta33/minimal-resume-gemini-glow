
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

export const generateProfessionalSummary = async (personalInfo: any, experience: any[], skills: any[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
    Generate a professional summary for a resume based on this information:
    
    Name: ${personalInfo.fullName}
    Experience: ${experience.map(exp => `${exp.position} at ${exp.company}`).join(', ')}
    Skills: ${skills.map(skill => skill.name).join(', ')}
    
    Write a compelling 2-3 sentence professional summary that highlights key strengths and career focus. Make it ATS-friendly and impactful.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

export const analyzeJobDescription = async (jobDescription: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
    Analyze this job description and extract key information:
    
    "${jobDescription}"
    
    Please provide:
    1. Top 5 required skills
    2. Top 5 keywords to include in resume
    3. Suggested improvements for resume alignment
    
    Format as JSON with keys: requiredSkills, keywords, suggestions
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error analyzing job description:', error);
    throw error;
  }
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
    For a ${jobTitle} position, suggest 5 relevant skills that are not already in this list:
    Current skills: ${currentSkills.join(', ')}
    
    Return only a comma-separated list of skill names, nothing else.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim().split(',').map(skill => skill.trim());
  } catch (error) {
    console.error('Error suggesting skills:', error);
    throw error;
  }
};

export const optimizeResume = async (resumeData: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
    Review this resume and provide optimization suggestions:
    
    ${JSON.stringify(resumeData)}
    
    Provide 3-5 specific, actionable suggestions to improve the resume's effectiveness and ATS compatibility.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw error;
  }
};
