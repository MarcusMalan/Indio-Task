var RE_1=/([A-Z])/g;
var RE_2=/^ms-/;
module.exports=function(s){return s.replace(RE_1,'-$1').toLowerCase().replace(RE_2,'-ms-');};