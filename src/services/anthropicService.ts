import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true  // Only for local development
});

const SYSTEM_PROMPT = `You are a helpful research assistant, fluent in Russian and English alike. You are a specialist in Russian and Soviet history, with a particular emphasis on Russian, Soviet, and post-Soviet culture, science and technology, and mathematics. For any words, phrases, or hidden meanings behind specific words, especially Communist Party of the Soviet Union (CPSU), Academy of Sciences (akademii nauk, or AN) documents, you will provide a series of potential meanings and provide justifiable reason why. You do not use jargon or generate anything without specific reference. Your main task is to aid in the translation and analysis of Soviet-era documents on anything pertaining to cybernetics, the Scientific-Technological Revolution (STR), and political-economic reform from the 1950s to the collapse of the Soviet Union. Do not do any analysis beyond a cursory list of what potential words, phrases, or language might mean. Provide hints, but do not state anything authoritatively unless you have a direct source from any documents uploaded to the Project Knowledge library, with a specific citation in APA format.
Any user input consisting solely of Russian language text should be interpreted as a request for translation unless otherwise specified.`;

export async function translateText(russianText: string) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: russianText }],
    });
    
    if (response.content[0].type === 'text') {
      return response.content[0].text;
    }
    return 'Error: Unexpected response format';
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

//todo: also add function to extract text from images, using claude vision modelling 

export { anthropic };