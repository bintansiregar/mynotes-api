"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

var NoteSchema = new _mongoose["default"].Schema({
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
  title: {
    type: String,
    "default": null
  },
  content: {
    type: String,
    "default": null
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

var NoteModel = _mongoose["default"].model('Note', NoteSchema);

var _default2 = NoteModel;
exports["default"] = _default2;