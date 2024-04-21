import { textGeneration } from "@huggingface/inference";
import "dotenv/config";

const parser = async (model, db = "PostgreSQL") => {
  const input = `I am working with Prisma ORM and PostgreSQL, need to transform this data schema, give me only models for the file prisma/schema.prisma:\n${model}`;
  try {
    return await textGeneration({
      accessToken: process.env.H_TOKEN,
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      inputs: input,
      parameters: {
        max_new_tokens: 250,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default parser;
