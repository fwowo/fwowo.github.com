var kf = {};
kf['host'] = 'http://fwowo.github.io';
kf['augment'] = function(fn, param) {
	$.each(param, function(key, val) {
		fn.prototype[key] = val;
	});
};
kf['use'] = function(list, callback1, callback2){
	var fn = [];
	var fns = list.split(',');
	$.each(fns, function(){
		fn.push($.getScript(kf['host'] + '/static/kf/' + this + '.js'));
	});
	$.when(fn[0], fn[1], fn[2], fn[3], fn[4], fn[5], fn[6], fn[7], fn[8], fn[9]).done(callback1).fail(callback2);
};