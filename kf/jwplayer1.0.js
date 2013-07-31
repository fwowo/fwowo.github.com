kf['jwplayer'] = function(obj, config){
	var jwConfig = {
		flashplayer: '/module/jwplayer/jwplayer.flash.swf',
		html5player: '/module/jwplayer/jwplayer.html5.js',
		width: 600,
		height: 400,
		autostart: true	
	};
	if (config) {
		$.extend(jwConfig, config);
	}
	jwplayer(obj).setup(jwConfig);
};