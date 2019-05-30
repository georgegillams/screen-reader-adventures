const generateLevelDefinition = levelRepresentation => {
  const result = [];

  levelRepresentation.forEach((row, r) => {
    result.push([]);
    row.forEach((spaceRepresentation, s) => {
      result[r].push({
        x: r,
        y: s,
        type: spaceRepresentation,
      });
    });
  });

  return result;
};

export { generateLevelDefinition };
export default {
  generateLevelDefinition,
};
