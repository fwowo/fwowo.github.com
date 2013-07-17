var topicContent = $.trim($('#kj-topic').val());
$('#kj-topic').remove();

$.getJSON("/index/topic.txt?rand=" + Math.random(), function(response){
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
});
