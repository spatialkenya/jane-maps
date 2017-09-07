(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'react', 'prop-types', 'react-autosuggest'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('react'), require('prop-types'), require('react-autosuggest'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.react, global.propTypes, global.reactAutosuggest);
    global.MapzenGeocoder = mod.exports;
  }
})(this, function (module, _react, _propTypes, _reactAutosuggest) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

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

  function getSuggestionValue(suggestion) {
    return suggestion.properties.label;
  }

  function renderSuggestion(suggestion) {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
      _react2.default.createElement(
        'span',
        null,
        suggestion.properties.label
      )
    );
  }

  function shouldRenderSuggestions(value) {
    return value.trim().length > 2;
  }

  var MapzenGeocoder = function (_React$Component) {
    _inherits(MapzenGeocoder, _React$Component);

    function MapzenGeocoder() {
      _classCallCheck(this, MapzenGeocoder);

      return _possibleConstructorReturn(this, (MapzenGeocoder.__proto__ || Object.getPrototypeOf(MapzenGeocoder)).apply(this, arguments));
    }

    _createClass(MapzenGeocoder, [{
      key: 'getInitialState',
      value: function getInitialState() {
        return {
          value: '',
          suggestions: []
        };
      }
    }, {
      key: 'onSuggestionsFetchRequested',
      value: function onSuggestionsFetchRequested(_ref) {
        var value = _ref.value;

        var self = this;

        var apiCall = 'https://search.mapzen.com/v1/autocomplete?text=' + value + '&boundary.rect.min_lon=' + this.props.bounds.minLon + '&boundary.rect.max_lon=' + this.props.bounds.maxLon + '&boundary.rect.min_lat=' + this.props.bounds.minLat + '&boundary.rect.max_lat=' + this.props.bounds.maxLat + '&api_key=' + this.props.mapzen_api_key;

        $.getJSON(apiCall, function (data) {
          // eslint-disable-line no-undef
          self.setState({
            suggestions: data.features
          });
        });
      }
    }, {
      key: 'onSuggestionsClearRequested',
      value: function onSuggestionsClearRequested() {
        this.setState({
          suggestions: []
        });
      }
    }, {
      key: 'onChange',
      value: function onChange(e, obj) {
        this.setState({
          value: obj.newValue
        });
      }
    }, {
      key: 'onSuggestionSelected',
      value: function onSuggestionSelected(e, o) {
        this.setState({
          value: o.suggestionValue
        });

        this.props.onSelection(o.suggestion);
      }
    }, {
      key: 'render',
      value: function render() {
        var inputProps = {
          placeholder: 'Search for an address',
          value: this.state.value,
          onChange: this.onChange
        };

        return _react2.default.createElement(_reactAutosuggest2.default, {
          suggestions: this.state.suggestions,
          onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          getSuggestionValue: getSuggestionValue,
          renderSuggestion: renderSuggestion,
          shouldRenderSuggestions: shouldRenderSuggestions,
          inputProps: inputProps,
          onSuggestionSelected: this.onSuggestionSelected
        });
      }
    }]);

    return MapzenGeocoder;
  }(_react2.default.Component);

  MapzenGeocoder.propTypes = {
    bounds: _propTypes2.default.object,
    mapzen_api_key: _propTypes2.default.string,
    onSelection: _propTypes2.default.func
  };

  module.exports = MapzenGeocoder;
});