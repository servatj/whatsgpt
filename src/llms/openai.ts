import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
   
const openai = new OpenAIApi(configuration);

export async function runComplention (message: string) {
    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: message,
        max_tokens: 1400,
    });
    return completion.data.choices[0].text;
}
