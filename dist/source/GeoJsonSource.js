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
    global.GeoJsonSource = mod.exports;
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

  var GeoJsonSource = function (_React$Component) {
    _inherits(GeoJsonSource, _React$Component);

    function GeoJsonSource() {
      _classCallCheck(this, GeoJsonSource);

      return _possibleConstructorReturn(this, (GeoJsonSource.__proto__ || Object.getPrototypeOf(GeoJsonSource)).apply(this, arguments));
    }

    _createClass(GeoJsonSource, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.map = this.props.map;

        if (this.props.isLoaded && !this.props.source.nocache) {
          return;
        }

        // fetch data if necessary, add layer to map
        if (!this.props.source.data) {
          this.fetchData();
        } else {
          this.data = this.props.source.data;
          this.addSource();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // compare sql
        if (!(nextProps.source.data === this.props.source.data)) {
          this.data = nextProps.source.data;
          this.map.getSource(this.props.source.id).setData(this.data);
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
        var self = this;

        $.getJSON(this.props.source.source). // eslint-disable-line no-undef
        then(function (data) {
          self.data = data;
          self.addSource();
        });
      }
    }, {
      key: 'addSource',
      value: function addSource() {
        this.map.addSource(this.props.source.id, {
          type: 'geojson',
          data: this.data,
          cluster: this.props.source.cluster || false,
          clusterMaxZoom: this.props.source.clusterMaxZoom || 50,
          clusterRadius: this.props.source.clusterRadius || 50
        });

        this.props.onLoaded(this.map.getStyle().sources);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return GeoJsonSource;
  }(_react2.default.Component);

  GeoJsonSource.displayName = 'GeoJsonSource';


  GeoJsonSource.propTypes = {
    map: _propTypes2.default.object.isRequired,
    source: _propTypes2.default.object.isRequired,
    onLoaded: _propTypes2.default.func.isRequired,
    isLoaded: _propTypes2.default.bool,
    nocache: _propTypes2.default.bool
  };

  exports.default = GeoJsonSource;
});