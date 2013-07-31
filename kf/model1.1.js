kf['model'] = function(obj, config){
	this.config = {
		model: '',
		data: []
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
	this.data = this.config['data'];
	this.init();
};
kf.augment(kf['model'], {
	// 展示数据
	init: function(){
		var _this = this;
		$.each(_this.data, function(){
			var content = _this.config['model'];
			$.each(this, function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			_this.obj.append(content);
		});
		if (this.config['callback']) {
			this.config['callback']();
		}
	}
});