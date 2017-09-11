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
    global.Marker = mod.exports;
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

  var Marker = function (_React$Component) {
    _inherits(Marker, _React$Component);

    function Marker() {
      _classCallCheck(this, Marker);

      return _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).apply(this, arguments));
    }

    _createClass(Marker, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var el = document.createElement('div');
        el.className = 'marker';
        // TODO entire marker should be config-driven
        // url reference breaks depending on how the site is hosted
        // so for now just reference the marker image on the production domain
        el.style.backgroundImage = 'url(//capitalplanning.nyc.gov/img/orange-marker.png)';
        el.style.width = '32px';
        el.style.height = '32px';

        this.marker = new mapboxgl.Marker(el, { // eslint-disable-line no-undef
          offset: [-16, -32]
        });

        this.label = new mapboxgl.Popup({ // eslint-disable-line no-undef
          offset: [6, 0],
          anchor: 'left',
          closeButton: false,
          closeOnClick: false
        });

        var _props = this.props,
            feature = _props.feature,
            label = _props.label;


        this.updateMarker(feature, label);
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        if (!_underscore2.default.isEqual(nextProps.feature, this.props.feature)) {
          this.updateMarker(nextProps.feature, nextProps.label);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.marker.remove();
        this.label.remove();
      }
    }, {
      key: 'updateMarker',
      value: function updateMarker(feature, label) {
        var map = this.props.map;


        this.marker.setLngLat(feature.geometry.coordinates).addTo(map);

        this.label.setLngLat(feature.geometry.coordinates).setHTML('<p>' + label + '</p>').addTo(map);

        if (this.props.flyTo) {
          map.flyTo({
            center: feature.geometry.coordinates,
            zoom: this.props.zoom
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Marker;
  }(_react2.default.Component);

  Marker.displayName = 'Marker';


  Marker.propTypes = {
    flyTo: _propTypes2.default.bool,
    feature: _propTypes2.default.object.isRequired,
    map: _propTypes2.default.object,
    label: _propTypes2.default.string.isRequired,
    zoom: _propTypes2.default.number
  };

  Marker.defaultProps = {
    flyTo: false,
    map: {},
    zoom: 15
  };

  exports.default = Marker;
});