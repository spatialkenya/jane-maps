(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'react', 'prop-types', 'material-ui/Toolbar', 'material-ui/FontIcon', 'material-ui/IconButton', 'react-autosuggest', 'underscore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('react'), require('prop-types'), require('material-ui/Toolbar'), require('material-ui/FontIcon'), require('material-ui/IconButton'), require('react-autosuggest'), require('underscore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.react, global.propTypes, global.Toolbar, global.FontIcon, global.IconButton, global.reactAutosuggest, global.underscore);
    global.Search = mod.exports;
  }
})(this, function (module, _react, _propTypes, _Toolbar, _FontIcon, _IconButton, _reactAutosuggest, _underscore) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _FontIcon2 = _interopRequireDefault(_FontIcon);

  var _IconButton2 = _interopRequireDefault(_IconButton);

  var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

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

  var Search = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search(props) {
      _classCallCheck(this, Search);

      var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

      _this.onSuggestionsFetchRequested = function (_ref) {
        var value = _ref.value;

        var apiCall = 'https://search.mapzen.com/v1/autocomplete?text=' + value;

        if (_this.props.bounds) {
          apiCall += '&boundary.rect.min_lon=' + _this.props.bounds.minLon + '&boundary.rect.max_lon=' + _this.props.bounds.maxLon + '&boundary.rect.min_lat=' + _this.props.bounds.minLat + '&boundary.rect.max_lat=' + _this.props.bounds.maxLat;
        }

        apiCall += '&api_key=' + _this.props.mapzen_api_key;

        $.getJSON(apiCall, function (data) {
          // eslint-disable-line no-undef
          _this.setState({
            suggestions: data.features
          });
        });
      };

      _this.onSuggestionsClearRequested = function () {
        _this.setState({
          suggestions: []
        });
      };

      _this.onChange = function (e, obj) {
        _this.setState({
          value: obj.newValue
        });
      };

      _this.onSuggestionSelected = function (e, o) {
        _this.setState({
          value: o.suggestionValue
        });

        // pass up to Jane to create/update Marker
        _this.props.onGeocoderSelection(o.suggestion, o.suggestion.properties.name);
      };

      _this.clearInput = function () {
        // tell Jane to hide Marker
        _this.props.onClear();

        // set the input field to ''
        _this.setState({
          value: ''
        });
      };

      _this.state = {
        value: '',
        suggestions: []
      };
      return _this;
    }

    _createClass(Search, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !_underscore2.default.isEqual(this.props, nextProps) || !_underscore2.default.isEqual(this.state, nextState);
      }
    }, {
      key: 'render',
      value: function render() {
        var inputProps = {
          placeholder: 'Search for an address',
          value: this.state.value,
          onChange: this.onChange
        };

        return _react2.default.createElement(
          'div',
          {
            className: 'mui-toolbar-container search-filter-toolbar',
            style: { left: this.props.leftOffset }
          },
          _react2.default.createElement(
            _Toolbar.Toolbar,
            {
              className: 'mui-toolbar',
              noGutter: true,
              style: { /* Must be defined here to override material-ui inline styles*/
                backgroundColor: '#fff',
                height: '48px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2),0 -1px 0px rgba(0,0,0,0.02)',
                borderRadius: '2px'
              }
            },
            _react2.default.createElement(
              _Toolbar.ToolbarGroup,
              null,
              _react2.default.createElement(_reactAutosuggest2.default, {
                suggestions: this.state.suggestions,
                onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                getSuggestionValue: getSuggestionValue,
                renderSuggestion: renderSuggestion,
                shouldRenderSuggestions: shouldRenderSuggestions,
                inputProps: inputProps,
                onSuggestionSelected: this.onSuggestionSelected
              }),
              _react2.default.createElement(
                _IconButton2.default,
                null,
                this.props.selectionActive ? _react2.default.createElement(_FontIcon2.default, { className: 'fa fa-times', onClick: this.clearInput }) : _react2.default.createElement(_FontIcon2.default, { className: 'fa fa-search' })
              )
            )
          )
        );
      }
    }]);

    return Search;
  }(_react2.default.Component);

  Search.displayName = 'Search';


  Search.propTypes = {
    bounds: _propTypes2.default.object,
    mapzen_api_key: _propTypes2.default.string,
    onGeocoderSelection: _propTypes2.default.func,
    onClear: _propTypes2.default.func,
    selectionActive: _propTypes2.default.bool,
    leftOffset: _propTypes2.default.number
  };

  module.exports = Search;
});