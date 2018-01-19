(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'material-ui/FontIcon', 'material-ui/IconButton', 'material-ui/Toggle'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('material-ui/FontIcon'), require('material-ui/IconButton'), require('material-ui/Toggle'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.FontIcon, global.IconButton, global.Toggle);
    global.JaneLayer = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _FontIcon, _IconButton, _Toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _FontIcon2 = _interopRequireDefault(_FontIcon);

  var _IconButton2 = _interopRequireDefault(_IconButton);

  var _Toggle2 = _interopRequireDefault(_Toggle);

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

  var style = {
    fontIcon: {
      fontSize: '18px',
      margin: '8px',
      height: '18px',
      width: '18px',
      color: '#5F5F5F',
      left: 0
    },
    toggle: {
      width: 'auto',
      display: 'inline-block',
      height: '23px'
    },
    closeIcon: {
      width: 36,
      height: 36,
      padding: 0,
      position: 'absolute',
      right: 0,
      top: 0
    },
    closeIconMaterial: {
      fontSize: '15px',
      margin: '8px',
      height: '15px',
      width: '15px',
      float: 'right',
      color: '#5F5F5F'
    },
    blockerStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      mouseEvents: 'none',
      position: 'absolute',
      top: 0,
      height: 2000,
      left: 0,
      right: 0,
      paddingTop: 35,
      zIndex: 1000000
    },
    track: {
      backgroundColor: '#9c9c9c'
    },
    thumbSwitched: {
      backgroundColor: '#d96b27'
    },
    trackSwitched: {
      backgroundColor: 'rgba(217, 107, 39, 0.48)'
    }
  };

  var JaneLayer = function (_React$Component) {
    _inherits(JaneLayer, _React$Component);

    function JaneLayer() {
      _classCallCheck(this, JaneLayer);

      var _this = _possibleConstructorReturn(this, (JaneLayer.__proto__ || Object.getPrototypeOf(JaneLayer)).call(this));

      _this.registerRedrawCallback = function (redrawMapLayerCallback) {
        return _this.redrawCallbacks.push(redrawMapLayerCallback);
      };

      _this.redrawChildren = function () {
        var janeLayer = _this.context.getJaneLayer(_this.props.id);

        if (janeLayer && !janeLayer.disabled) {
          _this.redrawCallbacks.forEach(function (cb) {
            return cb();
          });
        }
      };

      _this.redrawCallbacks = [];
      return _this;
    }

    _createClass(JaneLayer, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!this.props.hidden) {
          this.context.registerLayer(this.props.id, this.props, this.redrawChildren);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!this.props.hidden) {
          this.context.unregisterLayer(this.props.id);
        }
      }
    }, {
      key: 'renderChildren',
      value: function renderChildren() {
        var _this2 = this;

        var _context = this.context,
            map = _context.map,
            loadedSources = _context.loadedSources,
            onSourceLoaded = _context.onSourceLoaded,
            getJaneLayer = _context.getJaneLayer;

        var janeLayer = getJaneLayer(this.props.id);

        if (!map || janeLayer && janeLayer.disabled) {
          return null;
        }

        var previousMapLayer = null;
        var order = 0;

        return _react2.default.Children.map(this.props.children, function (child) {
          if (!child || !child.type) {
            return child;
          }

          switch (child.type.displayName) {
            case 'MapLayer':
              // eslint-disable-line
              var mapLayerProps = {
                janeLayerId: _this2.props.id,
                registerRedrawCallback: _this2.registerRedrawCallback,
                map: map,
                previousMapLayer: previousMapLayer,
                order: order++
              };

              var modifiedLayer = loadedSources[child.props.source] ? _react2.default.cloneElement(child, mapLayerProps) : null;

              previousMapLayer = child.props.id;

              return modifiedLayer;

            case 'Source':
              return _react2.default.cloneElement(child, { map: map, onSourceLoaded: onSourceLoaded });

            case 'Marker':
              return _react2.default.cloneElement(child, { map: map });

            default:
              return child;
          }
        });
      }
    }, {
      key: 'toggleLayer',
      value: function toggleLayer() {
        this.context.toggleLayer(this.props.id);
      }
    }, {
      key: 'render',
      value: function render() {
        var SidebarComponent = this.props.component;
        var janeLayer = this.context.getJaneLayer(this.props.id);

        return _react2.default.createElement(
          'div',
          { style: { display: this.props.id === this.context.selectedLayer ? 'inline' : 'none' } },
          _react2.default.createElement(
            'div',
            { className: 'drawer-header' },
            _react2.default.createElement(_Toggle2.default, {
              trackStyle: style.track,
              thumbSwitchedStyle: style.thumbSwitched,
              trackSwitchedStyle: style.trackSwitched,
              toggled: janeLayer && !janeLayer.disabled,
              onToggle: this.toggleLayer.bind(this),
              style: style.toggle
            }),
            _react2.default.createElement(_FontIcon2.default, { className: 'fa fa-' + this.props.icon, style: style.fontIcon }),
            this.props.name,
            _react2.default.createElement(_IconButton2.default, {
              iconClassName: 'fa fa-times',
              style: style.closeIcon,
              iconStyle: style.closeIconMaterial,
              onTouchTap: this.context.onLayerClose
            })
          ),
          _react2.default.createElement(
            'div',
            { style: { position: 'relative', height: '100%' } },
            janeLayer && janeLayer.disabled && _react2.default.createElement('div', { style: style.blockerStyle }),
            SidebarComponent
          ),
          this.renderChildren()
        );
      }
    }]);

    return JaneLayer;
  }(_react2.default.Component);

  JaneLayer.displayName = 'JaneLayer';
  JaneLayer.contextTypes = {
    registerLayer: _propTypes2.default.func,
    unregisterLayer: _propTypes2.default.func,
    loadedSources: _propTypes2.default.object,
    selectedLayer: _propTypes2.default.string,
    onSourceLoaded: _propTypes2.default.func,
    getJaneLayer: _propTypes2.default.func,
    toggleLayer: _propTypes2.default.func,
    onLayerClose: _propTypes2.default.func,
    map: _propTypes2.default.object
  };


  JaneLayer.propTypes = {
    id: _propTypes2.default.string.isRequired,
    hidden: _propTypes2.default.bool,
    name: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    component: _propTypes2.default.object,
    children: _propTypes2.default.any
  };

  JaneLayer.defaultProps = {
    defaultDisabled: false,
    hidden: false,
    name: null,
    icon: null,
    component: null,
    children: null
  };

  exports.default = JaneLayer;
});