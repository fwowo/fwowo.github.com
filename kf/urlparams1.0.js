kf['urlparams'] = {
	search: {},
	hash: ''
};
(function(){
	var dlSearch = document.location.search;
	if (dlSearch != '') {
		dlSearch = dlSearch.substr(1);
		dlSearchSplit = dlSearch.split('&');
		$.each(dlSearchSplit, function(){
			var item = this.split('=');
			kf['urlparams']['search'][item[0]] = item[1];
		});
	}
	var dlHash = document.location.hash;
	if (dlHash != '') {
		dlHash = dlHash.substr(1);
		kf['urlparams']['hash'] = dlHash;
	}
})();