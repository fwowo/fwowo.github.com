kf['waterfall'] = function(obj, config){
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.config = {
		column: '.kf-waterfall-column',
		model: '',
		data: [],
		loadimg: ''
	};
	if (config) {
		$.extend(this.config, config);
		this.model = $.trim(this.config['model']);
	}
	if (typeof(this.config['column']) == 'object') {
		this.column = this.config['column'];
	} else {
		this.column = this.obj.find(this.config['column']);
	}
	this.data = this.config['data'];
	this.pauseState = false;
	this.show();
};
kf.augment(kf['waterfall'], {
	// 展示数据
	show: function(){
		this.dataLen = this.data.length;
		this.rankShow(0);
	},
	// 排队显示
	rankShow: function(index){
		var _this = this;
		if (index < this.dataLen) {
			var data = this.data[index];
			if (this.config['loadimg'] != '') {
				var loadimg = data[this.config['loadimg']];
				var newImg = new Image();
				newImg.src = loadimg;
				if (newImg.complete) {
					if (!_this.pauseState) {
						_this.rankShowApp(index);
					} else {
						_this.pauseId = index;
					}
				} else {
					newImg.onload = function(){
						if (!_this.pauseState) {
							_this.rankShowApp(index);
						} else {
							_this.pauseId = index;
						}
					};
					newImg.onerror = function(){
						_this.rankShow(index + 1);
					};
				}
			} else {
				if (!_this.pauseState) {
					_this.rankShowApp(index);
				} else {
					_this.pauseId = index;
				}
			}
		} else {
			if (this.config['callback']) {
				this.config['callback']();
			}
		}
	},
	// 排队显示操作
	rankShowApp: function(index){
		var _this = this;
		var data = this.data[index];
		var content = this.model;
		$.each(data, function(key, val){
			var newReg = new RegExp('{\\$' + key + '}', 'g');
			content = content.replace(newReg, val);
		});
		var newObj = $(content);
		newObj.css('display', 'none');
		this.minCol().append(newObj);
		newObj.fadeIn('fast');
		setTimeout(function(){
			_this.rankShow(index + 1);
		}, 100);
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
	},
	// 暂停
	pause: function(){
		this.pauseState = true;
	},
	// play
	play: function(){
		if (this.pauseState) {
			this.pauseState = false;
			this.rankShowApp(this.pauseId);
			this.pauseId = this.dataLen;
		}
	}
});