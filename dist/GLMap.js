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
    global.GLMap = mod.exports;
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

  var GLMap = function (_React$Component) {
    _inherits(GLMap, _React$Component);

    function GLMap() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, GLMap);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GLMap.__proto__ || Object.getPrototypeOf(GLMap)).call.apply(_ref, [this].concat(args))), _this), _this.onMouseMove = function (event) {
        var layers = Object.keys(_this.map.__INTERNAL__hoverLayers);

        if (!layers.length) {
          return;
        }

        var layerFeatures = _this.map.queryRenderedFeatures(event.point, { layers: layers });
        _this.map.getCanvas().style.cursor = layerFeatures && layerFeatures.length > 0 ? 'pointer' : '';
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(GLMap, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.initializeMap();
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return !_underscore2.default.isEqual(this.props, nextProps);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this2 = this;

        // TODO this is a hack to get the GL map to resize to its container after changing the container size.  Need to find a less hacky way to do this
        setTimeout(function () {
          return _this2.map && _this2.map.resize();
        }, 500);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.map.off('mousemove', this.onMouseMove);
      }
    }, {
      key: 'initializeMap',
      value: function initializeMap() {
        var _this3 = this;

        mapboxgl.accessToken = this.props.mapbox_accessToken;

        this.map = new mapboxgl.Map({
          container: this.container,
          style: this.props.mapStyle,
          zoom: this.props.zoom,
          minZoom: this.props.minZoom,
          center: this.props.center,
          pitch: this.props.pitch,
          hash: this.props.hash
        });

        this.map.__INTERNAL__hoverLayers = [];

        this.map.once('load', function () {
          return _this3.props.onLoad(_this3.map.getStyle());
        });
        this.map.on('mousemove', this.onMouseMove);

        if (this.props.navigationControl) this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        return _react2.default.createElement('div', { className: 'gl-map', ref: function ref(node) {
            _this4.container = node;
          } });
      }
    }]);

    return GLMap;
  }(_react2.default.Component);

  GLMap.displayName = 'GLMap';


  GLMap.propTypes = {
    mapbox_accessToken: _propTypes2.default.string.isRequired,
    mapStyle: _propTypes2.default.string.isRequired,
    zoom: _propTypes2.default.number.isRequired,
    minZoom: _propTypes2.default.number,
    center: _propTypes2.default.array.isRequired,
    pitch: _propTypes2.default.number,
    hash: _propTypes2.default.bool,
    navigationControl: _propTypes2.default.bool.isRequired
  };

  GLMap.defaultProps = {
    mapStyle: 'mapbox://styles/mapbox/light-v9',
    center: [0, 0],
    zoom: 2,
    minZoom: null,
    maxZoom: null,
    pitch: 0,
    hash: false,
    navigationControl: true,
    navigationControlPosition: 'top-right'
  };

  exports.default = GLMap;
});