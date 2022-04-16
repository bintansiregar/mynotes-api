"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _validations = require("../validations");

var _models = require("../models");

var authRoute = (0, _express.Router)();
authRoute.post('/register', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result, _registerValidation, error, emailExists, salt, hashedPassword, user;

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
            _registerValidation = (0, _validations.registerValidation)(req.body), error = _registerValidation.error;

            if (!error) {
              _context.next = 5;
              break;
            }

            throw new Error(error.message);

          case 5:
            _context.next = 7;
            return _models.UserModel.findOne({
              email: req.body.email
            });

          case 7:
            emailExists = _context.sent;

            if (!emailExists) {
              _context.next = 10;
              break;
            }

            throw new Error('Email address already exists');

          case 10:
            salt = _bcryptjs["default"].genSaltSync(10);
            hashedPassword = _bcryptjs["default"].hashSync(req.body.password, salt);
            _context.next = 14;
            return _models.UserModel.create({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword
            });

          case 14:
            user = _context.sent;
            res.json({
              success: true,
              message: "Registration Success. You can now login to your account.",
              user: {
                _id: user._id,
                name: user.name,
                email: user.email
              }
            });
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](1);
            result.message = _context.t0;

            if (_context.t0 instanceof Error) {
              result.message = _context.t0.message;
            }

            res.status(400).json(result);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 18]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
authRoute.post('/login', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _loginValidation, error, user, passwordMatch, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _loginValidation = (0, _validations.loginValidation)(req.body), error = _loginValidation.error;

            if (!error) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: error.details[0].message
            }));

          case 3:
            _context2.next = 5;
            return _models.UserModel.findOne({
              email: req.body.email
            });

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: "User with this email does not exist"
            }));

          case 8:
            passwordMatch = _bcryptjs["default"].compareSync(req.body.password, user.password);

            if (passwordMatch) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: 'Password do not match'
            }));

          case 11:
            token = _jsonwebtoken["default"].sign({
              _id: user._id
            }, process.env.JWT_SECRET);
            res.header('auth-token', token).json({
              success: true,
              accessToken: token,
              userData: {
                name: user.name,
                email: user.email
              }
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
authRoute.get('/verify-token', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token, verified, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.header('auth-token');

            if (token) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              success: false,
              message: "Access denied! Token not found!"
            }));

          case 3:
            _context3.prev = 3;
            verified = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
            _context3.next = 7;
            return _models.UserModel.findOne({
              _id: verified._id
            });

          case 7:
            user = _context3.sent;

            if (user) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: "User not found!"
            }));

          case 10:
            res.json({
              success: true,
              accessToken: token,
              userData: {
                name: user.name,
                email: user.email
              }
            });
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](3);
            res.status(400).send({
              success: false,
              message: _context3.t0
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = authRoute;
exports["default"] = _default;