var navContent = $.trim($('#kj-nav').val());
$('#kj-nav').remove();

var topicContent = $.trim($('#kj-topic').val());
$('#kj-topic').remove();

$.getJSON("index/nav.txt?rand=" + Math.random(), function(response){
	var data = response['data'];
	var dataLen = data.length;
	var obj = $('.u-nav');
	$.each(data, function(){
		var newContent = navContent;
		$.each(this, function(key, val){
			var newReg = new RegExp('{\\$' + key + '}', 'g');
			newContent = newContent.replace(newReg, val);
		});
		obj.append(newContent);
	});
	if (dataLen < 18) {
		for (i=0; i<18-dataLen; i++) {
			var newContent = navContent;
			newContent = navContent.replace(/{\$href}/g, 'javascript:void(0)');
			newContent = newContent.replace(/{\$img}/g, 'http://img03.taobaocdn.com/tps/i3/T1ouXdFb4XXXamNNre-140-140.png');
			obj.append(newContent);
		}
	}
});

$.getJSON("index/topic.txt?rand=" + Math.random(), function(response){
	var data = response['data'];
	var dataLen = data.length;
	var obj = $('.u-topic ul');
	$.each(data, function(){
		var newContent = topicContent;
		$.each(this, function(key, val){
			var newReg = new RegExp('{\\$' + key + '}', 'g');
			newContent = newContent.replace(newReg, val);
		});
		obj.append(newContent);
	});
	if (dataLen < 6) {
		for (i=0; i<6-dataLen; i++) {
			var newContent = topicContent;
			var newObj = $(newContent);
			newObj.find('a').remove();
			obj.append(newObj);
		}
	}
});
