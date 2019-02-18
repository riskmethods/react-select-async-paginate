import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export var CHECK_TIMEOUT = 300;
export default function wrapMenuList(MenuList) {
  var WrappedMenuList =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WrappedMenuList, _Component);

    function WrappedMenuList() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WrappedMenuList);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WrappedMenuList)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "innerRef", function (ref) {
        if (ref === _this.menuListRef) {
          return;
        }

        var innerRef = _this.props.innerRef;
        _this.menuListRef = ref;
        innerRef(ref);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setCheckAndHandleTimeount", function () {
        _this.checkAndHandle();

        _this.checkTimeout = setTimeout(_this.setCheckAndHandleTimeount, CHECK_TIMEOUT);
      });

      return _this;
    }

    _createClass(WrappedMenuList, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setCheckAndHandleTimeount();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.checkTimeout) {
          clearTimeout(this.checkTimeout);
        }
      }
    }, {
      key: "checkAndHandle",
      value: function checkAndHandle() {
        if (this.shouldHandle()) {
          var handleScrolledToBottom = this.props.selectProps.handleScrolledToBottom;

          if (handleScrolledToBottom) {
            handleScrolledToBottom();
          }
        }
      }
    }, {
      key: "shouldHandle",
      value: function shouldHandle() {
        var el = this.menuListRef; // menu not rendered

        if (!el) {
          return false;
        }

        var scrollTop = el.scrollTop,
            scrollHeight = el.scrollHeight,
            clientHeight = el.clientHeight; // menu hasn't scroll

        if (scrollHeight <= clientHeight) {
          return true;
        }

        var shouldLoadMore = this.props.selectProps.shouldLoadMore;
        return shouldLoadMore(scrollHeight, clientHeight, scrollTop);
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(MenuList, _extends({}, this.props, {
          innerRef: this.innerRef
        }));
      }
    }]);

    return WrappedMenuList;
  }(Component);

  _defineProperty(WrappedMenuList, "propTypes", {
    innerRef: PropTypes.func.isRequired,
    selectProps: PropTypes.shape({
      handleScrolledToBottom: PropTypes.func.isRequired,
      shouldLoadMore: PropTypes.func.isRequired
    }).isRequired
  });

  return WrappedMenuList;
}