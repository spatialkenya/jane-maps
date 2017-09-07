(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.VectorSource = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  var VectorSource = function (_React$Component) {
    _inherits(VectorSource, _React$Component);

    function VectorSource() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, VectorSource);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VectorSource.__proto__ || Object.getPrototypeOf(VectorSource)).call.apply(_ref, [this].concat(args))), _this), _this.addSource = function () {
        if (_this.map.getSource(_this.props.source.id)) {
          _this.map.removeSource(_this.props.source.id);
        }

        _this.map.addSource(_this.props.source.id, {
          type: 'vector',
          tiles: _this.props.source.tiles
        });

        _this.props.onLoaded(_this.map.getStyle().sources);
      }, _this.updateSource = function (template) {
        var newStyle = _this.map.getStyle();
        newStyle.sources[_this.props.source.id].tiles = [template];
        _this.map.setStyle(newStyle);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(VectorSource, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.map = this.props.map;

        if (this.props.isLoaded && !this.props.source.nocache) {
          return;
        }

        this.addSource();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.source.nocache) {
          this.map.removeSource(this.props.source.id);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return VectorSource;
  }(_react2.default.Component);

  VectorSource.displayName = 'VectorSource';


  VectorSource.propTypes = {
    map: _propTypes2.default.shape({
      mapObject: _propTypes2.default.object
    }).isRequired,
    source: _propTypes2.default.shape({
      tiles: _propTypes2.default.array,
      id: _propTypes2.default.string
    }).isRequired,
    onLoaded: _propTypes2.default.func.isRequired,
    isLoaded: _propTypes2.default.bool,
    nocache: _propTypes2.default.bool
  };

  exports.default = VectorSource;
});