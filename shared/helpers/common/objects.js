const formValueChanged = (object, attributeName, event, action, callback = null) => {
  const newValue = JSON.parse(JSON.stringify(object));
  newValue[attributeName] = event.target.value === 'on' ? event.target.checked : event.target.value;
  action(newValue);
  if (callback) {
    callback(newValue);
  }
};

const normaliseArray = ar => {
  const arClone = JSON.parse(JSON.stringify(ar));
  const result = {};
  arClone.forEach((item, index) => {
    let newObjectKey = `${index}`;
    if (item.id) {
      newObjectKey = item.id;
    }
    result[newObjectKey] = arClone[index];
  });
  return result;
};

const denormaliseObject = obj => Object.keys(obj).map(key => obj[key]);

const createDictionary = (data, keyProperty) => {
  const dict = {};
  for (let i = 0; i < data.length; i += 1) {
    const key = data[i][keyProperty];
    if (dict[key]) {
      dict[key].push(data[i]);
    } else {
      dict[key] = [data[i]];
    }
  }
  return dict;
};

const deArrayitise = array => {
  if (array && array.length === 1) {
    return array[0];
  }
  return array;
};

// TODO TEST THIS
const associate = (data, additionalData, dataKey, additionalDataKey, associationName, preventDearrayisation) => {
  const newData = JSON.parse(JSON.stringify(data));

  // Create a dictionary of the additional data
  const additionalDataDictionary = createDictionary(additionalData, additionalDataKey);

  for (let i = 0; i < newData.length; i += 1) {
    const key = newData[i][dataKey];
    if (additionalDataDictionary[key]) {
      const finalValue = preventDearrayisation
        ? additionalDataDictionary[key]
        : deArrayitise(additionalDataDictionary[key]);
      newData[i][associationName] = finalValue;
    }
  }
  return newData;
};

export { formValueChanged, associate, normaliseArray, denormaliseObject };
export default {
  formValueChanged,
  associate,
  normaliseArray,
  denormaliseObject,
};
