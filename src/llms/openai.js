const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

async function runComplention (message) {
    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: message,
        max_tokens: 1400,
    });
    return completion.data.choices[0].text;
}

module.exports = {
    runComplention
}
