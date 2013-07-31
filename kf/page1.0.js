kf['page'] = function(obj, config){
	this.config = {
		model: '',
		total: 0,
		page: 1,
		hoverClass: 'hover',
		currentClass: 'current'
	};
	if (config) {
		$.extend(this.config, config);
		this.config['model'] = $.trim(this.config['model']);
	}
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	if (this.config['total'] > 0) {
		this.init();
		this.currentPage = 0;
		this.to(this.config['page']);
	}
};
kf.augment(kf['page'], {
	// 展示数据
	init: function(){
		var _this = this;
		for (i=0; i<this.config['total']; i++) {
			var content = _this.config['model'];
			var page = i + 1;
			var newReg = new RegExp('{\\$page}', 'g');
			content = content.replace(newReg, page);
			var newObj = $(content);
			newObj.addClass('kf-page');
			newObj.data('page', page);
			this.obj.append(newObj);
			newObj.hover(function(){
				$(this).addClass(_this.config['hoverClass']);
			}, function(){
				$(this).removeClass(_this.config['hoverClass']);
			});
			if (this.config['callback']) {
				newObj.click(function(){
					if (_this.currentPage != $(this).data('page')) {
						_this.currentPage = $(this).data('page');
						_this.obj.find('.kf-page').removeClass(_this.config['currentClass']);
						$(this).addClass(_this.config['currentClass']);
						_this.config['callback']($(this).data('page'));
					}
					return false;
				});
			}
		}
	},
	// 切换页码
	to: function(page){
		this.obj.find('.kf-page').each(function(){
			if ($(this).data('page') == page) {
				$(this).click();
			}
		});
	},
	// 重置页码
	reset: function(total){
		if (this.config['total'] != total) {
			this.config['total'] = total;
			this.obj.find('.kf-page').remove();
			if (this.config['total'] > 0) {
				this.init();
			}
		}
	}
});