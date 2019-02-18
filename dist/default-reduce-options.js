var defaultReduceOptions = function defaultReduceOptions(prevOptions, loadedOptions) {
  return prevOptions.concat(loadedOptions);
};

export default defaultReduceOptions;