import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003", // text-ada-001 or text-davinci-003
    prompt: generatePrompt(req.body.animal),
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

//image
// export default async function (req, res) {
//   const completion = await openai.createImage({
//     prompt: generatePromptImage(req.body.animal),
//     n: 1,
//     size: "256x256",
//   });
//   console.log(completion.data.data[0].url);
//   res.status(200).json({ result: completion.data.data[0].url });
// }

function generatePrompt(animal) {
  return `Write a passionate, considerate, solution-oritented and helpful response to this bad review I got from Håkon on Etsy: ${animal}`;
}
function generatePromptImage(animal) {
  return `${animal}`;
}
