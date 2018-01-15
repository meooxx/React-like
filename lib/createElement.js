'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stack = [];
var EMPTY_ARRAY = [];

var VNode = function VNode() {
  _classCallCheck(this, VNode);
};

var createElement = exports.createElement = function createElement(nodeName, attributes) {
  for (var _len = arguments.length, arg = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    arg[_key - 2] = arguments[_key];
  }

  //simpeType ==  !function | string ? true
  var child = void 0,
      simpleType = void 0,
      children = EMPTY_ARRAY,
      lastSimpleType = void 0;

  for (var i = arg.length; i--;) {
    stack.push(arg[i]);
  }

  if (attributes && attributes.children != null) {
    if (!stack.length) {
      stack.push(attributes.children); //[{}]
    }
    delete attributes.children;
  }

  while (stack.length) {

    child = stack.pop();
    var nodeNameType = typeof nodeName === 'undefined' ? 'undefined' : _typeof(nodeName);
    var childType = typeof child === 'undefined' ? 'undefined' : _typeof(child);

    if (child && child.pop !== undefined) {
      for (var _i = child.length; _i--;) {
        stack.push(child[_i]);
      }
    } else {
      if (childType === 'boolean') child = null;
      if (simpleType = nodeNameType !== 'function') {
        if (child == null) {
          child = '';
        } else if (childType === 'number') {
          child = String(child);
        } else if (childType !== 'string') {
          simpleType = false;
        }
      }

      // 俩个连续的字符串则 拼接到一起
      if (simpleType && lastSimpleType) children[children.length - 1] += child;else if (children === EMPTY_ARRAY) children = [child];else {
        children.push(child);
      }
      lastSimpleType = simpleType;
    }
  }

  var vNode = new VNode();
  vNode.children = children;
  vNode.nodeName = nodeName;
  vNode.attributes = attributes !== null ? attributes : undefined;
  vNode.key = attributes != null ? attributes.key : undefined;

  //todo 
  // dont know for now 
  // option.vNode
  return vNode;
};