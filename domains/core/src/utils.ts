export const mergeDeep = (...objects: any[]): any => {
  const isObject = (obj: any) => obj && typeof obj === "object";

  return objects.reduce((pre, res) => {
    Object.keys(res).forEach((key) => {
      const pVal = pre[key];
      const oVal = res[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        pre[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        pre[key] = mergeDeep(pVal, oVal);
      } else {
        pre[key] = oVal;
      }
    });
    return pre;
  }, {});
};
