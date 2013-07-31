kf['browser'] = {};
(function(){
	var rChrome = /(chrome)[\/]([\w.]+)/,
		rSafari = /(version)[\/]([\w.]+) (safari)/,
		rFirefox = /(firefox)[\/]([\w.]+)/,
		rMsie = /(msie) ([\w.]+)/,
		userAgent = navigator.userAgent;
		
	var ua = userAgent.toLowerCase();
	var uaMatch = rChrome.exec(ua) ||
		rSafari.exec(ua) ||
		rFirefox.exec(ua) ||
		rMsie.exec(ua) ||
		[];
	if (uaMatch[3] == 'safari') {
		uaMatch[1] = uaMatch[3];
	}
	kf['browser'] = {ua: ua, browser: uaMatch[1] || "", version: uaMatch[2] || ""};
})();