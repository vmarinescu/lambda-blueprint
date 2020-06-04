export const mergeDeep = (...objects: any[]): any => {
  const isObject = (obj: any) => obj && typeof obj === "object";

  return objects.reduce((pre, cur) => {
    Object.keys(cur).forEach((key) => {
      const pVal = pre[key];
      const cVal = cur[key];
      if (Array.isArray(pVal) && Array.isArray(cVal)) {
        pre[key] = pVal.concat(...cVal);
      } else if (isObject(pVal) && isObject(cVal)) {
        pre[key] = mergeDeep(pVal, cVal);
      } else {
        pre[key] = cVal;
      }
    });
    return pre;
  }, {});
};
