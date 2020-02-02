// Taken from https://medium.com/@bluepnume/functional-ish-javascript-205c05d0ed08
const memoize = func => {
  const results = {};

  return (...args) => {
    const serializedArgs = JSON.stringify(args);

    if (results.hasOwnProperty(serializedArgs)) {
      return results[serializedArgs];
    }

    const result = func(...args);
    results[serializedArgs] = result;

    return result;
  };
};

export { memoize };
