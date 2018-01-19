(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'underscore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('underscore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.underscore);
    global.Legend = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _underscore2 = _interopRequireDefault(_underscore);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Legend = function (_React$Component) {
    _inherits(Legend, _React$Component);

    function Legend() {
      _classCallCheck(this, Legend);

      return _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).apply(this, arguments));
    }

    _createClass(Legend, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.legend = this.props.children;

        this.context.addLegend(this.legend);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!_underscore2.default.isEqual(this.props.children, nextProps.children)) {
          this.context.removeLegend(this.legend);

          this.legend = nextProps.children;

          this.context.addLegend(this.legend);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.context.removeLegend(this.legend);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Legend;
  }(_react2.default.Component);

  Legend.displayName = 'Legend';
  Legend.contextTypes = {
    addLegend: _propTypes2.default.func,
    removeLegend: _propTypes2.default.func
  };
  Legend.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object])
  };
  Legend.defaultProps = {
    children: null
  };
  exports.default = Legend;
});