// ��ȡ����
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

// �Ƿ��з��ذ�ť
if (query['i'] && query['i'] == 'b') {
	$('.u-head .back').attr('href', '/trip/?sign=' + sign);
	$('.u-head').addClass('kc-back');
}

// �����б�
var mainObj = $('#kj-content');
mainObj.load('page/' + sign + '.html?r=' + Math.random());

// ��ȡ����
$.getJSON('json/trip.txt?r=' + Math.random(), function(response){
	var data = response.data;
	var dataLen = data.length;
	for (i=0; i<dataLen; i++) {
		if (data[i]['sign'] == sign) {
			$('.u-head .title').html(data[i]['title'] + '&nbsp;&nbsp;<em>(' + data[i]['date'] + ')</em>');
			break;
		}
	}
});