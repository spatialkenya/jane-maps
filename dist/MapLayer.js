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
    global.MapLayer = mod.exports;
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

  var LAYER_TYPES = ['fill', 'line', 'symbol', 'circle', 'fill-extrusion', 'raster', 'background'];

  var MapLayer = function (_React$Component) {
    _inherits(MapLayer, _React$Component);

    function MapLayer() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, MapLayer);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MapLayer.__proto__ || Object.getPrototypeOf(MapLayer)).call.apply(_ref, [this].concat(args))), _this), _this.redrawLayer = function (props) {
        if (!_this.layerExists()) {
          return;
        }

        _this.removeLayer();
        _this.addLayer(props || _this.props);
      }, _this.onClick = function (event) {
        var features = _this.props.map.queryRenderedFeatures(event.point, { layers: [_this.props.id] });
        var uniqueFeatures = _underscore2.default.uniq(features, function (feature) {
          return feature.id;
        });

        if (uniqueFeatures.length > 0) {
          _this.props.onClick(uniqueFeatures, _this.props.map);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MapLayer, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.props.janeLayerId) {
          console.error('<MapLayer /> has to be a direct child of <JaneLayer />. Check layer with id ' + this.props.id);
        }

        this.props.registerRedrawCallback(this.redrawLayer);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.addLayer(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!_underscore2.default.isEqual(this.props, nextProps)) {
          this.redrawLayer(nextProps);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeLayer();
      }
    }, {
      key: 'layerExists',
      value: function layerExists() {
        return !!this.props.map.getLayer(this.props.id);
      }
    }, {
      key: 'addLayer',
      value: function addLayer(props) {
        if (this.layerExists()) {
          return;
        }

        var config = _underscore2.default.pick(props, 'id', 'type', 'metadata', 'ref', 'source', 'sourceLayer', 'minzoom', 'maxzoom', 'filter', 'layout', 'paint');

        if (config.sourceLayer) {
          config['source-layer'] = config.sourceLayer;
          delete config.sourceLayer;
        }

        this.props.map.addLayer(config, props.previousMapLayer);

        if (this.props.onClick) {
          this.props.map.__INTERNAL__hoverLayers[this.props.id] = true;
          this.props.map.on('click', this.onClick);
        }
      }
    }, {
      key: 'removeLayer',
      value: function removeLayer() {
        if (!this.layerExists()) {
          return;
        }

        this.props.map.removeLayer(this.props.id);

        if (this.props.onClick) {
          delete this.props.map.__INTERNAL__hoverLayers[this.props.id];
          this.props.map.off('click', this.onClick);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return MapLayer;
  }(_react2.default.Component);

  MapLayer.displayName = 'MapLayer';


  MapLayer.propTypes = {
    map: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.oneOf(LAYER_TYPES),
    metadata: _propTypes2.default.object,
    ref: _propTypes2.default.string,
    source: _propTypes2.default.string,
    sourceLayer: _propTypes2.default.string,
    minzoom: _propTypes2.default.number,
    maxzoom: _propTypes2.default.number,
    filter: _propTypes2.default.array,
    layout: _propTypes2.default.object,
    paint: _propTypes2.default.object,
    janeLayerId: _propTypes2.default.string,
    previousMapLayer: _propTypes2.default.string,
    order: _propTypes2.default.number,
    onClick: _propTypes2.default.func,
    registerRedrawCallback: _propTypes2.default.func.isRequired
  };

  MapLayer.defaultProps = {
    map: {},
    registerRedrawCallback: function registerRedrawCallback() {
      return null;
    },
    previousMapLayer: null,
    janeLayerId: null
  };

  exports.default = MapLayer;
});