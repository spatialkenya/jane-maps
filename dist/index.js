(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Jane', './JaneLayer', './source/Source', './MapLayer', './Legend', './Marker'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Jane'), require('./JaneLayer'), require('./source/Source'), require('./MapLayer'), require('./Legend'), require('./Marker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Jane, global.JaneLayer, global.Source, global.MapLayer, global.Legend, global.Marker);
    global.index = mod.exports;
  }
})(this, function (exports, _Jane, _JaneLayer, _Source, _MapLayer, _Legend, _Marker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Marker = exports.Legend = exports.MapLayer = exports.Source = exports.JaneLayer = exports.Jane = undefined;

  var _Jane2 = _interopRequireDefault(_Jane);

  var _JaneLayer2 = _interopRequireDefault(_JaneLayer);

  var _Source2 = _interopRequireDefault(_Source);

  var _MapLayer2 = _interopRequireDefault(_MapLayer);

  var _Legend2 = _interopRequireDefault(_Legend);

  var _Marker2 = _interopRequireDefault(_Marker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.Jane = _Jane2.default;
  exports.JaneLayer = _JaneLayer2.default;
  exports.Source = _Source2.default;
  exports.MapLayer = _MapLayer2.default;
  exports.Legend = _Legend2.default;
  exports.Marker = _Marker2.default;
});