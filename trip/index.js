kf['host'] = '';
kf.use('list1.0', function(){
	var liveList = new kf.list('kj-list', {
		action: 'json/trip_{$page}.txt'
	});
	liveList.show = function(){
		var _this = this;
		this.wrapObj.html('');
		$.each(_this.data, function(){
			var content = _this.model;
			$.each(this, function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			var newObj = $(content);
			_this.wrapObj.append(newObj);
			// 绑定内容按钮
			newObj.find('.title a').click(function(){
				showContent(newObj);
				return false;
			});
			// 分析展现图片
			var imgObj = newObj.find('.kj-img');
			var imgs = imgObj.data('img');
			if (imgs != '') {
				var imgData = imgs.split(',');
				$.each(imgData, function(){
					imgObj.append('<li><img src="' + this + '"></li>');
				});
				imgObj.find('img').click(function(){
					showContent(newObj);
				});
			}
		});
	};
	function showContent(obj){
		var titleObj = obj.find('.title a');
		titleObj.addClass('current');
		var initObj = obj.find('.init');
		if (initObj.html() == '') {
			initObj.load(titleObj.attr('href') + '?r=' + Math.random());
		}
		initObj.removeClass('fn-hide');
		$('#kj-mask').removeClass('fn-hide');
	}
});
$('#kj-mask').click(function(){
	$('#kj-list .title a').removeClass('current');
	$('#kj-list .init').addClass('fn-hide');
	$('#kj-mask').addClass('fn-hide');
});