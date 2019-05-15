const inferPropertiesFromInitialStateRecursive = (s, result = []) => {
  if (s && s._root) {
    return inferPropertiesFromInitialStateRecursive(s._root);
  }

  if (s && s[0] && typeof s[0] === 'string') {
    result.push(s[0]);
  }

  if (!s) {
    return result;
  }

  const sNodes = s.nodes;
  if (sNodes && sNodes.forEach) {
    sNodes.forEach(node => {
      const nodeProperties = inferPropertiesFromInitialStateRecursive(node);
      nodeProperties.forEach(property => {
        result.push(property);
      });
    });
  }

  const sEntries = s.entries;
  if (sEntries && sEntries.forEach) {
    sEntries.forEach(entry => {
      const nodeEntries = inferPropertiesFromInitialStateRecursive(entry);
      nodeEntries.forEach(property => {
        result.push(property);
      });
    });
  }

  const sEntry = s.entry;
  if (sEntry) {
    const entryResults = inferPropertiesFromInitialStateRecursive(sEntry);
    entryResults.forEach(entryResult => {
      result.push(entryResult);
    });
  }

  return result;
};

const inferPropertiesFromInitialState = s => {
  if (!s || !s._root) {
    return [];
  }
  return inferPropertiesFromInitialStateRecursive(s._root);
};

const initialState = reducer => reducer(undefined, {});

export { inferPropertiesFromInitialState, initialState };
export default inferPropertiesFromInitialState;
