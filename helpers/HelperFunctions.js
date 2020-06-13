export default class HelperFunctions {
  static includes(container, value) {
    let returnValue = false;
    const pos = container.indexOf(value);
    if (pos >= 0) {
      returnValue = true;
    }
    return returnValue;
  }
}
