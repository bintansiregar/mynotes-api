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

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

var _models = require("../models");

var _validations = require("../validations");

var _request = _interopRequireDefault(require("express/lib/request"));

function getAll(_x, _x2) {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result, notes;
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
            return _models.NoteModel.find().populate('user').exec();

          case 4:
            notes = _context.sent;
            result.success = true;
            result.data = notes;
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            result.message = _context.t0;

          case 13:
            res.json(result);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _getAll.apply(this, arguments);
}

function getOne(_x3, _x4) {
  return _getOne.apply(this, arguments);
}

function _getOne() {
  _getOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result, note;
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
            return _models.NoteModel.findOne({
              _id: req.params.id
            }).exec();

          case 4:
            note = _context2.sent;
            result.success = true;
            result.data = note;
            _context2.next = 17;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);

            if (!(_context2.t0 instanceof Error)) {
              _context2.next = 15;
              break;
            }

            result.message = _context2.t0.message;
            _context2.next = 17;
            break;

          case 15:
            console.error(_context2.t0);
            return _context2.abrupt("return");

          case 17:
            res.json(result);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _getOne.apply(this, arguments);
}

function create(_x5, _x6) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result, _createNote, error, note;

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
            _createNote = (0, _validations.createNote)(req.body), error = _createNote.error;

            if (!error) {
              _context3.next = 5;
              break;
            }

            throw new Error(error.details[0].message);

          case 5:
            _context3.next = 7;
            return _models.NoteModel.create({
              title: req.body.title,
              content: req.body.content,
              user: req.userId
            });

          case 7:
            note = _context3.sent;
            result.success = true;
            result.message = 'Note created';
            result.data = note;
            _context3.next = 21;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);

            if (!(_context3.t0 instanceof Error)) {
              _context3.next = 19;
              break;
            }

            result.message = _context3.t0.message;
            _context3.next = 21;
            break;

          case 19:
            console.error(_context3.t0);
            return _context3.abrupt("return");

          case 21:
            res.json(result);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));
  return _create.apply(this, arguments);
}

function update(_x7, _x8) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var result, _updateNote, error, note, noteUpdated;

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
            _updateNote = (0, _validations.updateNote)(req.body), error = _updateNote.error;

            if (!error) {
              _context4.next = 5;
              break;
            }

            throw new Error(error.details[0].message);

          case 5:
            _context4.next = 7;
            return _models.NoteModel.findById(req.body.id).populate('user').exec();

          case 7:
            note = _context4.sent;

            if (note) {
              _context4.next = 10;
              break;
            }

            throw new Error('Note not found!');

          case 10:
            if (!(note.user._id != req.userId)) {
              _context4.next = 12;
              break;
            }

            throw new Error("You dont't have access to delete others note");

          case 12:
            _context4.next = 14;
            return _models.NoteModel.updateOne({
              _id: _mongoose["default"].Types.ObjectId(req.body.id)
            }, {
              updated: _moment["default"].utc(),
              title: req.body.title,
              content: req.body.content
            });

          case 14:
            _context4.next = 16;
            return _models.NoteModel.findById(req.body.id).populate('user').exec();

          case 16:
            noteUpdated = _context4.sent;
            result.success = true;
            result.data = noteUpdated;
            _context4.next = 29;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](1);

            if (!(_context4.t0 instanceof Error)) {
              _context4.next = 27;
              break;
            }

            result.message = _context4.t0.message;
            _context4.next = 29;
            break;

          case 27:
            console.error(_context4.t0);
            return _context4.abrupt("return");

          case 29:
            res.json(result);

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 21]]);
  }));
  return _update.apply(this, arguments);
}

function deleteOne(_x9, _x10) {
  return _deleteOne.apply(this, arguments);
}

function _deleteOne() {
  _deleteOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var result, note, noteDelete;
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
            return _models.NoteModel.findById(req.params.id).populate('user').exec();

          case 4:
            note = _context5.sent;

            if (note) {
              _context5.next = 7;
              break;
            }

            throw new Error('Note not found!');

          case 7:
            if (!(note.user._id != req.userId)) {
              _context5.next = 9;
              break;
            }

            throw new Error("You dont't have access to delete others note");

          case 9:
            _context5.next = 11;
            return _models.NoteModel.deleteOne({
              _id: _mongoose["default"].Types.ObjectId(req.params.id)
            });

          case 11:
            noteDelete = _context5.sent;
            result.success = true;
            result.data = noteDelete;
            _context5.next = 24;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](1);

            if (!(_context5.t0 instanceof Error)) {
              _context5.next = 22;
              break;
            }

            result.message = _context5.t0.message;
            _context5.next = 24;
            break;

          case 22:
            console.error(_context5.t0);
            return _context5.abrupt("return");

          case 24:
            res.json(result);

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 16]]);
  }));
  return _deleteOne.apply(this, arguments);
}