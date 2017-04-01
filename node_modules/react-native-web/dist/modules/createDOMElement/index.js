var _react=require('react');var _react2=_interopRequireDefault(_react);
var _registry=require('../../apis/StyleSheet/registry');var _registry2=_interopRequireDefault(_registry);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}

var emptyObject={};

var roleComponents={
article:'article',
banner:'header',
button:'button',
complementary:'aside',
contentinfo:'footer',
form:'form',
heading:'h1',
link:'a',
list:'ul',
listitem:'li',
main:'main',
navigation:'nav',
region:'section'};


var createDOMElement=function createDOMElement(component){var rnProps=arguments.length>1&&arguments[1]!==undefined?arguments[1]:emptyObject;var

accessibilityLabel=







rnProps.accessibilityLabel,accessibilityLiveRegion=rnProps.accessibilityLiveRegion,accessibilityRole=rnProps.accessibilityRole,_rnProps$accessible=rnProps.accessible,accessible=_rnProps$accessible===undefined?true:_rnProps$accessible,rnStyle=rnProps.style,testID=rnProps.testID,type=rnProps.type,domProps=_objectWithoutProperties(rnProps,['accessibilityLabel','accessibilityLiveRegion','accessibilityRole','accessible','style','testID','type']);

var accessibilityComponent=accessibilityRole&&roleComponents[accessibilityRole];
var Component=accessibilityComponent||component;var _ref=

_registry2.default.resolve(rnStyle)||emptyObject,className=_ref.className,style=_ref.style;

if(!accessible){domProps['aria-hidden']=true;}
if(accessibilityLabel){domProps['aria-label']=accessibilityLabel;}
if(accessibilityLiveRegion){domProps['aria-live']=accessibilityLiveRegion;}
if(testID){domProps['data-testid']=testID;}
if(accessibilityRole){
domProps.role=accessibilityRole;
if(accessibilityRole==='button'){
domProps.type='button';
}else if(accessibilityRole==='link'&&domProps.target==='_blank'){
domProps.rel=(domProps.rel||'')+' noopener noreferrer';
}
}
if(className&&className!==''){
domProps.className=domProps.className?domProps.className+' '+className:className;
}
if(style){
domProps.style=style;
}
if(type){
domProps.type=type;
}

return(
_react2.default.createElement(Component,domProps));

};

module.exports=createDOMElement;