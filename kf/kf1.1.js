var kf = {};
kf['host'] = 'http://fwowo.com';
kf['augment'] = function(fn, param) {
	$.each(param, function(key, val) {
		fn.prototype[key] = val;
	});
};
kf['getStyle'] = function(href, callback) {
	var newLink = document.createElement('link');
	newLink.rel = 'stylesheet';
	newLink.href = href;
	document.getElementsByTagName('head')[0].appendChild(newLink);
	newLink.onload = function(){
		callback();
	}
	newLink.onerror = function(){
		callback();
	}
};
kf['useArray'] = [];
kf['use'] = function(list, callback1, callback2){
	var fn = [];
	var fns = list.split(',');
	var loadfns = [];
	$.each(fns, function(){
		var item = $.trim(this);
		if ($.inArray(item, kf['useArray']) < 0) {
			loadfns.push(item);
			fn.push($.getScript(kf['host'] + '/kf/' + item + '.js'));
		}
	});
	// js文件加载回调
	var callWhen = function(){
		$.when(fn[0], fn[1], fn[2], fn[3], fn[4], fn[5], fn[6], fn[7], fn[8], fn[9]).done(function(){
			$.each(loadfns, function(){
				kf['useArray'].push(this);
			});
			callback1();
		}).fail(callback2);
	}
	// 增加特殊组件 datepicker1.0 处理
	if ($.inArray('datepicker1.0', loadfns) > -1 || $.inArray('jwplayer1.0', loadfns) > -1 || $.inArray('ckplayer1.0', loadfns) > -1) {
		if ($.inArray('datepicker1.0', loadfns) > -1) {
			kf['getStyle'](kf['host'] + '/module/zebra-datepicker/css/zebra_datepicker.css', function(){
				fn.push($.getScript(kf['host'] + '/module/zebra-datepicker/zebra_datepicker_cn.js'));
				if ($.inArray('jwplayer1.0', loadfns) > -1) {
					fn.push($.getScript(kf['host'] + '/module/jwplayer/jwplayer.js'));
				}
				if ($.inArray('ckplayer1.0', loadfns) > -1) {
					fn.push($.getScript(kf['host'] + '/module/ckplayer/ckplayer_clear.js'));
				}
				callWhen();
			});
		} else {
			if ($.inArray('jwplayer1.0', loadfns) > -1) {
				fn.push($.getScript(kf['host'] + '/module/jwplayer/jwplayer.js'));
			}
			if ($.inArray('ckplayer1.0', loadfns) > -1) {
				fn.push($.getScript(kf['host'] + '/module/ckplayer/ckplayer_clear.js'));
			}
			callWhen();
		}
	} else {
		callWhen();
	}
};