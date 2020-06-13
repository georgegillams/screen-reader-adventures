const inferPropertiesFromInitialStateRecursive = (s, result = []) => {
  /* eslint-disable no-underscore-dangle */
  if (s && s._root) {
    return inferPropertiesFromInitialStateRecursive(s._root);
  }
  /* eslint-enable */

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
  /* eslint-disable no-underscore-dangle */
  if (!s || !s._root) {
    return [];
  }
  return inferPropertiesFromInitialStateRecursive(s._root);
  /* eslint-enable */
};

const getInitialState = reducer => reducer(undefined, {});

// TODO Write tests for this:
const createInitialState = actionDefinitions => {
  const initialStateObj = {};
  actionDefinitions.forEach(aD => {
    if (!aD.stateMutations) {
      return;
    }
    Object.keys(aD.stateMutations).forEach(k => {
      initialStateObj[k] = null;
    });
  });
  return initialStateObj;
};

// TODO Write tests for this:
const createAppReducer = (actionDefinitions, constants, initialState) => {
  function appReducerFunc(state = initialState, action) {
    // Work out which actionDefinition the `action.type` refers to.
    let actionDefinition = null;
    Object.keys(constants).forEach(constantKey => {
      const constantValue = constants[constantKey];
      if (constantValue === action.type) {
        actionDefinitions.forEach(aD => {
          if (Object.keys(aD)[0] === constantKey) {
            actionDefinition = aD;
          }
        });
      }
    });

    // For each stateMutator on the actionDefinition, call `state.set(...)`
    if (actionDefinition && actionDefinition.stateMutations) {
      const { stateMutations } = actionDefinition;
      Object.keys(stateMutations).forEach(smKey => {
        let newValue = stateMutations[smKey];
        if (typeof newValue === 'function') {
          newValue = newValue(action, state.get(smKey));
        }
        // eslint-disable-next-line no-param-reassign
        state = state.set(smKey, newValue);
      });
    }

    // Return state
    return state;
  }
  return appReducerFunc;
};

export {
  inferPropertiesFromInitialState,
  getInitialState,
  createInitialState,
  createAppReducer,
};
export default inferPropertiesFromInitialState;
