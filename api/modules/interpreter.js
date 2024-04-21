const interpreter = (data, model) => {
  const fieldsByModel = {};
  for (let key in data) {
    if (
      typeof data[key] === "object" &&
      data[key] !== null &&
      !Array.isArray(data[key])
    ) {
      // Si el objeto tiene una propiedad 'model', usarla como modelo
      let childModel = "address"; // Asumimos que el modelo de los campos anidados es 'address'
      // Recursivamente interpretar los campos del objeto anidado
      const childFields = interpreter(data[key], childModel);
      // Agregar los campos al modelo correspondiente
      if (!fieldsByModel[model]) {
        fieldsByModel[model] = [];
      }
      fieldsByModel[model].push({
        name: key,
        type: "object",
        model: model,
      });
      // Agregar los campos del objeto anidado al modelo correspondiente
      if (childFields[childModel]) {
        fieldsByModel[childModel] = childFields[childModel];
      }
    } else {
      // Agregar el campo al modelo correspondiente
      if (!fieldsByModel[model]) {
        fieldsByModel[model] = [];
      }
      fieldsByModel[model].push({
        name: key,
        type: typeof data[key],
        model: model,
      });
    }
  }
  return fieldsByModel;
};
export default interpreter;
