'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _jqueryMin = require('../../../bower_components/jquery/dist/jquery.min.js');

var _jqueryMin2 = _interopRequireDefault(_jqueryMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Homepage = function Homepage() {
  (0, _classCallCheck3.default)(this, Homepage);

  console.log((0, _jqueryMin2.default)('body'));
};

var homepage = new Homepage();