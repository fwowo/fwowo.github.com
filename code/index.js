kf.use('common1.0, model1.0', function(){
	$.getJSON('json/index.txt?rand=' + rand, function(response){
		var data = response.data;
		var modelList = new kf['model']('kj-model', data, function(){
			$('#kj-model li').each(function(index){
				if (index > 0 && index % 4 == 0) {
					$(this).before('<div class="space"></div>');
				}
			});
		});
	});
});