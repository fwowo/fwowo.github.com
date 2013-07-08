// 获取参数
var url = document.URL;
var query = {};
var urlParam = url.split('?')[1];
if (urlParam) {
	urlParam = urlParam.split('#')[0];
	var param = urlParam.split('&');
	$.each(param, function(){
		var newParam = this.split('=');
		if (newParam[0] && newParam[1]) {
			query[newParam[0]] = newParam[1];
		}
	});
} else {
	location.href = '/trip/';
}
if (query['sign']) {
	var sign = query['sign'];
} else {
	location.href = '/trip/';
}

// 是否有返回按钮
if (query['i'] && query['i'] == 'b') {
	$('.u-head .back').attr('href', '/trip/?sign=' + sign);
	$('.u-head').addClass('kc-back');
}

// 加载列表
var mainObj = $('#kj-content');
mainObj.load('page/' + sign + '.html?r=' + Math.random());