var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};







var _findNodeHandle=require('../findNodeHandle');var _findNodeHandle2=_interopRequireDefault(_findNodeHandle);
var _registry=require('../../apis/StyleSheet/registry');var _registry2=_interopRequireDefault(_registry);
var _UIManager=require('../../apis/UIManager');var _UIManager2=_interopRequireDefault(_UIManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}

var emptyObject={};
var REGEX_CLASSNAME_SPLIT=/\s+/;
var REGEX_STYLE_PROP=/rn-(.*):.*/;

var classNameFilter=function classNameFilter(className){return className!=='';};
var classNameToList=function classNameToList(){var className=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';return className.split(REGEX_CLASSNAME_SPLIT).filter(classNameFilter);};
var getStyleProp=function getStyleProp(className){
var match=className.match(REGEX_STYLE_PROP);
if(match){
return match[1];
}
};

var NativeMethodsMixin={



blur:function blur(){
_UIManager2.default.blur((0,_findNodeHandle2.default)(this));
},





focus:function focus(){
_UIManager2.default.focus((0,_findNodeHandle2.default)(this));
},




measure:function measure(callback){
_UIManager2.default.measure((0,_findNodeHandle2.default)(this),callback);
},
















measureInWindow:function measureInWindow(callback){
_UIManager2.default.measureInWindow((0,_findNodeHandle2.default)(this),callback);
},




measureLayout:function measureLayout(relativeToNativeNode,onSuccess,onFail){
_UIManager2.default.measureLayout((0,_findNodeHandle2.default)(this),relativeToNativeNode,onFail,onSuccess);
},







setNativeProps:function setNativeProps(nativeProps){

var node=(0,_findNodeHandle2.default)(this);
var domClassList=[].concat(_toConsumableArray(node.classList));


var resolvedProps=_registry2.default.resolve(nativeProps.style)||emptyObject;
var resolvedClassList=classNameToList(resolvedProps.className);


var classList=[];
var style=_extends({},resolvedProps.style);



domClassList.forEach(function(c){
var prop=getStyleProp(c);
var className=resolvedProps.className;
if(!className||className.indexOf(prop)===-1){
classList.push(c);
}
});



resolvedClassList.forEach(function(c){
var prop=getStyleProp(c);
classList.push(c);
style[prop]=null;
});

var className='\n'+classList.sort().join('\n');

var props=_extends({},
nativeProps,{
className:className,
style:style});


_UIManager2.default.updateView(node,props,this);
}};


module.exports=NativeMethodsMixin;