(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-dom', 'react-dnd', 'material-ui/FontIcon', 'material-ui/Toggle', 'react-bootstrap'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-dom'), require('react-dnd'), require('material-ui/FontIcon'), require('material-ui/Toggle'), require('react-bootstrap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactDom, global.reactDnd, global.FontIcon, global.Toggle, global.reactBootstrap);
    global.ListItem = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactDom, _reactDnd, _FontIcon, _Toggle, _reactBootstrap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _FontIcon2 = _interopRequireDefault(_FontIcon);

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
      fontSize: '15px',
      margin: '8px 9px 8px 9px',
      height: '15px',
      width: '15px',
      color: '#5F5F5F',
      left: 0,
      textAlign: 'center'
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

  var listItemSource = {
    beginDrag: function beginDrag(props) {
      return {
        id: props.layer.id,
        index: props.index
      };
    }
  };

  var listItemTarget = {
    hover: function hover(props, monitor, component) {
      var dragIndex = monitor.getItem().index;
      var hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node

      // Get vertical middle
      var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      var clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      var hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveListItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    },
    drop: function drop(props) {
      props.onDrop();
    }
  };

  var ListItemClass = function (_React$Component) {
    _inherits(ListItemClass, _React$Component);

    function ListItemClass() {
      _classCallCheck(this, ListItemClass);

      return _possibleConstructorReturn(this, (ListItemClass.__proto__ || Object.getPrototypeOf(ListItemClass)).apply(this, arguments));
    }

    _createClass(ListItemClass, [{
      key: 'handleClick',
      value: function handleClick(layer, e) {
        if (e.target.type !== 'checkbox') this.props.onClick(layer.id);
      }
    }, {
      key: 'handleToggle',
      value: function handleToggle(layerid) {
        this.props.toggleLayer(layerid);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            connectDragSource = _props.connectDragSource,
            connectDropTarget = _props.connectDropTarget,
            layer = _props.layer,
            disabled = _props.disabled;


        return connectDragSource(connectDropTarget(_react2.default.createElement(
          'div',
          { className: this.props.className, onClick: this.handleClick.bind(this, layer) },
          _react2.default.createElement(
            'div',
            { className: 'toggle-container' },
            _react2.default.createElement(_Toggle2.default, {
              trackStyle: style.track,
              thumbSwitchedStyle: style.thumbSwitched,
              trackSwitchedStyle: style.trackSwitched,
              toggled: !disabled,
              onToggle: this.handleToggle.bind(this, layer.id)
            })
          ),
          _react2.default.createElement(
            'span',
            { className: 'name' },
            layer.name
          ),
          !this.props.expanded && _react2.default.createElement(
            _reactBootstrap.OverlayTrigger,
            {
              placement: 'right',
              overlay: _react2.default.createElement(
                _reactBootstrap.Tooltip,
                { id: layer.name },
                layer.name
              ),
              delayShow: 500
            },
            _react2.default.createElement(_FontIcon2.default, { className: 'fa fa-' + layer.icon, style: style.fontIcon })
          ),
          this.props.expanded && _react2.default.createElement(_FontIcon2.default, { className: 'fa fa-' + layer.icon, style: style.fontIcon })
        )));
      }
    }]);

    return ListItemClass;
  }(_react2.default.Component);

  ListItemClass.propTypes = {
    connectDragSource: _propTypes2.default.func.isRequired,
    connectDropTarget: _propTypes2.default.func.isRequired,
    layer: _propTypes2.default.object.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    className: _propTypes2.default.string.isRequired,
    expanded: _propTypes2.default.bool.isRequired,
    toggleLayer: _propTypes2.default.func.isRequired,
    disabled: _propTypes2.default.bool
  };

  ListItemClass.defaultProps = {
    disabled: false
  };

  var ListItem = ListItemClass;

  ListItem = (0, _reactDnd.DragSource)('listItem', listItemSource, function (connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
  })(ListItem);

  ListItem = (0, _reactDnd.DropTarget)('listItem', listItemTarget, function (connect) {
    return {
      connectDropTarget: connect.dropTarget()
    };
  })(ListItem);

  var exportListItem = ListItem;
  exports.default = exportListItem;
});