(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './GeoJsonSource', './VectorSource', './CartoVectorSource', './RasterSource', './CartoRasterSource'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./GeoJsonSource'), require('./VectorSource'), require('./CartoVectorSource'), require('./RasterSource'), require('./CartoRasterSource'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.GeoJsonSource, global.VectorSource, global.CartoVectorSource, global.RasterSource, global.CartoRasterSource);
    global.Source = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _GeoJsonSource, _VectorSource, _CartoVectorSource, _RasterSource, _CartoRasterSource) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _GeoJsonSource2 = _interopRequireDefault(_GeoJsonSource);

  var _VectorSource2 = _interopRequireDefault(_VectorSource);

  var _CartoVectorSource2 = _interopRequireDefault(_CartoVectorSource);

  var _RasterSource2 = _interopRequireDefault(_RasterSource);

  var _CartoRasterSource2 = _interopRequireDefault(_CartoRasterSource);

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

  var Source = function (_React$Component) {
    _inherits(Source, _React$Component);

    function Source() {
      _classCallCheck(this, Source);

      return _possibleConstructorReturn(this, (Source.__proto__ || Object.getPrototypeOf(Source)).apply(this, arguments));
    }

    _createClass(Source, [{
      key: 'render',
      value: function render() {
        var source = this.props;
        var onLoaded = this.props.onSourceLoaded;
        var map = this.props.map;
        var isLoaded = !!this.context.loadedSources[this.props.id];

        if (source.type === 'geojson') return _react2.default.createElement(_GeoJsonSource2.default, { map: map, source: source, onLoaded: onLoaded, isLoaded: isLoaded });
        if (source.type === 'vector') return _react2.default.createElement(_VectorSource2.default, { map: map, source: source, onLoaded: onLoaded, isLoaded: isLoaded });
        if (source.type === 'cartovector' && source.options) return _react2.default.createElement(_CartoVectorSource2.default, { map: map, source: source, onLoaded: onLoaded, isLoaded: isLoaded });
        if (source.type === 'raster') return _react2.default.createElement(_RasterSource2.default, { map: map, source: source, onLoaded: onLoaded, isLoaded: isLoaded });
        if (source.type === 'cartoraster') return _react2.default.createElement(_CartoRasterSource2.default, { map: map, source: source, onLoaded: onLoaded, isLoaded: isLoaded });

        return null;
      }
    }]);

    return Source;
  }(_react2.default.Component);

  Source.displayName = 'Source';


  Source.contextTypes = {
    loadedSources: _propTypes2.default.object
  };

  Source.propTypes = {
    id: _propTypes2.default.string.isRequired,
    map: _propTypes2.default.object,
    onSourceLoaded: _propTypes2.default.func,
    nocache: _propTypes2.default.bool
  };

  Source.defaultProps = {
    map: null,
    onSourceLoaded: null,
    nocache: false
  };

  exports.default = Source;
});