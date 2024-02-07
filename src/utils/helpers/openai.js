import OpenAI from "openai";

const openAiInstance = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default openAiInstance;
