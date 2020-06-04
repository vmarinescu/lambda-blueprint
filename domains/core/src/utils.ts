export const mergeDeep = (...objects: any[]): any => {
  const isObject = (objc: any) => objc && typeof objc === "object";

  return objects.reduce((prev, objc) => {
    Object.keys(objc).forEach((key) => {
      const pVal = prev[key];
      const oVal = objc[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
};
