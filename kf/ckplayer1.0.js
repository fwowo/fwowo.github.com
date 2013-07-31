kf['ckplayer'] = function(obj, config){
	var ckConfig = {
		width: 600,
		height: 400,
		autostart: true	
	};
	if (config) {
		$.extend(ckConfig, config);
	}
	ckPlayer(obj, ckConfig['width'], ckConfig['height'], ckConfig['file'], ckConfig['image'], ckConfig['autostart']);
};