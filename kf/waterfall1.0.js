kf['waterfall'] = function(obj, config){
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.config = {
		action: '',
		actionType: 'json',
		actionPage: 1,
		moreBtn: true,
		autoShow: true
	};
	if (config) {
		$.extend(this.config, config);
	}
	this.actpage = this.config['actionPage'];
	this.data = {};
	this.ready();
};
kf.augment(kf['waterfall'], {
	// 初始化
	ready: function(){
		var _this = this;
		this.modelObj = this.obj.find('.kf-waterfall-model');
		this.model = this.modelObj.val();
		this.modelObj.remove();
		this.column = this.obj.find('.kf-waterfall-column');
		if (this.config['moreBtn']) {
			this.more = this.obj.find('.kf-waterfall-more');
			if (this.more.length == 0) {
				this.more = this.obj.find('.kf-waterfall-morebtn');
				this.morebtn = this.more;
			} else {
				this.morebtn = this.more.find('.kf-waterfall-morebtn');
			}
			this.morebtn.click(function(){
				_this.show();
				return false;
			});
		}
		this.action();
	},
	// 请求数据
	action: function(){
		var _this = this;
		if (this.config['moreBtn']) {
			this.more.addClass('fn-hide');
		}
		var currentPage = this.actpage;
		var url = this.config['action'].replace(/{\$page}/g, currentPage);
		if (url.indexOf('?') > -1) {
			url += '&r=' + Math.random();
		} else {
			url += '?r=' + Math.random();
		}
		this.actpage ++;
		$.ajax({
			dataType: this.config['actionType'],
			url: url,
			success: function(response){
				_this.data = response.data;
				$.each(_this.data, function() {
					var data = this;
					$.each(data, function(key, val) {
						var picSuf = val.substr(-4, 4);
						if (picSuf == '.jpg' || picSuf == '.gif' || picSuf== '.png') {
							var newImg = new Image();
							newImg.src = val;
						}
					});
				});
				if (_this.data.length > 0) {
					if (_this.config['moreBtn']) {
						_this.more.removeClass('fn-hide');
					}
					if (currentPage == _this.config['actionPage'] && _this.config['autoShow']) {
						_this.show();
					}
				}
			}
		});
	},
	// 展示数据
	show: function(){
		var _this = this;
		$.each(this.data, function(){
			var data = this;
			var content = _this.model;
			$.each(data, function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			var newObj = $(content);
			_this.minCol().append(newObj);
		});
		if (this.config['moreBtn']) {
			this.action();
		}
	},
	// 获取最短的列
	minCol: function(){
		var minObj = this.column.eq(0);
		var minHeight = minObj.height();
		$.each(this.column, function(index){
			if (index > 0) {
				if ($(this).height() < minHeight) {
					minHeight = $(this).height();
					minObj = $(this);
				}
			}
		});
		return minObj;
	}
});