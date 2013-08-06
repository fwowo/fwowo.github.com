kf.use('common1.0, model1.1', function(){
	var navContent = $.trim($('#kj-nav').val());
	$('#kj-nav').remove();
	
	var topicContent = $.trim($('#kj-topic').val());
	$('#kj-topic').remove();
	
	$.getJSON("index/nav.txt?rand=" + rand, function(response){
		var data = response['data'];
		var dataLen = data.length;
		var obj = $('.u-nav .wrap');
		var navModel = new kf['model'](obj, {
			model: navContent,
			data: data,
			callback: function(){
				if (dataLen < 18) {
					for (i=0; i<18-dataLen; i++) {
						var newContent = navContent;
						newContent = navContent.replace(/{\$href}/g, 'javascript:void(0)');
						newContent = newContent.replace(/{\$img}/g, 'http://img03.taobaocdn.com/tps/i3/T1ouXdFb4XXXamNNre-140-140.png');
						obj.append(newContent);
					}
				}
			}
		});
	});
	
	$.getJSON("index/topic.txt?rand=" + rand, function(response){
		var data = response['data'];
		var dataLen = data.length;
		var obj = $('.u-topic ul');
		var topicModel = new kf['model'](obj, {
			model: topicContent,
			data: data
		});
	});
});
