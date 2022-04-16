"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateUser = authenticateUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("./models");

function authenticateUser(_x, _x2, _x3) {
  return _authenticateUser.apply(this, arguments);
}

function _authenticateUser() {
  _authenticateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, tokenVerified, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.header('auth-token');

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              success: false,
              message: "Access Denied! No Access Token!"
            }));

          case 3:
            _context.prev = 3;
            tokenVerified = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
            _context.next = 7;
            return _models.UserModel.findOne({
              _id: tokenVerified._id
            }).exec();

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            throw new Error("User with this Access Token is not registered!");

          case 10:
            req.userId = tokenVerified._id;
            _context.next = 20;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);

            if (!(_context.t0 instanceof Error)) {
              _context.next = 18;
              break;
            }

            res.status(401).send({
              success: false,
              message: _context.t0.message
            });
            return _context.abrupt("return");

          case 18:
            console.error(_context.t0);
            return _context.abrupt("return");

          case 20:
            next();

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 13]]);
  }));
  return _authenticateUser.apply(this, arguments);
}