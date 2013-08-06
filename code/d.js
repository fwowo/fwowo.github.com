kf.use('common1.0', function(){});
// 获取参数
var hash = document.location.hash;
if (hash != '') {
	var id = hash.replace('#', '');
} else {
	location.href = '/code/';
}

$('#kj-demo').load('demo/' + id + '.html');