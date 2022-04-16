"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

var UserSchema = new _mongoose["default"].Schema({
  created: {
    type: Date,
    "default": function _default() {
      return _moment["default"].utc();
    }
  },
  updated: {
    type: Date,
    "default": null
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  note: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

var UserModel = _mongoose["default"].model('User', UserSchema);

var _default2 = UserModel;
exports["default"] = _default2;