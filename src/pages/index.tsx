import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-XJN97vrQoAR1oDtfBsh8W4p5",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Home: React.FC = () => {
  const [generatedText, setGeneratedText] = useState<string>("");

  const generateText = async () => {
    try {
      const response = await openai.createCompletion({
        engine: "davinci",
        prompt: "Once upon a time", 
        max_tokens: 50,
      });

      setGeneratedText(response.choices[0].text);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  return (
    <div>
      <h1>OpenAI Integration with Next.js</h1>
      <button onClick={generateText}>Generate Text</button>
      <p>{generatedText}</p>
    </div>
  );
};

export default Home;
