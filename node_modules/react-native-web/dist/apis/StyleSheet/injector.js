




var _asap=require('asap');var _asap2=_interopRequireDefault(_asap);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var emptyObject={};
var hasOwnProperty=Object.prototype.hasOwnProperty;

var CLASSNAME_REXEP=/\.rn-([^{;\s]+)/g;
var STYLE_ELEMENT_ID='react-native-stylesheet';

var registry={};
var isDirty=false;




var addRule=function addRule(key,rule){
if(!registry[key]){
registry[key]=rule;
isDirty=true;
if(global.document){
(0,_asap2.default)(frame);
}
}
};




var getStyleText=function getStyleText(){

var result='\n';
for(var key in registry){
if(hasOwnProperty.call(registry,key)){
result+=registry[key]+'\n';
}
}
return result;
};




var getStyleSheetHtml=function getStyleSheetHtml(){return'<style id="'+STYLE_ELEMENT_ID+'">'+getStyleText()+'</style>';};

var reset=function reset(){registry={};};




var styleNode=null;
var getStyleNode=function getStyleNode(){
if(global.document){
if(!styleNode){

styleNode=document.getElementById(STYLE_ELEMENT_ID);
if(!styleNode){

document.head.insertAdjacentHTML('afterbegin',getStyleSheetHtml());
styleNode=document.getElementById(STYLE_ELEMENT_ID);
}
}
return styleNode;
}
};






var getClassNames=function getClassNames(){
var styleNode=getStyleNode();
if(styleNode){
var text=styleNode.textContent;
var matches=text.match(CLASSNAME_REXEP);
if(matches){
return matches.map(function(name){return name.slice(1);}).reduce(function(classMap,className){
classMap[className]=true;
return classMap;
},{});
}
}
return emptyObject;
};

var frame=function frame(){
if(!isDirty||!global.document){return;}
isDirty=false;

var styleNode=getStyleNode();
if(styleNode){
var css=getStyleText();
styleNode.textContent=css;
}
};

module.exports={
addRule:addRule,
getClassNames:getClassNames,
getStyleSheetHtml:getStyleSheetHtml,
reset:reset};