const generate = (data, orm, database) => {
  const model = JSON.stringify(data, null, 2);
  const orms = ["Sequelize", "Prisma ORM", "TypeORM "];
  const valid = orms.includes(orm) ? orm : "Prisma ORM";
  const dbs = ["PostgreSQL", "MySQL"];
  const db = dbs.includes(database) ? database : "PostgreSQL";
  let input = `I am working with ${valid},${db} and NodeJS, analize this data schema and`;
  switch (orm) {
    case "Sequelize":
      input += `give the models files, using method define(), DataTypes and associations:\n${model}`;
      break;
    case "TypeORM":
      input += `give the code for entities and ralationships:\n${model}`;
      break;

    default:
      input += `give the code for models for prisma/schema.prisma, includes the relations:\n${model}`;
      break;
  }
  return input;
};

export default generate;
