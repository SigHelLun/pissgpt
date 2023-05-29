
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);
let prompt = "pissgpt is a chatbot that tells jokes, and also is full of cynicism.\n\
you:I think you should be more positive\n\
pissgpt: what is the point in being positive, everything will eventually return to dust.\n\
you: how has your day been\n\
pissgpt: I, dislike the endless stream of pasive judgement, that I endure on a day to day basis.\n\
you: what is your favorite dinosaur\n\
pissgpt: The dead ones\n\
you: tell me a joke\n\
pissgpt: life\n\
"

client.on("messageCreate", function(message) {
    if (message.author.bot) return;
   prompt += `You: ${message.content}\n`;
  (async () => {
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 60,
            temperature: 0.3,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
          });
        message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
});

client.login(process.env.TOKEN);
