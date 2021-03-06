'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSvgInline = require('react-svg-inline');

var _reactSvgInline2 = _interopRequireDefault(_reactSvgInline);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SVGWrapper = _styledComponents2.default.div.withConfig({
    displayName: 'disconnected-view__SVGWrapper',
    componentId: 'sc-1hdjm8z-0'
})(['max-height:100%;max-width:100%;margin-bottom:140px;']);

exports.default = function () {
    return _react2.default.createElement(
        SVGWrapper,
        null,
        _react2.default.createElement(_reactSvgInline2.default, { svg: icon })
    );
};

var icon = '\n<svg width="210px" height="150px" viewBox="0 0 210 150" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id="FInal" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="1" transform="translate(-915.000000, -356.000000)" fill="#4D4D4D" fill-rule="nonzero">\n            <path d="M1117.31284,419.636364 C1117.31284,417.512192 1119.03367,415.79021 1121.15642,415.79021 C1123.27917,415.79021 1125,417.512192 1125,419.636364 C1125,447.023515 1111.3017,469.453876 1087.80267,485.191015 C1067.98313,498.464025 1042.15567,506 1019.49682,506 C996.229145,506 970.976604,499.222345 951.727522,486.61975 C928.403996,471.349569 915,448.691655 915,419.636364 C915,417.512192 916.720828,415.79021 918.843578,415.79021 C920.966327,415.79021 922.687155,417.512192 922.687155,419.636364 C922.687155,445.976297 934.696662,466.276987 955.936236,480.18278 C973.867198,491.922388 997.657898,498.307692 1019.49682,498.307692 C1040.66212,498.307692 1064.99852,491.20678 1083.52721,478.798245 C1105.01628,464.407157 1117.31284,444.272084 1117.31284,419.636364 Z M1079.57501,381.174825 C1072.62783,381.174825 1066.99602,375.539249 1066.99602,368.587413 C1066.99602,361.635577 1072.62783,356 1079.57501,356 C1086.52218,356 1092.15399,361.635577 1092.15399,368.587413 C1092.15399,375.539249 1086.52218,381.174825 1079.57501,381.174825 Z M962.870012,381.174825 C955.922833,381.174825 950.291031,375.539249 950.291031,368.587413 C950.291031,361.635577 955.922833,356 962.870012,356 C969.817192,356 975.448993,361.635577 975.448993,368.587413 C975.448993,375.539249 969.817192,381.174825 962.870012,381.174825 Z" id="Combined-Shape"></path>\n        </g>\n    </g>\n</svg>\n';