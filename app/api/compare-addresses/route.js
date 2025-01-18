import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini AI with error handling
const initializeAI = () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not configured');
  }
  return new GoogleGenerativeAI(apiKey);
};

export async function POST(request) {
  try {
    // Initialize AI with error handling
    const genAI = initializeAI();
    
    const { address1, address2 } = await request.json();

    if (!address1 || !address2) {
      return NextResponse.json(
        { error: 'Both addresses are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Compare these two addresses and determine if they refer to the same location. Return a JSON object with the following structure:

    Given addresses to compare:
    Address 1: "${address1}"
    Address 2: "${address2}"

    Rules:
    1. First validate that both inputs appear to be actual addresses and not random text
    2. Compare the addresses and determine if they refer to the same physical location
    3. Return ONLY a JSON object with this exact structure:
    {
      "match": boolean,
      "confidenceLevel": number between 0 and 1,
      "explanation": string explaining your reasoning
    }

    Do not include any markdown, code blocks, or other formatting. Return only the JSON object.`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    try {
      // Clean up the response text
      text = text.replace(/```json\n?|\n?```/g, '').trim();
      
      // Parse and validate the response
      const parsedResponse = JSON.parse(text);
      
      if (typeof parsedResponse.match !== 'boolean' || 
          typeof parsedResponse.confidenceLevel !== 'number' ||
          typeof parsedResponse.explanation !== 'string') {
        throw new Error('Invalid response format');
      }
      
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', text);
      return NextResponse.json({
        match: false,
        confidenceLevel: 0,
        explanation: 'Error processing the comparison'
      }, { status: 500 });
    }
  } catch (error) {
    // Improved error handling
    console.error('Error:', error.message);
    
    if (error.message === 'GOOGLE_API_KEY is not configured') {
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to compare addresses' },
      { status: 500 }
    );
  }
} 