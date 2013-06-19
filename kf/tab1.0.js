kf['tab'] = function(obj, config){
	this.config = {
		eventType: 'mouseover',
		index: 0
	};
	if (config) {
		$.extend(this.config, config);
	}
	if (typeof(obj) == 'object') {
		this.obj = obj;
	} else {
		this.obj = $('#' + obj);
	}
	this.nav = this.obj.find('.kf-tab-nav');
	this.option = this.nav.find('.kf-tab-option');
	if (this.option.length == 0) {
		this.option = this.nav.find('li');
	}
	this.content = this.obj.find('.kf-tab-content');
	this.pannel = this.content.find('.kf-tab-pannel');
	if (this.pannel.length == 0) {
		this.pannel = this.content.find('li');
	}
	
	this.show(this.config['index']);
	this.init();
};
kf.augment(kf['tab'], {
	init: function(){
		var _this = this;
		this.option.each(function(index, item){
			$(item).on(_this.config['eventType'], function(){
				_this.option.removeClass('current');
				$(this).addClass('current');
				_this.pannel.removeClass('current');
				_this.pannel.eq(index).addClass('current');
			});
		});
	},
	show: function(index){
		if (!index) {
			index = 0;
		}
		this.option.removeClass('current');
		this.option.eq(index).addClass('current');
		this.pannel.removeClass('current');
		this.pannel.eq(index).addClass('current');
	}
});