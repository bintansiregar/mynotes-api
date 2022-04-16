"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authRoute", {
  enumerable: true,
  get: function get() {
    return _AuthRoute["default"];
  }
});
Object.defineProperty(exports, "homeRouter", {
  enumerable: true,
  get: function get() {
    return _HomeRoute["default"];
  }
});
Object.defineProperty(exports, "noteRoute", {
  enumerable: true,
  get: function get() {
    return _NoteRoute["default"];
  }
});
Object.defineProperty(exports, "userRoute", {
  enumerable: true,
  get: function get() {
    return _UserRoute["default"];
  }
});

var _HomeRoute = _interopRequireDefault(require("./HomeRoute"));

var _AuthRoute = _interopRequireDefault(require("./AuthRoute"));

var _UserRoute = _interopRequireDefault(require("./UserRoute"));

var _NoteRoute = _interopRequireDefault(require("./NoteRoute"));