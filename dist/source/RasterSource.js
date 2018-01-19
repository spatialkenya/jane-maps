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
    global.RasterSource = mod.exports;
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

  var RasterSource = function (_React$Component) {
    _inherits(RasterSource, _React$Component);

    function RasterSource() {
      _classCallCheck(this, RasterSource);

      return _possibleConstructorReturn(this, (RasterSource.__proto__ || Object.getPrototypeOf(RasterSource)).apply(this, arguments));
    }

    _createClass(RasterSource, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.map = this.props.map;

        if (this.props.isLoaded && !this.props.source.nocache) {
          return;
        }

        // fetch data if necessary, add layer to map
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
      key: 'addSource',
      value: function addSource() {
        if (this.map.getSource(this.props.source.id)) {
          this.map.removeSource(this.props.source.id);
        }

        this.map.addSource(this.props.source.id, {
          type: 'raster',
          tiles: [this.props.source.tiles],
          tileSize: this.props.source.tileSize
        });

        this.props.onLoaded(this.map.getStyle().sources);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return RasterSource;
  }(_react2.default.Component);

  RasterSource.displayName = 'RasterSource';


  RasterSource.propTypes = {
    map: _propTypes2.default.object.isRequired,
    source: _propTypes2.default.object.isRequired,
    onLoaded: _propTypes2.default.func.isRequired,
    isLoaded: _propTypes2.default.bool,
    nocache: _propTypes2.default.bool
  };

  exports.default = RasterSource;
});