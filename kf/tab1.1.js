kf['tab'] = function(obj, config){
	this.config = {
		eventType: 'mouseover',
		index: 0,
		option: '.kf-tab-option',
		pannel: '.kf-tab-pannel',
		optionClass: 'current',
		pannelClass: 'current'
	};
	if (config) {
		$.extend(this.config, config);
	}
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.option = this.config['option'];
	if (typeof(this.option) != 'object') {
		this.option = this.obj.find(this.config['option']);
	}
	this.pannel = this.config['pannel'];
	if (typeof(this.pannel) != 'object') {
		this.pannel = this.obj.find(this.config['pannel']);
	}
	
	this.index = -1;
	this.show(this.config['index']);
	this.init();
};
kf.augment(kf['tab'], {
	init: function(){
		var _this = this;
		this.option.each(function(index, item){
			$(item).data('tabIndex', index);
			$(item).on(_this.config['eventType'], function(){
				_this.show($(this).data('tabIndex'));
			});
		});
	},
	show: function(index){
		if (index != this.index) {
			this.index = index;
			this.option.removeClass(this.config['optionClass']);
			this.option.eq(index).addClass(this.config['optionClass']);
			this.pannel.removeClass(this.config['pannelClass']);
			this.pannel.eq(index).addClass(this.config['pannelClass']);
			if (this.config['callback']) {
				this.config['callback'](index);
			}
		}
	}
});