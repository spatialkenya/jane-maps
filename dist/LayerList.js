(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react/lib/update', 'react-dnd', 'react-dnd-html5-backend', 'material-ui/IconButton', 'underscore', 'classnames', './ListItem'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react/lib/update'), require('react-dnd'), require('react-dnd-html5-backend'), require('material-ui/IconButton'), require('underscore'), require('classnames'), require('./ListItem'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.update, global.reactDnd, global.reactDndHtml5Backend, global.IconButton, global.underscore, global.classnames, global.ListItem);
    global.LayerList = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _update, _reactDnd, _reactDndHtml5Backend, _IconButton, _underscore, _classnames, _ListItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _update2 = _interopRequireDefault(_update);

  var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

  var _IconButton2 = _interopRequireDefault(_IconButton);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _ListItem2 = _interopRequireDefault(_ListItem);

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
      fontSize: '15px',
      margin: '7px 10px',
      height: '15px',
      width: '15px',
      color: '#5F5F5F',
      left: 0
    },
    drawerIcon: {
      width: 36,
      height: 36,
      padding: 0
    }
  };

  var LayerList = function (_React$Component) {
    _inherits(LayerList, _React$Component);

    function LayerList(props) {
      _classCallCheck(this, LayerList);

      var _this = _possibleConstructorReturn(this, (LayerList.__proto__ || Object.getPrototypeOf(LayerList)).call(this, props));

      _this.handleDrop = function () {
        // on drop pass the current state up to Jane
        _this.props.onLayerReorder(_this.state.layers);
      };

      _this.moveListItem = function (dragIndex, hoverIndex) {
        var dragLayer = _this.state.layers[dragIndex];

        _this.setState((0, _update2.default)(_this.state, {
          layers: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragLayer]]
          }
        }));
      };

      _this.state = {
        layers: _this.props.layers
      };
      return _this;
    }

    _createClass(LayerList, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !_underscore2.default.isEqual(this.props, nextProps) || !_underscore2.default.isEqual(this.state, nextState);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState({ layers: nextProps.layers });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var drawerClassName = (0, _classnames2.default)('jane-drawer', { expanded: this.props.expanded });
        var drawerIconClassName = (0, _classnames2.default)('fa', this.props.expanded ? 'fa-chevron-left' : 'fa-list-ul');

        var layers = this.state.layers
        // reverse layers so the list reflects the map (first in array will be bottom on map)
        .map(function (layer, i) {
          var className = (0, _classnames2.default)('list-item', {
            selected: _this2.props.selectedLayer === layer.id,
            disabled: layer.disabled
          });

          return _react2.default.createElement(_ListItem2.default, {
            className: className,
            expanded: _this2.props.expanded,
            disabled: layer.disabled,
            layer: layer,
            moveListItem: _this2.moveListItem,
            index: i,
            onDrop: _this2.handleDrop,
            key: layer.id,
            onClick: _this2.props.onLayerSelect,
            toggleLayer: _this2.props.toggleLayer
          });
        });

        return _react2.default.createElement(
          'div',
          { className: drawerClassName },
          _react2.default.createElement(
            'div',
            { className: 'jane-drawer-inner' },
            _react2.default.createElement(
              'div',
              { className: 'drawer-header' },
              'Layers',
              _react2.default.createElement(_IconButton2.default, {
                style: style.drawerIcon,
                iconClassName: drawerIconClassName,
                iconStyle: style.fontIcon,
                onTouchTap: this.props.toggleList
              })
            ),
            layers.slice().reverse()
          )
        );
      }
    }]);

    return LayerList;
  }(_react2.default.Component);

  LayerList.displayName = 'LayerList';


  LayerList.propTypes = {
    layers: _propTypes2.default.array.isRequired,
    onLayerReorder: _propTypes2.default.func.isRequired,
    expanded: _propTypes2.default.bool.isRequired,
    onLayerSelect: _propTypes2.default.func.isRequired,
    selectedLayer: _propTypes2.default.string,
    toggleList: _propTypes2.default.func.isRequired,
    toggleLayer: _propTypes2.default.func.isRequired
  };

  LayerList.defaultProps = {
    selectedLayer: null
  };

  exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(LayerList);
});