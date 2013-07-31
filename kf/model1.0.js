kf['model'] = function(obj, data, callback){
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.model = $.trim(this.obj.find('.kf-model').val());
	this.data = data;
	this.callback = callback;
	this.init();
};
kf.augment(kf['model'], {
	// 展示数据
	init: function(){
		var _this = this;
		$.each(_this.data, function(){
			var content = _this.model;
			$.each(this, function(key, val){
				var newReg = new RegExp('{\\$' + key + '}', 'g');
				content = content.replace(newReg, val);
			});
			_this.obj.append(content);
		});
		if (this.callback) {
			this.callback();
		}
	}
});