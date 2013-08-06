kf.use('list1.0', function(){
	var sList = new kf.list('kj-list', {
		action: 'json/list_{$page}.txt'
	});
});