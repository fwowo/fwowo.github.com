kf.use('common1.0, model1.1, page1.0', function(){
	var listModelVal = $('.kj-listmodel').val();
	var pageModelVal = $('.kj-pagemodel').val();
	var listData = [];
	var fnPage = new kf.page('kj-page', {
		model: pageModelVal,
		total: 1,
		callback: function(page){
			fnList(page);
		}
	});
	function fnData(page){
		var newModel = new kf.model('kj-list', {
			model: listModelVal,
			data: listData[page]
		});
	}
	function fnList(page){
		$('#kj-list').html('');
		if (listData[page]) {
			fnData(page);
		} else {
			$.getJSON('json/list' + page + '.txt?rand=' + rand, function(response){
				listData[page] = response.data;
				fnData(page);
				var totalpage = response.totalpage;
				fnPage.reset(totalpage);
			});
		}
	}
});
