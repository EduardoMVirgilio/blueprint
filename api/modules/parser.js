import { textGeneration } from "@huggingface/inference";
import "dotenv/config";

const parser = async (model, db = "PostgreSQL") => {
  const input = `Transforms this data schema to a model for the Prisma ORM compatible prisma/schema.prisma.prisma file and ${db}:\n ${model} `;
  try {
    return await textGeneration({
      accessToken: process.env.H_TOKEN,
      model: "codellama/CodeLlama-7b-hf",
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
