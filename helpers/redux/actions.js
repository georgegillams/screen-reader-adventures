import camelCase from 'lodash/camelCase';

const defineAction = (name, attributes) => (...args) => {
  const result = {
    type: name,
  };
  for (let i = 0; i < attributes.length; i += 1) {
    const attributeName = attributes[i];
    result[attributeName] = args[i];
  }
  return result;
};

const defineActions = actionDefinitions => {
  const result = {};

  for (let i = 0; i < actionDefinitions.length; i += 1) {
    let name = Object.keys(actionDefinitions[i])[0];
    const actionName = actionDefinitions[i][name];
    const action = defineAction(actionName, actionDefinitions[i].attributes);
    name = camelCase(name);
    result[name] = action;
  }

  return result;
};

const mapActions = (dispatch, actions) => {
  const result = {};
  const actionNames = Object.keys(actions);

  for (let i = 0; i < actionNames.length; i += 1) {
    const actionName = actionNames[i];
    const action = actions[actionName];
    result[actionName] = (...args) => dispatch(action(...args));
  }

  return result;
};

const populateConstants = (defs, constants) => {
  const result = [];
  for (let i = 0; i < defs.length; i += 1) {
    const newDef = JSON.parse(JSON.stringify(defs[i]));
    const newDefId = Object.keys(newDef)[0];
    newDef[newDefId] = constants[newDefId];
    result.push(newDef);
  }
  return result;
};

export { populateConstants, mapActions, defineAction, defineActions };
export default defineActions;
