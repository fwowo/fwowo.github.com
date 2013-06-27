kf['list'] = function(obj, config){
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.config = {
		action: '',
		actionType: 'json',
		pageBtn: true
	};
	if (config) {
		$.extend(this.config, config);
	}
	this.data = {};
	this.ready();
};
kf.augment(kf['list'], {
	// 初始化
	ready: function(){
		var _this = this;
		this.wrapObj = this.obj.find('.kf-list-wrap');
		this.modelObj = this.obj.find('.kf-list-model');
		this.model = $.trim(this.modelObj.val());
		this.modelObj.remove();
		if (this.config['pageBtn']) {
			this.pageObj = this.obj.find('.kf-list-page');
			this.pagemodelObj = this.obj.find('.kf-list-pagemodel');
			this.pagemodel = $.trim(this.pagemodelObj.val());
			this.pagemodelObj.remove();
		}
		this.totalPage = 0;
		this.action(1);
	},
	// 请求数据
	action: function(page){
		var _this = this;
		var url = this.config['action'].replace(/{\$page}/g, page);
		if (url.indexOf('?') > -1) {
			url += '&r=' + Math.random();
		} else {
			url += '?r=' + Math.random();
		}
		$.ajax({
			dataType: this.config['actionType'],
			url: url,
			success: function(response){
				_this.data = response.data;
				_this.show();
				if (_this.config['pageBtn'] && response.totalpage != _this.totalPage) {
					_this.totalPage = response.totalpage;
					_this.createPage(page);
				}
			}
		});
	},
	// 展示数据
	show: function(){
		var _this = this;
		this.wrapObj.html('');
		$.each(_this.data, function(){
			var content = _this.model;
			$.each(this, function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			_this.wrapObj.append(content);
		});
	},
	// 创建页码
	createPage: function(page){
		var _this = this;
		this.pageObj.html('');
		for(i=1; i<=this.totalPage; i++) {
			var newReg = new RegExp('{\\$page}', 'g');
			var newPage = $(this.pagemodel.replace(newReg, i));
			newPage.data('page', i);
			newPage.addClass('kf-list-pagemark');
			if (i == page) {
				newPage.addClass('current');
			}
			this.pageObj.append(newPage);
			newPage.click(function(){
				_this.pageObj.find('.kf-list-pagemark').removeClass('current');
				$(this).addClass('current');
				_this.action($(this).data('page'));
				return false;
			});
		}
	}
});