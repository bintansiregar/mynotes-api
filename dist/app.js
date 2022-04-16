"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = require("./routes");

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use('/', _routes.homeRouter);
app.use('/user', _routes.userRoute);
app.use('/auth', _routes.authRoute);
app.use('/note', _routes.noteRoute);
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mongoose["default"].connect("mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_ADDRESS, "/").concat(process.env.DB, "?").concat(process.env.DB_OPTIONS));

        case 3:
          console.log("Connected to Database (".concat(process.env.DB, ") @ ").concat(process.env.DB_ADDRESS));
          app.listen(process.env.PORT, function () {
            console.log("Application running at http://localhost:".concat(process.env.PORT, "/"));
          });
          _context.next = 12;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          process.kill(process.pid, 'SIGINT');
          return _context.abrupt("return");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 7]]);
}))();
var _default = app;
exports["default"] = _default;