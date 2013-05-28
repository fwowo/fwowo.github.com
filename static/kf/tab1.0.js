kf['tab'] = function(obj, config){
	var tabConfig = {
		'eventType': 'mouseover'
	};
	if (config) {
		$.extend(tabConfig, config);
	}	
	var tabObj;
	if (typeof(obj) == 'object') {
		tabObj = obj;
	} else {
		tabObj = $('#' + obj);
	}
	var tabNav = tabObj.find('.kf-tab-nav');
	var tabOption = tabNav.find('.kf-tab-option');
	if (tabOption.length == 0) {
		tabOption = tabNav.find('li');
	}
	var tabContent = tabObj.find('.kf-tab-content');
	var tabPannel = tabContent.find('.kf-tab-pannel');
	if (tabPannel.length == 0) {
		tabPannel = tabContent.find('li');
	}
	tabOption.each(function(index, item){
		$(item).on(tabConfig['eventType'], function(){
			tabOption.removeClass('current');
			$(this).addClass('current');
			tabPannel.removeClass('current');
			tabPannel.eq(index).addClass('current');
		});
	});
	this.obj = tabObj;
	this.option = tabOption;
	this.pannel = tabPannel;
	
	this.option.removeClass('current');
	this.option.eq(0).addClass('current');
	this.pannel.removeClass('current');
	this.pannel.eq(0).addClass('current');
};
kf.augment(kf['tab'], {
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