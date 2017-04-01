










var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);
var _resolveBoxShadow=require('./resolveBoxShadow');var _resolveBoxShadow2=_interopRequireDefault(_resolveBoxShadow);
var _resolveTextShadow=require('./resolveTextShadow');var _resolveTextShadow2=_interopRequireDefault(_resolveTextShadow);
var _resolveTransform=require('./resolveTransform');var _resolveTransform2=_interopRequireDefault(_resolveTransform);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var emptyObject={};
var styleShortFormProperties={
borderColor:['borderTopColor','borderRightColor','borderBottomColor','borderLeftColor'],
borderRadius:['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'],
borderStyle:['borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle'],
borderWidth:['borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth'],
margin:['marginTop','marginRight','marginBottom','marginLeft'],
marginHorizontal:['marginRight','marginLeft'],
marginVertical:['marginTop','marginBottom'],
overflow:['overflowX','overflowY'],
padding:['paddingTop','paddingRight','paddingBottom','paddingLeft'],
paddingHorizontal:['paddingRight','paddingLeft'],
paddingVertical:['paddingTop','paddingBottom'],
textDecorationLine:['textDecoration'],
writingDirection:['direction']};


var alphaSortProps=function alphaSortProps(propsArray){return propsArray.sort(function(a,b){
if(a<b){return-1;}
if(a>b){return 1;}
return 0;
});};

var expandStyle=function expandStyle(style){
if(!style){return emptyObject;}
var styleProps=Object.keys(style);
var sortedStyleProps=alphaSortProps(styleProps);
var hasResolvedBoxShadow=false;
var hasResolvedTextShadow=false;

var reducer=function reducer(resolvedStyle,prop){
var value=(0,_normalizeValue2.default)(prop,style[prop]);
if(value==null){return resolvedStyle;}

switch(prop){

case'elevation':
case'resizeMode':{
break;
}
case'flex':{
resolvedStyle.flexGrow=value;
resolvedStyle.flexShrink=1;
resolvedStyle.flexBasis='auto';
break;
}
case'shadowColor':
case'shadowOffset':
case'shadowOpacity':
case'shadowRadius':{
if(!hasResolvedBoxShadow){
(0,_resolveBoxShadow2.default)(resolvedStyle,style);
}
hasResolvedBoxShadow=true;
break;
}
case'textAlignVertical':{
resolvedStyle.verticalAlign=value==='center'?'middle':value;
break;
}
case'textShadowColor':
case'textShadowOffset':
case'textShadowRadius':{
if(!hasResolvedTextShadow){
(0,_resolveTextShadow2.default)(resolvedStyle,style);
}
hasResolvedTextShadow=true;
break;
}
case'transform':{
(0,_resolveTransform2.default)(resolvedStyle,style);
break;
}
default:{
var longFormProperties=styleShortFormProperties[prop];
if(longFormProperties){
longFormProperties.forEach(function(longForm,i){


if(styleProps.indexOf(longForm)===-1){
resolvedStyle[longForm]=value;
}
});
}else{
resolvedStyle[prop]=value;
}
}}


return resolvedStyle;
};

var resolvedStyle=sortedStyleProps.reduce(reducer,{});
return resolvedStyle;
};

module.exports=expandStyle;