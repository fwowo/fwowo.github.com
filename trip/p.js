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

// 加载列表
var mainObj = $('#kj-content');
mainObj.load('page/' + sign + '.html?r=' + Math.random());

// 获取标题
$.getJSON('json/trip.txt?r=' + Math.random(), function(response){
	var data = response.data;
	var dataLen = data.length;
	for (i=0; i<dataLen; i++) {
		if (data[i]['sign'] == sign) {
			document.title = data[i]['title'];
			$('h1').html(data[i]['title'] + '&nbsp;&nbsp;<em>(' + data[i]['date'] + ')</em>');
			break;
		}
	}
});