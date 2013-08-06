var topicContent = $.trim($('#kj-topic').val());
$('#kj-topic').remove();
kf.use('common1.0, model1.1', function(){
	$.getJSON("/index/topic.txt?rand=" + rand, function(response){
		var data = response['data'];
		var dataLen = data.length;
		var obj = $('.u-topic ul');
		var topicModel = new kf['model'](obj, {
			model: topicContent,
			data: data
		});
	});
});