(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'underscore', 'classnames', './GLMap', './LayerList', './JaneLayer', './Marker', './Search'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('underscore'), require('classnames'), require('./GLMap'), require('./LayerList'), require('./JaneLayer'), require('./Marker'), require('./Search'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.underscore, global.classnames, global.GLMap, global.LayerList, global.JaneLayer, global.Marker, global.Search);
    global.Jane = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _underscore, _classnames, _GLMap, _LayerList, _JaneLayer, _Marker, _Search) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _GLMap2 = _interopRequireDefault(_GLMap);

  var _LayerList2 = _interopRequireDefault(_LayerList);

  var _JaneLayer2 = _interopRequireDefault(_JaneLayer);

  var _Marker2 = _interopRequireDefault(_Marker);

  var _Search2 = _interopRequireDefault(_Search);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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

  var Jane = function (_React$Component) {
    _inherits(Jane, _React$Component);

    function Jane(props) {
      _classCallCheck(this, Jane);

      var _this = _possibleConstructorReturn(this, (Jane.__proto__ || Object.getPrototypeOf(Jane)).call(this, props));

      _this.getChildContext = function () {
        return {
          registerLayer: _this.registerLayer,
          unregisterLayer: _this.unregisterLayer,
          loadedSources: _this.state.loadedSources,
          selectedLayer: _this.state.selectedLayer,
          getJaneLayer: function getJaneLayer(janeLayerId) {
            return _this.layers.find(function (_ref) {
              var id = _ref.id;
              return id === janeLayerId;
            });
          },
          toggleLayer: _this.toggleLayer,
          onSourceLoaded: _this.handleSourceLoaded,
          onLayerClose: _this.deselectLayer,
          addLegend: _this.addLegend,
          removeLegend: _this.removeLegend,
          map: _this.state.mapLoaded ? _this.GLMap.map : null
        };
      };

      _this.onMapLoad = function () {
        return _this.setState({ mapLoaded: true });
      };

      _this.removeLegend = function (legend) {
        return _this.setState({ legend: _this.state.legend.filter(function (item) {
            return item !== legend;
          }) });
      };

      _this.addLegend = function (legend) {
        return _this.setState({ legend: _this.state.legend.concat(legend) });
      };

      _this.unregisterLayer = function (layerId) {
        _this.layers = _this.layers.filter(function (layer) {
          return layer !== layerId;
        });

        _this.setState({ layers: _this.layers });
      };

      _this.registerLayer = function (layerId, layerConfig, redrawChildren) {
        _this.selectedLayer = _this.selectedLayer || null;

        var layer = _extends({}, layerConfig, {
          selected: layerConfig.defaultSelected || false,
          disabled: layerConfig.defaultDisabled || false,
          redrawChildren: redrawChildren
        });

        _this.layers.push(layer);

        var newState = { layers: _this.layers };

        if (layer.selected) {
          if (_this.selectedLayer) {
            console.error('Multiple JaneLayers are initially selected, check defaultSelected prop on ' + layer.id + ' JaneLayer');
          }

          newState.selectedLayer = layer.id;
          _this.selectedLayer = layer.id;
        }

        _this.setState(newState);
      };

      _this.handleSourceLoaded = function (loadedSources) {
        return _this.setState({ loadedSources: loadedSources });
      };

      _this.handleLayerReorder = function (layers) {
        _this.layers = layers;

        _this.setState({ layers: _this.layers }, function () {
          return layers.forEach(function (layer) {
            return layer.redrawChildren();
          });
        });
      };

      _this.selectLayer = function (layerid) {
        return _this.setState({ selectedLayer: layerid });
      };

      _this.toggleLayer = function (layerId) {
        var layers = _this.state.layers;

        var wasDisabled = layers.find(function (layer) {
          return layer.id === layerId;
        }).disabled;

        _this.layers = layers.map(function (layer) {
          return layer.id === layerId ? _extends({}, layer, { disabled: !layer.disabled }) : layer;
        });

        _this.setState({
          layers: _this.layers
        });

        _this.GLMap.map.once('render', function () {
          return _this.layers.forEach(function (layer) {
            return layer.redrawChildren();
          });
        });

        if (_this.props.onLayerToggle) {
          _this.props.onLayerToggle(layerId, !wasDisabled);
        }
      };

      _this.removeSearchResultMarker = function () {
        _this.setState({ searchResultMarker: null });
        _this.props.onSearchTrigger({
          action: 'clear',
          coordinates: []
        });
      };

      _this.addSearchResultMarker = function (feature, label) {
        _this.setState({ searchResultMarker: { feature: feature, label: label } });
        _this.props.onSearchTrigger({
          action: 'set',
          coordinates: feature.geometry.coordinates
        });
      };

      _this.deselectLayer = function () {
        return _this.setState({ selectedLayer: null });
      };

      _this.toggleList = function () {
        return _this.setState({ layerListExpanded: !_this.state.layerListExpanded });
      };

      _this.state = {
        searchResultMarker: null,
        mapLoaded: false,
        layerListExpanded: false,
        selectedLayer: null,
        loadedSources: {},
        legend: [],
        layers: []
      };

      _this.layers = [];
      return _this;
    }

    _createClass(Jane, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // // pass dragend and zoomend up, handle click and mousemove
        // // this.GLMap is the GLMap Component, not the map object itself
        this.GLMap.map.on('zoomend', this.props.onZoomEnd);
        this.GLMap.map.on('dragend', this.props.onDragEnd);
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        var propsChanged = !_underscore2.default.isEqual(this.props, nextProps);
        var stateChanged = !_underscore2.default.isEqual(this.state, nextState);

        return propsChanged || stateChanged;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        // fit map to fitBounds property if it is different from previous props
        if (!_underscore2.default.isEqual(prevProps.fitBounds, this.props.fitBounds)) {
          this.GLMap.map.fitBounds(this.props.fitBounds);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.GLMap.map.off('zoomend', this.props.onZoomEnd);
        this.GLMap.map.off('dragend', this.props.onDragEnd);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var leftOffset = 0;
        if (this.state.layerListExpanded) leftOffset += 164;
        if (this.state.selectedLayer) leftOffset += 320;

        var drawerClassName = (0, _classnames2.default)('second-drawer', { offset: this.state.layerListExpanded });
        var drawerStyle = {
          transform: this.state.selectedLayer ? 'translate(0px, 0px)' : 'translate(-320px, 0px)'
        };

        return _react2.default.createElement(
          'div',
          { className: 'jane-container', style: this.props.style },
          _react2.default.createElement(
            'div',
            { className: 'jane-map-container' },
            this.props.search && _react2.default.createElement(_Search2.default, _extends({}, this.props.searchConfig, {
              onGeocoderSelection: this.addSearchResultMarker,
              onClear: this.removeSearchResultMarker,
              selectionActive: !!this.state.searchResultMarker,
              leftOffset: leftOffset
            })),
            this.state.legend.length > 0 && _react2.default.createElement(
              'div',
              { className: 'jane-legend', style: { left: leftOffset } },
              this.state.legend
            ),
            _react2.default.createElement(_GLMap2.default, _extends({}, this.props.mapboxGLOptions, {
              ref: function ref(map) {
                _this2.GLMap = map;
              },
              onLoad: this.onMapLoad
            }))
          ),
          _react2.default.createElement(_LayerList2.default, {
            expanded: this.state.layerListExpanded,
            layers: this.state.layers,
            selectedLayer: this.state.selectedLayer,
            onLayerReorder: this.handleLayerReorder,
            onLayerSelect: this.selectLayer,
            toggleList: this.toggleList,
            toggleLayer: this.toggleLayer
          }),
          _react2.default.createElement(
            'div',
            { className: drawerClassName, style: drawerStyle },
            this.props.children,
            this.state.searchResultMarker && _react2.default.createElement(
              _JaneLayer2.default,
              { id: 'searchResult', hidden: true },
              _react2.default.createElement(_Marker2.default, _extends({}, this.state.searchResultMarker, { flyTo: true }))
            )
          )
        );
      }
    }]);

    return Jane;
  }(_react2.default.Component);

  Jane.displayName = 'Jane';
  Jane.childContextTypes = {
    registerLayer: _propTypes2.default.func,
    unregisterLayer: _propTypes2.default.func,
    onSourceLoaded: _propTypes2.default.func,
    loadedSources: _propTypes2.default.object,
    selectedLayer: _propTypes2.default.string,
    getJaneLayer: _propTypes2.default.func,
    toggleLayer: _propTypes2.default.func,
    onLayerClose: _propTypes2.default.func,
    addLegend: _propTypes2.default.func,
    removeLegend: _propTypes2.default.func,
    map: _propTypes2.default.object
  };


  Jane.propTypes = {
    mapboxGLOptions: _propTypes2.default.object.isRequired,
    style: _propTypes2.default.object,
    search: _propTypes2.default.bool,
    searchConfig: _propTypes2.default.object,
    fitBounds: _propTypes2.default.array,
    onZoomEnd: _propTypes2.default.func,
    onDragEnd: _propTypes2.default.func,
    onLayerToggle: _propTypes2.default.func,
    onSearchTrigger: _propTypes2.default.func,
    children: _propTypes2.default.node.isRequired
  };

  Jane.defaultProps = {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden'
    },
    search: false,
    searchConfig: null,
    fitBounds: null,
    onZoomEnd: function onZoomEnd() {},
    onDragEnd: function onDragEnd() {},
    onLayerToggle: function onLayerToggle() {}
  };

  exports.default = Jane;
});