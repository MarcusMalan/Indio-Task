var _flattenStyle=require('./flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);
var _initialize=require('./initialize');var _initialize2=_interopRequireDefault(_initialize);
var _injector=require('./injector');var _injector2=_interopRequireDefault(_injector);
var _registry=require('./registry');var _registry2=_interopRequireDefault(_registry);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

(0,_initialize2.default)();

var absoluteFillObject={position:'absolute',left:0,right:0,top:0,bottom:0};

module.exports={
absoluteFill:_registry2.default.register(absoluteFillObject),
absoluteFillObject:absoluteFillObject,
create:function create(styles){
var result={};
Object.keys(styles).forEach(function(key){
if(process.env.NODE_ENV!=='production'){
require('./StyleSheetValidation').validateStyle(key,styles);
}
result[key]=_registry2.default.register(styles[key]);
});
return result;
},
hairlineWidth:1,
flatten:_flattenStyle2.default,
renderToString:_injector2.default.getStyleSheetHtml};