import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || ""
});
const openai = new OpenAIApi(configuration);
async function runComplention(message) {
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: message,
    max_tokens: 1400
  });
  return completion.data.choices[0].text;
}

const client = new Client({});
const start = () => {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
  client.on("ready", () => {
    console.log("Client is ready!");
  });
  client.on("message", (message) => {
    console.log(message.body);
    if (message.body.startsWith("#")) {
      runComplention(message.body.substring(1)).then((result) => message.reply(result));
    }
  });
  client.initialize();
};

const main = async () => {
  start();
};
main();
