// 获取参数
var hash = document.location.hash;
if (hash != '') {
	var sign = hash.replace('#', '');
} else {
	location.href = '/new/';
}

// 加载内容
kf.use('common1.0', function(){});
var mainObj = $('#kj-content');
mainObj.load('page/' + sign + '.html?r=' + Math.random(), function(){
	var title = mainObj.find('.title').html();
	document.title = title;
});