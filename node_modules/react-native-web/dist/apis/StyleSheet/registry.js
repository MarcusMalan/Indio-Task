




var _createReactDOMStyle=require('./createReactDOMStyle');var _createReactDOMStyle2=_interopRequireDefault(_createReactDOMStyle);
var _flattenArray=require('../../modules/flattenArray');var _flattenArray2=_interopRequireDefault(_flattenArray);
var _flattenStyle=require('./flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);
var _generateCss2=require('./generateCss');var _generateCss3=_interopRequireDefault(_generateCss2);
var _injector=require('./injector');var _injector2=_interopRequireDefault(_injector);
var _mapKeyValue=require('../../modules/mapKeyValue');var _mapKeyValue2=_interopRequireDefault(_mapKeyValue);
var _prefixInlineStyles=require('./prefixInlineStyles');var _prefixInlineStyles2=_interopRequireDefault(_prefixInlineStyles);
var _ReactNativePropRegistry=require('../../modules/ReactNativePropRegistry');var _ReactNativePropRegistry2=_interopRequireDefault(_ReactNativePropRegistry);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var prefix='r';
var SPACE_REGEXP=/\s/g;
var ESCAPE_SELECTOR_CHARS_REGEXP=/[(),":?.%\\$#*]/g;




var createClassName=function createClassName(prop,value){
var val=(''+value).replace(SPACE_REGEXP,'-');
return'rn-'+prop+':'+val;
};




var mapDeclarationsToClassName=function mapDeclarationsToClassName(style,fn){
var result=(0,_mapKeyValue2.default)(style,fn).join('\n').trim();
return'\n'+result;
};





var injectedClassNames={};
var injectClassNameIfNeeded=function injectClassNameIfNeeded(prop,value){
var className=createClassName(prop,value);
if(!injectedClassNames[className]){

var selector=className.replace(ESCAPE_SELECTOR_CHARS_REGEXP,'\\$&');
var body=(0,_generateCss3.default)(_defineProperty({},prop,value));
var css='.'+selector+'{'+body+'}';

_injector2.default.addRule(className,css);
injectedClassNames[className]=true;
}

return className;
};




var resolvedPropsCache={};
var registerStyle=function registerStyle(id,flatStyle){
var style=(0,_createReactDOMStyle2.default)(flatStyle);
var className=mapDeclarationsToClassName(style,function(prop,value){
if(value!=null){
return injectClassNameIfNeeded(prop,value);
}
});

var key=prefix+'-'+id;
resolvedPropsCache[key]={className:className};

return id;
};




var resolveProps=function resolveProps(reactNativeStyle){
var flatStyle=(0,_flattenStyle2.default)(reactNativeStyle);
var domStyle=(0,_createReactDOMStyle2.default)(flatStyle);
var style={};

var className=mapDeclarationsToClassName(domStyle,function(prop,value){
if(value!=null){
var singleClassName=createClassName(prop,value);
if(injectedClassNames[singleClassName]){
return singleClassName;
}else{

style[prop]=value;
}
}
});

var props={
className:className,
style:(0,_prefixInlineStyles2.default)(style)};
















return props;
};




var resolvePropsIfNeeded=function resolvePropsIfNeeded(key,style){
if(key){
if(!resolvedPropsCache[key]){

resolvedPropsCache[key]=resolveProps(style);
}
return resolvedPropsCache[key];
}
return resolveProps(style);
};




var StyleRegistry={
initialize:function initialize(classNames){
injectedClassNames=classNames;














},

reset:function reset(){
injectedClassNames={};
resolvedPropsCache={};
_injector2.default.reset();
},

register:function register(style){
var id=_ReactNativePropRegistry2.default.register(style);
return registerStyle(id,style);
},

resolve:function resolve(reactNativeStyle){
if(!reactNativeStyle){
return undefined;
}


if(typeof reactNativeStyle==='number'){
var _key=''+prefix+reactNativeStyle;
return resolvePropsIfNeeded(_key,reactNativeStyle);
}


if(!Array.isArray(reactNativeStyle)){
return resolveProps(reactNativeStyle);
}



var flatArray=(0,_flattenArray2.default)(reactNativeStyle);

var isArrayOfNumbers=true;
for(var i=0;i<flatArray.length;i++){
if(typeof flatArray[i]!=='number'){
isArrayOfNumbers=false;
break;
}
}
























var key=isArrayOfNumbers?prefix+'-'+flatArray.join('-'):null;

return resolvePropsIfNeeded(key,flatArray);
}};


module.exports=StyleRegistry;