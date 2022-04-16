"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.deleteOne = deleteOne;
exports.getAll = getAll;
exports.getOne = getOne;
exports.update = update;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var _moment = _interopRequireDefault(require("moment"));

function getAll() {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var result, users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = {
              success: false,
              message: null,
              data: null
            };
            _context.prev = 1;
            _context.next = 4;
            return _models.UserModel.find().exec();

          case 4:
            users = _context.sent;
            result.success = true;
            result.data = users;
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            result.message = _context.t0;

          case 13:
            return _context.abrupt("return", result);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _getAll.apply(this, arguments);
}

function getOne() {
  return _getOne.apply(this, arguments);
}

function _getOne() {
  _getOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var result, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = {
              success: false,
              message: null,
              data: null
            };
            _context2.prev = 1;
            _context2.next = 4;
            return _models.UserModel.findOne({
              _id: id
            }).exec();

          case 4:
            user = _context2.sent;
            result.success = true;
            result.data = user;
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);
            result.message = _context2.t0;

          case 13:
            return _context2.abrupt("return", result);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _getOne.apply(this, arguments);
}

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var result, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = {
              success: false,
              message: null,
              data: null
            };
            _context3.prev = 1;
            _context3.next = 4;
            return _models.UserModel.create({
              name: data.name,
              email: data.email,
              password: data.password
            });

          case 4:
            user = _context3.sent;
            result.success = true;
            result.message = 'User created';
            result.data = user;
            _context3.next = 15;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0);
            result.success = false;
            result.message = _context3.t0;

          case 15:
            return _context3.abrupt("return", result);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return _create.apply(this, arguments);
}

function update(_x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var result, salt, hashedPassword, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            result = {
              success: false,
              message: null,
              data: null
            };
            _context4.prev = 1;
            salt = bcrypt.genSaltSync(10);
            hashedPassword = bcrypt.hashSync(data.password, salt);
            _context4.next = 6;
            return _models.UserModel.updateOne({
              updated: _moment["default"].utc(),
              name: data.name,
              email: data.email,
              password: hashedPassword
            });

          case 6:
            user = _context4.sent;
            result.success = true;
            result.data = user;
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);
            result.message = _context4.t0;

          case 15:
            return _context4.abrupt("return", result);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 11]]);
  }));
  return _update.apply(this, arguments);
}

function deleteOne(_x3) {
  return _deleteOne.apply(this, arguments);
}

function _deleteOne() {
  _deleteOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var result, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            result = {
              success: false,
              message: null,
              data: null
            };
            _context5.prev = 1;
            _context5.next = 4;
            return _models.UserModel.deleteOne({
              _id: id
            });

          case 4:
            user = _context5.sent;
            result.success = true;
            result.data = user;
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);
            result.message = _context5.t0;

          case 13:
            return _context5.abrupt("return", result);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 9]]);
  }));
  return _deleteOne.apply(this, arguments);
}