kf['datepicker'] = function(obj, config){
	if (typeof(obj) != 'object') {
		obj = $('#' + obj);
	}
	obj.Zebra_DatePicker(config);
};