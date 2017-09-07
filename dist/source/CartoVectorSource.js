(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../Carto'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../Carto'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.Carto);
    global.CartoVectorSource = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Carto2 = _interopRequireDefault(_Carto);

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

  var CartoVectorSource = function (_React$Component) {
    _inherits(CartoVectorSource, _React$Component);

    function CartoVectorSource() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, CartoVectorSource);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CartoVectorSource.__proto__ || Object.getPrototypeOf(CartoVectorSource)).call.apply(_ref, [this].concat(args))), _this), _this.fetchData = function (sqlArray, cb) {
        var mapConfig = {
          version: '1.3.0',
          layers: []
        };

        sqlArray.forEach(function (sql) {
          mapConfig.layers.push({
            type: 'mapnik',
            options: {
              cartocss_version: '2.1.1',
              cartocss: '#layer { polygon-fill: #FFF; }',
              sql: sql
            }
          });
        });

        _Carto2.default.getVectorTileTemplate(mapConfig, _this.props.source.options).then(function (template) {
          cb(template);
        });
      }, _this.addSource = function (template) {
        if (_this.map.getSource(_this.props.source.id)) {
          _this.map.removeSource(_this.props.source.id);
        }

        _this.map.addSource(_this.props.source.id, {
          type: 'vector',
          tiles: [template]
        });

        _this.props.onLoaded(_this.map.getStyle().sources);
      }, _this.updateSource = function (template) {
        var newStyle = _this.map.getStyle();
        newStyle.sources[_this.props.source.id].tiles = [template];
        _this.map.setStyle(newStyle);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CartoVectorSource, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.map = this.props.map;

        if (this.props.isLoaded) {
          return;
        }

        // fetch data if necessary, add layer to map
        if (!this.props.source.tiles) {
          this.fetchData(this.props.source.options.sql, this.addSource);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // compare sql
        if (!(nextProps.source.options.sql === this.props.source.options.sql)) {
          this.fetchData(nextProps.source.options.sql, this.updateSource);
        }
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

    return CartoVectorSource;
  }(_react2.default.Component);

  CartoVectorSource.displayName = 'CartoVectorSource';


  CartoVectorSource.propTypes = {
    map: _propTypes2.default.shape({
      mapObject: _propTypes2.default.object
    }).isRequired,
    source: _propTypes2.default.shape({
      options: _propTypes2.default.object,
      tiles: _propTypes2.default.array,
      id: _propTypes2.default.string
    }).isRequired,
    onLoaded: _propTypes2.default.func.isRequired,
    isLoaded: _propTypes2.default.bool,
    nocache: _propTypes2.default.bool
  };

  exports.default = CartoVectorSource;
});