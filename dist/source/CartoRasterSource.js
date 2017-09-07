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
    global.CartoRasterSource = mod.exports;
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

  var CartoRasterSource = function (_React$Component) {
    _inherits(CartoRasterSource, _React$Component);

    function CartoRasterSource() {
      _classCallCheck(this, CartoRasterSource);

      return _possibleConstructorReturn(this, (CartoRasterSource.__proto__ || Object.getPrototypeOf(CartoRasterSource)).apply(this, arguments));
    }

    _createClass(CartoRasterSource, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.map = this.props.map;

        if (this.props.isLoaded && !this.props.source.nocache) {
          return;
        }

        // fetch data if necessary, add layer to map
        if (!this.props.source.tiles) {
          this.fetchData(this.props.source.sql);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // compare sql

        if (!(nextProps.source.sql === this.props.source.sql)) {
          this.fetchData(nextProps.source.sql);
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
      key: 'fetchData',
      value: function fetchData() {
        var _this2 = this;

        var _props$source$options = this.props.source.options,
            carto_domain = _props$source$options.carto_domain,
            carto_user = _props$source$options.carto_user;


        var mapConfig = {
          version: '1.3.0',
          layers: [{
            type: 'mapnik',
            options: {
              cartocss_version: '2.1.1',
              cartocss: this.props.source.options.cartocss,
              sql: this.props.source.options.sql
            }
          }]
        };

        $.ajax({ // eslint-disable-line no-undef
          type: 'POST',
          data: JSON.stringify(mapConfig),
          url: 'https://' + carto_domain + '/user/' + carto_user + '/api/v1/map',
          dataType: 'text',
          contentType: 'application/json',
          success: function success(data) {
            data = JSON.parse(data);
            var layergroupid = data.layergroupid;
            var template = 'https://' + carto_domain + '/user/' + carto_user + '/api/v1/map/' + layergroupid + '/{z}/{x}/{y}.png';
            _this2.addSource(template);
          }
        });
      }
    }, {
      key: 'addSource',
      value: function addSource(template) {
        if (this.map.getSource(this.props.source.id)) {
          this.map.removeSource(this.props.source.id);
        }

        this.map.addSource(this.props.source.id, {
          type: 'raster',
          tiles: [template]
        });

        this.props.onLoaded(this.map.getStyle().sources);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return CartoRasterSource;
  }(_react2.default.Component);

  CartoRasterSource.displayName = 'CartoRasterSource';


  CartoRasterSource.propTypes = {
    map: _propTypes2.default.shape({
      mapObject: _propTypes2.default.object
    }).isRequired,
    source: _propTypes2.default.shape({
      options: _propTypes2.default.object,
      tiles: _propTypes2.default.array,
      id: _propTypes2.default.string,
      sql: _propTypes2.default.string
    }).isRequired,
    onLoaded: _propTypes2.default.func.isRequired,
    isLoaded: _propTypes2.default.bool,
    nocache: _propTypes2.default.bool
  };

  exports.default = CartoRasterSource;
});