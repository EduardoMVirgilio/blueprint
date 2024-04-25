import { textGeneration } from "@huggingface/inference";
import "dotenv/config";

const parser = async (prompt) => {
  try {
    return await textGeneration({
      accessToken: process.env.H_TOKEN,
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        return_full_text: false,
        decoder_input_details: false,
        details: false,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default parser;
