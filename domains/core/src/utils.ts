export const mergeDeep = (...objects: any[]): any => {
  const isObject = (object: any) => object && typeof object === "object";

  return objects.reduce((prevObject, currObject) => {
    Object.keys(currObject).forEach((key) => {
      const prevValue = prevObject[key];
      const currValue = currObject[key];
      if (isObject(prevValue) && isObject(currValue)) {
        prevObject[key] = mergeDeep(prevValue, currValue);
      } else {
        prevObject[key] = currValue;
      }
    });
    return prevObject;
  }, {});
};
