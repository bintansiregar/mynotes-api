"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var homeRouter = (0, _express.Router)();
homeRouter.get('/', function (req, res) {
  res.status(403).json({
    success: false,
    message: "Access Denied!"
  });
});
var _default = homeRouter;
exports["default"] = _default;