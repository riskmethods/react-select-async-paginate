var AVAILABLE_DELTA = 10;

var defaultShouldLoadMore = function defaultShouldLoadMore(scrollHeight, clientHeight, scrollTop) {
  var bottomBorder = scrollHeight - clientHeight - AVAILABLE_DELTA;
  return bottomBorder < scrollTop;
};

export default defaultShouldLoadMore;