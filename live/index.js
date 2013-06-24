kf['host'] = '';
kf.use('list1.0', function(){
	var liveList = new kf.list('kj-list', {
		action: 'json/live_{$page}.txt',
		actionType: 'json',
		pageBtn: true
	});
	liveList.show = function(){
		var _this = this;
		this.wrapObj.html('');
		$.each(_this.data, function(){
			var content = _this.model;
			$.each(this, function(key, val){
				if (key == 'img') {
					if (val != '') {
						val = '<img src="' + val + '">';
					}
				}
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			var newObj = $(content);
			_this.wrapObj.append(newObj);
			var picObj = newObj.find('.pic');
			picObj.height(newObj.find('.content').height());
			picObj.find('img').click(function(){
				newObj.find('.bigpic').html('<img src="' + picObj.data('bigpic') + '">');
				newObj.find('.bigpic').removeClass('fn-hide');
				$('#kj-mask').removeClass('fn-hide');
			});
		});
	};
});
$('#kj-mask').click(function(){
	$('#kj-list .bigpic').addClass('fn-hide');
	$('#kj-mask').addClass('fn-hide');
});