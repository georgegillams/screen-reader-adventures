const pathMatchesTemplate = (splitPath, template) => {
  if (splitPath.length !== template.length) {
    return false;
  }

  const params = {};
  for (let i = 0; i < splitPath.length; i += 1) {
    const splitPathString = splitPath[i];
    const templateString = template[i];
    if (templateString[0] === ':') {
      params[templateString.slice(1)] = splitPathString;
    } else if (splitPathString.toLowerCase() !== templateString.toLowerCase()) {
      return { matches: false, params };
    }
  }

  return { matches: true, params };
};

const mapPathToAction = (apiStructure, splitPath) => {
  const results = [];
  Object.keys(apiStructure).forEach(key => {
    const apiCapability = apiStructure[key];
    const apiCapabilityPathTemplate = apiCapability.path.split('/').slice(1);

    const { matches, params } = pathMatchesTemplate(splitPath, apiCapabilityPathTemplate);
    if (matches) {
      results.push({ apiCapability, params });
    }
  });
  return results;
};

export default mapPathToAction;
export { mapPathToAction };
