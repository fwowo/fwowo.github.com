// 获取参数
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
}

// 创建类
kf['simList'] = function(){
	this.obj = $('#kj-list');
	this.pageSize = 5;
	this.init();
};
kf.augment(kf['simList'], {
	// 初始化
	init: function(){
		this.wrapObj = this.obj.find('.kf-list-wrap');
		this.modelObj = this.obj.find('.kf-list-model');
		this.model = $.trim(this.modelObj.val());
		this.modelObj.remove();
		this.pageObj = this.obj.find('.kf-list-page');
		this.pagemodelObj = this.obj.find('.kf-list-pagemodel');
		this.pagemodel = $.trim(this.pagemodelObj.val());
		this.pagemodelObj.remove();
		this.action();
	},	
	// 获取数据
	action: function(){
		var _this = this;
		$.getJSON('json/trip.txt?r=' + Math.random(), function(response){
			_this.data = response.data;
			_this.dataLen = _this.data.length;
			_this.totalPage = Math.ceil(_this.dataLen / _this.pageSize);
			_this.dataIndex = 0;
			_this.page = 1;
			if (query['sign']) {
				for (i=0; i<_this.dataLen; i++) {
					if (_this.data[i]['sign'] == query['sign']) {
						_this.dataIndex = i;
						break;
					}
				}
				_this.page = Math.floor(_this.dataIndex / _this.pageSize) + 1;
			}
			_this.createPage(_this.page);
		});
	},
	// 展示数据
	show: function(page){
		this.wrapObj.html('');
		var start = (page - 1) * this.pageSize;
		var end = page * this.pageSize;
		if (end > this.dataLen) end = this.dataLen;
		for (i=start; i<end; i++) {
			var content = this.model;
			var sign = this.data[i]['sign'];
			$.each(this.data[i], function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			var newObj = $(content);
			var newImgList = newObj.find('.kj-img').data('img').split(',');
			$.each(newImgList, function(){
				newObj.find('.kj-img').append('<li><a target="_blank" href="p.html?sign=' + sign + '"><img src="pic/' + sign + this + '.jpg"></a></li>');
			});
			this.wrapObj.append(newObj);
		}
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
				_this.show($(this).data('page'));
				return false;
			});
		}
		this.show(page);
	}
});
var simList = new kf.simList();