// 获取参数
var hash = document.location.hash;
if (hash != '') {
	var hashSign = hash.replace('#', '');
	var hashTitle = '';
} else {
	var hashSign = '';
	var hashTitle = '';
}

kf['host'] = '';
// 显示list
kf.use('list1.0,waterfall1.3', function(){
	kf.augment(kf['list'], {
		show: function(){
			var _this = this;
			this.wrapObj.html('');
			$.each(_this.data, function(index){
				if (index > 0 && index % 4 == 0) {
					_this.wrapObj.append('<div class="space fn-clear"></div>');
				}
				var content = _this.model;
				$.each(this, function(key, val){
					var newReg = new RegExp('{\\$' + key + '}', 'g');
					content = content.replace(newReg, val);
				});
				_this.wrapObj.append(content);
				if (this['sign'] == hashSign) {
					hashTitle = this['title'];
				}
			});
			if (hashSign != '') {
				showItem(hashSign, hashTitle);
			}
		}
	});
	var kList = new kf.list('kj-list', {
		action: 'json/list_{$page}.txt'
	});
});
var showList = function(){
	kItem[hashSign].pause();
	location.href = '#';
	document.title = '壁纸';
	$('.kj-item-sign').addClass('fn-hide');
	$('#kj-list').removeClass('fn-hide');
};
// 显示item
var kItem = {};
var showItem = function(sign, title){
	hashSign = sign;
	location.href = '#' + sign;
	document.title = title;
	$('#kj-list').addClass('fn-hide');
	var itemObj = $('#kj-item-' + sign);
	if (itemObj.length == 0){
		// 创建
		itemObj = $('#kj-item').clone();
		itemObj.attr('id', 'kj-item-' + sign);
		$('#kj-item-wrap').append(itemObj);
		itemObj.find('.u-back em').html(title);
		itemObj.removeClass('fn-hide');
		kItem[sign] = new kf.waterfall(itemObj, {
			action: 'json/' + sign + '.txt',
			effect: 'fade',
			buffer: 'img',
			moreBtn: false
		});
	} else {
		itemObj.removeClass('fn-hide');
		kItem[sign].play();
	}
};