import { textGeneration } from "@huggingface/inference";
import "dotenv/config";

const parser = async (model, db = "PostgreSQL") => {
  const { generated_text } = await textGeneration({
    accessToken: process.env.H_TOKEN,
    model: "deepseek-ai/deepseek-coder-1.3b-instruct",
    inputs: `Transforma este esquema de datos a un modelo para el archivo prisma/schema.prisma de Prisma ORM compatible con ${db}: ${model} `,
    parameters: {
      max_new_tokens: 250,
    },
  });
  return generated_text;
};

export default parser;
