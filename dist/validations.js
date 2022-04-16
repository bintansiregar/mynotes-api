"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNote = createNote;
exports.loginValidation = loginValidation;
exports.registerValidation = registerValidation;
exports.updateNote = updateNote;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function registerValidation(data) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    name: _joi["default"].string().min(3).required(),
    password: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
}

function loginValidation(data) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(8).required()
  });

  return schema.validate(data);
}

function createNote(data) {
  var schema = _joi["default"].object({
    title: _joi["default"].string().empty('')["default"](''),
    content: _joi["default"].string().empty('')["default"]('')
  });

  return schema.validate(data);
}

function updateNote(data) {
  var schema = _joi["default"].object({
    id: _joi["default"].string().min(1).required(),
    title: _joi["default"].string().empty('')["default"](''),
    content: _joi["default"].string().empty('')["default"]('')
  });

  return schema.validate(data);
}